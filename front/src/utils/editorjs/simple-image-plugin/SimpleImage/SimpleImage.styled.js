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

  @media (min-width: 768px) {
    width: 70%;
  }
`;

export const Input = styled.div.attrs({
  className: 'cdx-input',
  contentEditable: true,
})`
  ${(props) => (props.isError ? `border: 1px solid red;` : '')}
`;

export const InputLink = styled(Input)`
  margin-bottom: 1rem;
`;

export const InputCaption = styled(Input)`
  margin-top: 1rem;
`;

export const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  align-items: center;
`;
