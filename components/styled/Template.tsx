import styled from 'styled-components';
// Component
import Grid from 'antd/lib/card/Grid';
// Icon
import { DownloadOutlined } from '@ant-design/icons';

/** [Styled Component] 템플릿 페이지 섹션 */
export const StyledSection = styled.div`
  position: relative;
  margin-bottom: 56px;
`;
/** [Styled Component] 템플릿 페이지 섹션 헤더 */
export const StyledSectionHeader = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 28px;
  position: relative;
  .title {
    color: #000000D9;
    font-size: 20px;
    font-weight: 600;
    line-height: 24px;
    margin: 0;
  }
`;
/** [Styled Component] 템플릿 카드 */
export const StyledTemplateCard = styled.a`
  align-items: center;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(47, 46, 65, 0.15);
  color: #000000D9;
  cursor: pointer;
  display: flex;
  font-size: 14px;
  font-weight: 500;
  height: 100%;
  justify-content: center;
  line-height: 22px;
  padding: 30px 42px;
  transition: 0.3s all;
  text-align: center;
  text-decoration: none;
  user-select: none;
  width: 100%;
  &:hover{
    transform:scale(1.03);
  };
`;

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