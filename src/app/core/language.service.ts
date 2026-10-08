import { DOCUMENT } from '@angular/common';
import { Injectable, effect, inject, signal } from '@angular/core';
import { L10nList, Lang, LANGS, Text } from './i18n';

const STORAGE_KEY = 'lang';

/**
 * Current UI language. Defaults to French for French-language browsers,
 * remembers the visitor's choice, and keeps <html lang> in sync.
 */
@Injectable({ providedIn: 'root' })
export class LanguageService {
    private readonly document = inject(DOCUMENT);

    readonly lang = signal<Lang>(this.initialLang());

    constructor() {
        effect(() => {
            const lang = this.lang();
            this.document.documentElement.lang = lang;
            try {
                localStorage.setItem(STORAGE_KEY, lang);
            } catch {
                // storage unavailable (private mode, blocked): the choice just isn't remembered
            }
        });
    }

    set(lang: Lang): void {
        this.lang.set(lang);
    }

    /** Resolve text for the current language. Reading it in a template tracks the language signal. */
    t(text: Text): string {
        return typeof text === 'string' ? text : text[this.lang()];
    }

    list(list: L10nList): string[] {
        return list[this.lang()];
    }

    private initialLang(): Lang {
        let stored: string | null = null;
        try {
            stored = localStorage.getItem(STORAGE_KEY);
        } catch {
            // ignore
        }
        if (stored && (LANGS as readonly string[]).includes(stored)) return stored as Lang;
        const browser = (this.document.defaultView?.navigator.language ?? 'en').toLowerCase();
        return browser.startsWith('fr') ? 'fr' : 'en';
    }
}
