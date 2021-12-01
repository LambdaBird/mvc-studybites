import { useEffect } from 'react';
import { Route, useHistory } from 'react-router-dom';

import { LessonsStorage } from '@sb-ui/utils/LessonsStorage';
import * as paths from '@sb-ui/utils/paths';

const FirstNavigationRoute = () => {
  const history = useHistory();
  useEffect(() => {
    if (history.location.pathname === paths.HOME) {
      const firstStoredLesson = LessonsStorage.getLessons()?.[0];
      if (firstStoredLesson) {
        history.push(paths.LESSONS_EDIT.replace(':id', firstStoredLesson.id));
      } else {
        history.push(paths.LESSONS_NEW);
      }
    }
  }, [history]);
  return <Route />;
};

export default FirstNavigationRoute;
