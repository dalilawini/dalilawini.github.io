import { L10n, Text } from '../core/i18n';

export interface SkillGroup {
    label: L10n;
    items: Text[];
}

export const SKILLS: SkillGroup[] = [
    {
        label: { en: 'programming', fr: 'programmation' },
        items: ['C', 'Embedded C', 'C++ / C++17', 'Java', 'JavaFX', 'Python', 'TypeScript']
    },
    {
        label: { en: 'mcus & boards', fr: 'mcu & cartes' },
        items: ['STM32', 'ARM Cortex-M', 'STM32H745', 'ESP32', 'ESP8266', 'nRF52832', 'Arduino', 'FPGA']
    },
    {
        label: { en: 'embedded linux & android', fr: 'linux embarqué & android' },
        items: ['Linux', 'Linux kernel / drivers', 'BSP', 'Android AOSP', 'Treble HAL', 'SELinux', 'FOTA']
    },
    {
        label: { en: 'protocols', fr: 'protocoles' },
        items: ['CAN', 'SPI', 'I2C', 'UART', 'ESP-NOW', 'Bluetooth / BLE', 'Wi-Fi', 'RF', 'nRF24']
    },
    {
        label: { en: 'testing & quality', fr: 'tests & qualité' },
        items: [
            'GoogleTest / GoogleMock', 'JUnit', 'ISTQB CTFL',
            { en: 'Testing', fr: 'Tests' },
            { en: 'Regression', fr: 'Non-régression' },
            { en: 'Debugging', fr: 'Débogage' },
            { en: 'Root-cause analysis', fr: 'Analyse de causes racines' },
            { en: 'Static analysis', fr: 'Analyse statique' }
        ]
    },
    {
        label: { en: 'architecture', fr: 'architecture' },
        items: [
            { en: 'Software architecture', fr: 'Architecture logicielle' },
            { en: 'Embedded architecture', fr: 'Architecture embarquée' },
            { en: 'State machines', fr: 'Machines à états' },
            { en: 'Event-driven architecture', fr: 'Architecture événementielle' },
            { en: 'Code generation', fr: 'Génération de code' }
        ]
    },
    {
        label: { en: 'tools & devops', fr: 'outils & devops' },
        items: ['STM32CubeIDE', 'STM32CubeMX', 'STM32Cube.AI', 'Vector CANoe', 'Git', 'GitHub', 'GitHub Actions', 'GitLab CI', 'CI/CD', 'Docker', 'SonarQube', 'Jira']
    },
    {
        label: { en: 'gui', fr: 'ihm' },
        items: ['LVGL', 'EEZ Studio', 'JavaFX', 'Angular']
    },
    {
        label: { en: 'hardware & pcb', fr: 'matériel & pcb' },
        items: [
            'Altium Designer',
            { en: 'Schematic design', fr: 'Conception de schémas' },
            { en: 'PCB design', fr: 'Conception de PCB' },
            { en: 'PCB manufacturing', fr: 'Fabrication de PCB' },
            'Proteus ISIS', 'FlatCAM', 'CNC 3018 Pro',
            { en: '3D printing', fr: 'Impression 3D' },
            { en: 'Hardware debugging', fr: 'Débogage matériel' },
            'MATLAB / Simulink'
        ]
    }
];
