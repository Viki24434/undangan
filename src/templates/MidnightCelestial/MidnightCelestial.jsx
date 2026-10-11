import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './MidnightCelestial.css';

export default function MidnightCelestial() {
  return (
    <WeddingInvitation
      theme="invitation-midnight"
      components={{
        cover: 1,
        hero: 1,
        couple: 2,
        story: 1,
        countdown: 2,
        gallery: 1,
        gift: 2,
        wishes: 1,
      }}
    />
  );
}
