import styled from 'styled-components';
import { QuestionCircleOutlined } from '@ant-design/icons';

export const TitleWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

export const BaseText = styled.span`
  cursor: default;
  user-select: none;
  font-size: 12px;
  line-height: 20px;
  color: rgba(0, 0, 0, 0.45);
`;

export const Hint = styled(BaseText)`
  @media (max-width: 767px) {
    display: none;
  }
`;

export const HintDesktop = styled.span`
  font-size: 1rem;
  color: rgba(0, 0, 0, 0.45);
  @media (min-width: 767px) {
    display: none;
  }
`;

export const Question = styled(QuestionCircleOutlined)`
  padding: 0.5rem;
`;
