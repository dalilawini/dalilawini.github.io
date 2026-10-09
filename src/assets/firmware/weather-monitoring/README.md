# Firmware — Weather Monitoring (ESP8266)

`manifest.json` flashes a single `weather-app.bin` at offset 0x0 (the ESP8266 build already contains the bootloader).

The `.bin` is **not committed**. The GitHub Pages workflow (`.github/workflows/deploy.yml`) downloads it from
https://github.com/dalilawini/weather-app/releases at build time. To ship a new firmware version, publish a release
in `weather-app` and change `WEATHER_APP_VERSION` in the workflow.

The browser can't load it from GitHub Releases directly (no CORS headers), which is why it's copied into the site.

To test the installer locally, download it into this folder first:

    curl -fsSL -o src/assets/firmware/weather-monitoring/weather-app.bin https://github.com/dalilawini/weather-app/releases/download/v1.0.0/weather-app.bin
