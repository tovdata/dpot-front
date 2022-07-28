// Component
import { Layout } from 'antd';
// Style
import styled from 'styled-components';

/** [Interface] Properties for Sider */
interface SiderProps {
  scroll: number;
}
/** [Interface] Properties for SiderFooter */
interface SiderFooterProps {
  expand: string;
}
/** [Interface] Properties for StyledPageContent */
interface StyledPageContentProps {
  expand: string;
  scroll: number;
}

/** [Styled Component] 페이지 내용 */
export const StyledPageContent = styled(Layout.Content)<StyledPageContentProps>`
  background-color: #FFFFFF;
  margin-left: ${({ expand, scroll }) => scroll >= 64 ? expand === 'true' ? '246px' : '80px' : 0};
  min-height: calc(100vh - 64px);
`;
/** [Styled Component] 페이지 사이드 */
export const StyledPageSider = styled(Layout.Sider)<SiderProps>`
  background-color: #FFFFFF;
  border-right: 1px solid #F0F0F0;
  height: ${({ scroll }) => scroll < 64 ? `calc(100vh - 64px + ${scroll}px)` : '100vh'};
  overflow-x: hidden;
  overflow-y: overlay;
  position: ${({ scroll }) => scroll >= 64 ? 'fixed' : 'relative'};
  top: 0;
  // 스크롤 보이기
  &:hover {
    &::-webkit-scrollbar-thumb { background-color: rgba(12, 12, 12, 0.24); }
  }
  // 스크롤 스타일
  &::-webkit-scrollbar { background-color: transparent; width: 6px; }
  &::-webkit-scrollbar-thumb { background-color: transparent; border-radius: 8px; }
  .container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 100%;
    padding-top: 32px;
    width: 100%;
  }
`;
export const StyledPageSiderFooter = styled.div<SiderFooterProps>`
  align-items: center;
  display: ${({ expand }) => expand === 'true' ? 'flex' : 'none'};
  flex-direction: column;
  justify-content: space-between;
  padding: 24px;
  .menu {
    cursor: pointer;
    font-size: 11px;
    line-height: 20px;
    margin-bottom: 8px;
    .pipp {
      border-right: 1px solid #8C8C8C;
      color: #8C8C8C;
      font-weight: 700;
      padding: 0 10px;
    }
    .terms {
      color: #8C8C8C;
      font-weight: 400;
      padding: 0 10px;
    }
  }
  .copyright {
    color: #8C8C8C;
    font-size: 11px;
    font-weight: 400;
    line-height: 16px;
    margin: 0;
    text-align: center;
  }
`;
/** [Styled Component] 페이지 헤더 */
export const StyledPageHeader = styled(Layout.Header)`
  background-color: #FFFFFF;
  box-shadow: inset 0px -1px 0px #F0F0F0;
  display: flex;
  font-size: 18px;
  font-weight: 600;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  text-decoration: none;
  .logo {
    align-items: center;
    display: flex;
    color: #000000;
    cursor: pointer;
    margin: 0;
  }
`;
/** [Styled Component] 페이지 헤더 메뉴 */
export const StyledPageHeaderNav = styled.div`
  user-select: none;
  .icon {
    cursor: pointer;
    font-size: 14px;
  }
`;
/** [Styled Component] 페이지 헤더 메뉴 아이템 */
export const StyledPageHeaderMenuItem = styled.a`
  border-left: 1px solid #F0F0F0;
  color: #000000;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  padding-left: 24px;
  padding-right: 24px;
  text-decoration: none;
  &:first-child {
    border-left: none;
  }
`;
/** [Styled Component] 페이지 컨텐츠 기본 패딩 */
export const PLIPLayoutPadding = styled.div`
  height: 100%;
  padding: 74px;
  position: relative;
`;
/** [Styled Component] 페이지 컨텐츠 기본 패딩 */
export const PLIPLayoutPaddingST = styled.div`
  height: 100%;
  padding: 42px 74px 74px 74px;
  position: relative;
`;
/** [Styled Component] 페이지 컨텐츠 가로 기본 패딩 */
export const PLIPLayoutHorizontalPadding = styled.div`
  height: 100%;
  padding-left: 74px;
  padding-right: 74px;
  position: relative;
`;
/** [Styled Component] 페이지 컨텐츠 세로 기본 패딩 */
export const PIIPLayoutVerticalPadding = styled.div`
  height: 100%;
  padding-bottom: 74px;
  padding-top: 74px;
  position: relative;
`;