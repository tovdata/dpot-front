// Component
import { Row } from 'antd';
// Style
import styled from 'styled-components';

/** [Styled Component] 섹션 */
export const StyledTabSection = styled.div`
  margin-top: 48px;
  position: relative;
  width: 100%;
`;
export const StyledRow = styled.div`
  margin-bottom: 16px;
  &:last-child {
    margin-bottom: 0;
  }
`;
/** [Styled Component] 날짜 */
export const StyledDate = styled.h5`
  color: #000000D9;
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  margin-bottom: 4px;
`;
/** [Styled Component] 날짜 (대시보드) */
export const StyledDateForDashboard = styled.h5`
  color: #2F2E41;
  font-size: 12px;
  font-weight: 400;
  line-height: 20px;
  margin-bottom: 4px;
`;
/** [Styled Component] 빈 값 */
export const StyledEmpty = styled.div`
  color: #8C8C8C;
  display: flex;
  justify-content: center;
`;
/** [Styled Component] 빈 값 (대시보드) */
export const StyledEmptyForDashboard = styled.div`
  align-items: center;
  color: #8C8C8C;
  display: flex;
  justify-content: center;
  height: 100%;
`;
/** [Styled Component] 목록 (대시보드) */
export const StyledList = styled.div`
  height: 100%;
  max-height: 340px;
  overflow-x: hidden;
  overflow-y: overlay;
  &::-webkit-scrollbar {
    background-color: transparent;
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgba(12, 12, 12, 0.24);
    border-radius: 6px;
  }
`;
/** [Styled Component] 타임라인 행 */
export const StyledTimelineRow = styled(Row)`
  color: #000000D9;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 4px;
  .time {
    color: #030852;
  }
  .content {
    font-weight: 500;
  }
`;
/** [Styled Component] 타임라인 행 (대시보드) */
export const StyledTimelineRowForDashboard = styled.div`
  align-items: start;
  color: #000000D9;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 4px;
  &:last-child {
    margin-bottom: 0;
  }
  .time {
    color: #003A8C;
    width: 60px;
  }
  .content {
    flex: 1;
    font-weight: 400;
    word-break: keep-all;
  }
`;