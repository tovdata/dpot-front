// Style
import styled from 'styled-components';

/** [Styled Component] 풀 스크린 */
export const StyledContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  position: relative;
  width: 100%;
  user-select: none;
  .section {
    display: flex;
    flex-direction: column;
    position: relative;
    text-align: center;
    .icon {
      margin-bottom: 56px;
    }
    .content {
      position: relative;
      h2 {
        color: #000000;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
        margin-bottom: 8px;
      }
      p {
        color: #000000D9;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        margin: 0;
      }
      button {
        margin-top: 16px;
      }
    }
  }
`;
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
      position: relative;
    }
    .content {
      margin-top: 56px;
      position: relative;
      h2 {
        color: #000000;
        font-size: 20px;
        font-weight: 600;
        line-height: 28px;
      }
      p {
        color: #000000D9;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        margin-bottom: 0;
        margin-top: 8px;
      }
      button {
        margin-top: 28px;
      }
    }
    .footer {
      align-items: center;
      display: flex;
      justify-content: space-between;
      margin-top: 16px;
      a {
        color: #8C8C8C;
        font-size: 12px;
        font-weight: 400;
        line-height: 22px;
        text-decoration: none;
      }
      a.underline {
        text-decoration: underline;
      }
    }
  }
`;