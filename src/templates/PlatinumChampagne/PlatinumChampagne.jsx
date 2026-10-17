import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import '../../styles/platinum.css';
import './PlatinumChampagne.css';

export default function PlatinumChampagne() {
  return (
    <WeddingInvitation
      theme="invitation-platinum-champagne"
      components={{
        cover: 3,
        hero: 3,
        couple: 1,
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
