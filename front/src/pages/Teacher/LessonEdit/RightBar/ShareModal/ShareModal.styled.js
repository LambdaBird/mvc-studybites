import { Input as InputAntd } from 'antd';
import styled from 'styled-components';

import variables from '@sb-ui/theme/variables';

export const Overlay = styled.div`
  position: fixed;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
`;

export const Wrapper = styled.div`
  position: absolute;
  top: calc(100%);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 1rem;
  width: 90%;
  max-width: 380px;
  height: 200px;
  max-height: ${(props) => (props.showShareAnyone ? '125' : '75')}px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease-in-out;
  transform: scale(${(props) => (props.opened ? '1' : '0.9')});
  opacity: ${(props) => (props.opened ? '1' : '0')};
  visibility: ${(props) => (props.opened ? '' : 'hidden')};
`;

export const ShareWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  color: ${variables['secondary-text-color']};
`;

export const InputWrapper = styled.div`
  display: flex;
  transition: all 0.2s ease-in-out;
  opacity: ${(props) => (props.showShareAnyone ? '1' : '0')};
  margin-top: 1rem;
  width: 100%;
`;

export const Input = styled(InputAntd).attrs({
  spellCheck: false,
})``;

export const InputAddon = styled.span`
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  background-color: #fafafa;
  border: 1px solid #d9d9d9;
  border-left: none;
  padding-left: 0.5rem;
  padding-right: 0.5rem;
`;

export const ShareTitle = styled.span`
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 22px;
`;

export const ShareDescription = styled.span`
  font-size: 12px;
  line-height: 20px;
`;

export const ShareLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`;

export const ShareText = styled.div`
  display: flex;
  flex-direction: column;
`;
