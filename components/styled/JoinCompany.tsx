// Style
import styled from 'styled-components';

/** [Styled Component] 회사 선택 폼 (생성 또는 검색) */
export const StyledChoiceCompanyForm = styled.div`
  background-color: #FFFFFF;
  border-radius: 16px;
  padding: 64px;
  position: relative;
  user-select: none;
  width: 480px;
  h3 {
    color: #000000;
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    margin-bottom: 48px;
  }
  .info {
    color: #0050B3;
    font-size: 14px;
    font-weight: 500;
    line-weight: 22px;
    margin-bottom: 24px;
    margin-top: 24px;
    text-align: center;
  }
  .footer {
    .ant-btn {
      margin-bottom: 12px;
      width: 100%;
      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
/** [Styled Component] 회사 목록 아이템 */
export const StyledCompanyItem = styled.div`
  border-bottom: 1px solid #D9D9D9;
  cursor: pointer;
  padding: 16px 0;
  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
  h5 {
    color: #0050B3;
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin-bottom: 4px;
  }
  p {
    color: #595959;
    font-size: 13px;
    font-weight: 400;
    line-height: 21px;
    margin-bottom: 0;
  }
`;
/** [Styled Component] 회사 목록 */
export const StyledCompanyList = styled.div`
  margin-top: 24px;
  position: relative;
  user-select: none;
  .subject {
    color: #595959;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 0;
  }
  .empty {
    color: #595959;
    font-size: 13px;
    font-weight: 400;
    line-height: 21px;
    margin-bottom: 0;
    margin-top: 6px;
  }
`;
/** [Styled Component] 회사 참여를 위한 유형 카드 */
export const StyledJoinCompanyTypeCard = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #D8DFED;
  border-radius: 12px;
  cursor: pointer;
  margin-bottom: 32px;
  padding: 56px 62px;
  position: relative;
  width: 880px;
  user-select: none;
  &:last-child {
    margin-bottom: 0;
  }
  .content {
    color: #000000;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    margin-bottom: 0;
    margin-left: 45px;
  }
  .header {
    align-items: center;
    display: flex;
    margin-bottom: 20px;
    i {
      font-size: 22px;
      margin-right: 22px;
    }
    h4 {
      color: #2F2E41;
      font-size: 20px;
      font-weight: 600;
      line-height: 28px;
      margin: 0px;
    }
  }
`;
/** [Styled Component] 회사 및 서비스 선택 페이지 배경 */
export const StyledPageBackground = styled.div`
  align-items: center;
  background-color: #F5F6FF;
  display: flex;
  justify-content: center;
  min-height: 100vh;
  position: relative;
  width: 100vw;
`;
/** [Styled Component] 회사 및 서비스 선택 페이지 레이아웃 */
export const StyledPageLayout = styled.div`
  margin-bottom: 96px;
  margin-top: 96px;
  position: relative;
  width: 880px;
  .title {
    font-size: 24px;
    font-weight: 500;
    line-height: 32px;
    margin-bottom: 80px;
    text-align: center;
    user-select: none;
  }
`;