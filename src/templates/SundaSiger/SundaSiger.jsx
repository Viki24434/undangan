import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import { data } from './data';
import './SundaSiger.css';

export default function SundaSiger() {
  return (
    <WeddingInvitation
      theme="invitation-sunda-siger"
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
