# Project videos

Local alternative to YouTube for a project's `videoUrl` / `tutoUrl` (see `src/app/models/project.model.ts`).
A `.mp4` or `.webm` path plays in a `<video>` player; anything else is treated as a YouTube link.

    videoUrl: 'assets/videos/weather-monitoring/demo.mp4',
    videoPoster: 'assets/videos/weather-monitoring/demo.jpg',

The demo plays muted and loops, so keep it a short silent clip (under ~1 min, ~15 MB).
Long tutorials with sound are better left on YouTube.

Compress before committing (720p, H.264, no audio, fast start for streaming):

    ffmpeg -i input.mov -vf "scale=-2:720" -c:v libx264 -crf 26 -preset slow -an -movflags +faststart demo.mp4
    ffmpeg -i demo.mp4 -frames:v 1 -q:v 3 demo.jpg

GitHub rejects files over 100 MB and every committed version stays in the repo history.
For larger files, attach them to a GitHub release and download them in the deploy workflow,
like the firmware `.bin` files.
