import PlatinumHeroScene from './PlatinumHeroScene';

export default function CinematicScene({ theme }) {
  const family =
    theme === 'invitation-platinum-aurora' ? 'aurora' : 'champagne';
  return <PlatinumHeroScene family={family} />;
}
