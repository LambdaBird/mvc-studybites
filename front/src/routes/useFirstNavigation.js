import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import { getStorageLessons } from '@sb-ui/utils/lessonsStorage';
import * as paths from '@sb-ui/utils/paths';

export const useFirstNavigation = () => {
  const history = useHistory();
  useEffect(() => {
    if (history.location.pathname === paths.LESSONS_NEW) {
      const firstStoredLesson = getStorageLessons()?.[0];
      if (firstStoredLesson) {
        history.push(paths.LESSONS_EDIT.replace(':id', firstStoredLesson.id));
      }
    }
  }, [history]);
};
