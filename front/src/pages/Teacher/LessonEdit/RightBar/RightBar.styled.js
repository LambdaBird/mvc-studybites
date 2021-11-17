import { Spin as SpinAntd } from 'antd';
import styled from 'styled-components';

import { LEFT_BAR_WIDTH } from '@sb-ui/pages/Teacher/LessonEdit/constants';

export const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  gap: 0.25rem;
  padding: 1rem;
  z-index: 2;
  width: 100%;
  justify-content: flex-end;
  background-color: white;

  @media (max-width: 767px) {
    justify-content: flex-end;
    gap: 1.5rem;
  }
  @media (max-width: 480px) {
    gap: 1rem;
  }

  @media (max-width: 400px) {
    gap: 0.5rem;
  }
`;

export const Spin = styled(SpinAntd)`
  margin-top: 0.5rem;
  margin-left: calc(${LEFT_BAR_WIDTH}px + 1rem);
  margin-right: auto;
`;
