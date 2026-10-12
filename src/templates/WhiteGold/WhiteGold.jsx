import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './WhiteGold.css';

export default function WhiteGold() {
  return (
    <WeddingInvitation
      theme="invitation-white-gold"
      components={{
        cover: 2,
        hero: 2,
        couple: 1,
        story: 2,
        countdown: 1,
        gallery: 1,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
