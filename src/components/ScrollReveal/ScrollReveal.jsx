import { useEffect, useRef, useState } from 'react';

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
    if (!('IntersectionObserver' in window)) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => observer.disconnect();
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
