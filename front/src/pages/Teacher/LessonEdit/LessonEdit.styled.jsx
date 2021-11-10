import { Col } from 'antd';
import styled from 'styled-components';

import {
  LEFT_BAR_WIDTH,
  RIGHT_BAR_WIDTH,
} from '@sb-ui/pages/Teacher/LessonEdit/constants';

export const Page = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 4rem;
  padding: 2rem 2rem 2rem calc(${LEFT_BAR_WIDTH}px + 2rem);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: padding-right 0.3s ease 0.1s;
  padding-right: ${(props) =>
    props.isRightOpen ? `${RIGHT_BAR_WIDTH}px` : '2rem'};
`;

export const InputTitle = styled.input`
  border: none;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
  }
  max-width: 650px;
  font-size: 1.5rem;
  padding-left: 0;
  @media (max-width: 1200px) {
    padding-left: 0;
  }
  width: 100%;
`;

export const HeaderButtons = styled(Col)`
  margin-left: auto;
  margin-right: 2rem;
`;
