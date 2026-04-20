import { useState, useEffect } from 'react';

const useScrollDirection = () => {
  const [dir, setDir] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const handler = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        const y = window.scrollY;

        if (Math.abs(y - lastY) >= 32) {
          setDir(y > lastY ? 'down' : 'up');
          lastY = y;
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return dir;
};

export default useScrollDirection;
