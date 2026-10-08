import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { map } from 'rxjs';
import { LanguageService } from '../../core/language.service';
import { findProject } from '../../data/projects.data';
import { WeatherMonitoringComponent } from '../../projects/weather-monitoring/weather-monitoring';

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

@Component({
    selector: 'app-project-detail',
    imports: [RouterLink, WeatherMonitoringComponent],
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
    protected readonly videoEmbedUrl = computed(() => this.getEmbedUrl(this.project()?.videoUrl));
    protected readonly tutoEmbedUrl = computed(() => this.getEmbedUrl(this.project()?.tutoUrl));

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
