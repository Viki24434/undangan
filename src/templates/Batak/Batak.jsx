import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './Batak.css';

export default function Batak() {
  return (
    <WeddingInvitation
      theme="invitation-batak"
      components={{
        cover: 2,
        hero: 2,
        couple: 2,
        story: 1,
        countdown: 2,
        gallery: 1,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
