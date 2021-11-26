import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { LessonEdit, LessonPreview } from '@sb-ui/pages/Teacher';
import LearnPageWrapper from '@sb-ui/pages/User/LearnPage/LearnPageWrapper';

import * as paths from '../utils/paths';

import AuthRoute from './AuthRoute';
import { useFirstNavigation } from './useFirstNavigation';

const SwitchWrapper = () => {
  useFirstNavigation();

  return (
    <Switch>
      <AuthRoute isPublic path={paths.LEARN_PAGE}>
        <LearnPageWrapper />
      </AuthRoute>
      <AuthRoute isPublic path={paths.LESSONS_PREVIEW}>
        <LessonPreview />
      </AuthRoute>
      <Route path={paths.LESSONS_EDIT}>
        <LessonEdit />
      </Route>
      <Redirect to={paths.LESSONS_NEW} />
    </Switch>
  );
};

const Routes = () => (
  <Router>
    <SwitchWrapper />
  </Router>
);

export default Routes;
