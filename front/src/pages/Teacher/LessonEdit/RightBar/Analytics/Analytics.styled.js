import styled from 'styled-components';

import { HEADER_HEIGHT } from '@sb-ui/components/molecules/Header/Header.styled';

export const Wrapper = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  z-index: -1;
  height: 100vh;
  width: 500px;
  border-left: 1px solid #f0f0f0;
  transition: all 0.3s ease 0.1s;
  transform: translate3d(${(props) => (props.opened ? '0' : '100%')}, 0, 0);
  padding-top: ${HEADER_HEIGHT}px;
`;

export const Title = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: #595959;
`;

export const Content = styled.div`
  padding-left: 1rem;
  padding-right: 1rem;
`;

export const FunnelTitle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
  align-items: center;
  padding: 1rem;
  font-size: 12px;
  line-height: 20px;
`;

export const FunnelTitleHeader = styled.span`
  font-size: 14px;
  line-height: 22px;
  color: black;
`;
