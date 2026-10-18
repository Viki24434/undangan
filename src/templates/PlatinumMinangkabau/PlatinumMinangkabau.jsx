import WeddingInvitation from '../../components/Invitation/WeddingInvitation';
import '../../styles/platinum.css';
import '../../styles/platinumAdat.css';
import './PlatinumMinangkabau.css';

export default function PlatinumMinangkabau() {
  return (
    <WeddingInvitation
      theme="invitation-platinum-minangkabau"
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
