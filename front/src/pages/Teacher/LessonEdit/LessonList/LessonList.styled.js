import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: fixed;
  top: 56px;
  left: 0;
  padding: 1rem;
  z-index: 9999;
`;

export const Lesson = styled.div`
  cursor: pointer;
  padding: 0.5rem;
  border: 1px solid green;
  width: 300px;
  background-color: ${(props) =>
    props.status === 'Public' ? 'lightgreen' : ''};
`;
