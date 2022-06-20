// Styled
import styled from 'styled-components';

/** [Styled Component] 갯수 표시 라벨 */
export const StyledCountLabel = styled.p`
  color: #11142D;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin: 0;
  small {
    color: #2F2E41;
    font-size: 12;
    font-weight: 400;
    line-height: 20px;
    margin-left: 5px;
  }
`;
/** [Styled Component] 대시보드 헤더 */
export const StyledDashboardHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;
  user-select: none;
`;
/** [Styled Component] 대시보드 아이템 카드 */
export const StyledDashboardItemCard = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #F0F5FF;
  border-radius: 16px;
  height: 100%;
  position: relative;
  .ant-spin-container,
  .ant-spin-nested-loading {
    height: 100%;
  }
`;
/** [Styled Component] 대시보드 아이템 내용 */
export const StyledDashboardItemContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 24px 32px;
`;
/** [Styled Component] 대시보드 아이템 내용 */
export const StyledDashboardItemContentEnd = styled.div`
  display: flex;
  justify-content: flex-end;
`;
/** [Styled Component] 대시보드 아이템 헤더 */
export const StyledDashboardItemHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 16px;
`;
/** [Styled Component] 대시보드 아이템 제목 */
export const StyledDashboardItemTitle = styled.h3`
  color: #061178;
  font-size: 14px;
  font-weight: 700;
  line-height: 22px;
  margin: 0;
`;
/** [Styled Component] 개인정보 보호책임자 설명 폼 */
export const StyledDescriptionForm = styled.div`
  align-items: center;
  display: flex;  
`;
/** [Styled Component] 개인정보 보호책임자 설명 폼 내용 */
export const StyledDescriptionFormContent = styled.div`
  font-size: 14px;
  font-weight: 500;
  flex: 1;
  line-height: 24px;
`;
/** [Styled Component] 개인정보 보호책임자 설명 폼 주제 */
export const StyledDescriptionFormSubject = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  min-width: 60px;
`;
/** [Styled Component] 최근 정보 수정일 Row */
export const StyledLatestInfoRow = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
  &:last-child {
    margin-bottom: 0;
  }
`;
/** [Styled Component] 최근 정보 수정일 주제 */
export const StyledLatestInfoRowSubject = styled.h5`
  color: #11142D;
  font-size: 14px;
  font-weight: 600;
  line-height: 22px;
  margin: 0;
`;
/** [Styled Component] 최근 정보 수정일 내용 */
export const StyledLatestInfoRowContent = styled.div`
  color: #11142D;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
`;
/** [Styled Component] 최근 정보 수정일 내용 Container */
export const StyledLatestInfoRowContentContainer = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  min-width: 116px
`;
/** [Styled Component] 개인정보 보호책임자 섹션 */
export const StyledManagerSection = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
`;
/** [Styled Component] 개인정보 보호책임자 섹션 헤더 */
export const StyledManagerSectionHeader = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 21px;
  position: relative;
`;
/** [Styled Component] 개인정보 보호책임자 섹션 아이콘 */
export const StyledManagerSectionIcon = styled.div`
  font-size: 16px;
  margin-left: 8px;
`;
/** [Styled Component] 개인정보 보호책임자 섹션 제목 */
export const StyledManagerSectionTitle = styled.div`
  color: #2F2E41;
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  margin: 0;
`;
/** [Styled Component] 동의서 유형 태그 목록 */
export const StyledTagList = styled.div`
  align-items: flex-end;
  display: flex;
  margin-bottom: -4px;
  position: relative;
  user-select: none;
`;
/** [Styled Component] 동의서 유형 태그 */
export const StyledTag = styled.span`
  background-color: #F0F5FF;
  border-radius: 2px;
  color: #000000D9;
  display: inline-block;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 4px;
  margin-right: 4px;
  padding: 2px 8px;
`;