import useCountdown from '../../../hooks/useCountdown';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Countdown1.css';
const units = [
  ['hari', 'Hari'],
  ['jam', 'Jam'],
  ['menit', 'Menit'],
  ['detik', 'Detik'],
];
export default function Countdown1({ targetDate }) {
  const timeLeft = useCountdown(targetDate);
  return (
    <div
      className="cd-1-container"
      aria-label="Hitung mundur menuju hari acara"
    >
      {units.map(([unit, label], index) => (
        <ScrollReveal
          className="cd-1-box"
          animationClass="animate-countdown-pop"
          delay={'delay-' + index * 100}
          key={unit}
        >
          <h3>
            <span className="cd-1-number" key={timeLeft[unit]}>
              {String(timeLeft[unit]).padStart(2, '0')}
            </span>
          </h3>
          <p>{label}</p>
        </ScrollReveal>
      ))}
    </div>
  );
}
