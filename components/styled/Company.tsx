// Style
import { Button } from 'antd';
import styled from 'styled-components';

/** [Styled Component] Drawer Extra */
export const StyledDrawerExtra = styled.span`
  align-items: center;
  color: '#7C7B7C';
  cursor: 'pointer';
  display: flex;
  justify-content: center;
  user-select: none;
`;
/** [Styled Component] Drawer Footer */
export const StyledDrawerFooter = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-end;
  user-select: none;
`;
/** [Styled Component] 회사 정보 저장 버튼 */
export const StyledEditButton = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  user-select: none;
`;
/** [Styled Component] 조직 구성원 초대 버튼 폼 */
export const StyledInviteForm = styled.div`
  align-items: center;
  border: 1px dashed #E5E5E5;
  display: flex;
  justify-content: space-between;
  padding: 32px 40px;
  user-select: none;
  width: 100%;
  .content {
    font-size: 14px;
    font-weight: 600;
    line-height: 22px;
    margin: 0;
  }
`;
/** [Styled Component] 페이지 레이아웃 */
export const StyledPageLayout = styled.div`
  display: block;
  position: relative;
  .ant-tabs-top > .ant-tabs-nav {
    border-bottom: none !important;
  }
  .ant-tabs-top > .ant-tabs-nav:before {
    border-bottom: none;
  }
  .container {
    margin-top: 64px;
    position: relative;
  }
`;
/** [Styled Component] 테이블 폼 */
export const StyledTableForm = styled.div`
  padding-left: 168px;
  padding-right: 168px;
  width: '100%';
`;
/** [Styled Component] 섹션 */
export const StyledTabSection = styled.div`
  margin-top: 80px;
  position: relative;
  width: 100%;
`;
/** [Styled Component] 회사 정보 저장 버튼 */
export const StyledSaveButton = styled(Button)`
  width: 100%;
`;