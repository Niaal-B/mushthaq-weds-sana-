import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { FleurDivider } from './Ornaments';

const EASE = [0.23, 1, 0.32, 1] as const;

/* Fades content up once as it scrolls into view */
export function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: reduce ? 0.3 : 0.9, delay: reduce ? 0 : delay, ease: EASE }}>
      {children}
    </motion.div>
  );
}

type HeadingProps = {
  eyebrow: string;
  title: string;
  /* "light" for headings sitting on velvet, "dark" for cream paper */
  tone?: 'light' | 'dark';
  id?: string;
};

/* Section title: small italic eyebrow, serif title, fleur divider */
export function SectionHeading({ eyebrow, title, tone = 'dark', id }: HeadingProps) {
  const light = tone === 'light';
  return (
    <Reveal className="text-center">
      <p className={`font-serif text-[clamp(0.92rem,3.8vw,1.05rem)] italic ${light ? 'text-champagne/80' : 'text-[#8a6a3a]'}`}>
        {eyebrow}
      </p>
      <h2
        id={id}
        className={`mt-1 font-display text-[clamp(2rem,8.4vw,2.9rem)] font-medium leading-[1.2] ${light ? '' : 'text-[#5e1a22]'}`}>
        {light ? <span className="gold-ink">{title}</span> : title}
      </h2>
      <FleurDivider tone={tone} className="mt-2" />
    </Reveal>
  );
}
