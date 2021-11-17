import { useEffect, useState } from 'react';

import { getCurrentWidth } from '@sb-ui/hooks/useMobile/useMobile';

import { EDITOR_MOBILE_PX } from './constants';

export const useEditorMobile = () => {
  const [currentWidth, setCurrentWidth] = useState(getCurrentWidth());
  const [isMobile, setIsMobile] = useState(
    getCurrentWidth() < EDITOR_MOBILE_PX,
  );
  useEffect(() => {
    const handleResize = () => setCurrentWidth(getCurrentWidth());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentWidth < EDITOR_MOBILE_PX) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  }, [currentWidth]);

  return isMobile;
};
