import { Component } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { PROJECTS } from '../../data/projects.data';
import { Project } from '../../models/project.model';
import { WeatherMonitoringComponent } from '../../projects/weather-monitoring/weather-monitoring';

@Component({
    selector: 'app-project-detail',
    imports: [RouterLink, WeatherMonitoringComponent],
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {

    project: Project | undefined;
    videoEmbedUrl: SafeResourceUrl | undefined;
    tutoEmbedUrl: SafeResourceUrl | undefined;

    constructor(
        private route: ActivatedRoute,
        private sanitizer: DomSanitizer,
    ) {
        // Subscribe (rather than reading the snapshot once) so that navigating
        // from one project straight to another re-runs this logic, since
        // Angular reuses the ProjectDetailComponent instance for routes that
        // only differ by the :slug parameter.
        this.route.paramMap.pipe(takeUntilDestroyed()).subscribe(params => {
            this.project = PROJECTS.find(p => p.slug === params.get('slug'));
            this.videoEmbedUrl = this.getEmbedUrl(this.project?.videoUrl);
            this.tutoEmbedUrl = this.getEmbedUrl(this.project?.tutoUrl);
        });
    }

    private getEmbedUrl(url: string | undefined): SafeResourceUrl | undefined {
        const videoId = this.getYouTubeVideoId(url);
        return videoId
            ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${videoId}`)
            : undefined;
    }

    private getYouTubeVideoId(url: string | undefined): string | undefined {
        if (!url) return undefined;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
        return match?.[1];
    }
}
