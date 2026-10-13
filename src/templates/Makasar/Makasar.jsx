import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './Makasar.css';

export default function Makasar() {
  return (
    <WeddingInvitation
      theme="invitation-makasar"
      components={{
        cover: 2,
        hero: 2,
        couple: 1,
        story: 2,
        countdown: 1,
        gallery: 2,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
