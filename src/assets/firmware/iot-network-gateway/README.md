# Firmware — IoT Network Gateway (ESP32)

`manifest.json` flashes a single `iot-network-gateway.bin` at offset 0x0. It is the **merged** image produced by the
ESP32 Arduino core (bootloader + partition table + boot_app0 + app, Huge APP partition scheme), so one part is enough.

The `.bin` is **not committed**. The GitHub Pages workflow (`.github/workflows/deploy.yml`) downloads it from
https://github.com/dalilawini/iot-network-gateway/releases at build time. To ship a new firmware version, publish a
release in `iot-network-gateway` and change `IOT_NETWORK_GATEWAY_VERSION` in the workflow.

The browser can't load it from GitHub Releases directly (no CORS headers), which is why it's copied into the site.

To test the installer locally, download it into this folder first:

    curl -fsSL -o src/assets/firmware/iot-network-gateway/iot-network-gateway.bin https://github.com/dalilawini/iot-network-gateway/releases/download/v1.0.0/iot-network-gateway.bin
