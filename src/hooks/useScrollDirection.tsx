import { useEffect, useState } from 'react';

const SCROLL_THRESHOLD = 24;
const TOP_OFFSET = 16;

const useScrollDirection = () => {
  const [dir, setDir] = useState<'up' | 'down'>('up');

  useEffect(() => {
    let lastY = window.scrollY;
    let ticking = false;

    const update = () => {
      const y = window.scrollY;
      const diff = y - lastY;

      if (y <= TOP_OFFSET) {
        setDir('up');
        lastY = y;
        ticking = false;
        return;
      }

      if (Math.abs(diff) >= SCROLL_THRESHOLD) {
        setDir(diff > 0 ? 'down' : 'up');
        lastY = y;
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return dir;
};

export default useScrollDirection;
