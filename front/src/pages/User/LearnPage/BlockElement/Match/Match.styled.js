import styled from 'styled-components';

import { ChunkWrapper } from '@sb-ui/pages/User/LearnPage/LearnPage.styled';

export const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
  @media (max-width: 767px) {
    margin-top: auto;
  }
  display: flex;
  justify-content: flex-end;
`;

export const AnswerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AnswerWrapperWrong = styled(AnswerWrapper)`
  flex-direction: column;
  margin-bottom: 2rem;
`;

export const AnswerWrapperWrongTitle = styled(AnswerWrapperWrong)`
  flex-direction: row;
  width: 100%;
`;

export const MatchWrapper = styled(ChunkWrapper)`
  display: flex;
  flex-direction: column;
  padding: 0;
  background-color: transparent;
`;
