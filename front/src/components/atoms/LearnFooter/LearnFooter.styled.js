import { Link as RouterLink } from 'react-router-dom';
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
  & > * + * {
    margin-left: 0.25rem;
  }
`;

export const Link = styled(RouterLink)`
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
