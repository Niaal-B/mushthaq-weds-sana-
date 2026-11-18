import { useId } from 'react';

type LeafProps = { x: number; y: number; r: number; s: number; fill: string };

/* One lanceolate leaf pointing along +x from its base at the origin */
function Leaf({ x, y, r, s, fill }: LeafProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
      <path d="M0 0 C16 -13 44 -14 64 0 C44 12 16 11 0 0Z" fill={fill} />
      <path d="M0 0 C16 -13 44 -14 64 0Z" fill="#ffffff" opacity="0.07" />
      <path d="M1 0 Q32 -1.5 62 0" stroke="#1c080d" strokeWidth="0.8" fill="none" opacity="0.75" />
      <path
        d="M14 -0.5 L22 -6 M26 -0.8 L35 -7 M38 -0.8 L46 -6 M16 0.5 L24 5 M29 0.6 L37 6 M42 0.5 L49 4.5"
        stroke="#1c080d"
        strokeWidth="0.45"
        opacity="0.45"
      />
    </g>
  );
}

const BERRIES: [number, number, number][] = [
  [162, 12, 5], [150, 27, 4.2], [172, 31, 3.8], [140, 50, 3.4], [96, 33, 4.6], [108, 46, 3.6],
  [86, 50, 3.4], [34, 72, 4.4], [24, 92, 3.6], [46, 94, 3.2], [198, 55, 4.2], [188, 70, 3.4],
  [208, 77, 3.2], [124, 86, 3], [56, 112, 2.8],
];

/* Plum leaves on a gold stem with gold berries, as on the reference card */
export function LeafSprig({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  const id = useId().replace(/:/g, '');
  const leaf = `url(#leaf-${id})`;
  const berry = `url(#berry-${id})`;
  return (
    <svg
      viewBox="0 0 220 420"
      className={`pointer-events-none ${className}`}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true">
      <defs>
        <linearGradient id={`leaf-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#6e3644" />
          <stop offset="0.55" stopColor="#4a1f2a" />
          <stop offset="1" stopColor="#2a0f16" />
        </linearGradient>
        <radialGradient id={`berry-${id}`} cx="0.35" cy="0.32" r="0.75">
          <stop offset="0" stopColor="#f6e3b4" />
          <stop offset="0.45" stopColor="#c99f5a" />
          <stop offset="1" stopColor="#6f4f22" />
        </radialGradient>
      </defs>

      <g fill="none" stroke="#b08a4a" strokeLinecap="round">
        <path strokeWidth="1.8" d="M70 420 C58 350 66 290 84 236 C100 188 104 130 132 70 C142 48 150 30 162 12" />
        <path strokeWidth="1.2" d="M84 236 C60 206 44 170 36 128 C30 108 30 92 34 72" />
        <path strokeWidth="1.2" d="M100 170 C124 150 150 128 178 96 C188 82 194 70 198 55" />
        <path strokeWidth="1" d="M120 100 C108 80 100 60 96 33" />
        <path strokeWidth="0.8" d="M36 128 C40 114 48 104 56 112 M36 110 C30 100 26 96 24 92 M34 96 C40 96 44 94 46 94" />
        <path strokeWidth="0.8" d="M150 30 L150 27 M155 22 C162 26 168 28 172 31 M134 58 L140 50 M104 54 L108 46 M98 46 C94 50 90 50 86 50" />
        <path strokeWidth="0.8" d="M190 76 L188 70 M194 70 C200 72 204 74 208 77 M118 92 L124 86" />
      </g>

      <Leaf x={70} y={332} r={-168} s={1.25} fill={leaf} />
      <Leaf x={72} y={322} r={-22} s={1.1} fill={leaf} />
      <Leaf x={82} y={242} r={-148} s={1.5} fill={leaf} />
      <Leaf x={87} y={232} r={-38} s={1.35} fill={leaf} />
      <Leaf x={103} y={166} r={-62} s={1} fill={leaf} />
      <Leaf x={42} y={146} r={-118} s={0.9} fill={leaf} />

      {BERRIES.map(([cx, cy, r]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={berry} />
      ))}
    </svg>
  );
}

/* Gold hairlines with a small central flourish */
export function GoldDivider({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 14" className={`mx-auto block h-3.5 w-[min(220px,62%)] ${className}`} aria-hidden="true">
      <g stroke="#b08a4a" fill="none" strokeWidth="0.9">
        <path d="M0 7 H86" />
        <path d="M134 7 H220" />
        <path d="M104 7 C100 2 95 2 93 5 C92 7.5 94.5 9.5 97 8" />
        <path d="M116 7 C120 2 125 2 127 5 C128 7.5 125.5 9.5 123 8" />
        <path d="M104 7 C100 12 95 12 93 9" opacity="0.6" />
        <path d="M116 7 C120 12 125 12 127 9" opacity="0.6" />
      </g>
      <path d="M110 2.5 L114 7 L110 11.5 L106 7Z" fill="#b08a4a" />
    </svg>
  );
}

/* "— & —" line between names, as on the reference */
export function RuledAmpersand({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-4 ${className}`} aria-hidden="true">
      <span className="h-px w-12 bg-gradient-to-r from-transparent to-gold sm:w-16" />
      <span className="font-display text-[1.9rem] leading-none text-inksoft">&amp;</span>
      <span className="h-px w-12 bg-gradient-to-l from-transparent to-gold sm:w-16" />
    </div>
  );
}

export function MapPinIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <path d="M12 21s-6.5-5.6-6.5-11a6.5 6.5 0 0 1 13 0c0 5.4-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.3" />
    </svg>
  );
}

export function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.3" cy="6.7" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export const BISMILLAH = 'بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ';

export function Bismillah({ className = '' }: { className?: string }) {
  return (
    <p lang="ar" dir="rtl" className={`font-arabic leading-[1.9] ${className}`}>
      {BISMILLAH}
    </p>
  );
}
