import { useCallback } from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';

import { HOME } from '@sb-ui/utils/paths';
import { ChildrenType, IsPublicType } from '@sb-ui/utils/types';

import { getJWTAccessToken } from '../../utils/jwt';

import * as S from './AuthRoute.styled';

const AuthRoute = ({ children: Component, isPublic, ...rest }) => {
  const history = useHistory();
  const isLoggedIn = getJWTAccessToken();

  const handleHomeClick = useCallback(() => {
    history.push(HOME);
  }, [history]);

  if (!isLoggedIn || isPublic) {
    return (
      <>
        <S.Logo>
          <S.LogoLink onClick={handleHomeClick}>
            <S.LogoImg />
          </S.LogoLink>
        </S.Logo>

        <Route {...rest}>{Component}</Route>
      </>
    );
  }

  return <Redirect to={{ pathname: HOME }} />;
};

AuthRoute.propTypes = {
  children: ChildrenType.isRequired,
  isPublic: IsPublicType,
};

export default AuthRoute;
