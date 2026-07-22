"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  size: number;
}

interface Point {
  x: number;
  y: number;
}

const GOLD1 = [212, 175, 55];
const GOLD2 = [244, 229, 178];
const STEEL2 = [200, 204, 212];
const SPARK = [59, 130, 246];

function lerpColor(c1: number[], c2: number[], t: number): number[] {
  return [
    c1[0] + (c2[0] - c1[0]) * t,
    c1[1] + (c2[1] - c1[1]) * t,
    c1[2] + (c2[2] - c1[2]) * t,
  ];
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function sampleShape(
  drawFn: (ctx: CanvasRenderingContext2D) => void,
  count: number,
  W: number,
  H: number
): Point[] {
  const off = document.createElement("canvas");
  off.width = W;
  off.height = H;
  const octx = off.getContext("2d");
  if (!octx) return Array.from({ length: count }, () => ({ x: W / 2, y: H / 2 }));

  octx.clearRect(0, 0, W, H);
  octx.fillStyle = "#000";
  drawFn(octx);
  const data = octx.getImageData(0, 0, W, H).data;
  const pts: Point[] = [];
  let tries = 0;
  while (pts.length < count && tries < count * 80) {
    tries++;
    const x = Math.floor(Math.random() * W);
    const y = Math.floor(Math.random() * H);
    const a = data[(y * W + x) * 4 + 3];
    if (a > 120) pts.push({ x, y });
  }
  while (pts.length < count) {
    pts.push(
      pts[Math.floor(Math.random() * Math.max(pts.length, 1))] || {
        x: W / 2,
        y: H / 2,
      }
    );
  }
  return pts;
}

// Shape A: Organic bull silhouette with curved horns
function drawBull(c: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.5;
  const cy = H * 0.58;
  c.save();
  c.translate(cx, cy);
  c.beginPath();
  const rx = W * 0.3;
  const ry = H * 0.24;
  for (let a = 0; a <= Math.PI * 2 + 0.01; a += 0.05) {
    const wob = 1 + 0.14 * Math.sin(a * 3 + 1.2) + 0.08 * Math.sin(a * 5);
    const x = Math.cos(a) * rx * wob;
    const y = Math.sin(a) * ry * wob;
    if (a === 0) c.moveTo(x, y);
    else c.lineTo(x, y);
  }
  c.closePath();
  c.fill();
  // Left horn
  c.beginPath();
  c.moveTo(-W * 0.05, -H * 0.2);
  c.bezierCurveTo(-W * 0.14, -H * 0.42, -W * 0.2, -H * 0.46, -W * 0.24, -H * 0.4);
  c.bezierCurveTo(-W * 0.18, -H * 0.36, -W * 0.1, -H * 0.26, -W * 0.02, -H * 0.16);
  c.closePath();
  c.fill();
  // Right horn
  c.beginPath();
  c.moveTo(W * 0.05, -H * 0.2);
  c.bezierCurveTo(W * 0.14, -H * 0.42, W * 0.2, -H * 0.46, W * 0.24, -H * 0.4);
  c.bezierCurveTo(W * 0.18, -H * 0.36, W * 0.1, -H * 0.26, W * 0.02, -H * 0.16);
  c.closePath();
  c.fill();
  c.restore();
}

// Shape B: Faceted bear — angular silhouette
function drawBear(c: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.5;
  const cy = H * 0.55;
  c.save();
  c.translate(cx, cy);
  const verts: [number, number][] = [
    [-0.3, -0.02], [-0.34, -0.2], [-0.22, -0.3], [-0.1, -0.2],
    [0, -0.3], [0.1, -0.2], [0.22, -0.3], [0.34, -0.2], [0.3, -0.02],
    [0.24, 0.22], [0.1, 0.3], [-0.1, 0.3], [-0.24, 0.22],
  ];
  c.beginPath();
  verts.forEach(([vx, vy], i) => {
    const x = vx * W;
    const y = vy * H;
    if (i === 0) c.moveTo(x, y);
    else c.lineTo(x, y);
  });
  c.closePath();
  c.fill();
  c.restore();
}

// Shape C: Upward trend arrow with spark burst
function drawArrow(c: CanvasRenderingContext2D, W: number, H: number) {
  const cx = W * 0.5;
  const cy = H * 0.55;
  c.save();
  c.translate(cx, cy);
  c.beginPath();
  c.moveTo(-0.3 * W, 0.2 * H);
  c.lineTo(-0.05 * W, -0.08 * H);
  c.lineTo(0.1 * W, 0.05 * H);
  c.lineTo(0.34 * W, -0.28 * H);
  c.lineTo(0.34 * W, -0.1 * H);
  c.lineTo(0.3 * W, -0.1 * H);
  c.lineTo(0.3 * W, -0.2 * H);
  c.lineTo(0.2 * W, -0.2 * H);
  c.lineTo(0.2 * W, -0.16 * H);
  c.lineTo(0.28 * W, -0.16 * H);
  c.lineTo(0.1 * W, 0.14 * H);
  c.lineTo(-0.06 * W, 0.0 * H);
  c.lineTo(-0.24 * W, 0.3 * H);
  c.closePath();
  c.fill();
  // Spark burst at the tip
  const sx = 0.34 * W;
  const sy = -0.3 * H;
  for (let i = 0; i < 4; i++) {
    const ang = (i * Math.PI) / 2 + Math.PI / 4;
    c.beginPath();
    c.arc(sx + Math.cos(ang) * 22, sy + Math.sin(ang) * 22, 6, 0, Math.PI * 2);
    c.fill();
  }
  c.restore();
}

const LABELS = ["Gold", "Steel", "Signal"] as const;
const HOLD = 2000;
const MORPH = 1500;
const PARTICLE_COUNT = 480;

export function HeroMorphCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeLabel, setActiveLabel] = useState(0);
  const netWorthRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const W = canvas.width;
    const H = canvas.height;

    const A = sampleShape((c) => drawBull(c, W, H), PARTICLE_COUNT, W, H);
    const B = sampleShape((c) => drawBear(c, W, H), PARTICLE_COUNT, W, H);
    const C = sampleShape((c) => drawArrow(c, W, H), PARTICLE_COUNT, W, H);

    const sequence = [
      { shape: A, color: GOLD1 },
      { shape: B, color: STEEL2 },
      { shape: C, color: SPARK },
    ];

    const particles: Particle[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: A[i].x,
        y: A[i].y,
        fromX: A[i].x,
        fromY: A[i].y,
        toX: A[i].x,
        toY: A[i].y,
        size: 1.1 + Math.random() * 1.6,
      });
    }

    let phase = 0;
    let mode: "hold" | "morph" = "hold";
    let t0 = performance.now();
    let animId: number;

    function beginMorph() {
      const next = (phase + 1) % sequence.length;
      const from = sequence[phase].shape;
      const to = sequence[next].shape;
      particles.forEach((p, i) => {
        p.fromX = from[i].x;
        p.fromY = from[i].y;
        p.toX = to[i].x;
        p.toY = to[i].y;
      });
      mode = "morph";
      t0 = performance.now();
    }

    function frame(now: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);

      const elapsed = now - t0;
      let colorT = 0;
      const curPhase = phase;
      const nextPhase = (phase + 1) % sequence.length;

      if (mode === "hold") {
        setActiveLabel(phase);
        if (elapsed > HOLD) {
          beginMorph();
        }
        particles.forEach((p) => {
          p.x = p.toX;
          p.y = p.toY;
        });
      } else {
        const prog = Math.min(elapsed / MORPH, 1);
        const e = easeInOutCubic(prog);
        colorT = e;
        particles.forEach((part) => {
          part.x = part.fromX + (part.toX - part.fromX) * e;
          part.y = part.fromY + (part.toY - part.fromY) * e;
        });
        if (prog >= 1) {
          phase = nextPhase;
          mode = "hold";
          t0 = performance.now();
        }
      }

      const c1 = sequence[curPhase].color;
      const c2 = sequence[nextPhase].color;
      const col = mode === "morph" ? lerpColor(c1, c2, colorT) : c1;
      const [r, g, b] = col;

      particles.forEach((part) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(${r},${g},${b},0.9)`;
        ctx.shadowColor = `rgba(${r},${g},${b},0.7)`;
        ctx.shadowBlur = 6;
        ctx.arc(part.x, part.y, part.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.shadowBlur = 0;

      animId = requestAnimationFrame(frame);
    }

    animId = requestAnimationFrame(frame);

    // Net worth count-up
    const nwEl = netWorthRef.current;
    if (nwEl) {
      const target = 48.2;
      const dur = 1800;
      let nwStart: number | null = null;
      function nwStep(ts: number) {
        if (!nwStart) nwStart = ts;
        const p = Math.min((ts - nwStart) / dur, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        if (nwEl) nwEl.textContent = "₹" + (target * eased).toFixed(1) + "L";
        if (p < 1) requestAnimationFrame(nwStep);
      }
      setTimeout(() => requestAnimationFrame(nwStep), 400);
    }

    return () => {
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[480px] mx-auto" style={{ aspectRatio: "1/1" }}>
      <canvas
        ref={canvasRef}
        width={480}
        height={480}
        className="w-full h-full block"
      />

      {/* Shape labels */}
      <div className="absolute bottom-[6%] left-1/2 -translate-x-1/2 flex gap-5 text-[11px] tracking-[0.14em] uppercase text-muted">
        {LABELS.map((label, i) => (
          <span
            key={label}
            className="relative pl-3.5"
          >
            <span
              className={`absolute left-0 top-1/2 w-[7px] h-[7px] rounded-sm -translate-y-1/2 rotate-45 transition-all duration-300 ${
                activeLabel === i
                  ? "bg-gold-start shadow-[0_0_8px_rgb(212,175,55)]"
                  : "bg-steel-end/50"
              }`}
            />
            {label}
          </span>
        ))}
      </div>

      {/* Floating card — Net Worth */}
      <div className="absolute top-[6%] right-[-4%] md:right-[-4%] bg-elevated/90 border border-steel-start/35 rounded-[14px] px-4 py-3 backdrop-blur-[10px] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.6)] animate-float z-10">
        <div className="text-[9px] tracking-[0.1em] uppercase text-muted mb-1">
          Net Worth
        </div>
        <div className="font-heading font-bold text-[17px] text-gold-start">
          <span ref={netWorthRef}>₹0.0L</span>
        </div>
        <div className="text-[10px] text-emerald-400 mt-0.5">▲ 12.4%</div>
      </div>

      {/* Floating card — AI Insight */}
      <div
        className="absolute bottom-[10%] left-[-6%] md:left-[-6%] bg-elevated/90 border border-steel-start/35 rounded-[14px] px-4 py-3 backdrop-blur-[10px] shadow-[0_20px_40px_-18px_rgba(0,0,0,0.6)] animate-float z-10"
        style={{ animationDelay: "1.4s" }}
      >
        <div className="text-[9px] tracking-[0.1em] uppercase text-muted mb-1">
          AI Insight
        </div>
        <div className="font-heading font-medium text-[13px] text-foreground">
          Dining 34% above avg
        </div>
        <div className="text-[10px] text-muted mt-0.5">
          Health Score 84 · Excellent
        </div>
      </div>
    </div>
  );
}
