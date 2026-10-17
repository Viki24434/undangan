import './PlatinumAtmosphere.css';

const lights = Array.from({ length: 10 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 23 + 8) % 100}%`,
  size: `${index % 3 === 0 ? 4 : 2}px`,
  duration: `${12 + index * 1.7}s`,
  delay: `${-index * 2.3}s`,
}));

export default function PlatinumAtmosphere() {
  return (
    <div className="platinum-atmosphere" aria-hidden="true">
      <div className="platinum-atmosphere__halo" />
      {lights.map((light, index) => (
        <span
          key={index}
          style={{
            left: light.left,
            top: light.top,
            '--light-size': light.size,
            animationDuration: light.duration,
            animationDelay: light.delay,
          }}
        />
      ))}
    </div>
  );
}
