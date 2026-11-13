import OrnamentDivider from '../Ornament/OrnamentDivider';
import { useInvitationData } from './InvitationContext';
import InvitationLayout from './InvitationLayout';
import EventSection from './EventSection';
import Guestbook from './Guestbook';
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
  const Intro =
    invitationVariants.intro[components.intro] || invitationVariants.intro[1];
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
      <Intro data={data} />
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
