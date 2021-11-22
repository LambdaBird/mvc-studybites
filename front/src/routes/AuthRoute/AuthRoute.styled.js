import styled from 'styled-components';

import LogoSvg from '@sb-ui/resources/img/logo.svg';

export const Logo = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
`;

export const LogoImg = styled.img.attrs({
  alt: 'Logo',
  src: LogoSvg,
})``;

export const LogoLink = styled.div`
  cursor: pointer;
`;
