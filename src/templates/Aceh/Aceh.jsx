import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './Aceh.css';

export default function Aceh() {
  return (
    <WeddingInvitation
      theme="invitation-aceh"
      components={{
        cover: 2,
        hero: 2,
        couple: 3,
        story: 2,
        countdown: 1,
        gallery: 3,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
