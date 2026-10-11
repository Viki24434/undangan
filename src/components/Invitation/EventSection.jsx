import CalendarButton from './CalendarButton';
import Countdown1 from '../Countdown/Countdown1/Countdown1';
import Countdown2 from '../Countdown/Countdown2/Countdown2';
import ScrollReveal from '../ScrollReveal/ScrollReveal';

export default function EventSection({ targetDate, events, countdownVariant = 2 }) {
  const Countdown = countdownVariant === 1 ? Countdown1 : Countdown2;

  return (
    <section
      className="invitation-section invitation-events"
      id="invitation-events"
    >
      <ScrollReveal animationClass="animate-soft-rise">
        <span className="invitation-kicker">SAVE THE DATE</span>
        <h2>Hari yang dinantikan</h2>
        <p>Catat waktunya, hadirkan senyummu.</p>
      </ScrollReveal>
      <Countdown targetDate={targetDate} />
      <div className="invitation-event-grid">
        {events.map((event, index) => (
          <ScrollReveal
            as="article"
            className="invitation-event-card"
            animationClass="animate-soft-rise"
            delay={`delay-${Math.min(index * 200, 900)}`}
            key={event.title}
          >
            <span className="invitation-event-number">
              0{index + 1} / THE CELEBRATION
            </span>
            <h3>{event.title}</h3>
            <p className="invitation-event-date">{event.date}</p>
            <p>{event.time}</p>
            <div className="invitation-divider" aria-hidden="true">
              ✧
            </div>
            <strong>{event.venue}</strong>
            <p>{event.address}</p>
            <a
              className="invitation-button invitation-button-outline"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(event.venue + ' ' + event.address)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Lihat lokasi ↗
            </a>
            <CalendarButton event={event} targetDate={targetDate} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
