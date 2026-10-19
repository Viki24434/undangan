import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import '../../styles/platinum.css';
import '../../styles/platinumAdat.css';
import './PlatinumNusantara.css';

export default function PlatinumNusantara() {
  return (
    <WeddingInvitation
      theme="invitation-platinum-nusantara"
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
