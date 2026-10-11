import { useInvitation, useInvitationData } from './InvitationContext';
import InvitationLayout from './InvitationLayout';
import EventSection from './EventSection';
import InvitationGallery from './InvitationGallery';
import Guestbook from './Guestbook';
import Couple1 from '../Couple/Couple1/Couple1';
import Story1 from '../Story/Story1/Story1';
import Gift1 from '../Gift/Gift1/Gift1';

export default function WeddingInvitation({ theme, data: defaults }) {
  const data = useInvitationData(defaults);
  const invitation = useInvitation();
  return (
    <InvitationLayout
      theme={theme}
      title={`${data.groom.name} & ${data.bride.name}`}
      subtitle="THE WEDDING CELEBRATION"
      image={data.image}
      date={data.date}
      monogram={`${data.groom.name[0]} / ${data.bride.name[0]}`}
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
      <Couple1 groom={data.groom} bride={data.bride} />
      <Story1 stories={data.stories} />
      <EventSection targetDate={data.targetDate} events={data.events} />
      <InvitationGallery photos={data.photos} />
      {data.banks?.length > 0 && (
        <>
          {(!invitation || invitation.preview) && (
            <p className="invitation-demo-note">
              Informasi rekening di bawah hanya contoh untuk demo.
            </p>
          )}
          <Gift1 banks={data.banks} />
        </>
      )}
      <Guestbook initialWishes={data.wishes} />
    </InvitationLayout>
  );
}
