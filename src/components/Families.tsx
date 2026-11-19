import { Reveal, SectionHeading } from './Section';

type FamilyProps = { label: string; father: string; mother: string; home: string };

function Family({ label, father, mother, home }: FamilyProps) {
  return (
    <div className="text-center">
      <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-[#8a6a3a]">{label}</p>
      <p className="mt-3 text-balance font-display text-[clamp(1.2rem,5vw,1.5rem)] leading-[1.35] text-[#5e1a22]">{father}</p>
      <p className="font-display text-[1.3rem] italic leading-[1.5] text-[#9c763f]">&amp;</p>
      <p className="font-display text-[clamp(1.2rem,5vw,1.5rem)] leading-[1.35] text-[#5e1a22]">{mother}</p>
      <p className="mt-3 font-serif text-[clamp(0.92rem,3.8vw,1.02rem)] italic text-[#6b4a35]">{home}</p>
    </div>
  );
}

export function Families() {
  return (
    <section aria-labelledby="families-title" className="px-4 pb-20 pt-4 sm:pb-24">
      <SectionHeading id="families-title" eyebrow="With the blessings of" title="The Families" />

      <Reveal
        delay={0.1}
        className="mx-auto mt-10 grid max-w-[860px] gap-12 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10">
        <Family
          label="Groom's Parents"
          father="Mr. Sayyid Zainudheen Al Bukhari"
          mother="Mrs. Rahmath Beevi"
          home="Kamaliyya House, Kaipamangalam, Thrissur"
        />
        <span aria-hidden="true" className="mx-auto h-px w-24 bg-[#a8834d]/60 md:h-40 md:w-px" />
        <Family
          label="Bride's Parents"
          father="Mr. Ramees P. K."
          mother="Mrs. Sajna P."
          home="Peringalathil House, Kodaparamba, Kannur"
        />
      </Reveal>
    </section>
  );
}
