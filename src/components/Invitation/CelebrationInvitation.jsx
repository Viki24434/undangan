import { useInvitationData } from './InvitationContext';
import InvitationLayout from './InvitationLayout';
import EventSection from './EventSection';
import InvitationGallery from './InvitationGallery';
import Guestbook from './Guestbook';

export default function CelebrationInvitation({ theme, data: defaults }) {
  const data = useInvitationData(defaults);
  return (
    <InvitationLayout
      theme={theme}
      title={data.title}
      subtitle={data.subtitle}
      image={data.image}
      date={data.date}
      monogram={data.monogram}
    >
      <section
        className="invitation-section invitation-intro"
        id="invitation-intro"
      >
        <span className="celebration-symbol" aria-hidden="true">
          {data.symbol}
        </span>
        <span className="invitation-kicker">{data.eyebrow}</span>
        <h2>{data.heading}</h2>
        <p>{data.introduction}</p>
        <div className="celebration-honoree">
          <span>{data.honoreeLabel}</span>
          <h3>{data.honoree}</h3>
          <p>{data.family}</p>
        </div>
        <div className="celebration-notes">
          {data.notes.map((note) => (
            <article key={note.title}>
              <span>{note.title}</span>
              <strong>{note.description}</strong>
            </article>
          ))}
        </div>
      </section>
      <EventSection targetDate={data.targetDate} events={data.events} />
      <InvitationGallery photos={data.photos} />
      <Guestbook initialWishes={data.wishes} />
    </InvitationLayout>
  );
}
