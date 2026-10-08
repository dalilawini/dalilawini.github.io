import { Component, input, signal } from '@angular/core';

/** Portrait framed as an IC package; falls back to a monogram when the photo is missing. */
@Component({
    selector: 'app-chip-portrait',
    template: `
        <div class="chip">
            <div class="pins top"></div><div class="pins bottom"></div>
            <div class="pins left"></div><div class="pins right"></div>
            <div class="chip-body">
                <span class="pin1"></span>
                <div class="die">
                    @if (!photoFailed()) {
                        <img [src]="photo()" [alt]="name()" width="480" height="480" (error)="photoFailed.set(true)">
                    } @else {
                        <div class="monogram" aria-hidden="true">
                            <span>{{ monogram() }}</span>
                            <small>ARM · CORTEX-M</small>
                        </div>
                    }
                </div>
            </div>
        </div>
        <p class="chip-label">{{ label() }}</p>
    `,
    styles: [`
        :host { display: flex; flex-direction: column; align-items: center; gap: 14px }
        .chip { --pin: #858b8e; position: relative; width: min(340px, 78vw); aspect-ratio: 1 }
        .pins { position: absolute; transition: filter .4s }
        .pins.top, .pins.bottom { left: 40px; right: 40px; height: 22px; background: repeating-linear-gradient(90deg, var(--pin) 0 7px, transparent 7px 17px) }
        .pins.left, .pins.right { top: 40px; bottom: 40px; width: 22px; background: repeating-linear-gradient(180deg, var(--pin) 0 7px, transparent 7px 17px) }
        .pins.top { top: 0 } .pins.bottom { bottom: 0 } .pins.left { left: 0 } .pins.right { right: 0 }
        .chip:hover .pins { --pin: var(--accent); filter: drop-shadow(0 0 4px var(--accent)) }
        .chip-body { position: absolute; inset: 20px; padding: 14px; border-radius: 12px; background: linear-gradient(145deg, #1d2225, #121618); border: 1px solid var(--line-2); box-shadow: 0 30px 60px rgba(0,0,0,.55), inset 0 1px 0 rgba(255,255,255,.04) }
        .pin1 { position: absolute; top: 10px; left: 10px; width: 9px; height: 9px; border-radius: 50%; background: #070909; box-shadow: inset 0 1px 2px rgba(255,255,255,.08); z-index: 2 }
        .die { position: relative; width: 100%; height: 100%; border-radius: 7px; overflow: hidden; background: #0d1012; border: 1px solid #262d31 }
        .die img { display: block; width: 100%; height: 100%; object-fit: cover }
        .monogram { position: absolute; inset: 0; display: grid; place-content: center; text-align: center; gap: 8px;
            background: linear-gradient(var(--accent-soft) 1px, transparent 1px) 0 0 / 22px 22px, linear-gradient(90deg, var(--accent-soft) 1px, transparent 1px) 0 0 / 22px 22px, radial-gradient(circle at 50% 40%, #182024, #0d1012 70%) }
        .monogram span { font-family: var(--display); font-weight: 700; font-size: clamp(3rem, 8vw, 4.6rem); letter-spacing: .04em; color: var(--text) }
        .monogram small { font-family: var(--mono); font-size: 11px; color: var(--accent); letter-spacing: .18em }
        .chip-label { margin: 0; font-family: var(--mono); font-size: 11.5px; letter-spacing: .14em; color: var(--dim) }
        @media (max-width: 960px) { :host { align-items: flex-start } .chip { width: 220px } }
    `]
})
export class ChipPortraitComponent {
    readonly photo = input.required<string>();
    readonly name = input.required<string>();
    readonly monogram = input('MAL');
    readonly label = input('');
    protected readonly photoFailed = signal(false);
}
