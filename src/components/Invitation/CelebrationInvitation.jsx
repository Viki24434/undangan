import OrnamentDivider from '../Ornament/OrnamentDivider';
import AnimatedText from '../AnimatedText/AnimatedText';
import { useInvitationData } from './InvitationContext';
import InvitationLayout from './InvitationLayout';
import EventSection from './EventSection';
import Guestbook from './Guestbook';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import OptionalSections from './OptionalSections';
import { invitationVariants } from './invitationVariants';
import useTemplateComponents from './useTemplateComponents';

export default function CelebrationInvitation({
  theme,
  data: defaults,
  components: componentDefaults = {},
}) {
  const data = useInvitationData(defaults);
  const components = useTemplateComponents(componentDefaults, theme);
  const Gallery =
    invitationVariants.gallery[components.gallery] ||
    invitationVariants.gallery[0];
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
        <h2>
          <AnimatedText text={data.heading} effect="type" />
        </h2>
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
      <OrnamentDivider theme={theme} section="events" />
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
      <OrnamentDivider theme={theme} section="gallery" />
      <Gallery photos={data.photos} />
      <OrnamentDivider theme={theme} section="wishes" />
      <Guestbook initialWishes={data.wishes} variant={components.wishes} />
    </InvitationLayout>
  );
}
