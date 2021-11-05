import { BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import { LessonEdit, LessonPreview } from '@sb-ui/pages/Teacher';
import LearnPageWrapper from '@sb-ui/pages/User/LearnPage/LearnPageWrapper';

import * as paths from '../utils/paths';

import AuthRoute from './AuthRoute';

const Routes = () => (
  <Router>
    <Switch>
      <AuthRoute isPublic path={paths.LEARN_PAGE}>
        <LearnPageWrapper />
      </AuthRoute>
      <AuthRoute isPublic path={paths.LESSONS_PREVIEW}>
        <LessonPreview />
      </AuthRoute>
      <AuthRoute isPublic path={paths.LESSONS_EDIT}>
        <LessonEdit />
      </AuthRoute>
      <Redirect to={paths.LESSONS_NEW} />
    </Switch>
  </Router>
);

export default Routes;
