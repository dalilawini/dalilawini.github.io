import { Component, Input, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LanguageService } from '../../core/language.service';
import { Project } from '../../models/project.model';

const TEXT = {
    label: { en: 'TRY IT ON YOUR BOARD', fr: 'ESSAYEZ SUR VOTRE CARTE' },
    title: { en: 'Flash this firmware from your browser', fr: 'Flashez ce firmware depuis votre navigateur' },
    body: {
        en: 'Connect an {board} over USB and install the {project} firmware in one click using Web Serial — no IDE required.',
        fr: 'Branchez un {board} en USB et installez le firmware {project} en un clic via Web Serial — sans IDE.'
    },
    open: { en: 'Open web installer →', fr: "Ouvrir l'installeur web →" }
};

/** Call-to-action linking a project to its ESP web installer. Renders nothing without firmware. */
@Component({
    selector: 'app-firmware-card',
    imports: [RouterLink],
    template: `
        @if (project.firmware) {
            <article class="firmware-card">
                <div class="chip-icon" aria-hidden="true">{{ board }}</div>
                <div class="copy">
                    <p class="label">{{ i18n.t(text.label) }}</p>
                    <h2>{{ i18n.t(text.title) }}</h2>
                    <p>{{ body() }}</p>
                </div>
                <a class="btn btn-primary install" [routerLink]="['/installer', project.slug]">{{ i18n.t(text.open) }}</a>
            </article>
        }
    `,
    styles: [`
        .firmware-card { display: grid; grid-template-columns: auto 1fr auto; gap: 26px; align-items: center; margin: 0 0 70px; padding: 30px; border: 1px solid var(--line-2); border-radius: 16px; background: radial-gradient(120% 140% at 0% 0%, rgba(62, 230, 176, .08), transparent 55%), var(--card-solid) }
        .chip-icon { display: grid; place-items: center; width: 84px; height: 74px; border: 1.5px solid var(--accent); border-radius: 8px; color: var(--accent); font: 500 .78rem var(--mono); background: repeating-linear-gradient(90deg, transparent 0 8px, var(--accent-soft) 8px 10px) }
        .label { margin: 0 0 8px; color: var(--accent); font: 500 12px var(--mono); letter-spacing: .14em }
        h2 { margin: 0 0 8px; font-size: 1.35rem; font-weight: 600; color: var(--text) }
        .copy > p:last-child { margin: 0; color: var(--muted); font-size: .92rem; line-height: 1.6 }
        .install { white-space: nowrap }
        @media (max-width: 760px) { .firmware-card { grid-template-columns: 1fr; padding: 22px 18px } .chip-icon { width: 64px; height: 56px } .install { justify-self: start; white-space: normal } }
    `]
})
export class FirmwareCardComponent {
    @Input({ required: true }) project!: Project;

    protected readonly i18n = inject(LanguageService);
    protected readonly text = TEXT;

    get board(): string {
        return this.project.firmwareBoard ?? 'ESP32';
    }

    protected body(): string {
        return this.i18n.t(TEXT.body).replace('{board}', this.board).replace('{project}', this.i18n.t(this.project.title));
    }
}
