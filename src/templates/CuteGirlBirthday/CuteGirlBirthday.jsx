import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import './CuteGirlBirthday.css';

export default function CuteGirlBirthday() {
  return (
    <CelebrationInvitation
      theme="invitation-cute-girl-birthday"
      components={{ cover: 2, hero: 2, countdown: 1, gallery: 1, wishes: 2 }}
    />
  );
}
