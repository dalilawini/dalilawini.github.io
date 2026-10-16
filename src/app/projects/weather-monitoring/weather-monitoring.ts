import {
    AfterViewInit,
    Component,
    ElementRef,
    Input
} from '@angular/core';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { renderMermaidDiagrams } from '../../shared/mermaid-render';
import { FirmwareCardComponent } from '../../components/firmware-card/firmware-card.component';
import { PcbFabricationComponent } from '../pcb-fabrication/pcb-fabrication';
import { Project } from '../../models/project.model';

@Component({
    selector: 'app-weather-monitoring',
    standalone: true,
    imports: [
        NgxExtendedPdfViewerModule,
        FirmwareCardComponent,
        PcbFabricationComponent
    ],
    templateUrl: './weather-monitoring.html',
    styleUrls: ['../case-study.css', './weather-monitoring.css'],

    preserveWhitespaces: true
})
export class WeatherMonitoringComponent implements AfterViewInit {

    @Input({ required: true }) project!: Project;

    constructor(private elementRef: ElementRef<HTMLElement>) {}

    async ngAfterViewInit(): Promise<void> {
        // Query from the component's own host element rather than a single
        // template ref. The embedded <app-pcb-fabrication> renders its own
        // diagrams; the renderer skips any it has already claimed.
        await renderMermaidDiagrams(this.elementRef.nativeElement);
    }
}
