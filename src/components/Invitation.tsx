import { motion, useReducedMotion } from 'framer-motion';
import { ArchCard } from './ArchCard';
import { Bismillah, GoldDivider, InstagramIcon, LeafSprig, MapPinIcon, RuledAmpersand } from './Ornaments';

const MAPS_URL = 'https://maps.app.goo.gl/3vEgRAeFaBE8AWNc7?g_st=ic';
const INSTAGRAM_URL = 'https://www.instagram.com/niaal._/';
const EASE = [0.23, 1, 0.32, 1] as const;

function DateBlock() {
  return (
    <div className="mx-auto grid max-w-[22rem] grid-cols-3 items-center text-ink">
      <div className="flex flex-col items-center gap-1 px-1">
        <span className="label text-[11px] text-inksoft sm:text-xs">Sunday</span>
        <span className="font-display text-[2.4rem] font-medium leading-none sm:text-5xl">03</span>
      </div>
      <div className="flex flex-col items-center gap-1 border-x border-gold/70 px-1">
        <span className="label text-[11px] text-inksoft sm:text-xs">January</span>
        <span className="font-display text-[2.4rem] font-medium leading-none sm:text-5xl">2027</span>
      </div>
      <div className="flex flex-col items-center px-1 font-serif text-[13px] leading-snug sm:text-[15px]">
        <span>12:00 PM</span>
        <span className="font-display text-[15px] italic text-inksoft">to</span>
        <span>06:00 PM</span>
      </div>
    </div>
  );
}

export function Invitation({ revealed }: { revealed: boolean }) {
  const reduce = useReducedMotion();
  const enter = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: revealed ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduce ? 0.3 : 1.1, delay: reduce ? 0 : delay, ease: EASE },
  });

  return (
    <div className="relative flex flex-col items-center px-4 pb-24 pt-14 sm:pt-20">
      {/* Main reception card */}
      <motion.div {...enter(0.9)} className="relative w-[min(86vw,500px)]">
        <LeafSprig className="absolute -left-[13%] -top-[2%] z-10 w-[30%] sm:-left-[22%] sm:-top-[4%] sm:w-[44%] sm:max-w-[240px]" />
        <LeafSprig
          flip
          className="absolute -bottom-[3%] -right-[13%] z-10 w-[30%] sm:-bottom-[5%] sm:-right-[22%] sm:w-[44%] sm:max-w-[240px]"
        />

        <ArchCard bodyClassName="px-[9%] text-center text-ink">
          <Bismillah className="-mt-[4%] text-[clamp(1.45rem,6.4vw,2.05rem)] text-[#6e4f2c]" />

          <GoldDivider className="mt-3" />

          <div className="mt-7 font-serif text-[15px] leading-relaxed sm:text-[17px]">
            <p>Mr. Sayyid Zainudheen Al Bukhari</p>
            <p className="font-display text-xl italic leading-tight text-gold">&amp;</p>
            <p>Mrs. Rahmath Beevi</p>
          </div>
          <p className="mt-2 font-sans text-[12.5px] tracking-wide text-inksoft sm:text-[13.5px]">
            Kamaliyya House, Kaipamangalam, Thrissur
          </p>

          <p className="mx-auto mt-6 max-w-[34ch] font-serif text-[14px] leading-[1.75] text-inksoft sm:text-[15.5px]">
            With the blessings of the Almighty, we are delighted to invite you and your family to join us in
            celebrating a joyful milestone in our lives – the Wedding Reception of our beloved son.
          </p>

          <h1 className="mt-8 font-display font-medium text-ink">
            <span className="block text-[clamp(2rem,8.6vw,2.9rem)] leading-[1.1]">Sayyid Ahmed Mushthaq</span>
            <RuledAmpersand className="my-2" />
            <span className="sr-only">and</span>
            <span className="block text-[clamp(2rem,8.6vw,2.9rem)] leading-[1.1]">Fathima Sana</span>
          </h1>

          <p className="mt-4 font-serif text-[13.5px] leading-relaxed sm:text-[15px]">
            D/o Mr. Ramees P. K. &amp; Mrs. Sajna P.
          </p>
          <p className="mt-1 font-sans text-[12.5px] tracking-wide text-inksoft sm:text-[13.5px]">
            Peringalathil House, Kodaparamba, Kannur
          </p>

          <h2 className="label mt-9 text-[12px] text-ink sm:text-[13px]">Wedding Reception</h2>
          <div className="mt-5">
            <DateBlock />
          </div>

          <GoldDivider className="mt-8" />

          <section aria-label="Venue" className="mt-6">
            <h3 className="label text-[11px] text-inksoft sm:text-xs">Venue</h3>
            <p className="mt-2 font-serif text-[16px] uppercase tracking-[0.08em] sm:text-[17px]">Kamaliyya Nagar,</p>
            <p className="mt-0.5 font-serif text-[14px] text-inksoft sm:text-[15px]">Kaipamangalam, Thrissur</p>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gold/80 px-6 font-sans text-[13px] font-medium uppercase tracking-[0.14em] text-[#7a5a2c] transition-colors duration-200 hover:bg-gold hover:text-cream focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
              <MapPinIcon className="h-4 w-4" />
              View Location
            </a>
          </section>
          <div className="h-2" />
        </ArchCard>
      </motion.div>

      {/* Nikah card */}
      <motion.div {...enter(1.15)} className="relative mt-20 w-[min(76vw,400px)]">
        <LeafSprig flip className="absolute -right-[14%] -top-[6%] z-10 w-[26%] max-w-[110px]" />
        <ArchCard bodyClassName="px-[10%] text-center text-ink">
          <GoldDivider className="-mt-[2%]" />
          <h2 className="mt-4 font-display text-[clamp(2rem,8vw,2.6rem)] font-medium leading-none">Nikah</h2>
          <p className="mt-4 text-balance font-serif text-[14.5px] leading-relaxed sm:text-[16px]">
            on Sunday, 27 December 2026, at 4:00 p.m.
          </p>
          <p className="mt-1 font-serif text-[14.5px] leading-relaxed sm:text-[16px]">at Kannur City Juma Masjid.</p>
          <GoldDivider className="mt-5" />
        </ArchCard>
      </motion.div>

      {/* Credit */}
      <motion.footer {...enter(1.4)} className="mt-20 text-center">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center gap-1.5 font-serif text-[0.75rem] uppercase tracking-[0.28em] text-goldlight/70 transition-colors duration-150 hover:text-goldlight">
          Crafted by
          <InstagramIcon className="ml-1 h-3.5 w-3.5" />
          <span className="text-[0.85rem] font-semibold normal-case tracking-[0.1em] text-goldlight">@niaal._</span>
        </a>
      </motion.footer>
    </div>
  );
}
