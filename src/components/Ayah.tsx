import { FleurDivider } from './Ornaments';
import { Reveal } from './Section';

// Surah Ar-Rum 30:21. Uthmani text and Sahih International translation (via api.alquran.cloud)
const AYAH_AR = "وَمِنْ ءَايَٰتِهِۦٓ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَٰجًۭا لِّتَسْكُنُوٓا۟ إِلَيْهَا وَجَعَلَ بَيْنَكُم مَّوَدَّةًۭ وَرَحْمَةً ۚ إِنَّ فِى ذَٰلِكَ لَءَايَٰتٍۢ لِّقَوْمٍۢ يَتَفَكَّرُونَ";
const AYAH_EN = "“And of His signs is that He created for you from yourselves mates that you may find tranquillity in them; and He placed between you affection and mercy. Indeed in that are signs for a people who give thought.”";

/* Eight-pointed star (two overlapping squares), a classic Islamic illumination motif */
function Star({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="-10 -10 20 20" className={className} aria-hidden="true">
      <g fill="#ece2d0" stroke="#a8834d" strokeWidth="0.9">
        <rect x="-6" y="-6" width="12" height="12" />
        <rect x="-6" y="-6" width="12" height="12" transform="rotate(45)" />
      </g>
      <circle r="2" fill="#a8834d" />
    </svg>
  );
}

export function Ayah() {
  return (
    <section aria-label="Surah Ar-Rum, verse 21" className="px-4 pb-16 pt-4 sm:pb-24">
      <Reveal className="relative mx-auto max-w-[640px]">
        {/* Manuscript-style frame: fine double gold rule with star ornaments */}
        <div className="relative border border-[#a8834d]/70 px-[7%] pb-12 pt-14 text-center sm:px-14">
          <span aria-hidden="true" className="pointer-events-none absolute inset-[6px] border border-[#a8834d]/35" />
          <Star className="absolute -left-[10px] -top-[10px] h-5 w-5" />
          <Star className="absolute -right-[10px] -top-[10px] h-5 w-5" />
          <Star className="absolute -bottom-[10px] -left-[10px] h-5 w-5" />
          <Star className="absolute -bottom-[10px] -right-[10px] h-5 w-5" />
          <span aria-hidden="true" className="absolute -top-[17px] left-1/2 -translate-x-1/2">
            <Star className="h-8 w-8" />
          </span>

          {/* Ornate Quranic brackets enclose the verse */}
          <p lang="ar" dir="rtl" className="font-quran text-[clamp(1.35rem,5.6vw,1.95rem)] leading-[2.15] text-[#4a141b]">
            {'﴿'}{AYAH_AR}{'﴾'}
          </p>

          <FleurDivider tone="dark" className="mt-6" />

          <p className="mx-auto mt-5 max-w-[42ch] text-balance font-serif text-[clamp(0.98rem,4vw,1.1rem)] italic leading-[1.8] text-[#4f3a2c]">
            {AYAH_EN}
          </p>
          <p className="mt-5 font-sans text-[11px] uppercase tracking-[0.24em] text-[#8a6a3a]">Surah Ar-Rum · 30:21</p>
        </div>
      </Reveal>
    </section>
  );
}
