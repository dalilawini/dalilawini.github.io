import { Component, DestroyRef, ElementRef, NgZone, afterNextRender, inject, viewChild } from '@angular/core';

type Point = [number, number];

interface Trace {
    pts: Point[];
    len: number;
}

interface Pulse {
    tr: Trace;
    d: number;
    speed: number;
    tail: number;
}

const GRID = 34;
const DIRS: Point[] = [[1, 0], [0, 1], [-1, 0], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]];
// circular (clockwise) order of DIRS, so a bend is always ±45°
const RING = [0, 4, 1, 6, 2, 7, 3, 5];

const rand = (n: number) => Math.floor(Math.random() * n);

/**
 * Fixed, decorative PCB-trace background with light pulses travelling along
 * the traces. Runs outside Angular, pauses while the tab is hidden, and only
 * draws the static traces when the visitor prefers reduced motion.
 */
@Component({
    selector: 'app-pcb-background',
    template: '<canvas #canvas aria-hidden="true"></canvas>',
    styles: [':host, canvas { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none } @media print { :host { display: none } }']
})
export class PcbBackgroundComponent {
    private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

    constructor() {
        const zone = inject(NgZone);
        const destroyRef = inject(DestroyRef);
        afterNextRender(() => zone.runOutsideAngular(() => destroyRef.onDestroy(this.run(this.canvasRef().nativeElement))));
    }

    /** Starts the animation and returns its teardown. */
    private run(canvas: HTMLCanvasElement): () => void {
        const ctx = canvas.getContext('2d');
        if (!ctx) return () => undefined;

        const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
        const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#3ee6b0';
        let traces: Trace[] = [];
        let pulses: Pulse[] = [];
        let W = 0, H = 0, raf = 0, last = 0, resizeTimer = 0;

        const build = () => {
            const dpr = Math.min(window.devicePixelRatio || 1, 2);
            W = window.innerWidth;
            H = window.innerHeight;
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

            traces = [];
            const cols = Math.ceil(W / GRID), rows = Math.ceil(H / GRID);
            const count = Math.round((W * H) / 26000);
            for (let t = 0; t < count; t++) {
                let x = rand(cols + 1) * GRID, y = rand(rows + 1) * GRID;
                const pts: Point[] = [[x, y]];
                let dir = DIRS[rand(4)], len = 0;
                const segs = 2 + rand(4);
                for (let s = 0; s < segs; s++) {
                    if (s > 0) {
                        // bend by 45° left or right — keeps the look of real routing
                        const k = RING.indexOf(DIRS.indexOf(dir));
                        dir = DIRS[RING[(k + (Math.random() < 0.5 ? 1 : 7)) % 8]];
                    }
                    const steps = 1 + rand(5);
                    const [px, py] = pts[pts.length - 1];
                    x += dir[0] * steps * GRID;
                    y += dir[1] * steps * GRID;
                    len += Math.hypot(x - px, y - py);
                    pts.push([x, y]);
                }
                traces.push({ pts, len });
            }
            pulses = [];
            drawStatic();
        };

        const drawStatic = () => {
            ctx.clearRect(0, 0, W, H);
            ctx.lineWidth = 1;
            ctx.lineJoin = 'round';
            for (const tr of traces) {
                ctx.strokeStyle = 'rgba(160, 175, 170, 0.07)';
                ctx.beginPath();
                ctx.moveTo(tr.pts[0][0], tr.pts[0][1]);
                for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i][0], tr.pts[i][1]);
                ctx.stroke();
                [tr.pts[0], tr.pts[tr.pts.length - 1]].forEach(([px, py], end) => {
                    ctx.beginPath();
                    ctx.arc(px, py, end ? 2.6 : 1.8, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(160, 175, 170, 0.12)';
                    ctx.fill();
                });
            }
        };

        const pointAt = (tr: Trace, d: number): Point => {
            for (let i = 1; i < tr.pts.length; i++) {
                const a = tr.pts[i - 1], b = tr.pts[i], seg = Math.hypot(b[0] - a[0], b[1] - a[1]);
                if (d <= seg) {
                    const r = d / seg;
                    return [a[0] + (b[0] - a[0]) * r, a[1] + (b[1] - a[1]) * r];
                }
                d -= seg;
            }
            return tr.pts[tr.pts.length - 1];
        };

        const frame = (now: number) => {
            const dt = Math.min(64, now - (last || now));
            last = now;
            if (traces.length && pulses.length < Math.max(4, Math.round(traces.length / 9)) && Math.random() < 0.06) {
                pulses.push({ tr: traces[rand(traces.length)], d: 0, speed: 0.09 + Math.random() * 0.12, tail: 46 + rand(40) });
            }
            drawStatic();
            ctx.lineCap = 'round';
            for (let i = pulses.length - 1; i >= 0; i--) {
                const p = pulses[i];
                p.d += p.speed * dt;
                if (p.d - p.tail > p.tr.len) {
                    pulses.splice(i, 1);
                    continue;
                }
                const steps = 10;
                for (let s = 0; s < steps; s++) {
                    const d1 = Math.max(0, p.d - p.tail * (s / steps)), d2 = Math.max(0, p.d - p.tail * ((s + 1) / steps));
                    if (d1 > p.tr.len) continue;
                    const a = pointAt(p.tr, Math.min(d1, p.tr.len)), b = pointAt(p.tr, Math.min(d2, p.tr.len));
                    ctx.globalAlpha = 0.75 * (1 - s / steps);
                    ctx.strokeStyle = accent;
                    ctx.lineWidth = 1.6;
                    ctx.beginPath();
                    ctx.moveTo(a[0], a[1]);
                    ctx.lineTo(b[0], b[1]);
                    ctx.stroke();
                }
                if (p.d <= p.tr.len) {
                    const [hx, hy] = pointAt(p.tr, p.d);
                    ctx.globalAlpha = 0.9;
                    ctx.fillStyle = accent;
                    ctx.shadowColor = accent;
                    ctx.shadowBlur = 10;
                    ctx.beginPath();
                    ctx.arc(hx, hy, 1.8, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.shadowBlur = 0;
                }
                ctx.globalAlpha = 1;
            }
            raf = requestAnimationFrame(frame);
        };

        const start = () => {
            if (!reduceMotion && !raf) {
                last = 0;
                raf = requestAnimationFrame(frame);
            }
        };
        const stop = () => {
            cancelAnimationFrame(raf);
            raf = 0;
        };
        const onResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
                if (Math.abs(window.innerWidth - W) > 40 || Math.abs(window.innerHeight - H) > 120) build();
            }, 200);
        };
        const onVisibility = () => (document.hidden ? stop() : start());

        window.addEventListener('resize', onResize);
        document.addEventListener('visibilitychange', onVisibility);
        build();
        start();

        return () => {
            stop();
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', onResize);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }
}
