import styled from 'styled-components';

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  align-items: center;
`;

export const RealInput = styled.input.attrs({
  className: 'cdx-input',
})``;

export const Content = styled.div`
  width: 100%;
  margin: 1rem 0;
  ${(props) => props.height && `height: ${props.height};`}
`;

export const Input = styled.div.attrs({
  className: 'cdx-input',
  contentEditable: true,
})`
  ${(props) => (props.isError ? `border: 1px solid red;` : '')}
`;
