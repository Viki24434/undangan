import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import './Birthday.css';

export default function Birthday() {
  return (
    <CelebrationInvitation
      theme="invitation-birthday"
      components={{ cover: 1, hero: 1, countdown: 1, gallery: 1, wishes: 1 }}
    />
  );
}
