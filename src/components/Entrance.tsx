import { useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import type { MotionStyle } from 'framer-motion';
import { Bismillah, Lily } from './Ornaments';
import monogram from '../assets/monogram.webp';

type EntranceProps = {
  onOpenStart: () => void;
  onOpened: () => void;
};

const EASE = [0.23, 1, 0.32, 1] as const;
const DOOR_EASE = [0.65, 0, 0.35, 1] as const;
const SEAL_TIME = 0.45; // the seal glows before the doors move
const SWING = 1.7; // doors swinging open
const ZOOM_AT = 1.3; // moving through the doorway starts while the doors are still opening
const ZOOM = 1.1;

const GOLD = 'linear-gradient(135deg, #f2dfb3 0%, #b08a4a 38%, #ecd3a0 58%, #9a733c 100%)';

/*
 * Doorway size: as large as fits the screen, keeping a 1 : 1.55 arch.
 * --dw is the doorway width; everything inside the doors scales from it.
 */
const SIZE_VARS = {
  '--dh': 'min(54dvh, calc(min(76vw, 360px) * 1.55))',
  '--dw': 'calc(var(--dh) / 1.55)',
} as CSSProperties;

const ARCH_RADIUS = '100% calc(var(--dw) / 2)';

/* Eight-pointed star in gold line, carved into each door */
function DoorStar({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg viewBox="-12 -12 24 24" className={className} style={style} aria-hidden="true">
      <g fill="none" stroke="#e4c99c" strokeWidth="0.7" opacity="0.75">
        <rect x="-7.5" y="-7.5" width="15" height="15" />
        <rect x="-7.5" y="-7.5" width="15" height="15" transform="rotate(45)" />
        <circle r="3.4" />
      </g>
      <circle r="1.1" fill="#e4c99c" opacity="0.8" />
    </svg>
  );
}

/* The monogram seal. Each door carries the whole seal centred on its inner edge,
   clipped to its half, so the two halves meet exactly and split as the doors open. */
function SealHalf({ left, glow }: { left: boolean; glow: boolean }) {
  return (
    <motion.div
      className="velvet-arch absolute top-[44%] flex aspect-square items-center justify-center rounded-full"
      style={{
        width: 'calc(var(--dw) * 0.38)',
        left: left ? '100%' : '0%',
        x: '-50%',
        y: '-50%',
        border: '2px solid #d9bd84',
      }}
      animate={{
        boxShadow: glow
          ? 'inset 0 0 0 4px rgba(0,0,0,0.25), 0 0 0 1px #9a733c, 0 0 28px 8px rgba(240,205,140,0.75)'
          : 'inset 0 0 0 4px rgba(0,0,0,0.25), 0 0 0 1px #9a733c, 0 6px 14px rgba(20,4,6,0.45)',
      }}
      transition={{ duration: SEAL_TIME, ease: EASE }}>
      <span aria-hidden="true" className="absolute inset-[5px] rounded-full border border-champagne/40" />
      <img src={monogram} alt="" width={760} height={552} className="w-[78%] select-none" draggable={false} />
    </motion.div>
  );
}

function Door({ side, open, reduce }: { side: 'left' | 'right'; open: boolean; reduce: boolean }) {
  const left = side === 'left';
  return (
    <motion.div
      className={`absolute inset-y-0 w-1/2 overflow-hidden ${left ? 'left-0' : 'right-0'}`}
      style={{
        transformOrigin: left ? 'left center' : 'right center',
        borderTopLeftRadius: left ? ARCH_RADIUS : 0,
        borderTopRightRadius: left ? 0 : ARCH_RADIUS,
        backfaceVisibility: 'hidden',
      }}
      initial={false}
      // Doors swing inward, away from the guest, as when entering a hall
      animate={open ? (reduce ? { opacity: 0 } : { rotateY: left ? 100 : -100 }) : { rotateY: 0, opacity: 1 }}
      transition={{ duration: reduce ? 0.3 : SWING, delay: reduce ? 0 : SEAL_TIME, ease: DOOR_EASE }}>
      <div className="velvet-arch absolute inset-0" />
      {/* Light falls across the door: shadowed at the hinge, a soft sheen at the seam */}
      <div className={`absolute inset-0 from-black/40 via-transparent to-white/[0.05] ${left ? 'bg-gradient-to-r' : 'bg-gradient-to-l'}`} />

      {/* Carved panelling, traced in gold */}
      <div
        className="absolute border border-champagne/50"
        style={{
          top: '5%',
          bottom: '36%',
          left: left ? '12%' : '9%',
          right: left ? '9%' : '12%',
          borderTopLeftRadius: left ? '100% calc(var(--dw) * 0.36)' : 0,
          borderTopRightRadius: left ? 0 : '100% calc(var(--dw) * 0.36)',
        }}>
        <div
          className="absolute inset-[5px] border border-champagne/20"
          style={{
            borderTopLeftRadius: left ? '100% calc(var(--dw) * 0.33)' : 0,
            borderTopRightRadius: left ? 0 : '100% calc(var(--dw) * 0.33)',
          }}
        />
      </div>
      {/* Centred in the panel, nudged toward the seam where the arch leaves room */}
      <DoorStar
        className="absolute top-[22%] w-[34%] -translate-x-1/2 -translate-y-1/2"
        style={{ left: left ? '58%' : '42%' }}
      />
      <div className={`absolute bottom-[7%] top-[69%] border border-champagne/50 ${left ? 'left-[12%] right-[9%]' : 'left-[9%] right-[12%]'}`}>
        <div className="absolute inset-[5px] border border-champagne/20" />
      </div>

      {/* Gold handle beside the seam */}
      <div
        className={`absolute top-[57%] h-[8%] w-[5px] rounded-full ${left ? 'right-[7%]' : 'left-[7%]'}`}
        style={{ background: GOLD, boxShadow: '0 2px 4px rgba(10,2,4,0.5)' }}
      />

      {/* Gold edge where the doors meet */}
      <div className={`absolute inset-y-0 w-px bg-[#d9bd84]/80 ${left ? 'right-0' : 'left-0'}`} />

      <SealHalf left={left} glow={open && !reduce} />
    </motion.div>
  );
}

export function Entrance({ onOpenStart, onOpened }: EntranceProps) {
  const [opening, setOpening] = useState(false);
  const [origin, setOrigin] = useState('50% 45%');
  const doorwayRef = useRef<HTMLDivElement>(null);
  const reduce = !!useReducedMotion();

  const handleOpen = () => {
    if (opening) return;
    // Move "through" the doorway: zoom from its centre, wherever it sits on this screen
    const r = doorwayRef.current?.getBoundingClientRect();
    if (r) setOrigin(`${r.left + r.width / 2}px ${r.top + r.height * 0.55}px`);
    setOpening(true);
    onOpenStart();
    window.setTimeout(onOpened, reduce ? 300 : (ZOOM_AT + ZOOM) * 1000);
  };

  // Staggered arrival of the scene before the guest taps
  const arrive = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 12 },
    animate: opening ? { opacity: 0 } : { opacity: 1, y: 0 },
    transition: opening ? { duration: 0.35, ease: EASE } : { duration: 0.9, delay, ease: EASE },
  });

  return (
    <motion.section
      className={`fixed inset-0 z-40 h-[100dvh] overflow-hidden ${opening ? 'pointer-events-none' : ''}`}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.3 : 0.7, ease: EASE }}
      aria-label="Invitation entrance">
      <motion.div
        className="parchment absolute inset-0 flex flex-col items-center justify-center px-6 py-6"
        style={{ ...SIZE_VARS, transformOrigin: origin } as MotionStyle}
        // Step through the doorway until its light fills the screen; the section's exit fade then reveals the invitation
        animate={opening && !reduce ? { scale: 3.8 } : { scale: 1 }}
        transition={opening ? { delay: ZOOM_AT, duration: ZOOM, ease: [0.5, 0, 0.75, 0] } : { duration: 0 }}>
        <motion.div {...arrive(0.1)}>
          <Bismillah className="text-center text-[clamp(1.2rem,5.4vw,1.7rem)] text-[#7a5a2c]" />
        </motion.div>

        {/* Gold-moulded arched doorway */}
        <motion.div
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, delay: 0.25, ease: EASE }}
          className="relative mt-3"
          style={{ width: 'calc(var(--dw) + 20px)', height: 'calc(var(--dh) + 10px)' }}>
          <div
            className="absolute inset-0 rounded-t-[999px]"
            style={{ background: GOLD, boxShadow: '0 30px 60px -24px rgba(70,20,25,0.55)' }}
          />
          <div className="parchment absolute inset-x-[4px] bottom-0 top-[4px] rounded-t-[999px]" />
          <div className="absolute inset-x-[7px] bottom-0 top-[7px] rounded-t-[999px]" style={{ background: GOLD }} />

          <div
            ref={doorwayRef}
            className="absolute inset-x-[10px] bottom-0 top-[10px] overflow-hidden rounded-t-[999px]"
            style={{ perspective: 1300 }}>
            {/* Warm light waiting beyond the doors */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,#fffaf0_0%,#f6e3bb_35%,#d9b27a_70%,#a87a45_100%)]" />
            <motion.div
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_55%,rgba(255,255,255,0.95),transparent_65%)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: opening ? 1 : 0 }}
              transition={{ duration: 1.2, delay: SEAL_TIME + 0.3 }}
            />
            <Door side="left" open={opening} reduce={reduce} />
            <Door side="right" open={opening} reduce={reduce} />
            {/* Recess shadow under the arch, so the doors sit inside the wall */}
            <div className="pointer-events-none absolute inset-0 rounded-t-[999px] shadow-[inset_0_10px_18px_rgba(20,4,6,0.45)]" />
          </div>

          {/* Gold threshold the doorway stands on */}
          <div
            className="absolute -bottom-[7px] -left-[12px] -right-[12px] h-[7px] rounded-[2px]"
            style={{ background: GOLD, boxShadow: '0 8px 16px -6px rgba(70,20,25,0.5)' }}
          />

          <Lily rotate={-12} className="absolute -right-[16%] -top-[3%] w-[34%] max-w-[150px]" />
          <Lily rotate={160} className="absolute -bottom-[5%] -left-[16%] w-[32%] max-w-[140px]" />
        </motion.div>

        <motion.div {...arrive(0.55)} className="mt-6 text-center">
          <p className="font-sans text-[10.5px] uppercase tracking-[0.26em] text-[#8a6a3a]">The Wedding Reception of</p>
          <p className="mt-2 font-display text-[clamp(1.25rem,5.4vw,1.6rem)] leading-snug text-[#5e1a22]">
            Sayyid Ahmed Mushthaq
            <br />
            <span className="italic text-[#9c763f]">&amp;</span> Fathima Sana
          </p>
        </motion.div>

        <motion.div {...arrive(0.75)}>
          <button
            type="button"
            onClick={handleOpen}
            className="invite-glow velvet-arch mt-5 min-h-[48px] rounded-full px-9 font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-champagne shadow-[0_12px_28px_-12px_rgba(70,20,25,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4a141b]">
            Open Invitation
          </button>
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
