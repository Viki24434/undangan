import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import './EmeraldKhitan.css';

export default function EmeraldKhitan() {
  return (
    <CelebrationInvitation
      theme="invitation-emerald"
      components={{ cover: 2, hero: 1, countdown: 2, gallery: 1, wishes: 2 }}
    />
  );
}
