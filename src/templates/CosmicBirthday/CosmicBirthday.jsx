import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import './CosmicBirthday.css';

export default function CosmicBirthday() {
  return (
    <CelebrationInvitation
      theme="invitation-cosmic"
      components={{ cover: 2, hero: 2, countdown: 2, gallery: 2, wishes: 2 }}
    />
  );
}
