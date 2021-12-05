import { Button, Checkbox, Typography } from 'antd';
import styled from 'styled-components';

import { BlockElementWrapperWhite } from '../BlockElement.styled';

const { Text } = Typography;

export const AnswerWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

export const ColumnCheckbox = styled(Checkbox.Group)`
  display: grid;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;

export const Question = styled(Text)`
  font-style: italic;
`;

export const BlockWrapperWhite = styled(BlockElementWrapperWhite)`
  flex-direction: column;
  @media (max-width: 767px) {
    margin-top: auto;
  }
`;

export const LessonButtonSend = styled(Button).attrs({
  size: 'large',
})`
  width: 150px;
  @media (min-width: 768px) {
    margin-bottom: 1rem;
  }
`;

export const ButtonWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

export const CheckboxText = styled.span`
  overflow-wrap: anywhere;
`;
