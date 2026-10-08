import { Component, DestroyRef, NgZone, afterNextRender, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { LANGS } from '../../core/i18n';
import { LanguageService } from '../../core/language.service';
import { PROFILE, UI } from '../../data/profile.data';

@Component({
    selector: 'app-navbar',
    imports: [RouterLink],
    host: { '(document:keydown.escape)': 'open.set(false)' },
    template: `
        <header class="nav" [class.scrolled]="scrolled()" [class.menu-open]="open()">
            <div class="wrap nav-inner">
                <a class="logo" routerLink="/" [attr.aria-label]="i18n.t(ui.nav.home)" (click)="open.set(false)">
                    <span class="logo-box">ml</span><span class="logo-text">mohamed.lawini</span>
                </a>

                <nav id="nav-links" class="nav-links" [class.open]="open()" aria-label="Main">
                    @for (link of links; track link.fragment) {
                        <a routerLink="/" [fragment]="link.fragment" (click)="open.set(false)">{{ i18n.t(link.label) }}</a>
                    }
                    <a routerLink="/installer" (click)="open.set(false)">{{ i18n.t(ui.nav.installer) }}</a>
                </nav>

                <div class="nav-actions">
                    <div class="lang-switch" role="group" [attr.aria-label]="i18n.t(ui.nav.language)">
                        @for (lang of langs; track lang; let last = $last) {
                            <button type="button" [class.on]="i18n.lang() === lang" [attr.aria-pressed]="i18n.lang() === lang"
                                [attr.lang]="lang" (click)="i18n.set(lang)">{{ lang.toUpperCase() }}</button>
                            @if (!last) { <span aria-hidden="true">/</span> }
                        }
                    </div>
                    <a class="btn-cv" [href]="cv" download>{{ i18n.t(ui.cv) }}</a>
                    <button class="menu-btn" type="button" [attr.aria-label]="i18n.t(ui.nav.menu)" [attr.aria-expanded]="open()"
                        aria-controls="nav-links" (click)="open.set(!open())">
                        <span></span><span></span>
                    </button>
                </div>
            </div>
        </header>
    `,
    styles: [`
        .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; height: var(--nav-h); border-bottom: 1px solid transparent; transition: background .3s, border-color .3s }
        .nav.scrolled { background: rgba(11, 13, 14, .82); backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px); border-bottom-color: var(--line) }
        .nav.menu-open { background: var(--bg); border-bottom-color: var(--line) }
        .nav-inner { height: 100%; display: flex; align-items: center; gap: 24px }
        .logo { display: flex; align-items: center; gap: 10px; font-family: var(--mono); font-size: 14px }
        .logo-box { display: grid; place-items: center; width: 30px; height: 30px; border: 1.5px solid var(--accent); border-radius: 7px; color: var(--accent); font-weight: 500; font-size: 13px }
        .logo-text { color: var(--muted) }
        .logo:hover .logo-text { color: var(--text) }
        .nav-links { margin-left: auto; display: flex; gap: 24px; font-size: 14.5px }
        .nav-links a { color: var(--muted); padding: 6px 0; transition: color .2s }
        .nav-links a:hover { color: var(--text) }
        .nav-actions { display: flex; align-items: center; gap: 16px }
        .lang-switch { display: flex; align-items: center; gap: 6px; font-family: var(--mono); font-size: 12.5px; color: var(--dim) }
        .lang-switch button { color: var(--dim); padding: 4px 2px }
        .lang-switch button:hover { color: var(--text) }
        .lang-switch button.on { color: var(--accent); font-weight: 500 }
        .btn-cv { font-weight: 600; font-size: 13.5px; padding: 8px 14px; border-radius: 8px; background: var(--accent); color: var(--accent-ink); white-space: nowrap; transition: transform .2s, box-shadow .2s }
        .btn-cv:hover { transform: translateY(-1px); box-shadow: 0 6px 20px var(--accent-glow) }
        .menu-btn { display: none; width: 36px; height: 36px; position: relative }
        .menu-btn span { position: absolute; left: 8px; right: 8px; height: 1.5px; background: var(--text); transition: transform .25s, top .25s }
        .menu-btn span:first-child { top: 13px }
        .menu-btn span:last-child { top: 21px }
        .menu-btn[aria-expanded="true"] span:first-child { top: 17px; transform: rotate(45deg) }
        .menu-btn[aria-expanded="true"] span:last-child { top: 17px; transform: rotate(-45deg) }

        @media (max-width: 1020px) {
            .nav-links { position: fixed; top: var(--nav-h); left: 0; right: 0; flex-direction: column; gap: 0; padding: 8px 24px 18px;
                background: var(--bg); border-bottom: 1px solid var(--line); box-shadow: 0 18px 40px rgba(0, 0, 0, .45);
                transform: translateY(-8px); opacity: 0; visibility: hidden; transition: opacity .2s, transform .2s, visibility .2s }
            .nav-links.open { opacity: 1; transform: none; visibility: visible }
            .nav-links a { padding: 12px 0; font-size: 16px; border-bottom: 1px solid var(--line) }
            .nav-actions { margin-left: auto }
            .menu-btn { display: block }
        }
        @media (max-width: 640px) {
            .logo-text { display: none }
            .nav-links { padding: 8px 16px 18px }
            .nav-actions { gap: 12px }
        }
        @media print { .nav { display: none } }
    `]
})
export class NavbarComponent {
    protected readonly i18n = inject(LanguageService);
    protected readonly ui = UI;
    protected readonly langs = LANGS;
    protected readonly cv = PROFILE.cv;
    protected readonly open = signal(false);
    protected readonly scrolled = signal(false);

    protected readonly links = [
        { fragment: 'about', label: UI.nav.about },
        { fragment: 'experience', label: UI.nav.experience },
        { fragment: 'projects', label: UI.nav.projects },
        { fragment: 'skills', label: UI.nav.skills },
        { fragment: 'certifications', label: UI.nav.certifications },
        { fragment: 'contact', label: UI.nav.contact }
    ];

    constructor() {
        const zone = inject(NgZone);
        const destroyRef = inject(DestroyRef);

        inject(Router).events
            .pipe(filter(e => e instanceof NavigationEnd), takeUntilDestroyed())
            .subscribe(() => this.open.set(false));

        // Scroll listener outside Angular; the signal only changes when crossing the threshold.
        afterNextRender(() => zone.runOutsideAngular(() => {
            const onScroll = () => {
                const scrolled = window.scrollY > 12;
                if (scrolled !== this.scrolled()) zone.run(() => this.scrolled.set(scrolled));
            };
            window.addEventListener('scroll', onScroll, { passive: true });
            onScroll();
            destroyRef.onDestroy(() => window.removeEventListener('scroll', onScroll));
        }));
    }
}
