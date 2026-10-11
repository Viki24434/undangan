import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './RoseRomance.css';

export default function RoseRomance() {
  return (
    <WeddingInvitation
      theme="invitation-rose"
      components={{
        cover: 2,
        hero: 2,
        couple: 1,
        story: 2,
        countdown: 1,
        gallery: 2,
        gift: 1,
        wishes: 2,
      }}
    />
  );
}
