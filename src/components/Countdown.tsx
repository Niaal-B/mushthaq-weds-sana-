import { useEffect, useState } from 'react';
import { Reveal, SectionHeading } from './Section';

// Wedding Reception: Sunday 03 January 2027, 12:00 PM India time
const RECEPTION_AT = new Date('2027-01-03T12:00:00+05:30').getTime();

function remaining(now: number) {
  const ms = Math.max(0, RECEPTION_AT - now);
  return {
    done: ms === 0,
    days: Math.floor(ms / 86_400_000),
    hours: Math.floor(ms / 3_600_000) % 24,
    minutes: Math.floor(ms / 60_000) % 60,
    seconds: Math.floor(ms / 1000) % 60,
  };
}

/* One unit, framed as a small gold-outlined arch like the invitation */
function Tile({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="flex w-full max-w-[112px] flex-col items-center rounded-t-[999px] border border-champagne/45 bg-black/10 px-1 pb-3 pt-[38%] sm:pb-4">
        <span className="font-display text-[clamp(1.7rem,7.6vw,2.7rem)] font-medium leading-none tabular-nums text-champagne">
          {String(value).padStart(2, '0')}
        </span>
      </div>
      <span className="mt-2 font-sans text-[10.5px] uppercase tracking-[0.22em] text-champagne/75 sm:text-xs">{label}</span>
    </div>
  );
}

export function Countdown() {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(t);
  }, []);

  const r = remaining(now);

  return (
    <section aria-labelledby="countdown-title" className="velvet-arch relative px-4 py-16 text-champagne sm:py-20">
      <SectionHeading id="countdown-title" tone="light" eyebrow="Counting down to the Wedding Reception" title="Save the Date" />

      <Reveal delay={0.1} className="mx-auto mt-8 max-w-[520px]">
        {r.done ? (
          <p className="text-center font-display text-[clamp(1.3rem,5.6vw,1.8rem)] italic">The celebration has begun</p>
        ) : (
          <div role="timer" aria-label="Time until the Wedding Reception" className="flex gap-2.5 sm:gap-4">
            <Tile value={r.days} label="Days" />
            <Tile value={r.hours} label="Hours" />
            <Tile value={r.minutes} label="Minutes" />
            <Tile value={r.seconds} label="Seconds" />
          </div>
        )}
        <p className="mt-8 text-center font-serif text-[clamp(0.98rem,4vw,1.12rem)] italic text-champagne/90">
          Sunday, 03 January 2027 · 12:00 PM
        </p>
      </Reveal>
    </section>
  );
}
