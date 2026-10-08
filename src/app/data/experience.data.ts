import { L10n, L10nList } from '../core/i18n';

export interface Job {
    period: L10n;
    company: string;
    companyUrl: string;
    /** "Client: Renault", "For EDF France"… */
    client: L10n;
    title: L10n;
    bullets: L10nList;
    tags: string[];
    note?: L10n;
}

const ACTIA = { company: 'ACTIA Engineering Services', companyUrl: 'https://www.actia.com/tunisie/' };

export const EXPERIENCE: Job[] = [
    {
        ...ACTIA,
        period: { en: 'Apr 2023 — now', fr: 'Avr. 2023 — auj.' },
        client: { en: 'Client: STMicroelectronics', fr: 'Client : STMicroelectronics' },
        title: { en: 'Embedded Software Engineer — STM32 Ecosystem', fr: 'Ingénieur Logiciel Embarqué — Écosystème STM32' },
        bullets: {
            en: [
                'Design, develop, test and integrate new features in embedded software tools for the STM32 ecosystem.',
                'Lead root-cause analysis of complex defects and implement sustainable fixes.',
                'Define and implement JUnit-based testing to improve regression coverage and software quality.',
                'Contribute to architecture and design reviews; work with embedded-systems teams to align hardware constraints and tooling architecture.',
                'Support CI/CD workflows and continuous improvement of development practices.'
            ],
            fr: [
                "Conception, développement, test et intégration de nouvelles fonctionnalités dans des outils logiciels embarqués de l'écosystème STM32.",
                "Pilotage de l'analyse des causes racines de défauts complexes et mise en place de corrections durables.",
                'Définition et mise en œuvre de tests JUnit pour renforcer la couverture de non-régression et la qualité logicielle.',
                "Participation aux revues d'architecture et de conception ; collaboration avec les équipes systèmes embarqués sur les contraintes matérielles et l'architecture des outils.",
                'Support des chaînes CI/CD et amélioration continue des pratiques de développement.'
            ]
        },
        tags: ['STM32', 'ARM Cortex-M', 'Java', 'C/C++', 'Python', 'JUnit', 'CI/CD', 'Linux'],
        note: {
            en: 'This portfolio contains no proprietary code or confidential material.',
            fr: 'Ce portfolio ne contient aucun code propriétaire ni élément confidentiel.'
        }
    },
    {
        ...ACTIA,
        period: { en: 'Aug 2021 — Mar 2023', fr: 'Août 2021 — Mars 2023' },
        client: { en: 'Client: Renault', fr: 'Client : Renault' },
        title: {
            en: 'Software Engineer — Android Automotive (Development & Validation)',
            fr: 'Ingénieur Logiciel — Android Automotive (Développement & Validation)'
        },
        bullets: {
            en: [
                'Contributed to FOTA (Firmware Over-The-Air) integration for the IVI platform of the Alliance Automotive Software Platform.',
                'Implemented CAN firmware in Embedded C at the Linux kernel/driver layer (BSP).',
                'Developed C++17 vendor services with design patterns and integrated custom HALs (Android Treble).',
                'Debugged AOSP and fixed SELinux issues (ADB, Traceview, Systrace); wrote C++ unit tests with GoogleTest/GoogleMock.',
                'Validated USB and server-based software updates with the instrument cluster; analysed CAN traces and diagnostics with Vector CANoe and reported defects in Jira with full reproduction data.'
            ],
            fr: [
                "Contribution à l'intégration FOTA (mise à jour à distance) de la plateforme IVI de l'Alliance Automotive Software Platform.",
                'Implémentation du firmware CAN en C embarqué au niveau noyau/driver Linux (BSP).',
                'Développement de services vendor en C++17 avec design patterns et intégration de HAL spécifiques (Android Treble).',
                'Débogage AOSP et correction de problèmes SELinux (ADB, Traceview, Systrace) ; tests unitaires C++ avec GoogleTest/GoogleMock.',
                "Validation des mises à jour logicielles (USB et serveur) avec le combiné d'instruments ; analyse des traces CAN et diagnostics sous Vector CANoe, remontée des anomalies dans Jira avec données de reproduction."
            ]
        },
        tags: ['Embedded C', 'C++17', 'AOSP', 'Treble HAL', 'CAN', 'FOTA', 'Vector CANoe', 'GoogleTest', 'Jira']
    },
    {
        ...ACTIA,
        period: { en: 'Feb 2021 — Aug 2021', fr: 'Févr. — Août 2021' },
        client: { en: 'For EDF France', fr: 'Pour EDF France' },
        title: {
            en: 'Final-Year Project — Embedded AI for Short-Circuit Detection',
            fr: "Projet de fin d'études — IA embarquée pour la détection de courts-circuits"
        },
        bullets: {
            en: [
                'Built a 3-phase voltage circuit to generate realistic training data for high-voltage distribution-line faults.',
                'Trained an artificial neural network and deployed it on an STM32H745I-DISCO with STM32Cube.AI for real-time detection.',
                'Wrote a custom SPI driver for the EVALSTPM33 metering board because the default driver did not meet the sampling timing constraints.',
                "Displayed detection results live on the board's screen."
            ],
            fr: [
                "Réalisation d'un circuit de tension triphasé pour générer des données d'entraînement réalistes de défauts sur lignes haute tension.",
                "Entraînement d'un réseau de neurones et déploiement sur STM32H745I-DISCO avec STM32Cube.AI pour une détection en temps réel.",
                "Développement d'un driver SPI dédié pour la carte de mesure EVALSTPM33, le driver par défaut ne respectant pas les contraintes d'échantillonnage.",
                "Affichage en direct des résultats de détection sur l'écran de la carte."
            ]
        },
        tags: ['STM32H745', 'STM32Cube.AI', 'Embedded C', 'SPI', 'ANN', 'EVALSTPM33']
    }
];
