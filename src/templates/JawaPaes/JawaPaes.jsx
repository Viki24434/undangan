import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import { data } from './data';
import './JawaPaes.css';

export default function JawaPaes() {
  return (
    <WeddingInvitation
      theme="invitation-jawa-paes"
      data={data}
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
