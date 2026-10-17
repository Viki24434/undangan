import './Birds.css';

const flocks = [
  {
    name: 'horizon',
    path: 'M -40 154 C 65 118 114 24 228 70 S 360 130 440 36',
    duration: 32,
    depth: [0.85, 0.62],
    clarity: [0.9, 0.6],
    birds: [
      { delay: 0.8, size: 0.55, height: 0, flap: 2.4, opacity: 0.72 },
      { delay: 1.45, size: 0.42, height: -16, flap: 2.7, opacity: 0.52 },
      { delay: 1.8, size: 0.48, height: 15, flap: 2.2, opacity: 0.62 },
      { delay: 2.4, size: 0.34, height: -7, flap: 3.1, opacity: 0.42 },
      { delay: 2.8, size: 0.4, height: 23, flap: 2.6, opacity: 0.5 },
    ],
  },
  {
    name: 'approaching',
    path: 'M 440 62 C 335 12 315 126 228 116 S 90 28 -40 88',
    duration: 36,
    reverse: true,
    depth: [0.45, 1.5],
    clarity: [0.4, 1],
    birds: [
      { delay: 8, size: 0.6, height: 0, flap: 2.8, opacity: 0.75 },
      { delay: 8.7, size: 0.5, height: -19, flap: 2.5, opacity: 0.62 },
      { delay: 9.35, size: 0.56, height: 24, flap: 3.2, opacity: 0.68 },
      { delay: 10.1, size: 0.43, height: 7, flap: 2.7, opacity: 0.5 },
    ],
  },
  {
    name: 'ascending',
    path: 'M -35 345 C 48 335 30 240 65 205 S 150 105 230 64 S 365 18 440 28',
    duration: 38,
    depth: [1.6, 0.32],
    clarity: [1, 0.32],
    birds: [
      { delay: 17, size: 0.78, height: 0, flap: 2.1, opacity: 0.8 },
      { delay: 17.8, size: 0.66, height: 18, flap: 2.6, opacity: 0.65 },
      { delay: 18.7, size: 0.55, height: -14, flap: 2.3, opacity: 0.57 },
    ],
  },
];

export default function Birds() {
  return (
    <svg
      className="hero-birds"
      viewBox="0 0 400 465"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {flocks.flatMap((flock) =>
        flock.birds.map((bird, index) => (
          <g
            className="hero-birds__flight"
            key={`${flock.name}-${index}`}
            data-flock={flock.name}
            style={{
              '--bird-path': `path('${flock.path}')`,
              '--bird-duration': `${flock.duration}s`,
              '--bird-direction': flock.reverse ? 'reverse' : 'auto',
              '--bird-scale-start': flock.depth[0],
              '--bird-scale-end': flock.depth[1],
              '--bird-clarity-start': flock.clarity[0],
              '--bird-clarity-end': flock.clarity[1],
              '--bird-delay': `${bird.delay}s`,
              '--bird-flap': `${bird.flap}s`,
              '--bird-phase': `${-index * 0.43}s`,
              '--bird-opacity': bird.opacity,
            }}
          >
            <g
              transform={`translate(0 ${bird.height}) scale(${flock.reverse ? -bird.size : bird.size} ${bird.size})`}
            >
              <g className="hero-birds__depth">
                <g className="hero-birds__body">
                  <path d="M-4 0Q0-2 5-1L8 0L5 1Q0 2-4 1L-8 3L-6 0L-8-2Z" />
                  <g className="hero-birds__wing hero-birds__wing--far">
                    <path d="M0 0C-3-7-8-12-16-14C-12-9-9-3-2 1Z" />
                  </g>
                  <g className="hero-birds__wing hero-birds__wing--near">
                    <path d="M1 0C-1-8-4-15-12-18C-10-12-7-4-1 2Z" />
                  </g>
                </g>
              </g>
            </g>
          </g>
        )),
      )}
    </svg>
  );
}
