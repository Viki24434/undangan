import { useEffect, useRef, useState } from 'react';
import './AnimatedText.css';

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

export default function AnimatedText({
  text,
  effect = 'type',
  duration = 1400,
}) {
  const ref = useRef(null);
  const [frame, setFrame] = useState({ progress: 1, tick: 0 });
  const value = String(text ?? '');

  useEffect(() => {
    const element = ref.current;
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animation;
    let observer;
    let started = false;

    function finish() {
      cancelAnimationFrame(animation);
      setFrame({ progress: 1, tick: 0 });
    }

    function start() {
      if (started || motion.matches) return;
      started = true;
      const startTime = performance.now();
      let lastUpdate = 0;
      function step(now) {
        const progress = Math.min(1, (now - startTime) / duration);
        if (now - lastUpdate >= 45 || progress === 1) {
          setFrame({ progress, tick: Math.floor((now - startTime) / 45) });
          lastUpdate = now;
        }
        if (progress < 1) animation = requestAnimationFrame(step);
      }
      animation = requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        },
        { threshold: 0.5 },
      );
      observer.observe(element);
    } else start();

    motion.addEventListener('change', finish);
    return () => {
      cancelAnimationFrame(animation);
      observer?.disconnect();
      motion.removeEventListener('change', finish);
    };
  }, [value, effect, duration]);

  const characters = Array.from(value);
  const resolved = Math.ceil(frame.progress * characters.length);

  return (
    <span className="animated-text" ref={ref} aria-label={value}>
      <span aria-hidden="true">
        {value.split(/(\s+)/).map((word, wordIndex) => (
          <span className="animated-text-word" key={wordIndex}>
            {Array.from(word).map((character, index) => {
              const offset =
                Array.from(value.split(/(\s+)/).slice(0, wordIndex).join(''))
                  .length + index;
              const done = offset < resolved || /\s/.test(character);
              const display = done
                ? character
                : effect === 'scramble'
                  ? glyphs[(offset * 7 + frame.tick * 13) % glyphs.length]
                  : '';
              return (
                <span className="animated-text-character" key={index}>
                  <span className="animated-text-measure">{character}</span>
                  <span className="animated-text-glyph">{display}</span>
                </span>
              );
            })}
          </span>
        ))}
      </span>
    </span>
  );
}
