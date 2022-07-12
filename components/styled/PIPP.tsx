// Style
import styled from 'styled-components';

/** [Styled Component] 개인정보 처리방침 메인 페이지 헤더 */
export const StyledPageHeader = styled.div`
  margin-bottom: 84px;
  user-select: none;
  .header {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin-bottom: 36px;
    .title {
      color: #000000D9;
      font-size: 20px;
      font-weight: 600;
      line-height: 24px;
    }
    .btn-guide {}
  }
  .content {
    align-items: center;
    background-color: #FAFAFA;
    border: 1px dashed #8C8C8C;
    border-radius: 8px;
    display: flex;
    justify-content: space-between;
    padding: 42px 34px;
    .form-description {
      align-items: center;
      display: flex;
      justify-content: space-between;
      .icon {
        align-items: center;
        color: #8C8C8C;
        display: flex;
        font-size: 20px;
        margin-right: 24px;
      }
      .description {
        color: #434343;
        font-size: 14px;
        font-weight: 600;
        lien-height: 22px;
        margin-bottom: 0;
      }
      button {
        margin-left: 16px;
      }
      button:first-child {
        margin-left: 0;
      }
    }
  }
`;
/** [Styled Component] 게재된 개인정보 처리방침 이름 (목록에서 사용) */
export const StyledPIPPName = styled.a`
  color: #000000D9;
  font-size: 14px;
  text-decoration: none;
`;