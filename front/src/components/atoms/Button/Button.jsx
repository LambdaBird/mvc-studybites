import T from 'prop-types';

import * as S from './Button.styled';

const Button = ({ active, bold, disabled, children, onClick }) => (
  <S.Button
    active={active}
    bold={bold}
    disabled={disabled}
    onClick={disabled ? null : onClick}
  >
    <div>{children}</div>
  </S.Button>
);

Button.propTypes = {
  active: T.bool,
  bold: T.bool,
  disabled: T.bool,
  children: T.oneOfType([T.arrayOf(T.node), T.node]).isRequired,
  onClick: T.func,
};

export default Button;
