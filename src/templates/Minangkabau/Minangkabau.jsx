import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './Minangkabau.css';

export default function Minangkabau() {
  return (
    <WeddingInvitation
      theme="invitation-minangkabau"
      components={{
        cover: 2,
        hero: 2,
        couple: 3,
        story: 2,
        countdown: 2,
        gallery: 3,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
