import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './CelestialMoonStar.css';

export default function CelestialMoonStar() {
  return (
    <WeddingInvitation
      theme="invitation-celestial-moon-star"
      components={{
        cover: 2,
        hero: 2,
        couple: 2,
        story: 2,
        countdown: 2,
        gallery: 3,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
