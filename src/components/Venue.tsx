import { useEffect, useState } from 'react';
import { Lily, MapPinIcon } from './Ornaments';
import { Reveal, SectionHeading } from './Section';

export type VenueKey = 'nikah' | 'reception';

/* Each venue's map pin is the place its Google Maps short link resolves to */
const VENUES: Record<VenueKey, { tab: string; lines: [string, string]; query: string; mapsUrl: string }> = {
  nikah: {
    tab: 'Nikah',
    lines: ['Bhanus Beach Enclave,', 'Payyambalam Beach Road, Kannur'],
    query: 'Bhanus Beach Enclave, Palliyanmoola, Payyambalam Beach Road, Kannur, Kerala 670008',
    mapsUrl: 'https://maps.app.goo.gl/pK6QS686iGuwvcHFA?g_st=ic',
  },
  reception: {
    tab: 'Wedding Reception',
    lines: ['Kamaliyya Nagar,', 'Kaipamangalam, Thrissur'],
    query: '84VP+GPG Kamaliyya Sunni Juma Masjid, Kaipamangalam, Thrissur, Kerala 680681',
    mapsUrl: 'https://maps.app.goo.gl/3vEgRAeFaBE8AWNc7?g_st=ic',
  },
};

const embedUrl = (query: string) => `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=16&output=embed`;

const SELECT_EVENT = 'venue:select';

/* Lets the event cards scroll to this section with their venue already chosen */
export function showVenue(key: VenueKey) {
  window.dispatchEvent(new CustomEvent<VenueKey>(SELECT_EVENT, { detail: key }));
  document.getElementById('venue')?.scrollIntoView({ behavior: 'smooth' });
}

export function Venue() {
  const [active, setActive] = useState<VenueKey>('reception');
  const venue = VENUES[active];

  useEffect(() => {
    const onSelect = (e: Event) => setActive((e as CustomEvent<VenueKey>).detail);
    window.addEventListener(SELECT_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_EVENT, onSelect);
  }, []);

  return (
    <section id="venue" aria-labelledby="venue-title" className="scroll-mt-6 px-4 py-16 sm:py-24">
      <SectionHeading id="venue-title" eyebrow="Find your way to" title="The Venues" />

      {/* Venue switch */}
      <Reveal className="mt-8 flex justify-center">
        <div role="tablist" aria-label="Choose a venue" className="inline-flex rounded-full border border-[#a8834d]/60 p-1">
          {(['nikah', 'reception'] as const).map((key) => {
            const selected = key === active;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls="venue-panel"
                onClick={() => setActive(key)}
                className={`min-h-[40px] rounded-full px-4 font-sans text-[12px] font-medium uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a141b] sm:px-5 ${
                  selected ? 'velvet-arch text-champagne shadow-[0_6px_16px_-8px_rgba(70,20,25,0.7)]' : 'text-[#6b4a35] hover:text-[#4a141b]'
                }`}>
                {VENUES[key].tab}
              </button>
            );
          })}
        </div>
      </Reveal>

      <div id="venue-panel" role="tabpanel" aria-label={venue.tab}>
        <Reveal delay={0.1} className="relative mx-auto mt-10 w-[min(84vw,460px)]">
          {/* The map, seen through an arch window framed in velvet and gold */}
          <div className="velvet-arch rounded-t-[999px] p-[7px]" style={{ boxShadow: '0 24px 48px -20px rgba(70,20,25,0.45)' }}>
            <div className="overflow-hidden rounded-t-[999px] border border-champagne/60">
              <iframe
                key={active}
                title={`Map showing ${venue.lines.join(' ')}`}
                src={embedUrl(venue.query)}
                className="block aspect-[4/5] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
          <Lily rotate={-12} className="absolute -right-[12%] -top-[3%] w-[32%] max-w-[150px]" />
        </Reveal>

        <div className="mt-8 text-center">
          <p className="font-serif text-[clamp(0.92rem,3.8vw,1.05rem)] italic text-[#8a6a3a]">{venue.tab}</p>
          <p className="mt-1 font-serif text-[clamp(1.2rem,5vw,1.45rem)] leading-snug text-[#4a141b]">{venue.lines[0]}</p>
          <p className="font-serif text-[clamp(1.05rem,4.4vw,1.25rem)] leading-snug text-[#6b4a35]">{venue.lines[1]}</p>
          <a
            href={venue.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="velvet-arch mt-6 inline-flex min-h-[48px] items-center gap-2 rounded-full px-7 font-sans text-[13px] font-medium uppercase tracking-[0.16em] text-champagne shadow-[0_12px_28px_-12px_rgba(70,20,25,0.7)] transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4a141b]">
            <MapPinIcon className="h-4 w-4" />
            Get Directions
          </a>
        </div>
      </div>
    </section>
  );
}
