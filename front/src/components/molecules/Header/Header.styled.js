import { Row, Select as SelectAntd } from 'antd';
import styled from 'styled-components';

export const HEADER_HEIGHT = 56;

export const Container = styled.header`
  background: ${(props) => props.theme.headerBackground};
  height: ${HEADER_HEIGHT}px;
  z-index: 4;
  ${(props) =>
    props.isFixed &&
    `
    width: 100%;
    position: fixed;
    top: 0;
    `}
  ${(props) =>
    props.hideOnScroll &&
    `
    width: 100%;
    position: fixed;
    top: 0;
    & + *{
      margin-top: ${HEADER_HEIGHT}px;
    }
  `}
  ${(props) =>
    props.scroll === 'down' &&
    `transform:translateY(-100%); transition: all 0.3s ease-in-out;
    `}
  ${(props) =>
    props.scroll === 'up' &&
    `
    transform:translateY(0); transition: all 0.3s ease-in-out;
  `};
`;

export const RowMain = styled(Row).attrs({
  align: 'middle',
  justify: 'space-between',
})`
  padding: 0 1rem;
  height: ${HEADER_HEIGHT}px;
`;

export const Logo = styled.img`
  height: 1.75rem;
  cursor: pointer;
`;

export const Select = styled(SelectAntd)`
  width: 200px;
`;
