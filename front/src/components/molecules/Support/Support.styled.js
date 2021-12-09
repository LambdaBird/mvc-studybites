import { Button as ButtonAntd } from 'antd';
import styled from 'styled-components';
import { CloseOutlined, QuestionOutlined } from '@ant-design/icons';

import variables from '@sb-ui/theme/variables';

export const Main = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 2rem;
  right: 2rem;
  @keyframes slide-top {
    0% {
      transform: translateY(20px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes show {
    0% {
      transform: scale(0.7);
      opacity: 0;
    }

    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .button-animation {
    animation: show 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19) both;
  }
`;

export const Button = styled(ButtonAntd).attrs({
  type: 'primary',
  size: 'large',
  shape: 'circle',
})`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: x-large;
  width: 50px;
  height: 50px;
`;

export const Modal = styled.div`
  position: absolute;
  padding: 1rem;
  bottom: 4rem;
  right: 4rem;
  width: 330px;
  background: white;
  display: ${(props) => (props.open ? 'block' : 'none')};
  ${(props) =>
    props.open &&
    `
     animation: slide-top 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19) both;
  `}

  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  border-radius: 8px;
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const ModalBody = styled.div`
  margin-top: 0.5rem;
  color: #000000d9;
`;

export const ModalBodyTitle = styled.div`
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  text-align: center;
`;

export const ModalBodyContent = styled.div`
  display: grid;
  padding: 0.5rem 1rem;
  gap: 1rem;
  grid-template-areas:
    'a a b'
    'c c c'
    'd d d'
    'e e e';
  height: 100%;
`;

export const Info = styled.div`
  grid-area: a;
  display: flex;
  align-items: center;
`;

export const Creator = styled.div`
  display: flex;
  margin-left: 0.5rem;
  flex-direction: column;
`;

export const CreatorText = styled.div`
  color: ${variables['gray-6']};
`;

export const Links = styled.div`
  grid-area: b;
  display: flex;
  margin-left: auto;
  flex-direction: column;
`;

export const ModalClose = styled(CloseOutlined)`
  cursor: pointer;
  color: ${variables['gray-6']};
  font-size: large;
`;

export const CloseIcon = styled(CloseOutlined).attrs({
  className: 'button-animation',
})``;

export const QuestionIcon = styled(QuestionOutlined).attrs({
  className: 'button-animation',
})``;
