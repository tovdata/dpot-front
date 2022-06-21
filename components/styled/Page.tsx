// Style
import styled from 'styled-components';

/** [Styled Component] 풀 스크린 */
export const StyledFullScreen = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  position: relative;
  width: 100vw;
  user-select: none;
  .section {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: center;
    .icon {
      margin-bottom: 16px;
    }
    .content {
      position: relative;
      h2 {
        color: #000000D9;
        font-size: 24px;
        font-weight: 600;
        line-height: 28px;
        margin-bottom: 8px;
      }
      p {
        color: #00000052;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        margin: 0;
      }
      button {
        margin-top: 16px;
      }
    }
  }
`;