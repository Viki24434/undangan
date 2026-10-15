import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import './CuteBoyBirthday.css';

export default function CuteBoyBirthday() {
  return (
    <CelebrationInvitation
      theme="invitation-cute-boy-birthday"
      components={{ cover: 2, hero: 1, countdown: 1, gallery: 2, wishes: 2 }}
    />
  );
}
