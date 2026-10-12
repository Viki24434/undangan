import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import { data } from './data';
import './PinkBlush.css';

export default function PinkBlush() {
  return (
    <WeddingInvitation
      theme="invitation-pink-blush"
      data={data}
      components={{
        cover: 1,
        hero: 1,
        couple: 3,
        story: 1,
        countdown: 2,
        gallery: 3,
        gift: 1,
        wishes: 2,
      }}
    />
  );
}
