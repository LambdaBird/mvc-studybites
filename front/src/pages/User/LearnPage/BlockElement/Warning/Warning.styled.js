import styled from 'styled-components';

export const Wrapper = styled.div`
  margin: 1rem 0;
  display: flex;
  padding: 1rem;
  background-color: white;
  border-radius: 1rem;
  align-items: center;
`;

export const IconTitle = styled.div`
  display: flex;
  @media (max-width: 767px) {
    align-items: center;
  }
`;

export const Title = styled.span`
  font-weight: bold;
  text-align: center;
  font-size: 1.2rem;
`;

export const Message = styled.span`
  padding-left: 1rem;
`;
