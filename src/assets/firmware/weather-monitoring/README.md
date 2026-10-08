# Firmware binaries — Weather Monitoring (ESP8266)

Copy 1 file into this folder (`src/assets/firmware/weather-monitoring/`):

| File | Offset | Where to get it |
|---|---|---|
| `firmware.bin` | 0x0 | Arduino IDE → *Sketch → Export Compiled Binary*, then take `<sketch>.ino.bin` from the sketch's `build/esp8266.esp8266.<board>/` folder and rename it to `firmware.bin` |

The ESP8266 export already contains the bootloader, so no other parts are needed.
