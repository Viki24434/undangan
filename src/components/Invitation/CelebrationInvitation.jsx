import { useInvitationData } from './InvitationContext';
import InvitationLayout from './InvitationLayout';
import EventSection from './EventSection';
import InvitationGallery from './InvitationGallery';
import Guestbook from './Guestbook';
import Gallery1 from '../Gallery/Gallery1/Gallery1';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import OptionalSections from './OptionalSections';

export default function CelebrationInvitation({
  theme,
  data: defaults,
  components = {},
}) {
  const data = useInvitationData(defaults);
  return (
    <InvitationLayout
      theme={theme}
      title={data.title}
      subtitle={data.subtitle}
      image={data.image}
      images={data.photos}
      sunlightEnabled={data.sunlightEnabled}
      date={data.date}
      monogram={data.monogram}
      variants={components}
    >
      <ScrollReveal
        as="section"
        className="invitation-section invitation-intro"
        id="invitation-intro"
        animationClass="animate-blur-reveal"
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
      </ScrollReveal>
      <EventSection
        targetDate={data.targetDate}
        events={data.events}
        countdownVariant={components.countdown}
      />
      <OptionalSections
        agenda={data.agenda}
        videoUrl={data.videoUrl}
        prayers={data.prayers}
      />
      {components.gallery === 1 ? (
        <Gallery1 photos={data.photos} />
      ) : (
        <InvitationGallery photos={data.photos} />
      )}
      <Guestbook initialWishes={data.wishes} variant={components.wishes} />
    </InvitationLayout>
  );
}
