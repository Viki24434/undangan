const callbacks = new Map();
let observer;

export function observeReveal(element, onReveal) {
  if (
    !('IntersectionObserver' in window) ||
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    queueMicrotask(onReveal);
    return () => {};
  }
  observer ||= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const callback = callbacks.get(entry.target);
        callbacks.delete(entry.target);
        observer?.unobserve(entry.target);
        callback?.();
      }
      if (!callbacks.size) {
        observer.disconnect();
        observer = undefined;
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -36px 0px' },
  );
  callbacks.set(element, onReveal);
  observer.observe(element);
  return () => {
    callbacks.delete(element);
    observer?.unobserve(element);
    if (!callbacks.size) {
      observer?.disconnect();
      observer = undefined;
    }
  };
}
