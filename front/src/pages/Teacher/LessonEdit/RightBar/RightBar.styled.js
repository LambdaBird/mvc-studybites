import styled from 'styled-components';
import { MoreOutlined } from '@ant-design/icons';

export const Wrapper = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  display: flex;
  gap: 1rem;
  padding: 1rem;
  z-index: 2;
`;

export const MoreButton = styled(MoreOutlined)`
  font-size: 24px;
  transform: rotate(90deg);
`;
