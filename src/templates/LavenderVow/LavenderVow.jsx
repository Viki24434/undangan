import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import { data } from './data';
import './LavenderVow.css';

export default function LavenderVow() {
  return (
    <WeddingInvitation
      theme="invitation-lavender"
      data={data}
      components={{
        cover: 2,
        hero: 1,
        couple: 2,
        story: 2,
        countdown: 2,
        gallery: 1,
        gift: 2,
        wishes: 2,
      }}
    />
  );
}
