import CalendarButton from './CalendarButton';
import Countdown1 from '../Countdown/Countdown1/Countdown1';

export default function EventSection({ targetDate, events }) {
  return (
    <section
      className="invitation-section invitation-events"
      id="invitation-events"
    >
      <span className="invitation-kicker">SAVE THE DATE</span>
      <h2>Hari yang dinantikan</h2>
      <p>Catat waktunya, hadirkan senyummu.</p>
      <Countdown1 targetDate={targetDate} />
      <div className="invitation-event-grid">
        {events.map((event, index) => (
          <article className="invitation-event-card" key={event.title}>
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
          </article>
        ))}
      </div>
    </section>
  );
}
