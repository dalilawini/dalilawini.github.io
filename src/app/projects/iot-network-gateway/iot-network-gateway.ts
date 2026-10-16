import {
    AfterViewInit,
    Component,
    ElementRef,
    Input
} from '@angular/core';
import { RouterLink } from '@angular/router';

import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { renderMermaidDiagrams } from '../../shared/mermaid-render';
import { FirmwareCardComponent } from '../../components/firmware-card/firmware-card.component';
import { Project } from '../../models/project.model';

@Component({
    selector: 'app-iot-network-gateway',
    standalone: true,
    imports: [
        RouterLink,
        NgxExtendedPdfViewerModule,
        FirmwareCardComponent
    ],
    templateUrl: './iot-network-gateway.html',
    styleUrls: ['../case-study.css', './iot-network-gateway.css'],

    preserveWhitespaces: true
})
export class IotNetworkGatewayComponent implements AfterViewInit {

    @Input({ required: true }) project!: Project;

    constructor(private elementRef: ElementRef<HTMLElement>) {}

    async ngAfterViewInit(): Promise<void> {
        await renderMermaidDiagrams(this.elementRef.nativeElement);
    }
}
