import useCountdown from '../../../hooks/useCountdown';
import './Countdown1.css';

export default function Countdown1({ targetDate }) {
  const timeLeft = useCountdown(targetDate);

  return (
    <div className="cd-1-container animate-fade-in has-delay delay-300">
      <div className="cd-1-box"><h3>{timeLeft.hari}</h3><p>Hari</p></div>
      <div className="cd-1-box"><h3>{timeLeft.jam}</h3><p>Jam</p></div>
      <div className="cd-1-box"><h3>{timeLeft.menit}</h3><p>Menit</p></div>
      <div className="cd-1-box"><h3>{timeLeft.detik}</h3><p>Detik</p></div>
    </div>
  );
}