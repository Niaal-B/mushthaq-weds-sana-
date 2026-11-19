import { useEffect, useId, useState } from 'react';
import type { CSSProperties } from 'react';

type Petal = {
  left: number; // vw
  size: number; // px
  delay: number; // s
  fall: number; // s
  sway: number; // px
  swayTime: number; // s
  spin: number; // deg
  spinTime: number; // s
  tilt: number; // deg
  gold: boolean;
};

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function makePetals(): Petal[] {
  const count = window.innerWidth < 640 ? 16 : 26;
  return Array.from({ length: count }, () => ({
    left: rand(-2, 98),
    size: rand(20, 38),
    // Released as the curtains part (they start moving at ~0.35s)
    delay: rand(0.45, 2.6),
    fall: rand(5, 7.6),
    sway: rand(18, 55),
    swayTime: rand(1.5, 2.8),
    spin: rand(200, 420) * (Math.random() < 0.5 ? -1 : 1),
    spinTime: rand(2.6, 4.8),
    tilt: rand(0, 360),
    gold: Math.random() < 0.3,
  }));
}

/* A single lily tepal, white or gold-leaf, with a faint central vein */
function PetalShape({ size, gold, gid }: { size: number; gold: boolean; gid: string }) {
  return (
    <svg viewBox="0 0 40 26" width={size} height={size * 0.65} className="petal-spin" aria-hidden="true">
      <path d="M1 13 C7 2 25 -1 39 11 C28 25 9 25 1 13Z" fill={`url(#${gold ? 'pg' : 'pw'}-${gid})`} />
      <path d="M1 13 C7 2 25 -1 39 11 C26 9 12 10 1 13Z" fill="#ffffff" opacity={gold ? 0.18 : 0.35} />
      <path d="M3 13 Q20 12 37 11" stroke={gold ? '#8a6330' : '#c9b08a'} strokeWidth="0.6" fill="none" opacity="0.6" />
    </svg>
  );
}

/*
 * A short shower of lily petals after the curtains open. It runs once,
 * then removes itself so nothing keeps animating while guests read.
 */
export function FallingPetals() {
  const gid = useId().replace(/:/g, '');
  const [petals] = useState(makePetals);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const last = Math.max(...petals.map((p) => p.delay + p.fall));
    const t = window.setTimeout(() => setDone(true), (last + 0.3) * 1000);
    return () => window.clearTimeout(t);
  }, [petals]);

  if (done) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[45] h-[100dvh] overflow-hidden">
      {/* Shared gradients for every petal */}
      <svg width="0" height="0" className="absolute">
        <defs>
          <linearGradient id={`pw-${gid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e2d3b6" />
            <stop offset="0.35" stopColor="#fbf6ec" />
            <stop offset="1" stopColor="#f1e8d8" />
          </linearGradient>
          <linearGradient id={`pg-${gid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#a5763a" />
            <stop offset="0.45" stopColor="#ecd09a" />
            <stop offset="1" stopColor="#9a6c33" />
          </linearGradient>
        </defs>
      </svg>

      {petals.map((p, i) => {
        // Smaller petals read as further away. Depth comes from size and opacity only:
        // CSS filters on moving elements re-render every frame and stutter on low-end phones.
        const far = p.size < 26;
        const style = {
          left: `${p.left}vw`,
          '--delay': `${p.delay}s`,
          '--fall': `${p.fall}s`,
          '--sway': `${p.sway}px`,
          '--sway-time': `${p.swayTime}s`,
          '--spin': `${p.spin}deg`,
          '--spin-time': `${p.spinTime}s`,
          '--tilt': `${p.tilt}deg`,
        } as CSSProperties;
        return (
          <div key={i} className="petal-fall" style={style}>
            {/* Opacity lives here: the fall animation owns the outer layer's opacity */}
            <div className="petal-sway" style={{ perspective: 400, opacity: far ? 0.65 : 0.95 }}>
              <PetalShape size={p.size} gold={p.gold} gid={gid} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
