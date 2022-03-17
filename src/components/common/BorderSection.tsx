import styled from 'styled-components';
import { BorderSectionProps } from '../../models/type2';

export const SectionElement = styled.section<BorderSectionProps>`
  border: 1px solid #C3C8E5;
  border-radius: 0.5rem;
  margin:0 1rem;
  padding:2rem 1rem;
  width: ${(props: any) => props.width || 'auto'};
  display: flex;
  flex-direction: column;
`;

/**
 * Create an element (for section)
 * @param children child elements 
 * @returns created element
 */
export const BorderSection = ({ children, width }: BorderSectionProps): JSX.Element => {
  return <SectionElement width={width}>{children}</SectionElement>;
}
