import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          if (options.once !== false) observer.disconnect();
        }
      },
      { threshold: options.threshold || 0.15, ...options }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

export function useStaggerReveal(count, options = {}) {
  const refs = useRef([]);

  useEffect(() => {
    refs.current.forEach((el, i) => {
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => el.classList.add('revealed'), i * (options.stagger || 100));
            observer.disconnect();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    });
  }, []);

  return (i) => (el) => (refs.current[i] = el);
}
