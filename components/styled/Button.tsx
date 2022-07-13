import styled from 'styled-components';

/** [Styled Component] 버튼 */
export const StyledButton = styled.span`
  align-items: center;
  color: #000000D9;
  cursor: pointer;
  display: flex;
  font-size: 15px;
`;
/** [Styled Component] 버튼 폼 */
export const StyledButtonForm = styled.div<{ center?: boolean }>`
  align-items: center;
  display: flex;
  justify-content: ${({ center }) => center ? 'center' : 'start'};
  button,
  span.icon {
    margin-right: 12px;
  }
  button:last-child,
  span.icon:last-child {
    margin-right: 0;
  }
`;