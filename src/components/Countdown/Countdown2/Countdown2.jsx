import useCountdown from '../../../hooks/useCountdown';
import './Countdown2.css';

const units = [
  ['hari', 'Hari'],
  ['jam', 'Jam'],
  ['menit', 'Menit'],
  ['detik', 'Detik'],
];

export default function Countdown2({ targetDate }) {
  const timeLeft = useCountdown(targetDate);

  return (
    <div className="countdown-2" aria-label="Hitung mundur menuju hari acara">
      {units.map(([unit, label]) => (
        <div className="countdown-2__unit" key={unit}>
          <strong>{String(timeLeft[unit]).padStart(2, '0')}</strong>
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
