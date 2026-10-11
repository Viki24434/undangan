import CelebrationInvitation from '../../components/Invitation/CelebrationInvitation';
import { data } from './data';
import './GardenParty.css';

export default function GardenParty() {
  return (
    <CelebrationInvitation
      theme="invitation-garden-party"
      data={data}
      components={{
        cover: 2,
        hero: 1,
        countdown: 2,
        gallery: 1,
        wishes: 2,
      }}
    />
  );
}
