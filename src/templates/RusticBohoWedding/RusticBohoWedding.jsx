import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './RusticBohoWedding.css';

export default function RusticBohoWedding() {
  return (
    <WeddingInvitation
      theme="invitation-rustic-boho"
      components={{
        cover: 2,
        hero: 2,
        couple: 1,
        story: 1,
        countdown: 1,
        gallery: 2,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
