import { Injectable, effect, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, RouterStateSnapshot, TitleStrategy } from '@angular/router';
import { L10n, Text } from './i18n';
import { LanguageService } from './language.service';

/** Route `data.title`: fixed text, or built from the route (e.g. a project's own title). */
export type RouteTitle = Text | ((route: ActivatedRouteSnapshot) => Text);

const SUFFIX = 'Mohamed Ali Lawini';

export const DEFAULT_TITLE: L10n = {
    en: 'Mohamed Ali Lawini — Embedded Software Engineer',
    fr: 'Mohamed Ali Lawini — Ingénieur Logiciel Embarqué'
};

/** Sets the tab title from route `data.title` and re-translates it when the language changes. */
@Injectable()
export class LocalizedTitleStrategy extends TitleStrategy {
    private readonly title = inject(Title);
    private readonly language = inject(LanguageService);
    private readonly current = signal<{ text: Text; isDefault: boolean }>({ text: DEFAULT_TITLE, isDefault: true });

    constructor() {
        super();
        effect(() => {
            const { text, isDefault } = this.current();
            const resolved = this.language.t(text);
            this.title.setTitle(isDefault ? resolved : `${resolved} | ${SUFFIX}`);
        });
    }

    override updateTitle(snapshot: RouterStateSnapshot): void {
        let route: ActivatedRouteSnapshot | null = snapshot.root;
        let title: RouteTitle | undefined;
        let leaf = snapshot.root;
        while (route) {
            if (route.data['title'] !== undefined) {
                title = route.data['title'];
                leaf = route;
            }
            route = route.firstChild;
        }
        const text = typeof title === 'function' ? title(leaf) : title;
        this.current.set(text === undefined ? { text: DEFAULT_TITLE, isDefault: true } : { text, isDefault: false });
    }
}
