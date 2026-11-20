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
    <aside aria-label="Surah Ar-Rum, verse 21" className="px-4 py-5 sm:py-6">
      <Reveal className="mx-auto max-w-[480px]">
        {/* Compact illumination card: subtle gold hairline with miniature star */}
        <div className="relative rounded-2xl border border-[#a8834d]/30 bg-[#f7f2ea]/75 px-5 py-4 text-center shadow-[0_8px_24px_-12px_rgba(70,20,25,0.12)] backdrop-blur-[2px] sm:px-7 sm:py-5">
          <div className="mx-auto mb-2 flex items-center justify-center gap-2" aria-hidden="true">
            <span className="h-px w-6 bg-[#a8834d]/40" />
            <Star className="h-3.5 w-3.5" />
            <span className="h-px w-6 bg-[#a8834d]/40" />
          </div>

          {/* Ornate Quranic brackets enclose the verse */}
          <p lang="ar" dir="rtl" className="font-quran text-[13.5px] leading-[1.9] text-[#4a141b] sm:text-[15px]">
            {'﴿'}{AYAH_AR}{'﴾'}
          </p>

          <p className="mx-auto mt-2 max-w-[42ch] text-balance font-serif text-[11.5px] italic leading-relaxed text-[#5a4537] sm:text-[12.5px]">
            {AYAH_EN}
          </p>

          <p className="mt-2 font-sans text-[9.5px] uppercase tracking-[0.24em] text-[#8a6a3a]">
            Surah Ar-Rum · 30:21
          </p>
        </div>
      </Reveal>
    </aside>
  );
}
