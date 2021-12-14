import { Progress as ProgressAntd, Tooltip as TooltipAntd } from 'antd';
import styled from 'styled-components';

import variables from '@sb-ui/theme/variables';

export const Wrapper = styled.div`
  display: grid;
  grid-auto-flow: row;
  row-gap: 0.5rem;
  flex-direction: column;
  padding: 1rem 0;
`;

export const Student = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 4fr 3fr 2fr;
  column-gap: 0.25rem;
  &:hover {
    background-color: ${variables['gray-4']};
    cursor: pointer;
  }
  justify-items: start;
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

export const Tooltip = styled(TooltipAntd).attrs({
  arrowPointAtCenter: true,
})``;
