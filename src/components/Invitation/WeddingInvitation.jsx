import { useInvitation, useInvitationData } from './InvitationContext';
import InvitationLayout from './InvitationLayout';
import EventSection from './EventSection';
import Guestbook from './Guestbook';
import Couple1 from '../Couple/Couple1/Couple1';
import Couple2 from '../Couple/Couple2/Couple2';
import Story1 from '../Story/Story1/Story1';
import Story2 from '../Story/Story2/Story2';
import Gallery1 from '../Gallery/Gallery1/Gallery1';
import Gallery2 from '../Gallery/Gallery2/Gallery2';
import Gift1 from '../Gift/Gift1/Gift1';
import Gift2 from '../Gift/Gift2/Gift2';

export default function WeddingInvitation({
  theme,
  data: defaults,
  components = {},
}) {
  const data = useInvitationData(defaults);
  const invitation = useInvitation();
  const Couple = components.couple === 1 ? Couple1 : Couple2;
  const Story = components.story === 1 ? Story1 : Story2;
  const Gallery = components.gallery === 1 ? Gallery1 : Gallery2;
  const Gift = components.gift === 1 ? Gift1 : Gift2;

  return (
    <InvitationLayout
      theme={theme}
      title={`${data.groom.name} & ${data.bride.name}`}
      subtitle="THE WEDDING CELEBRATION"
      image={data.image}
      date={data.date}
      monogram={`${data.groom.name[0]} / ${data.bride.name[0]}`}
      variants={components}
    >
      <section
        className="invitation-section invitation-intro"
        id="invitation-intro"
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
      </section>
      <Couple groom={data.groom} bride={data.bride} />
      <Story stories={data.stories} />
      <EventSection
        targetDate={data.targetDate}
        events={data.events}
        countdownVariant={components.countdown}
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
