import styled, { css } from 'styled-components';
// Type
import { BasicElement, ContainerProps } from '../models/Type';

// Create a styled element (Container)
const ContainerDiv = styled.div<BasicElement>`
  margin-top: 5rem;
  padding-left: 10.5rem;
  padding-right: 10.5rem; 
  position: relative;
  ${(props: any) => props.size && props.size === 'sm' && css`
    padding-left: 8.5rem;
    padding-right: 8.5rem;
  `}
  ${(props: any) => props.size && props.size === 'lg' && css`
    padding-left: 12.5rem;
    padding-right: 12.5rem;
  `}
`;

const Container = ({ children }: ContainerProps): JSX.Element => {
  // Return an element
  return <ContainerDiv>{children}</ContainerDiv>
}

export default Container;