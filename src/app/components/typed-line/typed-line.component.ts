import { Component, DestroyRef, ElementRef, NgZone, afterNextRender, effect, inject, input, viewChild } from '@angular/core';

/**
 * Terminal-style line that types and deletes each phrase in turn.
 * Writes to the DOM directly, outside Angular, so the timers don't trigger change detection.
 */
@Component({
    selector: 'app-typed-line',
    template: `<span class="prompt">&gt;</span> <span #out></span><span class="caret"></span>`,
    host: { 'aria-live': 'polite' },
    styles: [`
        :host { display: block; font-family: var(--mono); font-size: 15px; color: var(--text); min-height: 1.6em }
        .prompt { color: var(--accent) }
        .caret { display: inline-block; width: 8px; height: 1.05em; margin-left: 2px; vertical-align: -2px; background: var(--accent); animation: blink 1s steps(1) infinite }
        @keyframes blink { 50% { opacity: 0 } }
        @media (prefers-reduced-motion: reduce) { .caret { animation: none } }
    `]
})
export class TypedLineComponent {
    readonly phrases = input.required<string[]>();

    private readonly out = viewChild.required<ElementRef<HTMLElement>>('out');
    private readonly zone = inject(NgZone);
    private timer = 0;
    private rendered = false;

    constructor() {
        // Restart whenever the phrases change (e.g. on a language switch).
        effect(() => {
            this.phrases();
            if (this.rendered) this.restart();
        });
        afterNextRender(() => {
            this.rendered = true;
            this.restart();
        });
        inject(DestroyRef).onDestroy(() => clearTimeout(this.timer));
    }

    private restart(): void {
        const list = this.phrases();
        const el = this.out().nativeElement;
        this.zone.runOutsideAngular(() => {
            clearTimeout(this.timer);
            if (!list.length) return;
            if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
                el.textContent = list[0];
                return;
            }
            let phrase = 0, chars = 0, deleting = false;
            el.textContent = '';
            const tick = () => {
                const word = list[phrase % list.length];
                let delay: number;
                if (!deleting) {
                    chars++;
                    delay = chars === word.length ? 1900 : 55 + Math.random() * 45;
                    if (chars === word.length) deleting = true;
                } else {
                    chars--;
                    delay = 28;
                    if (chars === 0) {
                        deleting = false;
                        phrase++;
                        delay = 350;
                    }
                }
                el.textContent = word.slice(0, chars);
                this.timer = window.setTimeout(tick, delay);
            };
            this.timer = window.setTimeout(tick, 400);
        });
    }
}
