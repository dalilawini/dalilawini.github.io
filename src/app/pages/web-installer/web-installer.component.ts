import { Component, CUSTOM_ELEMENTS_SCHEMA, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import 'esp-web-tools/dist/web/install-button.js';
import { L10n } from '../../core/i18n';
import { LanguageService } from '../../core/language.service';
import { PROJECTS } from '../../data/projects.data';

const TEXT = {
    eyebrow: { en: 'WEB INSTALLER', fr: 'INSTALLEUR WEB' },
    back: { en: '← Back to', fr: '← Retour à' },
    flash: { en: 'Flash', fr: 'Flasher' },
    lead: {
        en: "Connect an {board} over USB and install this project's firmware directly through Web Serial — no Arduino IDE or driver toolchain required.",
        fr: "Branchez un {board} en USB et installez le firmware de ce projet directement via Web Serial — sans Arduino IDE ni chaîne d'outils."
    },
    install: { en: 'Install firmware', fr: 'Installer le firmware' },
    unsupported: {
        en: "Your browser doesn't support Web Serial. Please open this page in desktop Chrome or Edge.",
        fr: 'Votre navigateur ne prend pas en charge Web Serial. Ouvrez cette page dans Chrome ou Edge sur ordinateur.'
    },
    notAllowed: {
        en: 'Flashing is only allowed on a secure origin. This page must be served over HTTPS (or from localhost).',
        fr: "Le flashage n'est autorisé que sur une origine sécurisée. Cette page doit être servie en HTTPS (ou depuis localhost)."
    },
    hintBefore: { en: "If flashing doesn't start, hold the", fr: 'Si le flashage ne démarre pas, maintenez le bouton' },
    hintAfter: { en: 'button on the {board} while clicking Install.', fr: 'du {board} enfoncé en cliquant sur Installer.' },
    steps: {
        en: [
            'Plug the {board} into this computer with a data-capable USB cable.',
            "Click “Install firmware” and pick the board's serial port.",
            "Keep the tab open until the installer reports it's done."
        ],
        fr: [
            'Branchez le {board} à cet ordinateur avec un câble USB de données.',
            'Cliquez sur « Installer le firmware » et choisissez le port série de la carte.',
            "Gardez l'onglet ouvert jusqu'à la fin de l'installation."
        ]
    },
    pickTitle: { en: 'Flash firmware from your', fr: 'Flashez un firmware depuis votre' },
    browser: { en: 'browser.', fr: 'navigateur.' },
    notFound: { en: 'No installable firmware was found for “{slug}”.', fr: 'Aucun firmware installable pour « {slug} ».' },
    pick: {
        en: 'Pick a project to install its firmware on an ESP32 or ESP8266 over Web Serial.',
        fr: 'Choisissez un projet pour installer son firmware sur un ESP32 ou un ESP8266 via Web Serial.'
    },
    openInstaller: { en: 'Open installer →', fr: "Ouvrir l'installeur →" },
    none: { en: 'No projects ship firmware yet.', fr: 'Aucun projet ne propose encore de firmware.' }
};

@Component({
    selector: 'app-web-installer',
    imports: [RouterLink],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    templateUrl: './web-installer.component.html',
    styleUrl: './web-installer.component.scss'
})
export class WebInstallerComponent {
    protected readonly i18n = inject(LanguageService);
    protected readonly text = TEXT;

    /** Projects that ship firmware, listed when no project is selected. */
    protected readonly installable = PROJECTS.filter(p => p.firmware);

    protected readonly slug = toSignal(inject(ActivatedRoute).paramMap.pipe(map(params => params.get('slug'))));
    protected readonly project = computed(() => this.installable.find(p => p.slug === this.slug()));

    // Resolve against <base href> so it works from any route and under a sub-path
    // (GitHub Pages); .bin paths inside the manifest resolve relative to the manifest itself.
    protected readonly manifestUrl = computed(() => {
        const firmware = this.project()?.firmware;
        return firmware ? new URL(firmware, document.baseURI).href : undefined;
    });

    protected readonly board = computed(() => this.project()?.firmwareBoard ?? 'ESP32');
    protected readonly bootButton = computed(() => (this.board() === 'ESP8266' ? 'FLASH' : 'BOOT'));

    /** Translate and fill {board} / {slug} placeholders. */
    protected fill(text: L10n): string {
        return this.i18n.t(text).replace('{board}', this.board()).replace('{slug}', this.slug() ?? '');
    }
}
