import styled from 'styled-components';

import variables from '@sb-ui/theme/variables';

export const Footer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background-color: ${variables['geekblue-1']};
  width: 100%;
  font-style: italic;
  & > * + * {
    margin-left: 0.5rem;
  }
`;

export const Link = styled.a`
  color: ${variables['blue-6']};
  cursor: pointer;
  text-decoration: underline;
  &:hover{
    color: ${variables['blue-4']};
    text-decoration: underline;
  }
  &:active{
    color ${variables['blue-7']}
  }
`;
