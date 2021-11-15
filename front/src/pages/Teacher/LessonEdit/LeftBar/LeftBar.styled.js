import { Spin as SpinAntd } from 'antd';
import styled from 'styled-components';

import { HEADER_HEIGHT } from '@sb-ui/components/molecules/Header/Header.styled';

import { LEFT_BAR_WIDTH } from '../constants';

export const Wrapper = styled.div`
  background-color: #fafafa;
  position: fixed;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: ${LEFT_BAR_WIDTH}px;
  left: 0;
  top: 0;
  z-index: 2;
`;

export const LogoLink = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  height: ${HEADER_HEIGHT}px;
  align-self: flex-start;
`;

export const Logo = styled.img`
  height: 1.75rem;
  cursor: pointer;
`;

export const Spin = styled(SpinAntd)`
  margin-top: 0.5rem;
`;

export const AddNewLessonWrapper = styled.div`
  margin-top: auto;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 0.875rem;
  color: #595959;

  border-top: 2px solid #f0f0f0;
  &:hover {
    background-color: #f0f0f0;
  }
`;
