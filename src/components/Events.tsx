import { CalendarIcon, FleurDivider, MapPinIcon } from './Ornaments';
import { Reveal, SectionHeading } from './Section';
import { showVenue, type VenueKey } from './Venue';

function calendarUrl(title: string, dates: string, location: string) {
  return (
    'https://calendar.google.com/calendar/render?action=TEMPLATE' +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${dates}` +
    `&location=${encodeURIComponent(location)}`
  );
}

type EventCardProps = {
  title: string;
  date: string;
  time: string;
  place: string[];
  calendar: string;
  venue: VenueKey;
};

const buttonClass =
  'inline-flex min-h-[44px] items-center gap-2 rounded-full border border-champagne/60 px-5 font-sans text-[12px] font-medium uppercase tracking-[0.14em] text-champagne transition-colors duration-200 hover:bg-champagne hover:text-[#4a141b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-champagne';

function EventCard({ title, date, time, place, calendar, venue }: EventCardProps) {
  return (
    <article
      className="velvet-arch flex h-full flex-col items-center rounded-t-[999px] px-[9%] pb-10 pt-[26%] text-center text-champagne"
      style={{ boxShadow: '0 24px 48px -20px rgba(70,20,25,0.45)' }}>
      <h3 className="font-display text-[clamp(1.75rem,7.2vw,2.3rem)] font-medium leading-[1.2]">
        <span className="gold-ink">{title}</span>
      </h3>
      <FleurDivider className="mt-2" />
      <p className="mt-5 font-display text-[clamp(1.1rem,4.6vw,1.3rem)]">{date}</p>
      <p className="mt-1 font-serif text-[clamp(0.98rem,4vw,1.1rem)] italic text-champagne/85">{time}</p>
      <div className="mt-4 font-serif text-[15px] leading-relaxed text-champagne/95 sm:text-base">
        {place.map((line) => (
          <p key={line}>{line}</p>
        ))}
      </div>
      <div className="mt-auto flex flex-wrap justify-center gap-3 pt-7">
        <a href={calendar} target="_blank" rel="noopener noreferrer" className={buttonClass}>
          <CalendarIcon className="h-4 w-4" />
          Add to Calendar
        </a>
        <a
          href="#venue"
          onClick={(e) => {
            e.preventDefault();
            showVenue(venue);
          }}
          className={buttonClass}>
          <MapPinIcon className="h-4 w-4" />
          Location
        </a>
      </div>
    </article>
  );
}

export function Events() {
  return (
    <section aria-labelledby="events-title" className="px-4 py-16 sm:py-24">
      <SectionHeading id="events-title" eyebrow="Join us for" title="The Celebrations" />

      <div className="mx-auto mt-12 grid max-w-[880px] gap-10 md:grid-cols-2 md:gap-8">
        <Reveal className="mx-auto w-full max-w-[400px]">
          <EventCard
            title="Nikah"
            date="Sunday, 27 December 2026"
            time="at 4:00 p.m."
            place={['Bhanus Beach Enclave,', 'Payyambalam Beach Road, Kannur']}
            // 4:00 PM IST; calendar entries need an end, so it is set an hour later
            calendar={calendarUrl('Nikah of Sayyid Ahmed Mushthaq & Fathima Sana', '20261227T103000Z/20261227T113000Z', 'Bhanus Beach Enclave, Payyambalam Beach Road, Kannur')}
            venue="nikah"
          />
        </Reveal>
        <Reveal delay={0.12} className="mx-auto w-full max-w-[400px]">
          <EventCard
            title="Wedding Reception"
            date="Sunday, 03 January 2027"
            time="12:00 PM to 06:00 PM"
            place={['Kamaliyya Nagar,', 'Kaipamangalam, Thrissur']}
            calendar={calendarUrl(
              'Wedding Reception of Sayyid Ahmed Mushthaq & Fathima Sana',
              '20270103T063000Z/20270103T123000Z',
              'Kamaliyya Nagar, Kaipamangalam, Thrissur',
            )}
            venue="reception"
          />
        </Reveal>
      </div>
    </section>
  );
}
