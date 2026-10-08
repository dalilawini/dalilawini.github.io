import { Project } from '../models/project.model';

export const PROJECTS: Project[] = [
    {
        slug: 'stm32-ecosystem-tooling',
        category: 'pro',
        meta: 'ACTIA · STMicroelectronics · 2023 —',
        title: { en: 'STM32 Ecosystem Tooling', fr: "Outils de l'écosystème STM32" },
        description: {
            en: 'Feature development, integration and maintenance of embedded software tools used across the STM32 ecosystem, with JUnit regression suites and CI/CD support.',
            fr: "Développement de fonctionnalités, intégration et maintenance d'outils logiciels embarqués de l'écosystème STM32, avec suites de non-régression JUnit et support CI/CD."
        },
        tags: ['Java', 'C/C++', 'Python', 'JUnit', 'CI/CD'],
        hasDetail: false
    },
    {
        slug: 'android-automotive-ivi',
        category: 'pro',
        meta: 'ACTIA · Renault · 2021 — 2023',
        title: { en: 'Android Automotive IVI — FOTA & CAN', fr: 'IVI Android Automotive — FOTA & CAN' },
        description: {
            en: 'Over-the-air update integration for an in-vehicle infotainment platform, CAN firmware in the Linux kernel, C++17 vendor services behind Treble HALs, and validation of every update path.',
            fr: "Intégration des mises à jour à distance d'une plateforme d'infodivertissement, firmware CAN dans le noyau Linux, services vendor C++17 derrière des HAL Treble et validation de chaque chemin de mise à jour."
        },
        tags: ['AOSP', 'C++17', 'Embedded C', 'CAN', 'CANoe'],
        hasDetail: false
    },
    {
        slug: 'edf-short-circuit-detection',
        category: 'pro',
        meta: { en: 'ACTIA · EDF · 2021 · Final-year project', fr: 'ACTIA · EDF · 2021 · PFE' },
        title: { en: 'High-Voltage Short-Circuit Detection', fr: 'Détection de courts-circuits haute tension' },
        description: {
            en: 'A neural network running on an STM32H745 classifies faults on 3-phase distribution lines in real time, fed by a custom SPI driver for the STPM33 metering IC.',
            fr: 'Un réseau de neurones sur STM32H745 classe en temps réel les défauts sur des lignes triphasées, alimenté par un driver SPI dédié pour le circuit de mesure STPM33.'
        },
        tags: ['STM32H745', 'STM32Cube.AI', 'SPI', 'C'],
        hasDetail: false
    },
    {
        slug: 'weather-monitoring',
        category: 'perso',
        meta: { en: 'Personal · IoT', fr: 'Personnel · IoT' },
        title: { en: 'Distributed ESP-NOW Weather Monitoring System', fr: 'Système distribué de surveillance météo ESP-NOW' },
        description: {
            en: 'A distributed embedded IoT system using ESP8266 sensor nodes and an ESP32 gateway to collect and transmit environmental data over ESP-NOW.',
            fr: 'Un système IoT embarqué distribué : des nœuds capteurs ESP8266 et une passerelle ESP32 collectent et transmettent des données environnementales en ESP-NOW.'
        },
        tags: ['ESP8266', 'ESP32', 'ESP-NOW', 'C++', 'Arduino', 'DHT', 'OLED', 'LVGL'],
        hasDetail: true,
        featured: true,
        github: 'https://github.com/dalilawini/weather-app',
        videoUrl: 'https://www.youtube.com/watch?v=bv47wcvvn9s',
        tutoUrl: 'https://www.youtube.com/watch?v=IgHPfrBBY14',
        imageUrl: 'assets/images/logo.webp',
        firmware: 'assets/firmware/weather-monitoring/manifest.json',
        firmwareBoard: 'ESP8266'
    },
    {
        slug: 'esp32-lvgl-gateway',
        category: 'perso',
        meta: { en: 'Personal · IoT', fr: 'Personnel · IoT' },
        title: { en: 'ESP32 LVGL Gateway', fr: 'Passerelle ESP32 LVGL' },
        description: {
            en: 'An ESP32 gateway combining ESP-NOW sensor data with a touchscreen graphical interface.',
            fr: 'Une passerelle ESP32 qui associe les données de capteurs ESP-NOW à une interface graphique tactile.'
        },
        tags: ['ESP32', 'LVGL', 'Touchscreen', 'ESP-NOW', 'Embedded GUI'],
        hasDetail: true,
        github: 'https://github.com/dalilawini/iot-network-gateway'
    },
    {
        slug: 'custom-pcb',
        category: 'perso',
        meta: { en: 'Personal · Hardware', fr: 'Personnel · Matériel' },
        title: { en: 'Custom Embedded PCB Design & Manufacturing', fr: 'Conception & fabrication de PCB embarqués' },
        description: {
            en: 'Designed and manufactured custom PCBs for embedded projects, covering the complete workflow from schematic and PCB layout to CNC fabrication, assembly and testing.',
            fr: "Conception et fabrication de PCB sur mesure pour des projets embarqués, couvrant tout le flux : schéma et routage, usinage CNC, assemblage et tests."
        },
        tags: ['Altium Designer', 'PCB Design', 'CNC 3018 Pro', 'FlatCAM', '3D Printing'],
        hasDetail: true,
        imageUrl: 'assets/images/pcb-3d.webp'
    },
    {
        slug: 'javafx-gui-generator',
        category: 'perso',
        meta: { en: 'Personal · Tooling', fr: 'Personnel · Outillage' },
        title: { en: 'JavaFX Embedded GUI Generator', fr: "Générateur d'IHM embarquée JavaFX" },
        description: {
            en: 'A desktop tool inspired by embedded GUI design tools, focused on creating display interfaces and generating embedded-oriented UI output.',
            fr: "Un outil de bureau inspiré des concepteurs d'IHM embarquées, pour créer des interfaces d'affichage et générer une sortie adaptée à l'embarqué."
        },
        tags: ['Java', 'JavaFX', 'GUI Generation', 'OLED', 'Code Generation'],
        hasDetail: true
    },
    {
        slug: 'bluetooth-embedded',
        category: 'perso',
        meta: { en: 'Personal · Wireless', fr: 'Personnel · Sans fil' },
        title: { en: 'Bluetooth & RF Embedded Projects', fr: 'Projets embarqués Bluetooth & RF' },
        description: {
            en: 'A collection of experiments and prototypes around ESP32 Bluetooth, Bluetooth HID, nRF52832, HM-10 / CC2541 and RF communication.',
            fr: "Un ensemble d'expérimentations et de prototypes autour du Bluetooth de l'ESP32, du Bluetooth HID, du nRF52832, des modules HM-10 / CC2541 et de la communication RF."
        },
        tags: ['ESP32 Bluetooth', 'Bluetooth HID', 'nRF52832', 'HM-10', 'RF'],
        hasDetail: true
    }
];

export const findProject = (slug: string | null | undefined, opts: { detailOnly?: boolean } = {}): Project | undefined =>
    PROJECTS.find(p => p.slug === slug && (!opts.detailOnly || p.hasDetail));
