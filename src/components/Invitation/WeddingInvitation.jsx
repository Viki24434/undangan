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
import Gift1 from '../Gift/Gift1/Gift1';
import Gift2 from '../Gift/Gift2/Gift2';
import { ornamentPresets } from '../Ornament/ornamentPresets';
import ScrollReveal from '../ScrollReveal/ScrollReveal';
import OptionalSections from './OptionalSections';

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
    components.gallery === 1
      ? Gallery1
      : components.gallery === 3
        ? Gallery3
        : Gallery2;
  const Gift = components.gift === 1 ? Gift1 : Gift2;
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
      <Couple
        groom={data.groom}
        bride={data.bride}
        decorations={coupleDecorations}
      />
      <Story stories={data.stories} />
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
      <Gallery photos={data.photos} />
      {data.banks?.length > 0 && (
        <>
          {(!invitation || invitation.preview) && (
            <p className="invitation-demo-note">
              Informasi rekening di bawah hanya contoh untuk demo.
            </p>
          )}
          <Gift banks={data.banks} />
        </>
      )}
      <Guestbook initialWishes={data.wishes} variant={components.wishes} />
    </InvitationLayout>
  );
}
