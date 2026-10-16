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
    /** Shows an "In progress" badge on the card, for projects whose case study isn't written yet. */
    inProgress?: boolean;
    featured?: boolean;
    github?: string;
    /** YouTube link, or a local video such as 'assets/videos/<slug>/tutorial.mp4'. */
    tutoUrl?: string;
    /** YouTube link, or a local video. A local demo plays muted and loops, like a GIF. */
    videoUrl?: string;
    /** Image shown before a local demo video starts, e.g. its first frame. */
    videoPoster?: string;
    /** Image shown before a local tutorial video starts. */
    tutoPoster?: string;
    imageUrl?: string;
    /** ESP Web Tools manifest, e.g. 'assets/firmware/<slug>/manifest.json'. Enables the web installer. */
    firmware?: string;
    /** Target board shown in the installer UI. Defaults to 'ESP32'. */
    firmwareBoard?: string;
}
