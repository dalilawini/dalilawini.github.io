import { ViewportScroller } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PcbBackgroundComponent } from './components/pcb-background/pcb-background.component';
import { LanguageService } from './core/language.service';
import { PROFILE, UI } from './data/profile.data';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, RouterLink, NavbarComponent, PcbBackgroundComponent],
    template: `
        <app-pcb-background />
        <app-navbar />
        <main><router-outlet /></main>
        <footer class="footer wrap">
            <span>© {{ year }} {{ name }}</span>
            <a routerLink="/" fragment="home">{{ i18n.t(ui.footer.top) }}</a>
        </footer>
    `,
    styles: [`
        .footer { position: relative; z-index: 1; display: flex; justify-content: space-between; gap: 16px; padding-top: 80px; padding-bottom: 40px; font-family: var(--mono); font-size: 12.5px; color: var(--dim) }
        .footer a:hover { color: var(--accent) }
        @media (max-width: 640px) { .footer { flex-direction: column; padding-top: 64px } }
    `]
})
export class AppComponent {
    protected readonly i18n = inject(LanguageService);
    protected readonly ui = UI;
    protected readonly name = PROFILE.name;
    protected readonly year = new Date().getFullYear();

    constructor() {
        // Keep anchor targets clear of the fixed navbar.
        inject(ViewportScroller).setOffset([0, 88]);
    }
}
