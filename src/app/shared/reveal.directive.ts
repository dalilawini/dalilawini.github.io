import { DestroyRef, Directive, ElementRef, afterNextRender, inject } from '@angular/core';

/** Fades/slides the host in when it scrolls into view. Visible immediately with reduced motion. */
@Directive({
    selector: '[appReveal]',
    host: { class: 'reveal' }
})
export class RevealDirective {
    constructor() {
        const el = inject(ElementRef<HTMLElement>).nativeElement;
        const destroyRef = inject(DestroyRef);

        afterNextRender(() => {
            const show = () => el.classList.add('in');
            if (matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
                show();
                return;
            }
            const observer = new IntersectionObserver(entries => {
                if (entries.some(e => e.isIntersecting)) {
                    show();
                    observer.disconnect();
                }
            }, { rootMargin: '0px 0px -8% 0px', threshold: 0.05 });
            observer.observe(el);
            destroyRef.onDestroy(() => observer.disconnect());
        });
    }
}
