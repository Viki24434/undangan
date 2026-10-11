import React, { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({
  children,
  animationClass = 'animate-fade-in-up',
  delay = '',
}) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 },
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={domRef}

      className={isVisible ? `${animationClass} ${delay}` : 'has-delay'}
    >
      {children}
    </div>
  );
}
