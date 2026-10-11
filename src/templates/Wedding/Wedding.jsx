import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import './Wedding.css';

export default function Wedding() {
  return (
    <WeddingInvitation
      theme="invitation-botanical"
      components={{
        cover: 1,
        hero: 1,
        couple: 1,
        story: 1,
        countdown: 1,
        gallery: 1,
        gift: 1,
        wishes: 1,
      }}
    />
  );
}
