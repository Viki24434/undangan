import { useEffect, useRef, useState } from 'react';
import { observeReveal } from './revealObserver';

export default function ScrollReveal({
  children,
  animationClass = 'animate-fade-in-up',
  delay = '',
  as = 'div',
  className = '',
  id,
}) {
  const [isVisible, setIsVisible] = useState(
    () => typeof IntersectionObserver === 'undefined',
  );
  const domRef = useRef();

  useEffect(() => {
    let active = true;
    const stop = observeReveal(domRef.current, () => {
      if (active) setIsVisible(true);
    });
    return () => {
      active = false;
      stop();
    };
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={domRef}
      id={id}
      className={[
        isVisible ? animationClass : 'has-delay',
        isVisible ? delay : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </Tag>
  );
}
