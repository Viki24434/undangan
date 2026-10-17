import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import '../../components/Platinum/Platinum.css';
import './PlatinumAurora.css';

export default function PlatinumAurora() {
  return (
    <WeddingInvitation
      theme="invitation-platinum-aurora"
      components={{
        cover: 3,
        hero: 3,
        couple: 3,
        story: 2,
        countdown: 3,
        gallery: 4,
        gift: 2,
        wishes: 2,
        experience: 'platinum',
      }}
    />
  );
}
