import { useId } from 'react';

/* A lanceolate petal pointing along +x from its base at the origin */
const PETAL = 'M0 0 C14 -20 52 -28 88 -8 C96 -3 98 2 90 5 C56 24 16 18 0 0Z';

/*
 * A white lily backed by gold-leaf petals, as in the reference's corners.
 * `rotate` turns the whole bloom so the two corners can face inward.
 */
export function Lily({ className = '', rotate = 0 }: { className?: string; rotate?: number }) {
  const id = useId().replace(/:/g, '');
  const white = `url(#w-${id})`;
  const gold = `url(#g-${id})`;
  return (
    <svg
      viewBox="-110 -110 220 220"
      className={`pointer-events-none ${className}`}
      style={{ transform: `rotate(${rotate}deg)`, filter: 'drop-shadow(0 6px 10px rgba(60,30,20,0.28))' }}
      aria-hidden="true">
      <defs>
        <linearGradient id={`w-${id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#d9c7a6" />
          <stop offset="0.25" stopColor="#f3ebdd" />
          <stop offset="0.7" stopColor="#fdfaf4" />
          <stop offset="1" stopColor="#efe6d6" />
        </linearGradient>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9a6c33" />
          <stop offset="0.3" stopColor="#e6c890" />
          <stop offset="0.5" stopColor="#b88a4c" />
          <stop offset="0.75" stopColor="#ecd3a0" />
          <stop offset="1" stopColor="#8e632e" />
        </linearGradient>
        <radialGradient id={`c-${id}`}>
          <stop offset="0" stopColor="#efe2b8" />
          <stop offset="1" stopColor="#c9ab6e" />
        </radialGradient>
      </defs>

      {/* Gold-leaf petals behind */}
      {[-126, 18, 162].map((a) => (
        <g key={`g${a}`} transform={`rotate(${a}) scale(1.18)`}>
          <path d={PETAL} fill={gold} stroke="#80592a" strokeWidth="0.6" />
          <path d="M8 1 C34 -2 60 -4 86 -3" stroke="#7a5426" strokeWidth="0.6" fill="none" opacity="0.6" />
          <path d="M20 -8 L30 -6 M40 -12 L52 -9 M36 7 L48 6 M60 -9 L70 -6" stroke="#fff3d6" strokeWidth="1.2" opacity="0.35" />
        </g>
      ))}

      {/* White petals */}
      {[-162, -90, -18, 54, 126].map((a) => (
        <g key={`w${a}`} transform={`rotate(${a})`}>
          <path d={PETAL} fill={white} stroke="#c4b294" strokeWidth="0.7" />
          <path d="M4 1 C30 0 60 -2 88 -2" stroke="#c6a676" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path
            d="M16 -4 C34 -10 54 -12 74 -7 M16 5 C34 10 54 11 74 6"
            stroke="#cdbb9b"
            strokeWidth="0.5"
            fill="none"
            opacity="0.55"
          />
        </g>
      ))}

      {/* Throat and stamens */}
      <circle r="11" fill={`url(#c-${id})`} />
      {[-130, -95, -60, -25, 10, 45].map((a) => (
        <g key={`s${a}`} transform={`rotate(${a})`}>
          <path d="M0 0 C16 -3 30 -2 42 2" stroke="#9b7a45" strokeWidth="1" fill="none" />
          <ellipse cx="44" cy="2.5" rx="5" ry="2" fill="#9a6a2a" transform="rotate(12 44 2.5)" />
        </g>
      ))}
    </svg>
  );
}

/* Gold hairlines with a small fleur in the centre, as in the reference */
export function FleurDivider({ className = '', tone = 'light' }: { className?: string; tone?: 'light' | 'dark' }) {
  // light: gold on velvet; dark: deeper antique gold that reads on cream paper
  const line = tone === 'light' ? '#d2b07a' : '#a8834d';
  const fleur = tone === 'light' ? '#dcbb85' : '#9c763f';
  return (
    <svg viewBox="0 0 240 24" className={`mx-auto block h-5 w-[min(260px,78%)] ${className}`} aria-hidden="true">
      <path d="M0 13 H104 M136 13 H240" stroke={line} strokeWidth="0.8" opacity="0.85" />
      <g fill={fleur}>
        <path d="M120 1 C124 6 124 11 120 15 C116 11 116 6 120 1Z" />
        <path d="M120 15 C114 15 108.5 12 107.5 7.5 C112 8.5 116.5 11 120 15Z" />
        <path d="M120 15 C126 15 131.5 12 132.5 7.5 C128 8.5 123.5 11 120 15Z" />
        <path d="M119.3 15 H120.7 V21 H119.3Z" />
        <path d="M115.5 18 H124.5 V19 H115.5Z" />
        <circle cx="120" cy="22.5" r="1.2" />
      </g>
    </svg>
  );
}

/* The curling swashes either side of the "&" between the names */
export function Swash({ className = '', flip = false }: { className?: string; flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 90 20"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      fill="none"
      aria-hidden="true">
      <path
        d="M2 12 C20 12 36 6 52 8 C66 10 74 16 84 12 C88 10 87 6 83 7"
        stroke="#d6b47e"
        strokeWidth="1.1"
        strokeLinecap="round"
      />
    </svg>
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

export function CalendarIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M3.5 9.5h17M8 3v4M16 3v4M12 12.5v5M9.5 15h5" />
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
