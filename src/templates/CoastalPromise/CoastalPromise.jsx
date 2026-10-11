import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import { data } from './data';
import './CoastalPromise.css';

export default function CoastalPromise() {
  return (
    <WeddingInvitation
      theme="invitation-coastal"
      data={data}
      components={{
        cover: 1,
        hero: 2,
        couple: 1,
        story: 2,
        countdown: 1,
        gallery: 2,
        gift: 1,
        wishes: 1,
      }}
    />
  );
}
