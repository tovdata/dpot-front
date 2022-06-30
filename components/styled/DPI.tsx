// Style
import styled from 'styled-components';

/** [Styled Component] 설명 제목 */
export const StyledDescriptionLabel = styled.p`
  margin: 0;
  position: relative;
  user-select: none;
  .required {
    color: #FF4D4F;
    font-size: 14px;
    font-weight: 600;
    margin-left: 4px;
  }
`;
/** [Styled Component] 파기 정보 폼 헤더 */
export const StyledInformationFormHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 74px;
  user-select: none;
  .left {
    align-items: center;
    display: flex;
    position: relative;
    .back {
      align-item: center;
      color: #242424;
      cursor: pointer;
      display: flex;
      font-size: 24px;
      margin-right: 24px;
    }
    .title {
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
      margin: 0;
    }
  }
  .right {
    position: relative;
  }
`;
/** [Styled Component] 파기 정보 폼 풋터 */
export const StyledInformationFormFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
  position: relative;
`;
/** [Styled Component] 파기 확인서 인쇄를 위한 레이아웃 */
export const StyledPrintLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: start;
  padding: 10%;
  width: 100%;
  .title {
    color: #000000;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 82px;
    text-align: center;
  }
  .footer {
    font-size: 16px;
    font-weight: 500;
    line-height: 32px;
    margin-top: 84px;
    position: relative;
    text-align: center;
    user-select: none;
    .date {
      margin-bottom: 16px;
    }
    .manager {
      margon: 0;
      label {
        margin-left: 6px;
      }
    }
  }
`;