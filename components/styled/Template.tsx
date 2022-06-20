import styled from 'styled-components';
// Component
import { Button } from 'antd';
// Icon
import { DownloadOutlined } from '@ant-design/icons';

/** [Styled Component] 탭 패널 */
export const StyledTabPane = styled.div`
  padding-top: 48px;
`;
/** [Styled Component] 탭 패널 헤더 */
export const StyledTabPaneHeader = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 24px;
  position: relative;
`;
/** [Styled Component] 탭 패널 제목 */
export const StyledTabPaneTitle = styled.h2`
  color: #000000D9;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin: 0;
`;
/** [Styled Component] 템플릿 카드 */
export const StyledTemplateCard = styled.div`
  align-items: center;
  border: 1px solid #F0F0F0;
  cursor: pointer;
  display: flex;
  height: 100%;
  justify-content: center;
  padding-bottom: 42px;
  padding-top: 42px;
  user-select: none;
`;
/** [Styled Component] 다운로드 버튼 */
export const StyledDownloadButton = styled.a`
  background-color: rgba(255, 255, 255, 0);
  border: none;
`;
/** [Styled Component] 다운로드 아이콘 */
export const StyledDownloadIcon = styled(DownloadOutlined)`
  color: #000000D9;
  font-size: 14px;
`;