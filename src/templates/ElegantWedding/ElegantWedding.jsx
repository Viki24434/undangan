import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './ElegantWedding.css';

export default function ElegantWedding() {
  return (
    <WeddingInvitation
      theme="invitation-gold"
      components={{
        cover: 2,
        hero: 2,
        couple: 2,
        story: 2,
        countdown: 2,
        gallery: 2,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
