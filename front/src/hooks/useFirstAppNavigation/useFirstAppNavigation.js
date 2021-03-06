import { useEffect, useMemo, useRef } from 'react';

import { EXAMPLE_LESSON_ID } from '@sb-ui/pages/Teacher/LessonEdit/constants';
import { AMPLITUDE_EVENTS, amplitudeLogEvent } from '@sb-ui/utils/amplitude';
import { Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';

import { defaultLesson } from './defaultLesson';

const IS_VISITED = 'isVisited';
const IS_SUPPORT_SHOWN = 'isSupportShown';

export const createFirstLesson = () => {
  const firstNavigationSite = localStorage.getItem(IS_VISITED);
  if (!firstNavigationSite) {
    localStorage.setItem(IS_VISITED, 'true');
    LessonsStorage.setLesson({
      id: EXAMPLE_LESSON_ID,
      status: Statuses.UNSAVED,
      ...defaultLesson,
    });
    amplitudeLogEvent(AMPLITUDE_EVENTS.LAUNCH_FIRST_TIME);
  }
};

const isSupportShown = localStorage.getItem(IS_SUPPORT_SHOWN);

export const useFirstAppNavigation = ({ isMobile }) => {
  const mountedRef = useRef(null);

  const isSupportTriggered = useMemo(() => {
    if (!isSupportShown && !isMobile) {
      localStorage.setItem(IS_SUPPORT_SHOWN, 'true');
      return true;
    }
    return false;
  }, [isMobile]);

  useEffect(() => {
    amplitudeLogEvent(AMPLITUDE_EVENTS.START_SESSION);
  }, []);

  if (!mountedRef.current) {
    mountedRef.current = true;
    createFirstLesson();
  }

  return { isSupportTriggered };
};
