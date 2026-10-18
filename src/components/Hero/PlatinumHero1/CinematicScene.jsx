import PlatinumHeroScene from './PlatinumHeroScene';
import { platinumScenes } from '../../../config/platinumScenes';

export default function CinematicScene({ theme }) {
  const scene =
    platinumScenes[theme] || platinumScenes['invitation-platinum-champagne'];
  return <PlatinumHeroScene family={scene.family} layers={scene.layers} />;
}
