import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { LanguageService } from '../../core/language.service';
import { findProject } from '../../data/projects.data';
import { WeatherMonitoringComponent } from '../../projects/weather-monitoring/weather-monitoring';
import { IotNetworkGatewayComponent } from '../../projects/iot-network-gateway/iot-network-gateway';
import { LightSwitchComponent } from '../../projects/light-switch/light-switch';
const TEXT = {
    back: { en: '← Back to projects', fr: '← Retour aux projets' },
    eyebrow: { en: 'ENGINEERING CASE STUDY', fr: "ÉTUDE DE CAS D'INGÉNIERIE" },
    github: { en: 'View source on GitHub ↗', fr: 'Voir le code sur GitHub ↗' },
    demo: { en: 'DEMO', fr: 'DÉMO' },
    demoTitle: { en: 'Project demonstration', fr: 'Démonstration du projet' },
    tutorial: { en: 'TUTORIAL', fr: 'TUTORIEL' },
    tutorialTitle: { en: 'All steps', fr: 'Toutes les étapes' },
    soon: { en: 'Video coming soon', fr: 'Vidéo bientôt disponible' },
    loading: { en: 'Loading case study…', fr: "Chargement de l'étude de cas…" },
    missing: { en: 'Project not found', fr: 'Projet introuvable' },
    home: { en: 'Return home', fr: "Retour à l'accueil" }
};

const VIDEO_FILE = /\.(mp4|webm)(\?.*)?$/i;

type Media =
    | { kind: 'youtube'; url: SafeResourceUrl }
    | { kind: 'file'; url: string; poster?: string };

@Component({
    selector: 'app-project-detail',
    imports: [RouterLink, WeatherMonitoringComponent, IotNetworkGatewayComponent, LightSwitchComponent],
    templateUrl: './project-detail.component.html',
    styleUrl: './project-detail.component.scss'
})
export class ProjectDetailComponent {
    protected readonly i18n = inject(LanguageService);
    protected readonly text = TEXT;
    private readonly sanitizer = inject(DomSanitizer);

    // The component instance is reused when navigating between projects, so derive from the param stream.
    private readonly slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map(params => params.get('slug'))));

    protected readonly project = computed(() => findProject(this.slug(), { detailOnly: true }));
    protected readonly demo = computed(() => this.getMedia(this.project()?.videoUrl, this.project()?.videoPoster));
    protected readonly tutorial = computed(() => this.getMedia(this.project()?.tutoUrl, this.project()?.tutoPoster));

    /** A local video file (played by <video>) or a YouTube link (embedded). */
    private getMedia(url: string | undefined, poster: string | undefined): Media | undefined {
        if (!url) return undefined;
        if (VIDEO_FILE.test(url)) return { kind: 'file', url, poster };

        const videoId = this.getYouTubeVideoId(url);
        return videoId
            ? { kind: 'youtube', url: this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${videoId}`) }
            : undefined;
    }

    private getYouTubeVideoId(url: string | undefined): string | undefined {
        if (!url) return undefined;
        const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/);
        return match?.[1];
    }
}
