import {
    AfterViewInit,
    Component,
    ElementRef,
    Input
} from '@angular/core';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { renderMermaidDiagrams } from '../../shared/mermaid-render';
import { FirmwareCardComponent } from '../../components/firmware-card/firmware-card.component';
import { Project } from '../../models/project.model';

@Component({
    selector: 'app-weather-monitoring',
    standalone: true,
    imports: [
        NgxExtendedPdfViewerModule,
        FirmwareCardComponent
    ],
    templateUrl: './weather-monitoring.html',
    styleUrl: './weather-monitoring.css',

    preserveWhitespaces: true
})
export class WeatherMonitoringComponent implements AfterViewInit {

    @Input({ required: true }) project!: Project;

    constructor(private elementRef: ElementRef<HTMLElement>) {}

    async ngAfterViewInit(): Promise<void> {
        // Query from the component's own host element rather than a single
        // template ref, since this template has more than one top-level
        // article (hardware + PCB fabrication), each with its own .mermaid
        // diagrams.
        await renderMermaidDiagrams(this.elementRef.nativeElement);
    }
}
