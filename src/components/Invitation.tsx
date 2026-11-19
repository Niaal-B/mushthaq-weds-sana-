import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bismillah, FleurDivider, InstagramIcon, Lily, Swash } from './Ornaments';
import { Countdown } from './Countdown';
import { Events } from './Events';
import { Venue } from './Venue';
import { Families } from './Families';
import monogram from '../assets/monogram.webp';

const INSTAGRAM_URL = 'https://www.instagram.com/niaal._/';
const EASE = [0.23, 1, 0.32, 1] as const;

const nameClass = 'gold-ink font-display text-[clamp(2rem,8.4vw,3.1rem)] font-medium leading-[1.2]';

function ScrollCue({ reduce }: { reduce: boolean }) {
  return (
    <div className="mt-10 flex flex-col items-center text-champagne/70" aria-hidden="true">
      <span className="font-sans text-[10px] uppercase tracking-[0.3em]">Scroll</span>
      <motion.svg
        viewBox="0 0 24 24"
        className="mt-1 h-5 w-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        animate={reduce ? undefined : { y: [0, 5, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
        <path d="M6 9l6 6 6-6" />
      </motion.svg>
    </div>
  );
}

export function Invitation({ revealed }: { revealed: boolean }) {
  const reduce = !!useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: revealed ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduce ? 0.3 : 1.1, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <div className="relative">
      {/* Hero: the invitation arch */}
      <header className="flex justify-center px-4 pb-16 pt-10 sm:pb-24 sm:pt-16">
        <motion.div {...enter(0.9)} className="relative w-[min(88vw,520px)]">
          <div
            className="velvet-arch rounded-t-[999px] px-[9%] pb-[16%] pt-[22%] text-center text-champagne"
            style={{ boxShadow: '0 24px 48px -20px rgba(70,20,25,0.45)' }}>
            <Bismillah className="text-[clamp(1.4rem,6vw,2.1rem)] text-[#e2c591]" />

            <p className="mx-auto mt-5 max-w-[30ch] text-balance font-serif text-[clamp(0.98rem,4vw,1.12rem)] italic leading-[1.75] text-champagne/95">
              With the blessings of the Almighty, we are delighted to invite you and your family to join us in
              celebrating a joyful milestone in our lives – the Wedding Reception of our beloved son.
            </p>

            <FleurDivider className="mt-7" />

            {/* Each name with its parents beneath it; the heading itself is for screen readers */}
            <h1 className="sr-only">Sayyid Ahmed Mushthaq and Fathima Sana</h1>

            <div className="mt-6">
              <p aria-hidden="true">
                <span
                  className={`${nameClass} ${revealed ? 'shimmer' : ''}`}
                  style={{ '--shimmer-delay': '1.9s' } as CSSProperties}>
                  Sayyid Ahmed Mushthaq
                </span>
              </p>
              <p className="mt-3 font-serif text-[14px] leading-relaxed text-champagne/90 sm:text-[15.5px]">
                S/o Mr. Sayyid Zainudheen Al Bukhari <span className="whitespace-nowrap">&amp; Mrs. Rahmath Beevi</span>
              </p>
            </div>

            <div className="my-4 flex items-center justify-center gap-2" aria-hidden="true">
              <Swash className="h-4 w-14 sm:w-20" />
              <span className="gold-ink font-display text-[clamp(1.6rem,6.4vw,2.2rem)] italic leading-none">&amp;</span>
              <Swash flip className="h-4 w-14 sm:w-20" />
            </div>

            <div>
              <p aria-hidden="true">
                <span
                  className={`${nameClass} ${revealed ? 'shimmer' : ''}`}
                  style={{ '--shimmer-delay': '2.3s' } as CSSProperties}>
                  Fathima Sana
                </span>
              </p>
              <p className="mt-3 font-serif text-[14px] leading-relaxed text-champagne/90 sm:text-[15.5px]">
                D/o Mr. Ramees P. K. &amp; Mrs. Sajna P.
              </p>
            </div>

            <FleurDivider className="mt-8" />

            <p className="mt-5 font-serif text-[clamp(0.95rem,4vw,1.1rem)] italic text-champagne/90">Wedding Reception</p>
            <p className="mt-1 font-display text-[clamp(1.25rem,5.4vw,1.6rem)]">Sunday, 03 January 2027</p>

            <ScrollCue reduce={reduce} />
          </div>

          <Lily rotate={-12} className="absolute -right-[13%] -top-[5%] w-[34%] max-w-[200px] sm:-right-[11%] sm:-top-[2%]" />
          <Lily rotate={160} className="absolute -bottom-[4%] -left-[11%] w-[36%] max-w-[200px]" />
        </motion.div>
      </header>

      <main>
        <Countdown />
        <Events />
        <Venue />
        <Families />
      </main>

      {/* Footer: monogram and credit on velvet */}
      <footer className="velvet-arch px-4 pb-10 pt-14 text-center">
        <img
          src={monogram}
          alt="Monogram of Ahmed Mushthaq and Fathima Sana"
          width={760}
          height={552}
          loading="lazy"
          className="mx-auto w-[min(62vw,280px)] select-none"
          draggable={false}
        />
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 inline-flex min-h-[44px] items-center gap-1.5 font-serif text-[0.75rem] uppercase tracking-[0.28em] text-champagne/70 transition-colors duration-150 hover:text-champagne">
          Crafted by
          <InstagramIcon className="ml-1 h-3.5 w-3.5" />
          <span className="text-[0.85rem] font-semibold normal-case tracking-[0.1em] text-champagne">@niaal._</span>
        </a>
      </footer>
    </div>
  );
}
