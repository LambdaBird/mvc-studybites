import { useEffect } from 'react';

import { EXAMPLE_LESSON_ID } from '@sb-ui/pages/Teacher/LessonEdit/constants';
import { Statuses } from '@sb-ui/utils/constants';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';

import { defaultLesson } from './defaultLesson';

const IS_ALREADY_SITE_VISITED = 'isAlreadySiteVisited';

export const createFirstLesson = () => {
  const firstNavigationSite = localStorage.getItem(IS_ALREADY_SITE_VISITED);
  localStorage.setItem(IS_ALREADY_SITE_VISITED, '1');
  if (!firstNavigationSite) {
    LessonsStorage.setLesson({
      id: EXAMPLE_LESSON_ID,
      status: Statuses.UNSAVED,
      ...defaultLesson,
    });
  }
};

export const useFirstAppNavigation = () => {
  useEffect(() => {
    createFirstLesson();
  }, []);
};
