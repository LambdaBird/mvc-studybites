import styled from 'styled-components';

import SupportComponent from '@sb-ui/components/molecules/Support';
import {
  LEFT_BAR_WIDTH,
  LEFT_PADDING,
  RIGHT_BAR_WIDTH,
  RIGHT_PADDING,
} from '@sb-ui/pages/Teacher/LessonEdit/constants';
import variables from '@sb-ui/theme/variables';

export const Page = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 4rem;
  padding: 2rem 2rem 2rem calc(${LEFT_BAR_WIDTH}px + 2rem);
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: padding 0.3s ease 0.1s;
  padding-right: ${(props) =>
    props.isRightOpen
      ? `calc(${RIGHT_BAR_WIDTH}px + ${RIGHT_PADDING}rem)`
      : `${RIGHT_PADDING}rem`};

  padding-left: ${(props) =>
    props.isLeftOpen
      ? `calc(${LEFT_BAR_WIDTH}px + ${LEFT_PADDING}rem)`
      : `${LEFT_PADDING}rem`};

  @media (max-width: 767px) {
    padding-left: ${LEFT_PADDING}rem;
    padding-right: ${RIGHT_PADDING}rem;
  }
`;

export const InputTitle = styled.input`
  border: none;
  margin-bottom: 1rem;
  &:focus {
    outline: none;
  }
  &::placeholder {
    color: ${variables['gray-6']};
  }
  max-width: 800px;
  font-size: 1.5rem;
  padding-left: 0;
  @media (max-width: 1200px) {
    padding-left: 0;
  }
  width: 100%;
`;

export const Support = styled(SupportComponent)``;
