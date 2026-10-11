import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './TerracottaBloom.css';

export default function TerracottaBloom() {
  return (
    <WeddingInvitation
      theme="invitation-terracotta"
      components={{
        cover: 2,
        hero: 2,
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
