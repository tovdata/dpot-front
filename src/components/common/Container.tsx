import styled, { css } from 'styled-components';
// Type
import { CommonElementProps } from '../../models/type';

// Create a styled element (Container)
export const ContainerDiv = styled.div`
  margin-top: 5rem;
  padding-left: 10.5rem;
  padding-right: 10.5rem; 
  position: relative;
`;

/**
 * Create an element (for container)
 * @param children child elements 
 * @returns created element
 */
const Container = ({ children }: CommonElementProps): JSX.Element => {
  return <ContainerDiv>{children}</ContainerDiv>
}

export default Container;