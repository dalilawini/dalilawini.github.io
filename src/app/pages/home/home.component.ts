import { Component, computed, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChipPortraitComponent } from '../../components/chip-portrait/chip-portrait.component';
import { ProjectCardComponent } from '../../components/project-card/project-card.component';
import { TypedLineComponent } from '../../components/typed-line/typed-line.component';
import { LanguageService } from '../../core/language.service';
import { EXPERIENCE } from '../../data/experience.data';
import {
    ABOUT, CERTIFICATIONS, CONTACT_INTRO, EDUCATION, HERO, INFO, PROFILE, STATS, UI
} from '../../data/profile.data';
import { PROJECTS } from '../../data/projects.data';
import { SKILLS } from '../../data/skills.data';
import { ProjectCategory } from '../../models/project.model';
import { RevealDirective } from '../../shared/reveal.directive';

type Filter = 'all' | ProjectCategory;

@Component({
    selector: 'app-home',
    imports: [RouterLink, ChipPortraitComponent, ProjectCardComponent, TypedLineComponent, RevealDirective],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
})
export class HomeComponent {
    protected readonly i18n = inject(LanguageService);

    protected readonly profile = PROFILE;
    protected readonly hero = HERO;
    protected readonly stats = STATS;
    protected readonly about = ABOUT;
    protected readonly info = INFO;
    protected readonly education = EDUCATION;
    protected readonly experience = EXPERIENCE;
    protected readonly skills = SKILLS;
    protected readonly certifications = CERTIFICATIONS;
    protected readonly contactIntro = CONTACT_INTRO;
    protected readonly ui = UI;

    protected readonly filters: Filter[] = ['all', 'pro', 'perso'];
    protected readonly filter = signal<Filter>('all');

    /** Projects with their fixed display number, so numbering doesn't shift when filtering. */
    protected readonly visibleProjects = computed(() => {
        const f = this.filter();
        return PROJECTS
            .map((project, i) => ({ project, number: String(i + 1).padStart(2, '0') }))
            .filter(({ project }) => f === 'all' || project.category === f);
    });

    protected readonly roles = computed(() => this.i18n.list(HERO.roles));
}
