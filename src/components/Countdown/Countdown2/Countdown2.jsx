import useCountdown from '../../../hooks/useCountdown';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
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
      {units.map(([unit, label], index) => (
        <ScrollReveal
          as="div"
          className="countdown-2__unit"
          animationClass="animate-countdown-flip"
          delay={`delay-${index * 100}`}
          key={unit}
        >
          <strong className="countdown-2__number" key={timeLeft[unit]}>
            {String(timeLeft[unit]).padStart(2, '0')}
          </strong>
          <span>{label}</span>
        </ScrollReveal>
      ))}
    </div>
  );
}
