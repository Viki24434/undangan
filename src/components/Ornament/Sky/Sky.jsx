import { useId } from 'react';
import './Sky.css';

const clouds = [
  { x: -65, y: 36, scale: 1.35, duration: 52, direction: 1, opacity: 0.6 },
  { x: 240, y: 154, scale: 0.85, duration: 67, direction: -1, opacity: 0.45 },
  { x: -104, y: 306, scale: 1.15, duration: 44, direction: 1, opacity: 0.5 },
  { x: 205, y: 420, scale: 1.3, duration: 58, direction: -1, opacity: 0.35 },
];

const stars = [
  [33, 35, 1],
  [85, 64, 1.3],
  [148, 22, 0.8],
  [216, 54, 1.1],
  [284, 26, 1.2],
  [361, 78, 0.8],
  [19, 139, 1.4],
  [65, 215, 0.9],
  [338, 173, 1.3],
  [381, 269, 1],
  [28, 328, 0.8],
  [361, 358, 1.4],
  [83, 403, 0.9],
  [324, 459, 1.1],
];

export default function Sky({ variant = 'day' }) {
  const cloudId = useId();

  return (
    <div className={`platinum-sky platinum-sky--${variant}`} aria-hidden="true">
      <div className="platinum-sky__content">
        <div className="platinum-sky__glow" />
        <svg
          className="platinum-sky__canvas"
          viewBox="0 0 400 560"
          preserveAspectRatio="none"
          focusable="false"
        >
          <defs>
            <linearGradient id={cloudId} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="currentColor" stopOpacity="0.75" />
              <stop offset="0.55" stopColor="currentColor" stopOpacity="0.4" />
              <stop offset="1" stopColor="currentColor" stopOpacity="0" />
            </linearGradient>
          </defs>
          {clouds.map((cloud, index) => (
            <g
              key={index}
              transform={`translate(${cloud.x} ${cloud.y}) scale(${cloud.scale})`}
              opacity={cloud.opacity}
            >
              <g
                className="platinum-sky__cloud"
                style={{
                  '--cloud-duration': `${cloud.duration}s`,
                  '--cloud-phase': `${-index * 9}s`,
                  '--cloud-direction': cloud.direction,
                }}
              >
                <path
                  fill={`url(#${cloudId})`}
                  d="M0 64C-8 48 12 32 34 39C32 21 60 12 77 27C86 1 125 0 136 27C155 15 180 27 180 45C208 39 228 55 222 69C188 89 32 93 0 64Z"
                />
                <path
                  fill={`url(#${cloudId})`}
                  opacity="0.45"
                  d="M-18 77C8 58 49 68 66 63C88 53 114 62 131 58C157 50 190 63 244 73C207 98 37 107-18 77Z"
                />
              </g>
            </g>
          ))}
          {variant === 'night' && (
            <g className="platinum-sky__stars">
              {stars.map(([x, y, radius], index) => (
                <circle
                  className="platinum-sky__star"
                  key={index}
                  cx={x}
                  cy={y}
                  r={radius}
                  style={{
                    '--star-duration': `${3.6 + (index % 5) * 0.8}s`,
                    '--star-phase': `${index * -0.7}s`,
                  }}
                />
              ))}
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}
