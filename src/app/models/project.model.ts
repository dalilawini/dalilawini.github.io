import { L10n, Text } from '../core/i18n';

export type ProjectCategory = 'pro' | 'perso';

export interface Project {
    slug: string;
    category: ProjectCategory;
    /** Small mono line above the title, e.g. "ACTIA · Renault · 2021 — 2023". */
    meta: Text;
    title: L10n;
    description: L10n;
    tags: string[];
    /** False for professional work that has no public case-study page. */
    hasDetail: boolean;
    featured?: boolean;
    github?: string;
    tutoUrl?: string;
    videoUrl?: string;
    imageUrl?: string;
    /** ESP Web Tools manifest, e.g. 'assets/firmware/<slug>/manifest.json'. Enables the web installer. */
    firmware?: string;
    /** Target board shown in the installer UI. Defaults to 'ESP32'. */
    firmwareBoard?: string;
}
