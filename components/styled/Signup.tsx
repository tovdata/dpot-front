// Styled
import styled from 'styled-components';

/** [Styled Component] 회사 목록 */
export const StyledCompanyList = styled.div`
  position: relative;
  user-select: none;
  max-height: 213px;
  overflow-y: auto;
`;
/** [Styled Component] 회사 목록 제목 */
export const StyledCompanyListTitle = styled.div`
  color: #595959;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 4px;
`;
/** [Styled Component] 회사 목록 아이템 */
export const StyledCompanyListItem = styled.div`
  border-bottom: 1px solid #D9D9D9;
  cursor: pointer;
  padding-bottom: 12px;
  padding-top: 12px;
  &:last-child {
    border-bottom: 0;
    padding-bottom: 0;
  }
`;
/** [Styled Component] 회사 이름 */
export const StyledCompanyListItemName = styled.h5`
  color: #0050B3;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 4px;
`;
/** [Styled Component] 회사 설명 */
export const StyledCompanyListItemDescription = styled.p`
  color: #595959;
  font-size: 13px;
  font-weight: 500;
  line-height: 21px;
  margin: 0;
`;

/** [Styled Component] 입력 폼 */
export const StyledInputGroup = styled.div`
  margin-bottom: 16px;
  position: relative;
  user-select: none;
`;
/** [Styled Component] 입력 폼 헤더 */
export const StyledInputGroupHeader = styled.div`
  display: flex;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 8px;
`;
/** [Styled Component] 입력 폼 필수 표시 */
export const StyledInputGroupRequired = styled.label`
  color: #FF4D4F;
  margin: 0 0 8px 0;
`;
/** [Styled Component] 입력 폼 주제 */
export const StyledInputGroupSubject = styled.label`
  color: #000000;
  margin: 0;
`;
/** [Styled Component] 회원가입 폼 헤더 */
export const StyeldSignupHeader = styled.div`
  margin-bottom: 48px;
  position: relative;
  text-align: center;
  user-select: none;
`;
/** [Styled Component] 회원가입 폼 제목 */
export const StyledSignupTitle = styled.h2`
  font-size: 24px;
  font-weight: 500;
  line-height: 32px;
  margin: 0;
`;