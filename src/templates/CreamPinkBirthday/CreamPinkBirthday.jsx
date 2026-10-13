import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import './CreamPinkBirthday.css';

export default function CreamPinkBirthday() {
  return (
    <CelebrationInvitation
      theme="invitation-cream-pink-birthday"
      components={{ cover: 2, hero: 2, countdown: 1, gallery: 2, wishes: 2 }}
    />
  );
}
