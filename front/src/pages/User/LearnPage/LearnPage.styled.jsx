import { Button, Col, Progress as AntdProgress, Row as AntdRow } from 'antd';
import styled, { createGlobalStyle } from 'styled-components';

import variables from '@sb-ui/theme/variables';

export const Progress = styled(AntdProgress).attrs({
  trailColor: variables['progress-trail-color'],
  strokeWidth: 2,
  showInfo: false,
  strokeLinecap: 'round',
})`
  position: absolute;
  bottom: -10px;
  z-index: 2;
`;

export const GlobalStylesLearnPage = createGlobalStyle`
  body {
    background: no-repeat fixed ${(props) => props.theme.bodyBackground};
  }
`;

export const LearnWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  max-width: 614px;
`;

export const Wrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const BlockCell = styled(Col).attrs(() => ({
  xs: { span: 20 },
  sm: { span: 18 },
  md: { span: 16 },
  lg: { span: 14 },
}))`
  display: flex;
  justify-content: center;
`;

export const Row = styled(AntdRow)`
  padding: 2rem 0;
  justify-content: center;
  flex: 1 1 auto;

  @media (max-width: 767px) {
    padding-bottom: 0;
  }
`;

export const ChunkWrapper = styled.div`
  width: 100%;
  margin-bottom: 2rem;
  background-color: ${(props) => props.theme.chunkWrapperBackground};
  border-radius: 1rem;
  padding: 1.5rem;

  // TODO: check if any problem will appear
  display: grid;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 767px) {
    margin-top: ${(props) => (props.isBottom ? 'auto' : '')};
  }

  p:last-child {
    margin-bottom: 0;
  }

  animation: slide-top 0.3s linear both;

  @keyframes slide-top {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

export const LessonButton = styled(Button).attrs({
  size: 'large',
})`
  background-color: ${(props) => props.theme.lessonButtonBackground};
  @media (max-width: 767px) {
    margin-top: auto;
    margin-bottom: 5rem;
  }
  width: 100%;
  margin-bottom: 1rem;
  border-radius: 0.5rem;
`;
