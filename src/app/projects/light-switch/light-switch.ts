import {
    AfterViewInit,
    Component,
    ElementRef,
    Input
} from '@angular/core';

import { renderMermaidDiagrams } from '../../shared/mermaid-render';
import { FirmwareCardComponent } from '../../components/firmware-card/firmware-card.component';
import { Project } from '../../models/project.model';

@Component({
    selector: 'app-light-switch',
    standalone: true,
    imports: [
        FirmwareCardComponent
    ],
    templateUrl: './light-switch.html',
    styleUrls: ['../case-study.css', './light-switch.css'],

    preserveWhitespaces: true
})
export class LightSwitchComponent implements AfterViewInit {

    @Input({ required: true }) project!: Project;

    constructor(private elementRef: ElementRef<HTMLElement>) {}

    async ngAfterViewInit(): Promise<void> {
        await renderMermaidDiagrams(this.elementRef.nativeElement);
    }
}
