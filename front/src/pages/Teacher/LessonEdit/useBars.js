import { useCallback, useState } from 'react';
import { useHistory } from 'react-router-dom';

import {
  DESKTOP_WIDTH,
  getCurrentWidth,
} from '@sb-ui/hooks/useMobile/useMobile';
import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { LESSONS_PREVIEW } from '@sb-ui/utils/paths';

export const useBars = ({ lessonId }) => {
  const history = useHistory();
  const [isShowShare, setIsShowShare] = useState(false);
  const [isShowAnalytics, setIsShowAnalytics] = useState(false);
  const [isLeftBarOpen, setIsLeftBarOpen] = useState(
    getCurrentWidth() >= DESKTOP_WIDTH,
  );

  const handlePreview = () => {
    amplitudeLogEvent(AMPLITUDE_EVENTS.PREVIEW);
    history.push(LESSONS_PREVIEW.replace(':id', lessonId));
  };

  const handleAnalytics = useCallback(() => {
    if (isShowAnalytics === false) {
      amplitudeLogEvent(AMPLITUDE_EVENTS.OPEN_ANALYTICS);
    }
    setIsShowAnalytics((prev) => !prev);
  }, [isShowAnalytics]);

  const handleHideLeftBar = useCallback(() => {
    setIsLeftBarOpen(false);
  }, []);

  const handleShowLeftBar = useCallback(() => {
    setIsLeftBarOpen(true);
  }, []);

  const handleShare = useCallback(async () => {
    setIsShowShare((prev) => !prev);
  }, []);

  return {
    handleAnalytics,
    handleHideLeftBar,
    handleShowLeftBar,
    handlePreview,
    handleShare,
    isLeftBarOpen,
    isShowAnalytics,
    isShowShare,
    setIsShowShare,
  };
};
