// Styled
import styled from 'styled-components';

/** [Styled Component] 입력 그룹 */
export const StyledInputGroup = styled.div`
  margin-bottom: 16px;
  position: relative;
  .plip-header {
    align-items: center;
    display: flex;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 6px;
    user-select: none;
    .plip-title {
      color: #000000;
      margin: 0;
    }
    .plip-tooltip {
      align-items: center;
      cursor: pointer;
      display: flex;
      margin-left: 6px;
    }
    .plip-required {
      color: #FF4D4F;
      margin-left: 6;
    }
  }
`;