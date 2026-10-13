import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import './BlackGoldLuxuryBirthday.css';

export default function BlackGoldLuxuryBirthday() {
  return (
    <CelebrationInvitation
      theme="invitation-black-gold-luxury-birthday"
      components={{ cover: 2, hero: 2, countdown: 2, gallery: 3, wishes: 2 }}
    />
  );
}
