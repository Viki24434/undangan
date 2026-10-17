import OrnamentDivider from '../Ornament/OrnamentDivider';
import { useInvitation, useInvitationData } from './InvitationContext';
import InvitationLayout from './InvitationLayout';
import EventSection from './EventSection';
import Guestbook from './Guestbook';
import Couple1 from '../Couple/Couple1/Couple1';
import Couple2 from '../Couple/Couple2/Couple2';
import Couple3 from '../Couple/Couple3/Couple3';
import Story1 from '../Story/Story1/Story1';
import Story2 from '../Story/Story2/Story2';
import Gallery1 from '../Gallery/Gallery1/Gallery1';
import Gallery2 from '../Gallery/Gallery2/Gallery2';
import Gallery3 from '../Gallery/Gallery3/Gallery3';
import Gallery4 from '../Gallery/Gallery4/Gallery4';
import Gift1 from '../Gift/Gift1/Gift1';
import Gift2 from '../Gift/Gift2/Gift2';
import { ornamentPresets } from '../Ornament/ornamentPresets';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import OptionalSections from './OptionalSections';
import PlatinumChapter from '../Animation/PlatinumChapter/PlatinumChapter';
import PlatinumGallery1 from '../Gallery/PlatinumGallery1/PlatinumGallery1';

export default function WeddingInvitation({
  theme,
  data: defaults,
  components = {},
}) {
  const data = useInvitationData(defaults);
  const invitation = useInvitation();
  const Couple =
    components.couple === 1
      ? Couple1
      : components.couple === 3
        ? Couple3
        : Couple2;
  const Story = components.story === 1 ? Story1 : Story2;
  const Gallery =
    components.gallery === 4
      ? Gallery4
      : components.gallery === 1
        ? Gallery1
        : components.gallery === 3
          ? Gallery3
          : Gallery2;
  const Gift = components.gift === 1 ? Gift1 : Gift2;
  const coupleDecorations = ornamentPresets[theme]?.couple;
  const animated = components.experience === 'platinum';

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
