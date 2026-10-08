export interface Project {
    slug: string;
    title: string;
    description: string;
    tags: string[];
    featured?: boolean;
    github?: string;
    tutoUrl?: string;
    videoUrl?: string;
    imageUrl?: string;
    imageLabel: string;
    /** ESP Web Tools manifest, e.g. 'assets/firmware/<slug>/manifest.json'. Enables the web installer. */
    firmware?: string;
    /** Target board shown in the installer UI. Defaults to 'ESP32'. */
    firmwareBoard?: string;
}
