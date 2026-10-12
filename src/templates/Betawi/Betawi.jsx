import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './Betawi.css';

export default function Betawi() {
  return (
    <WeddingInvitation
      theme="invitation-betawi"
      components={{
        cover: 2,
        hero: 2,
        couple: 1,
        story: 2,
        countdown: 1,
        gallery: 3,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
