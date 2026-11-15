import {
    AfterViewInit,
    Component,
    ElementRef,
    Input
} from '@angular/core';

import { renderMermaidDiagrams } from '../../shared/mermaid-render';
import { Project } from '../../models/project.model';

@Component({
    selector: 'app-nafes-retail-system',
    standalone: true,
    templateUrl: './nafes-retail-system.html',
    styleUrls: ['../case-study.css', './nafes-retail-system.css'],

    preserveWhitespaces: true
})
export class NafesRetailSystemComponent implements AfterViewInit {

    @Input({ required: true }) project!: Project;

    constructor(private elementRef: ElementRef<HTMLElement>) {}

    async ngAfterViewInit(): Promise<void> {
        await renderMermaidDiagrams(this.elementRef.nativeElement);
    }
}
