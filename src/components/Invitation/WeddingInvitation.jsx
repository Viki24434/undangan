import OrnamentDivider from '../Ornament/OrnamentDivider';
import { useInvitation, useInvitationData } from './InvitationContext';
import InvitationLayout from './InvitationLayout';
import EventSection from './EventSection';
import Guestbook from './Guestbook';
import { invitationVariants } from './invitationVariants';
import { ornamentPresets } from '../Ornament/ornamentPresets';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import OptionalSections from './OptionalSections';
import PlatinumChapter from '../Animation/PlatinumChapter/PlatinumChapter';
import PlatinumGallery1 from '../Gallery/PlatinumGallery1/PlatinumGallery1';
import useTemplateComponents from './useTemplateComponents';

export default function WeddingInvitation({
  theme,
  data: defaults,
  components: componentDefaults = {},
}) {
  const data = useInvitationData(defaults);
  const invitation = useInvitation();
  const components = useTemplateComponents(componentDefaults, theme, true);
  const animated = components.experience === 'platinum';
  const Couple =
    invitationVariants.couple[components.couple] ||
    invitationVariants.couple[2];
  const Story =
    invitationVariants.story[components.story] || invitationVariants.story[2];
  const Gallery =
    invitationVariants.gallery[components.gallery] ||
    invitationVariants.gallery[2];
  const Gift =
    invitationVariants.gift[components.gift] || invitationVariants.gift[2];
  const coupleDecorations = ornamentPresets[theme]?.couple;

  return (
    <InvitationLayout
      theme={theme}
      title={`${data.groom.name} & ${data.bride.name}`}
      subtitle="THE WEDDING CELEBRATION"
      image={data.image}
      images={data.photos}
      sunlightEnabled={data.sunlightEnabled}
      date={data.date}
      monogram={`${data.groom.name[0]} / ${data.bride.name[0]}`}
      variants={components}
    >
      {animated && (
        <PlatinumGallery1
          image={data.image}
          images={data.photos}
          title={invitation?.title || `${data.groom.name} & ${data.bride.name}`}
          theme={theme}
        />
      )}
      <PlatinumChapter enabled={animated} theme={theme} chapter="intro">
        <ScrollReveal
          as="section"
          className="invitation-section invitation-intro"
          id="invitation-intro"
          animationClass="animate-blur-reveal"
        >
          <span className="invitation-kicker">
            TWO HEARTS, ONE BEAUTIFUL JOURNEY
          </span>
          <h2>
            Berawal dari cinta,
            <br />
            <em>bertumbuh bersama.</em>
          </h2>
          <span className="invitation-divider" aria-hidden="true">
            ✧
          </span>
          <p>
            Dengan penuh rasa syukur dan kebahagiaan, kami mengundang
            Bapak/Ibu/Saudara/i untuk menjadi bagian dari awal perjalanan kami.
          </p>
        </ScrollReveal>
      </PlatinumChapter>
      <PlatinumChapter enabled={animated} theme={theme} chapter="couple">
        <Couple
          groom={data.groom}
          bride={data.bride}
          decorations={coupleDecorations}
        />
      </PlatinumChapter>
      <OrnamentDivider theme={theme} section="story" />
      <PlatinumChapter enabled={animated} theme={theme} chapter="story">
        <Story stories={data.stories} />
      </PlatinumChapter>
      <OrnamentDivider theme={theme} section="events" />
      <PlatinumChapter enabled={animated} theme={theme} chapter="events">
        <EventSection
          targetDate={data.targetDate}
          events={data.events}
          countdownVariant={components.countdown}
        />
      </PlatinumChapter>
      <OptionalSections
        theme={theme}
        animated={animated}
        agenda={data.agenda}
        videoUrl={data.videoUrl}
        prayers={data.prayers}
      />
      <OrnamentDivider theme={theme} section="gallery" />
      <PlatinumChapter enabled={animated} theme={theme} chapter="gallery">
        <Gallery photos={data.photos} />
      </PlatinumChapter>
      {data.banks?.length > 0 && (
        <PlatinumChapter enabled={animated} theme={theme} chapter="gift">
          {(!invitation || invitation.preview) && (
            <p className="invitation-demo-note">
              Informasi rekening di bawah hanya contoh untuk demo.
            </p>
          )}
          <Gift banks={data.banks} />
        </PlatinumChapter>
      )}
      <OrnamentDivider theme={theme} section="wishes" />
      <PlatinumChapter enabled={animated} theme={theme} chapter="wishes">
        <Guestbook initialWishes={data.wishes} variant={components.wishes} />
      </PlatinumChapter>
    </InvitationLayout>
  );
}
