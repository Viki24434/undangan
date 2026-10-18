import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import { data } from '../JawaPaes/data';
import '../../styles/platinum.css';
import '../../styles/platinumAdat.css';
import './PlatinumJawa.css';

export default function PlatinumJawa() {
  return (
    <WeddingInvitation
      theme="invitation-platinum-jawa"
      data={data}
      components={{
        cover: 3,
        hero: 3,
        couple: 3,
        story: 2,
        countdown: 3,
        gallery: 4,
        gift: 2,
        wishes: 2,
        experience: 'platinum',
        adat: true,
      }}
    />
  );
}
