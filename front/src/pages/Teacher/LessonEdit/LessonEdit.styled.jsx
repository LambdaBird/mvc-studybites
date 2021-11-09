import { Col } from 'antd';
import styled from 'styled-components';

export const Page = styled.div`
  height: 100%;
  width: 100%;
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
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
