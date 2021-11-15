import { Col } from 'antd';
import styled from 'styled-components';

export const Image = styled.img`
  width: 100%;
`;

export const Caption = styled(Col).attrs({
  span: 24,
})`
  margin-top: 1rem;
`;
