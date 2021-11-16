import styled from 'styled-components';

import variables from '@sb-ui/theme/variables';

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  height: 22px;
  padding: 1rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  ${(props) => (props.bold ? `font-weight: bold;` : '')}

  ${(props) =>
    props.active ? `background-color: ${variables['gray-4']};` : ''}
  
  ${(props) =>
    props.disabled
      ? `color: ${variables['gray-6']};`
      : `
      &:hover {
        background-color: ${variables['gray-4']};
      }
      &:active {
        background-color: ${variables['gray-5']};
      }    
      `}
`;
