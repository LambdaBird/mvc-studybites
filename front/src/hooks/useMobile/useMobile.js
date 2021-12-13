import { useEffect, useState } from 'react';

export const DESKTOP_WIDTH = 768;
export const getCurrentWidth = () =>
  document.documentElement.clientWidth ||
  window.innerWidth ||
  document.body.clientWidth;

const useMobile = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [currentWidth, setCurrentWidth] = useState(getCurrentWidth());

  useEffect(() => {
    const handleResize = () => setCurrentWidth(getCurrentWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentWidth < DESKTOP_WIDTH) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [currentWidth]);

  return isMobile;
};

export default useMobile;
