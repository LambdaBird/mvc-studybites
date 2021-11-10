import T from 'prop-types';

import * as S from './Button.styled';

const Button = ({ disabled, children, onClick }) => (
  <S.Button disabled={disabled} onClick={disabled ? null : onClick}>
    <div>{children}</div>
  </S.Button>
);

Button.propTypes = {
  disabled: T.bool,
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
  onClick: T.func,
};

export default Button;
