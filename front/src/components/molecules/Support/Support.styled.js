import { Button as ButtonAntd, Input, Typography } from 'antd';
import styled from 'styled-components';
import {
  CloseOutlined,
  MailOutlined,
  QuestionOutlined,
  SendOutlined,
} from '@ant-design/icons';

import variables from '@sb-ui/theme/variables';

const { Link } = Typography;

export const Main = styled.div`
  position: fixed;
  z-index: 2;
  bottom: 1rem;
  right: 1rem;
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
  font-size: large;
  width: 50px;
  height: 50px;
`;

export const Modal = styled.div`
  position: absolute;
  padding: 1rem;
  bottom: 4rem;
  right: 0;
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
  font-size: 1.5rem;
  line-height: 32px;
  text-align: center;
  font-family: Futura;
`;

export const ModalBodyContent = styled.div`
  display: grid;
  padding: 1rem 1rem;
  gap: 1rem;
  grid-template-areas:
    'a a b'
    'c c c'
    'd d d'
    'e e e'
    'f f f';
  height: 100%;
`;

export const Info = styled.div`
  grid-area: a;
  display: flex;
  align-items: center;
  font-family: Futura;
`;

export const Creator = styled.div`
  display: flex;
  margin-left: 0.5rem;
  flex-direction: column;
`;

export const CreatorText = styled.div`
  color: ${variables['gray-6']};
  font-size: 0.75rem;
`;

export const Links = styled.div`
  grid-area: b;
  display: flex;
  margin-left: auto;
  flex-direction: column;
  font-family: Futura;
  font-size: 0.75rem;
  justify-content: center;
  text-decoration: underline;
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

export const MailIcon = styled(MailOutlined)`
  color: ${variables['primary-color']};
  margin-right: 0.5rem;
`;

export const SendIcon = styled(SendOutlined)`
  color: ${variables['primary-color']};
  margin-right: 0.5rem;
`;

export const SubscribeButton = styled(ButtonAntd).attrs({
  type: 'primary',
})`
  grid-area: f;
  font-family: Futura;
  border-radius: 0.5rem;
`;

export const MessageBlock = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${variables['primary-background']};
  grid-area: ${(props) => props.gridArea};
  display: flex;
  flex-direction: column;
`;

export const MessageLink = styled(Link)`
  margin-top: 0.5rem;
  text-decoration: underline !important;
  font-family: Futura;
`;

export const EmailField = styled(Input)`
  border-radius: 1rem;
  margin-top: 1rem;
`;
