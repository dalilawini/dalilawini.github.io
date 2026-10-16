import {
    AfterViewInit,
    Component,
    ElementRef
} from '@angular/core';

import { renderMermaidDiagrams } from '../../shared/mermaid-render';

/**
 * PCB design & fabrication workflow (Altium → Gerber → FlatCAM → CNC).
 * Shown at the end of the weather-monitoring case study and as the custom-pcb case study.
 */
@Component({
    selector: 'app-pcb-fabrication',
    standalone: true,
    templateUrl: './pcb-fabrication.html',
    styleUrls: ['../case-study.css', './pcb-fabrication.css'],

    preserveWhitespaces: true
})
export class PcbFabricationComponent implements AfterViewInit {

    constructor(private elementRef: ElementRef<HTMLElement>) {}

    async ngAfterViewInit(): Promise<void> {
        await renderMermaidDiagrams(this.elementRef.nativeElement);
    }
}
