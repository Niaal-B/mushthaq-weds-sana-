import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bismillah } from './Ornaments';
import monogram from '../assets/monogram.webp';

type CurtainProps = {
  onOpenStart: () => void;
  onOpened: () => void;
};

const EASE = [0.23, 1, 0.32, 1] as const;
const DRAW_EASE = [0.65, 0, 0.35, 1] as const;
const DRAW_DELAY = 0.35;
const DRAW_DURATION = 1.9;

function Panel({ side, opening, reduce }: { side: 'left' | 'right'; opening: boolean; reduce: boolean }) {
  const left = side === 'left';
  const drawn = reduce ? { opacity: 0 } : { scaleX: 0.12, rotateY: left ? 10 : -10 };
  return (
    <motion.div
      className={`velvet absolute inset-y-0 w-[51%] ${left ? 'left-0' : 'right-0'}`}
      style={{ transformOrigin: left ? 'left center' : 'right center' }}
      initial={false}
      animate={opening ? drawn : { scaleX: 1, rotateY: 0, opacity: 1 }}
      transition={{
        duration: reduce ? 0.3 : DRAW_DURATION,
        delay: reduce ? 0 : DRAW_DELAY,
        ease: DRAW_EASE,
      }}>
      {/* Vertical folds; compressing the panel bunches them like gathered fabric */}
      <div className="curtain-folds absolute inset-0" />
      {/* Light falls from above, the hem sinks into shadow */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/45" />
      {/* Heavy hem along the meeting edge, with gold piping */}
      <div
        className={`absolute inset-y-0 w-14 from-black/50 to-transparent ${left ? 'right-0 bg-gradient-to-l' : 'left-0 bg-gradient-to-r'}`}
      />
      <div
        className={`absolute inset-y-0 w-[2px] bg-gradient-to-b from-goldlight/80 via-gold/70 to-goldlight/80 ${left ? 'right-3' : 'left-3'}`}
      />
      {/* Bottom gold trim */}
      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-gold/40 via-goldlight/80 to-gold/40" />
    </motion.div>
  );
}

export function Curtain({ onOpenStart, onOpened }: CurtainProps) {
  const [opening, setOpening] = useState(false);
  const reduce = !!useReducedMotion();

  const handleOpen = () => {
    if (opening) return;
    setOpening(true);
    onOpenStart();
    window.setTimeout(onOpened, reduce ? 300 : (DRAW_DELAY + DRAW_DURATION) * 1000 - 300);
  };

  return (
    <motion.section
      className={`fixed inset-0 z-40 h-[100dvh] overflow-hidden ${opening ? 'pointer-events-none' : ''}`}
      style={{ perspective: 1600 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0.2 : 0.6, ease: EASE }}
      aria-label="Invitation entrance">
      <Panel side="left" opening={opening} reduce={reduce} />
      <Panel side="right" opening={opening} reduce={reduce} />

      {/* Gold pelmet line across the top */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-gold/50 via-goldlight to-gold/50"
        animate={{ opacity: opening ? 0 : 1 }}
        transition={{ duration: 0.5, delay: opening && !reduce ? 0.8 : 0 }}
      />

      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 py-8"
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
        animate={opening ? { opacity: 0, scale: reduce ? 1 : 0.96 } : { opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: opening ? 0.35 : 0.9, ease: EASE }}>
        <Bismillah className="text-center text-[clamp(1.25rem,5.6vw,1.75rem)] text-goldlight drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]" />

        {/* The couple's monogram (transparent background, so it sits straight on the velvet) */}
        <img
          src={monogram}
          alt="Monogram of Ahmed Mushthaq and Fathima Sana"
          width={760}
          height={552}
          className="mt-2 w-[min(84vw,440px)] select-none"
          draggable={false}
        />

        <p className="label mt-3 text-center text-[10px] text-goldlight/80 sm:text-[11px]">The Wedding Reception of</p>
        <p className="mt-2 text-center font-display text-[clamp(1.35rem,5.8vw,1.75rem)] font-medium leading-tight text-cream">
          <span className="block">Sayyid Ahmed Mushthaq</span>
          <span className="block italic text-goldlight">&amp;</span>
          <span className="block">Fathima Sana</span>
        </p>

        <button
          type="button"
          onClick={handleOpen}
          className="mt-8 min-h-[48px] rounded-full border border-goldlight/70 bg-winedeep/50 px-9 font-sans text-[13px] font-medium uppercase tracking-[0.22em] text-goldlight shadow-[0_10px_30px_-10px_rgba(0,0,0,0.8)] backdrop-blur-sm transition-colors duration-200 hover:bg-gold hover:text-winedeep focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-goldlight">
          Open Invitation
        </button>
      </motion.div>
    </motion.section>
  );
}
