// Style
import styled from 'styled-components';

/** [Styled Component] 사용자 정보 폼 */
export const StyledUserForm = styled.div`
  margin: 84px auto 64px auto;
  padding-bottom: 60px;
  width: 360px;
`;
/** [Styled Component] 사용자 정보 폼 헤더 */
export const StyledUserFormHeader = styled.div`
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin-bottom: 64px;
`;
/** [Styled Component] 회원 탈퇴 */
export const StyledWithdrawal = styled.div`
  display: flex;
  justify-content: flex-end;
  .content {
    color: #595959;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    text-decoration: underline;
  }
`;