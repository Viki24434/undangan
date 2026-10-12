import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './BlackGold.css';

export default function BlackGold() {
  return (
    <WeddingInvitation
      theme="invitation-black-gold"
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
