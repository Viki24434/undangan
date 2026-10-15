import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './RoyalGoldLuxury.css';

export default function RoyalGoldLuxury() {
  return (
    <WeddingInvitation
      theme="invitation-royal-gold-luxury"
      components={{
        cover: 2,
        hero: 2,
        couple: 3,
        story: 2,
        countdown: 2,
        gallery: 3,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
