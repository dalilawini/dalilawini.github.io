import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import 'esp-web-tools/dist/web/install-button.js';
import { PROJECTS } from '../../data/projects.data';
import { Project } from '../../models/project.model';

@Component({
    selector: 'app-web-installer',
    imports: [RouterLink],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './web-installer.component.html',
    styleUrl: './web-installer.component.scss'
})
export class WebInstallerComponent {

    /** Projects that ship firmware, listed when no project is selected. */
    readonly installable = PROJECTS.filter(p => p.firmware);

    slug: string | null = null;
    project: Project | undefined;
    manifestUrl: string | undefined;

    get board(): string {
        return this.project?.firmwareBoard ?? 'ESP32';
    }

    constructor(route: ActivatedRoute) {
        route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
            this.slug = params.get('slug');
            this.project = this.installable.find(p => p.slug === this.slug);
            // Absolute so it resolves the same from any route; the .bin paths
            // inside the manifest are resolved relative to the manifest itself.
            this.manifestUrl = this.project?.firmware ? '/' + this.project.firmware.replace(/^\//, '') : undefined;
        });
    }
}
