import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './IslamicElegantWedding.css';

export default function IslamicElegantWedding() {
  return (
    <WeddingInvitation
      theme="invitation-islamic-elegant"
      components={{
        cover: 2,
        hero: 2,
        couple: 3,
        story: 2,
        countdown: 2,
        gallery: 2,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
