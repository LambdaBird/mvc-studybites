import styled from 'styled-components';

import { HEADER_HEIGHT } from '@sb-ui/components/molecules/Header/Header.styled';
import variables from '@sb-ui/theme/variables';

import { LEFT_BAR_WIDTH } from '../constants';

export const Main = styled.div``;

export const CloseArea = styled.div`
  position: fixed;
  top: 0;
  left: ${LEFT_BAR_WIDTH}px;
  width: calc(100% - ${LEFT_BAR_WIDTH}px);
  height: 100%;
  z-index: 3;
`;

export const Wrapper = styled.div`
  background-color: #fafafa;
  display: flex;
  flex-direction: column;
  height: 100%;
  width: ${LEFT_BAR_WIDTH}px;
  position: fixed;
  justify-content: space-between;
  left: 0;
  top: 0;
  z-index: 3;
  transition: all 0.3s ease 0.1s;

  transform: translate3d(${(props) => (props.opened ? '0' : '-100%')}, 0, 0);
`;

export const HideWrapper = styled.div`
  display: flex;
  padding: 0.5rem;
  margin-right: -0.5rem;
  border-radius: 0.25rem;
  &:hover {
    background-color: ${variables['gray-4']};
  }
  &:active {
    background-color: ${variables['gray-5']};
  }
`;

export const ShowWrapper = styled.div`
  position: fixed;
  color: ${variables['secondary-text-color']};
  display: flex;
  justify-content: center;
  align-items: center;
  left: 1rem;
  top: 1rem;
  z-index: ${(props) => (props.opened ? '2' : '3')};
  font-size: 1.25rem;
  transition: all 0.3s ease 0.1s;
  opacity: ${(props) => (props.opened ? '0' : '1')};
  visibility: ${(props) => (props.opened ? 'hidden' : '')};
`;

export const LogoLink = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  cursor: pointer;
  height: ${HEADER_HEIGHT}px;
  align-self: flex-start;
  width: 100%;
  justify-content: space-between;
  font-size: 1rem;
`;

export const Logo = styled.img`
  height: 1.75rem;
  cursor: pointer;
`;

export const AddNewLessonWrapper = styled.div`
  margin-top: auto;
  cursor: pointer;
  padding: 1rem;
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 0.875rem;
  color: ${variables['secondary-text-color']};

  border-top: 2px solid ${variables['gray-4']};
  &:hover {
    background-color: ${variables['gray-4']};
  }
`;
