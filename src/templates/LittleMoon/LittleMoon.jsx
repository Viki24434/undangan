import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import './LittleMoon.css';

export default function LittleMoon() {
  return (
    <CelebrationInvitation
      theme="invitation-little-moon"
      components={{ cover: 1, hero: 2, countdown: 1, gallery: 2, wishes: 1 }}
    />
  );
}
