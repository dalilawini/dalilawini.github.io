export type Lang = 'en' | 'fr';

export const LANGS: readonly Lang[] = ['en', 'fr'];

/** A piece of text in every supported language. */
export interface L10n {
    en: string;
    fr: string;
}

/** Text that is either language-neutral (tech names, proper nouns) or translated. */
export type Text = string | L10n;

/** A list whose items differ per language (e.g. bullet points). */
export interface L10nList {
    en: string[];
    fr: string[];
}
