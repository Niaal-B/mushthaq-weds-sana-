import React from 'react';

/*
 * The reference card's silhouette: straight sides, a concave notch at each
 * shoulder, then an ogee sweep up to a pointed crest. The bottom mirrors it.
 * Only the crests are SVG (fixed aspect ratio, so curves never distort);
 * the body is a plain block that grows with its content.
 */
const OUTLINE =
  'M0 122 L0 94 C16 90 24 80 24 68 C24 58 28 52 36 48 C54 24 112 13 168 9 C184 8 194 5 200 0 ' +
  'C206 5 216 8 232 9 C288 13 346 24 364 48 C372 52 376 58 376 68 C376 80 384 90 400 94 L400 122';
// The crest overlaps the body by ~1px; the rim strokes run just as far so no seam shows
const FILL = `${OUTLINE} Z`;

const PAPER = '#ede4d7';
const GOLD = '#b08a4a';

function Crest({ flip }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 400 120"
      className="block w-full overflow-visible"
      style={flip ? { transform: 'scaleY(-1)', marginTop: -1 } : { marginBottom: -1 }}
      aria-hidden="true">
      <path d={FILL} fill={PAPER} />
      {/* A wide gold stroke with a cream core reads as a fine double rim */}
      <path d={OUTLINE} fill="none" stroke={GOLD} strokeWidth={3.6} vectorEffect="non-scaling-stroke" />
      <path d={OUTLINE} fill="none" stroke={PAPER} strokeWidth={1.4} vectorEffect="non-scaling-stroke" />
    </svg>
  );
}

const RIM = `linear-gradient(90deg, ${GOLD} 0 1.1px, ${PAPER} 1.1px 2.5px, ${GOLD} 2.5px 3.6px)`;

type ArchCardProps = {
  children: React.ReactNode;
  className?: string;
  bodyClassName?: string;
  as?: 'article' | 'div';
};

export function ArchCard({ children, className = '', bodyClassName = '', as = 'article' }: ArchCardProps) {
  const Tag = as;
  return (
    <Tag
      className={`relative ${className}`}
      style={{ filter: 'drop-shadow(0 22px 28px rgba(10,2,4,0.55)) drop-shadow(0 2px 3px rgba(10,2,4,0.35))' }}>
      <Crest />
      <div className={`paper relative ${bodyClassName}`}>
        <span aria-hidden="true" className="absolute inset-y-0 -left-[1.8px] w-[3.6px]" style={{ background: RIM }} />
        <span aria-hidden="true" className="absolute inset-y-0 -right-[1.8px] w-[3.6px]" style={{ background: RIM }} />
        {children}
      </div>
      <Crest flip />
    </Tag>
  );
}
