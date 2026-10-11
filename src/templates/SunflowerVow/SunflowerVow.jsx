import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import { data } from './data';
import './SunflowerVow.css';

export default function SunflowerVow() {
  return (
    <WeddingInvitation
      theme="invitation-sunflower"
      data={data}
      components={{
        cover: 1,
        hero: 2,
        couple: 2,
        story: 1,
        countdown: 2,
        gallery: 1,
        gift: 2,
        wishes: 1,
      }}
    />
  );
}
