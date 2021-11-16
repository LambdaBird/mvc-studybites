import { Progress as ProgressAntd } from 'antd';
import styled from 'styled-components';

import variables from '@sb-ui/theme/variables';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

export const Student = styled.div`
  display: flex;
  gap: 1rem;
  padding: 0.5rem;
  &:hover {
    background-color: ${variables['gray-4']};
    cursor: pointer;
  }
  align-items: center;
`;

export const LastActivity = styled.span`
  color: rgba(0, 0, 0, 0.45);
  font-size: 12px;
  line-height: 20px;
`;

export const Progress = styled(ProgressAntd)`
  margin-left: auto;
  padding-right: 0.5rem;
  width: 120px;
`;

export const ProgressPercent = styled.span`
  color: rgba(0, 0, 0, 0.45);
`;
