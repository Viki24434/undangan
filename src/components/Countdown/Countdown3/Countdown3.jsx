import useCountdown from '../../../hooks/useCountdown';
import ScrollReveal from '../../ScrollReveal/ScrollReveal';
import './Countdown3.css';

const units = [
  ['hari', 'Hari', 365],
  ['jam', 'Jam', 24],
  ['menit', 'Menit', 60],
  ['detik', 'Detik', 60],
];

export default function Countdown3({ targetDate }) {
  const timeLeft = useCountdown(targetDate);

  return (
    <div className="countdown-3" aria-label="Hitung mundur menuju hari acara">
      {units.map(([unit, label, maximum], index) => (
        <ScrollReveal
          as="div"
          className="countdown-3__unit"
          animationClass="platinum-orbit-reveal"
          delay={`delay-${index * 100}`}
          key={unit}
        >
          <div className="countdown-3__dial">
            <svg viewBox="0 0 100 100" aria-hidden="true">
              <circle className="countdown-3__track" cx="50" cy="50" r="46" />
              <circle
                className="countdown-3__progress"
                cx="50"
                cy="50"
                r="46"
                pathLength="100"
                strokeDasharray="100"
                strokeDashoffset={
                  100 - Math.min(timeLeft[unit] / maximum, 1) * 100
                }
              />
            </svg>
            <strong key={timeLeft[unit]}>
              {String(timeLeft[unit]).padStart(2, '0')}
            </strong>
          </div>
          <span>{label}</span>
        </ScrollReveal>
      ))}
    </div>
  );
}
