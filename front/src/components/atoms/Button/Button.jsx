import T from 'prop-types';
import { useContext } from 'react';

import MobileContext from '@sb-ui/contexts/MobileContext';

import * as S from './Button.styled';

const Button = ({
  iconComponent,
  active,
  bold,
  disabled,
  children,
  onClick,
  className,
}) => {
  const isMobile = useContext(MobileContext);

  if (isMobile && iconComponent) {
    return (
      <S.IconButton
        active={active}
        bold={bold}
        disabled={disabled}
        onClick={disabled ? null : onClick}
        className={className}
      >
        {iconComponent}
      </S.IconButton>
    );
  }

  return (
    <S.Button
      active={active}
      bold={bold}
      disabled={disabled}
      onClick={disabled ? null : onClick}
      className={className}
    >
      <div>{children}</div>
    </S.Button>
  );
};

Button.propTypes = {
  iconComponent: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
  active: T.bool,
  bold: T.bool,
  disabled: T.bool,
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
  onClick: T.func,
  className: T.string,
};

export default Button;
