import styled from 'styled-components';

const visibilityHidden = `
    visibility: hidden;
    height: 0;
    padding: 0;
`;

export const Image = styled.img`
  ${(props) => (props.error ? visibilityHidden : '')}
  width: 100%;
  object-fit: cover;
`;

export const Input = styled.div.attrs({
  className: 'cdx-input',
  contentEditable: true,
})`
  ${(props) => (props.isShow ? '' : visibilityHidden)}
  ${(props) => (props.isError ? `border: 1px solid red;` : '')}
`;

export const Bottom = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-direction: column;
  margin-top: 0.5rem;
  align-items: center;
`;
