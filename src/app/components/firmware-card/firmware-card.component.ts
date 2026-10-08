import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../models/project.model';

/** Call-to-action linking a project to its ESP web installer. Renders nothing without firmware. */
@Component({
    selector: 'app-firmware-card',
    imports: [RouterLink],
    template: `
        @if (project.firmware) {
            <article class="firmware-card">
                <div class="chip-icon" aria-hidden="true">{{ board }}</div>
                <div class="copy">
                    <p class="label">TRY IT ON YOUR BOARD</p>
                    <h2>Flash this firmware from your browser</h2>
                    <p>Connect an {{ board }} over USB and install the {{ project.title }} firmware in one click using Web Serial — no IDE required.</p>
                </div>
                <a class="install" [routerLink]="['/installer', project.slug]">Open web installer →</a>
            </article>
        }
    `,
    styles: [`
        .firmware-card { display: grid; grid-template-columns: auto 1fr auto; gap: 26px; align-items: center; margin: 0 0 70px; padding: 30px; border: 1px solid rgba(62, 207, 154, .3); border-radius: 4px; background: linear-gradient(135deg, rgba(62, 207, 154, .07), transparent 45%), #0d191c }
        .chip-icon { display: grid; place-items: center; width: 84px; height: 74px; border: 1px solid #3ecf9a; color: #3ecf9a; font: 700 .78rem ui-monospace, monospace; background: repeating-linear-gradient(90deg, transparent 0 8px, rgba(62, 207, 154, .12) 8px 10px) }
        .label { margin: 0 0 8px; color: #3ecf9a; font: 700 .72rem ui-monospace, monospace; letter-spacing: .18em }
        h2 { margin: 0 0 8px; font-size: 1.35rem; color: #e9f4f1 }
        .copy > p:last-child { margin: 0; color: #91aaa4; font-size: .9rem; line-height: 1.6 }
        .install { padding: 13px 18px; background: #3ecf9a; border: 1px solid #3ecf9a; color: #06130f; font-size: .8rem; font-weight: 700; white-space: nowrap; transition: background .2s }
        .install:hover { background: #5be0ae }
        @media (max-width: 760px) { .firmware-card { grid-template-columns: 1fr; padding: 22px } .chip-icon { width: 56px; height: 56px } .install { justify-self: start } }
    `]
})
export class FirmwareCardComponent {
    @Input({ required: true }) project!: Project;

    get board(): string {
        return this.project.firmwareBoard ?? 'ESP32';
    }
}
