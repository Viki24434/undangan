import ChampagneScene from './ChampagneScene';

export default function CinematicScene({ theme }) {
  const family = theme === 'invitation-platinum-aurora' ? 'aurora' : 'champagne';
  return <ChampagneScene family={family} />;
}
