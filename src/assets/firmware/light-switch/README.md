# Firmware — Light Switch (ESP8266)

`manifest.json` flashes a single `light-switch.bin` at offset 0x0 (the ESP8266 build already contains the bootloader).

The `.bin` is **not committed**. The GitHub Pages workflow (`.github/workflows/deploy.yml`) downloads it from
https://github.com/dalilawini/light-switch/releases at build time. To ship a new firmware version, publish a release
in `light-switch` and change `LIGHT_SWITCH_VERSION` in the workflow.

The browser can't load it from GitHub Releases directly (no CORS headers), which is why it's copied into the site.

To test the installer locally, download it into this folder first:

    curl -fsSL -o src/assets/firmware/light-switch/light-switch.bin https://github.com/dalilawini/light-switch/releases/download/v1.0.0/light-switch.bin
