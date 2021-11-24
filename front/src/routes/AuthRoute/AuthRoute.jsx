import { Redirect, Route } from 'react-router-dom';

import { HOME } from '@sb-ui/utils/paths';
import { ChildrenType, IsPublicType } from '@sb-ui/utils/types';

import { getJWTAccessToken } from '../../utils/jwt';

const AuthRoute = ({ children: Component, isPublic, ...rest }) => {
  const isLoggedIn = getJWTAccessToken();

  if (!isLoggedIn || isPublic) {
    return <Route {...rest}>{Component}</Route>;
  }

  return <Redirect to={{ pathname: HOME }} />;
};

AuthRoute.propTypes = {
  children: ChildrenType.isRequired,
  isPublic: IsPublicType,
};

export default AuthRoute;
