import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { createFirstLesson } from '@sb-ui/hooks/useFirstAppNavigation';
import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import * as paths from '@sb-ui/utils/paths';

const FirstNavigationRoute = () => {
  const history = useHistory();
  useEffect(() => {
    createFirstLesson();
    if (history.location.pathname === paths.HOME) {
      const firstStoredLesson = LessonsStorage.getLessons()?.[0];
      if (firstStoredLesson) {
        history.replace(
          paths.LESSONS_EDIT.replace(':id', firstStoredLesson.id),
        );
      } else {
        history.replace(paths.LESSONS_NEW);
      }
    }
  }, [history]);
  return <Route />;
};

export default FirstNavigationRoute;
