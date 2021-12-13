import { Spin as SpinAntd } from 'antd';
import styled from 'styled-components';

import { HEADER_HEIGHT } from '@sb-ui/components/molecules/Header/Header.styled';
import variables from '@sb-ui/theme/variables';

export const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  display: grid;
  grid-auto-flow: column;
  gap: 0.25rem;
  padding: 1rem;
  z-index: 2;
  width: 100%;
  justify-content: flex-end;
  justify-items: end;
  background-color: white;
  color: ${variables['neutral-8']};
  height: ${HEADER_HEIGHT}px;

  @media (max-width: 767px) {
    justify-content: flex-end;
    gap: 1.5rem;
    height: auto;
  }
  @media (max-width: 480px) {
    gap: 1rem;
  }

  @media (max-width: 400px) {
    gap: 0.5rem;
  }
`;

export const Spin = styled(SpinAntd)`
  display: flex;
  align-items: center;
  margin-right: 8px;
`;
