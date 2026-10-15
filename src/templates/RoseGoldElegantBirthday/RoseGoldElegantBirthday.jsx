import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import './RoseGoldElegantBirthday.css';

export default function RoseGoldElegantBirthday() {
  return (
    <CelebrationInvitation
      theme="invitation-rose-gold-elegant-birthday"
      components={{ cover: 2, hero: 2, countdown: 2, gallery: 3, wishes: 2 }}
    />
  );
}
