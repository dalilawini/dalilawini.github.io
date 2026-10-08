import { L10n, Text } from '../core/i18n';
import { PROJECTS } from './projects.data';

export const PROFILE = {
    name: 'Mohamed Ali Lawini',
    email: 'medalilawini@gmail.com',
    linkedin: 'https://www.linkedin.com/in/dalilawini/',
    github: 'https://github.com/dalilawini',
    cv: 'assets/documents/Mohamed-Ali-Lawini-CV.pdf',
    photo: 'assets/images/photo.jpg',
    location: { en: 'Tunis, Tunisia', fr: 'Tunis, Tunisie' } as L10n
};

export const HERO = {
    status: { en: 'Open to embedded roles in France · ready to relocate', fr: 'Disponible pour un poste en France · mobilité géographique' } as L10n,
    roles: {
        en: ['Embedded Software Engineer', 'STM32 / ARM Cortex-M', 'Embedded Linux · AOSP · CAN', 'Open to relocation — France'],
        fr: ['Ingénieur logiciel embarqué', 'STM32 / ARM Cortex-M', 'Linux embarqué · AOSP · CAN', 'Mobilité — France']
    },
    lead: {
        en: 'Embedded software engineer with 5 years at ACTIA Engineering Services. I build embedded software tooling for the STM32 ecosystem, and before that I developed and validated Android Automotive software for Renault — from CAN drivers in the Linux kernel to C++17 vendor services.',
        fr: "Ingénieur logiciel embarqué, 5 ans d'expérience chez ACTIA Engineering Services. Je développe des outils logiciels embarqués pour l'écosystème STM32 ; auparavant, j'ai développé et validé du logiciel Android Automotive pour Renault — des drivers CAN dans le noyau Linux jusqu'aux services vendor en C++17."
    } as L10n,
    chipLabel: 'MAL-2021 · ACTIA · TUN'
};

export interface Stat {
    value: string;
    suffix?: string;
    label: L10n;
}

export const STATS: Stat[] = [
    { value: '5', suffix: '+', label: { en: 'years in industry', fr: "ans d'expérience" } },
    { value: '3', label: { en: 'industrial clients', fr: 'clients industriels' } },
    { value: String(PROJECTS.length), label: { en: 'projects built', fr: 'projets réalisés' } },
    { value: 'CTFL', label: { en: 'ISTQB® certified tester', fr: 'testeur certifié ISTQB®' } }
];

export const ABOUT: L10n[] = [
    {
        en: 'I trained as an electronics engineer specialised in embedded systems at the Faculty of Sciences of Tunis. I joined ACTIA Engineering Services in 2021 for my final-year project — an embedded AI system for EDF that detects short-circuits on high-voltage lines — and stayed on as a full-time engineer.',
        fr: "Ingénieur en électronique spécialisé en systèmes embarqués, diplômé de la Faculté des Sciences de Tunis. J'ai rejoint ACTIA Engineering Services en 2021 pour mon projet de fin d'études — un système d'IA embarquée pour EDF qui détecte les courts-circuits sur les lignes haute tension — puis j'y suis resté en tant qu'ingénieur."
    },
    {
        en: "On the Renault project I worked on both sides of the V-cycle: development (FOTA, CAN firmware at the kernel/driver layer, C++17 vendor services and Treble HALs) and validation (software-update test campaigns, CAN trace analysis with Vector CANoe). Since 2023 I've been building embedded software tooling for the STM32 ecosystem for STMicroelectronics.",
        fr: "Sur le projet Renault, j'ai travaillé des deux côtés du cycle en V : le développement (FOTA, firmware CAN au niveau noyau/driver, services vendor C++17 et HAL Treble) et la validation (campagnes de test des mises à jour logicielles, analyse de traces CAN avec Vector CANoe). Depuis 2023, je développe des outils logiciels embarqués pour l'écosystème STM32, pour STMicroelectronics."
    },
    {
        en: "Outside work I build my own embedded projects: ESP32/ESP8266 sensor networks, LVGL touch interfaces, Bluetooth experiments, and PCBs I design in Altium and mill on a CNC. I'm now looking for an embedded software role in France and I'm ready to relocate.",
        fr: "En dehors du travail, je mène mes propres projets embarqués : réseaux de capteurs ESP32/ESP8266, interfaces tactiles LVGL, expérimentations Bluetooth et PCB conçus sous Altium puis usinés en CNC. Je recherche aujourd'hui un poste d'ingénieur logiciel embarqué en France et suis prêt à m'y installer."
    }
];

export interface InfoRow {
    label: L10n;
    value: Text;
    href?: string;
}

export const INFO: InfoRow[] = [
    { label: { en: 'Based in', fr: 'Basé à' }, value: PROFILE.location },
    { label: { en: 'Currently', fr: 'Actuellement' }, value: 'ACTIA Engineering Services', href: 'https://www.actia.com/tunisie/' },
    { label: { en: 'Degree', fr: 'Diplôme' }, value: { en: 'Engineering, Embedded Systems', fr: 'Ingénieur, systèmes embarqués' } },
    { label: { en: 'Focus', fr: 'Domaine' }, value: 'STM32 · Embedded Linux · Automotive' },
    { label: { en: 'Looking for', fr: 'Recherche' }, value: { en: 'Embedded software · France', fr: 'Logiciel embarqué · France' } },
    { label: { en: 'Languages', fr: 'Langues' }, value: { en: 'French (fluent), English, Arabic', fr: 'Français (courant), anglais, arabe' } },
    { label: { en: 'Email', fr: 'Email' }, value: PROFILE.email, href: `mailto:${PROFILE.email}` }
];

export interface Education {
    period: string;
    degree: L10n;
    school: L10n;
    url?: string;
}

export const EDUCATION: Education[] = [
    {
        period: '2019 — 2021',
        degree: { en: 'Engineering Degree, Embedded Systems & Electronics', fr: "Diplôme d'ingénieur, systèmes embarqués & électronique" },
        school: { en: 'Faculty of Sciences of Tunis — University of Tunis El Manar', fr: 'Faculté des Sciences de Tunis — Université de Tunis El Manar' },
        url: 'https://fst.rnu.tn/'
    },
    {
        period: '2018 — 2020',
        degree: { en: "National Master's, Electrical Engineering & Automation", fr: 'Master national, génie électrique & automatique' },
        school: { en: 'Faculty of Sciences of Tunis', fr: 'Faculté des Sciences de Tunis' }
    },
    {
        period: '2015 — 2018',
        degree: { en: "Bachelor's (Fundamental Science), Electrical Engineering & Automation", fr: 'Licence fondamentale, génie électrique & automatique' },
        school: { en: 'Faculty of Sciences of Tunis', fr: 'Faculté des Sciences de Tunis' }
    }
];

export interface Certification {
    title: Text;
    sub: L10n;
    date: Text;
}

export const CERTIFICATIONS: Certification[] = [
    {
        title: 'ISTQB® Certified Tester Foundation Level (CTFL) v4.0',
        sub: { en: 'GASQ Service GmbH · Credential ID 26-128428', fr: 'GASQ Service GmbH · N° de certificat 26-128428' },
        date: { en: 'Jan 2026', fr: 'Janv. 2026' }
    },
    {
        title: { en: 'MicroDesign Club (FST) — active member', fr: 'Club MicroDesign (FST) — membre actif' },
        sub: { en: 'Faculty of Sciences of Tunis', fr: 'Faculté des Sciences de Tunis' },
        date: '2019 — 2021'
    }
];

export const CONTACT_INTRO: L10n = {
    en: "Hiring for embedded software, STM32, embedded Linux or automotive in France? I'd be glad to talk.",
    fr: 'Vous recrutez en logiciel embarqué, STM32, Linux embarqué ou automobile en France ? Je serai ravi d’échanger.'
};

/** Interface strings shared across pages. */
export const UI = {
    nav: {
        about: { en: 'About', fr: 'À propos' },
        experience: { en: 'Experience', fr: 'Expérience' },
        projects: { en: 'Projects', fr: 'Projets' },
        skills: { en: 'Skills', fr: 'Compétences' },
        certifications: { en: 'Certifications', fr: 'Certifications' },
        contact: { en: 'Contact', fr: 'Contact' },
        installer: { en: 'Installer', fr: 'Installeur' },
        menu: { en: 'Menu', fr: 'Menu' },
        language: { en: 'Language', fr: 'Langue' },
        home: { en: 'Home', fr: 'Accueil' }
    },
    hero: {
        work: { en: 'See my work', fr: 'Voir mes projets' },
        contact: { en: 'Contact me', fr: 'Me contacter' }
    },
    sections: {
        about: { en: 'About', fr: 'À propos' },
        experience: { en: 'Experience', fr: 'Expérience' },
        projects: { en: 'Projects', fr: 'Projets' },
        skills: { en: 'Skills', fr: 'Compétences' },
        certifications: { en: 'Certifications & activities', fr: 'Certifications & activités' },
        contact: { en: 'Contact', fr: 'Contact' }
    },
    filters: {
        all: { en: 'all', fr: 'tous' },
        pro: { en: 'professional', fr: 'professionnels' },
        perso: { en: 'personal', fr: 'personnels' },
        label: { en: 'Filter projects', fr: 'Filtrer les projets' }
    },
    project: {
        caseStudy: { en: 'case study →', fr: 'étude de cas →' },
        github: { en: 'github →', fr: 'github →' }
    },
    cv: { en: 'CV ↓', fr: 'CV ↓' },
    footer: {
        top: { en: 'back to top ↑', fr: 'haut de page ↑' }
    }
} satisfies Record<string, Record<string, L10n> | L10n>;
