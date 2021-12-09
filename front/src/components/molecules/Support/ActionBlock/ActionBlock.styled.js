import { Button as ButtonAntd } from 'antd';
import styled from 'styled-components';

import variables from '@sb-ui/theme/variables';

export const Main = styled.div`
  padding: 1rem;
  border-radius: 1rem;
  background-color: ${variables['blue-1']};
  grid-area: ${(props) => props.gridArea};
`;

export const Text = styled.div`
  margin-bottom: 0.5rem;
`;

export const Button = styled(ButtonAntd).attrs({
  type: 'primary',
})`
  margin-top: 0.5rem;
`;

export const Submit = styled.div`
  display: flex;
  flex-direction: column;
`;
