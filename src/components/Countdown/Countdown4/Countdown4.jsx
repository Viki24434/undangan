import useCountdown from '../../../hooks/useCountdown';
import './Countdown4.css';

export default function Countdown4({ targetDate }) {
  const time = useCountdown(targetDate);
  return (
    <div
      className="countdown-4 invitation-surface"
      role="group"
      aria-label="Hitung mundur menuju hari acara"
    >
      <span className="countdown-4__label">COUNTING THE MOMENTS</span>
      <div className="countdown-4__numbers">
        {[
          ['hari', 'Hari'],
          ['jam', 'Jam'],
          ['menit', 'Menit'],
          ['detik', 'Detik'],
        ].map(([key, label]) => (
          <div className="countdown-4__unit" key={key}>
            <strong key={time[key]}>
              {String(time[key]).padStart(2, '0')}
            </strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <span className="countdown-4__footer">
        Sampai kita bertemu di hari istimewa
      </span>
    </div>
  );
}
