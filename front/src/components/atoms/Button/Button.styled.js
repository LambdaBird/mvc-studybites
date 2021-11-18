import styled from 'styled-components';

import variables from '@sb-ui/theme/variables';

export const IconButton = styled.div`
  font-size: 1.5rem;
  color: ${variables['secondary-text-color']};
  border: 2px solid ${variables['gray-4']};
  border-radius: 1rem;
  padding: 0.5rem 1rem;

  ${(props) => (props.bold ? `font-weight: bold;` : '')}

  ${(props) => (props.active ? `background-color: #f0f0f0;` : '')}
  ${(props) =>
    props.disabled
      ? `color: #BFBFBF;`
      : `
      &:hover {
        background-color: #f0f0f0;
      }
      &:active {
        background-color: #d9d9d9;
      }    
      `};

  @media (max-width: 400px) {
    font-size: 1rem;
  }

  @media (max-width: 320px) {
    padding: 0.5rem 0.75rem;
  }
`;

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  height: 1.375rem;
  padding: 1rem 0.5rem;
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
