'use client';

import { useRef, useEffect, useCallback } from 'react';

interface University { name: string; country: string; countryCode: string; programs: string[]; }
interface Props { universities: University[]; }

/* ── helpers ──────────────────────────────────────────────────────────── */
function fibonacciSphere(n: number) {
  const pts = [];
  const phi = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const θ = phi * i;
    pts.push({ x: Math.cos(θ) * r, y, z: Math.sin(θ) * r });
  }
  return pts;
}
function rotY(p: { x: number; y: number; z: number }, a: number) {
  return { x: p.x * Math.cos(a) - p.z * Math.sin(a), y: p.y, z: p.x * Math.sin(a) + p.z * Math.cos(a) };
}
function rotX(p: { x: number; y: number; z: number }, a: number) {
  return { x: p.x, y: p.y * Math.cos(a) - p.z * Math.sin(a), z: p.y * Math.sin(a) + p.z * Math.cos(a) };
}

export default function UniversityGlobe({ universities }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const R   = 200;
  const FOV = 750;
  const SIZE = 520;

  const rotYRef  = useRef(0);
  const rotXRef  = useRef(0.25);
  const dragging = useRef(false);
  const lastMouse = useRef({ x: 0, y: 0 });
  const rafId    = useRef<number | null>(null);
  const hoveredIdx = useRef<number | null>(null);

  const base = useRef(fibonacciSphere(universities.length));
  const CONN_DIST_SQ = 0.55;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pts = base.current.map((bp, i) => {
      let p = rotY(bp, rotYRef.current);
      p = rotX(p, rotXRef.current);
      const scale = FOV / (FOV + p.z * R);
      return {
        x: p.x, y: p.y, z: p.z,
        px: SIZE / 2 + p.x * R * scale,
        py: SIZE / 2 + p.y * R * scale,
        depth: (p.z + 1) / 2,
        idx: i,
      };
    });

    ctx.clearRect(0, 0, SIZE, SIZE);

    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const a = pts[i], b = pts[j];
        const dx = a.x - b.x, dy = a.y - b.y, dz = a.z - b.z;
        if (dx*dx + dy*dy + dz*dz > CONN_DIST_SQ) continue;
        const t = 1 - (dx*dx + dy*dy + dz*dz) / CONN_DIST_SQ;
        const avgDepth = (a.depth + b.depth) / 2;
        const isHov = hoveredIdx.current === i || hoveredIdx.current === j;
        ctx.beginPath();
        ctx.moveTo(a.px, a.py);
        ctx.lineTo(b.px, b.py);
        if (isHov) {
          ctx.strokeStyle = `rgba(37,99,235,${t * 0.75})`;
          ctx.lineWidth = 1.5;
        } else {
          ctx.strokeStyle = `rgba(147,197,253,${t * (0.15 + 0.5 * avgDepth)})`;
          ctx.lineWidth = 0.8;
        }
        ctx.stroke();
      }
    }

    const sorted = [...pts].sort((a, b) => a.depth - b.depth);

    for (const p of sorted) {
      const isHov = p.idx === hoveredIdx.current;
      const alpha = 0.25 + 0.75 * p.depth;
      const uni = universities[p.idx];
      const dotR = isHov ? 7 : 3.5 + p.depth * 3;

      if (isHov) {
        ctx.beginPath();
        ctx.arc(p.px, p.py, dotR + 7, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(59,130,246,0.15)`;
        ctx.fill();
      }

      ctx.beginPath();
      ctx.arc(p.px, p.py, dotR, 0, Math.PI * 2);
      ctx.fillStyle = isHov ? '#1d4ed8' : `rgba(37,99,235,${alpha})`;
      ctx.fill();

      if (isHov) {
        ctx.beginPath();
        ctx.arc(p.px - 2, p.py - 2, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fill();
      }

      const name = uni.name.length > 24 ? uni.name.slice(0, 23) + '…' : uni.name;
      const fontSize = isHov ? 12 : (8 + p.depth * 4);
      ctx.font = `${isHov ? 'bold' : '500'} ${fontSize}px Inter, system-ui, sans-serif`;
      const textAlpha = isHov ? 1 : (p.depth > 0.5 ? 0.45 + 0.55 * p.depth : 0.1 + 0.4 * p.depth);
      const labelX = p.px + dotR + 6;
      const labelY = p.py + fontSize * 0.35;

      ctx.globalAlpha = textAlpha * 0.9;
      ctx.strokeStyle = 'rgba(248,250,252,0.85)';
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.strokeText(name, labelX, labelY);

      ctx.fillStyle = isHov ? '#1e3a8a' : `rgba(30,64,175,1)`;
      ctx.globalAlpha = textAlpha;
      ctx.fillText(name, labelX, labelY);
      ctx.globalAlpha = 1;
    }
  }, [universities, CONN_DIST_SQ]);

  useEffect(() => {
    const loop = () => {
      if (!dragging.current) rotYRef.current += 0.003;
      draw();
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
    return () => { if (rafId.current) cancelAnimationFrame(rafId.current); };
  }, [draw]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const onDown = (e: MouseEvent) => { dragging.current = true; lastMouse.current = { x: e.clientX, y: e.clientY }; };
    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const mx = (e.clientX - rect.left) * (SIZE / rect.width);
      const my = (e.clientY - rect.top) * (SIZE / rect.height);
      if (dragging.current) {
        rotYRef.current += (e.clientX - lastMouse.current.x) * 0.007;
        rotXRef.current = Math.max(-1.4, Math.min(1.4, rotXRef.current + (e.clientY - lastMouse.current.y) * 0.007));
        lastMouse.current = { x: e.clientX, y: e.clientY };
      }
      let found: number | null = null, best = 18 * 18;
      base.current.forEach((bp, i) => {
        let p = rotY(bp, rotYRef.current);
        p = rotX(p, rotXRef.current);
        const sc = FOV / (FOV + p.z * R);
        const px = SIZE / 2 + p.x * R * sc;
        const py = SIZE / 2 + p.y * R * sc;
        const d2 = (px - mx) ** 2 + (py - my) ** 2;
        if (d2 < best) { best = d2; found = i; }
      });
      hoveredIdx.current = found;
      canvas.style.cursor = found !== null ? 'pointer' : dragging.current ? 'grabbing' : 'grab';
    };
    const onUp = () => { dragging.current = false; };
    const onTouchStart = (e: TouchEvent) => { dragging.current = true; lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; };
    const onTouchMove = (e: TouchEvent) => {
      if (!dragging.current) return;
      rotYRef.current += (e.touches[0].clientX - lastMouse.current.x) * 0.007;
      rotXRef.current = Math.max(-1.4, Math.min(1.4, rotXRef.current + (e.touches[0].clientY - lastMouse.current.y) * 0.007));
      lastMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onTouchEnd = () => { dragging.current = false; };

    canvas.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);
    return () => {
      canvas.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  return (
    <div className="flex flex-col items-center select-none w-full">
      <canvas
        ref={canvasRef}
        width={SIZE}
        height={SIZE}
        style={{ width: '100%', maxWidth: SIZE, display: 'block', cursor: 'grab' }}
      />
      <p className="text-slate-400 text-xs mt-1">Drag to explore · hover for details</p>
    </div>
  );
}
