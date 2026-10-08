import { Component, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { UI } from '../../data/profile.data';
import { Project } from '../../models/project.model';

@Component({
    selector: 'app-project-card',
    imports: [RouterLink],
    template: `
        @let p = project();
        <article class="project" [class.linked]="p.hasDetail">
            @if (p.imageUrl) {
                <div class="thumb"><img [src]="p.imageUrl" alt="" loading="lazy"></div>
            }
            <div class="head">
                <p class="p-meta">{{ i18n.t(p.meta) }}</p>
                <span class="p-num" aria-hidden="true">{{ number() }}</span>
            </div>
            <h3>
                @if (p.hasDetail) {
                    <a class="card-link" [routerLink]="['/projects', p.slug]">{{ i18n.t(p.title) }}</a>
                } @else {
                    {{ i18n.t(p.title) }}
                }
            </h3>
            <p class="desc">{{ i18n.t(p.description) }}</p>
            <div class="tags">
                @for (tag of p.tags; track tag) {
                    <span>{{ tag }}</span>
                }
            </div>
            @if (p.hasDetail || p.github) {
                <div class="links">
                    @if (p.hasDetail) {
                        <span class="p-link" aria-hidden="true">{{ i18n.t(ui.project.caseStudy) }}</span>
                    }
                    @if (p.github) {
                        <a class="p-link gh" [href]="p.github" target="_blank" rel="noopener">{{ i18n.t(ui.project.github) }}</a>
                    }
                </div>
            }
        </article>
    `,
    styles: [`
        :host { display: block }
        .project { position: relative; height: 100%; display: flex; flex-direction: column; gap: 10px; padding: 22px; border: 1px solid var(--line-2); border-radius: var(--radius); background: var(--card); transition: transform .25s, border-color .25s, box-shadow .25s }
        .project:hover { border-color: var(--line-3); box-shadow: 0 16px 36px rgba(0,0,0,.35) }
        .project.linked:hover { transform: translateY(-4px); border-color: var(--accent) }
        .project:has(.card-link:focus-visible) { outline: 2px solid var(--accent); outline-offset: 3px }
        .thumb { margin: -22px -22px 6px; aspect-ratio: 16 / 8; overflow: hidden; border-radius: var(--radius) var(--radius) 0 0; border-bottom: 1px solid var(--line-2); background: #0d1012 }
        .thumb img { display: block; width: 100%; height: 100%; object-fit: cover }
        .head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px }
        .p-num { flex-shrink: 0; margin-top: -4px; font-family: var(--mono); font-size: 34px; font-weight: 500; line-height: 1; color: transparent; -webkit-text-stroke: 1px #2f383c }
        .p-meta { margin: 0; font-family: var(--mono); font-size: 12px; color: var(--accent) }
        h3 { margin: 0; font-size: 19px; font-weight: 600; line-height: 1.3 }
        .card-link { outline: none }
        .card-link::after { content: ''; position: absolute; inset: 0; z-index: 1; border-radius: inherit }
        .desc { margin: 0; color: var(--muted); font-size: 14.5px; line-height: 1.65 }
        .tags { margin-top: auto; padding-top: 8px }
        .links { display: flex; flex-wrap: wrap; gap: 18px }
        .p-link { font-family: var(--mono); font-size: 13px; color: var(--accent) }
        .gh { position: relative; z-index: 2 }
        .gh:hover { text-decoration: underline }
        @media (max-width: 640px) { .project { padding: 20px 18px } .thumb { margin: -20px -18px 6px } }
        @media (prefers-reduced-motion: reduce) { .project.linked:hover { transform: none } }
    `]
})
export class ProjectCardComponent {
    readonly project = input.required<Project>();
    /** Display index, e.g. "04". */
    readonly number = input('');
    protected readonly i18n = inject(LanguageService);
    protected readonly ui = UI;
}
