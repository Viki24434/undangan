import { useEffect, useState } from 'react';
import { clampDesign } from './designGeometry';

export default function useDesignZoom(viewport, ready) {
  const [fitScale, setFitScale] = useState(1);
  const [manualScale, setManualScale] = useState(null);
  useEffect(() => {
    const node = viewport.current;
    if (!node) return;
    const measure = () =>
      setFitScale(
        clampDesign(
          Math.min(
            1,
            (node.clientWidth - 24) / 390,
            (Math.min(740, window.innerHeight * 0.7) - 6) / 720,
          ),
          0.5,
          1,
        ),
      );
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    window.addEventListener('resize', measure);
    measure();
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, [viewport, ready]);
  const value = manualScale ?? fitScale;
  return {
    value,
    change: (delta) => setManualScale(clampDesign(value + delta, 0.5, 2)),
    fit: () => setManualScale(null),
  };
}
