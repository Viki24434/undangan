import Ornament from '../Ornament/Ornament';
import './FloralDecoration.css';

export default function FloralDecoration({ variant = 'corners' }) {
  return (
    <div
      className={`invitation-florals invitation-florals-${variant}`}
      aria-hidden="true"
    >
      <Ornament
        src="/assets/Bitmap (7).png"
        position="top-left"
        width="170px"
        animation="floral-sway"
        opacity={0.88}
      />
      <Ornament
        src="/assets/Bitmap (7).png"
        position="bottom-right"
        width="170px"
        rotate={180}
        animation="floral-sway"
        opacity={0.88}
      />
      {variant === 'bouquet' && (
        <Ornament
          src="/assets/Bitmap (9).png"
          width="95px"
          customStyle={{ bottom: '15px', left: '10px' }}
          rotate={-18}
          opacity={0.7}
        />
      )}
    </div>
  );
}
