import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import { data } from './data';
import './BurgundyVow.css';

export default function BurgundyVow() {
  return (
    <WeddingInvitation
      theme="invitation-burgundy"
      data={data}
      components={{
        cover: 2,
        hero: 2,
        couple: 3,
        story: 2,
        countdown: 1,
        gallery: 3,
        gift: 2,
        wishes: 1,
      }}
    />
  );
}
