import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './IvoryPearl.css';

export default function IvoryPearl() {
  return (
    <WeddingInvitation
      theme="invitation-ivory"
      components={{
        cover: 1,
        hero: 1,
        couple: 2,
        story: 2,
        countdown: 1,
        gallery: 2,
        gift: 1,
        wishes: 2,
      }}
    />
  );
}
