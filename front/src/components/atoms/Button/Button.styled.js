import styled from 'styled-components';

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.25rem;
  height: 22px;
  padding: 1rem;
  cursor: ${(props) => (props.disabled ? 'not-allowed' : 'pointer')};
  user-select: none;
  ${(props) =>
    props.bold
      ? `
      font-weight: bold;
  
  `
      : ''}

  ${(props) =>
    props.disabled
      ? `
      background-color: #bfbfbf;
  `
      : `
      &:hover {
        background-color: #f0f0f0;
      }
      &:active {
        background-color: #d9d9d9;
      }    
      `}
`;