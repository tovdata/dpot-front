// Component
import { Layout } from 'antd';
// Style
import styled from 'styled-components';

/** [Interface] Properties for Sider */
interface SiderProps {
  scroll: number;
}

/** [Styled Component] 페이지 사이드 */
const StyledSider = styled(Layout.Sider)<SiderProps>`
  background-color: #FFFFFF;
  border-right: 1px solid #F0F0F0;
  height: ${(props: any) => props.scroll < 64 ? `calc(100vh - 64px + ${props.scroll}px)` : '100vh'};
  overflow-x: hidden;
  overflow-y: overlay;
  position: ${(props: any) => props.scroll >= 64 ? 'fixed' : 'relative'};
  top: 0;
  // 스크롤 보이기
  &:hover {
    &::-webkit-scrollbar-thumb { background-color: rgba(12, 12, 12, 0.24); }
  }
  // 스크롤 스타일
  &::-webkit-scrollbar { background-color: transparent; width: 6px; }
  &::-webkit-scrollbar-thumb { background-color: transparent; border-radius: 8px; }
`;
/** [Styled Component] 페이지 헤더 */
const StyledHeader = styled(Layout.Header)`
  background-color: #FFFFFF;
  box-shadow: inset 0px -1px 0px #F0F0F0;
  display: flex;
  font-size: 18px;
  font-weight: 600;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  text-decoration: none;
`;
/** [Styled Component] 페이지 헤더 메뉴 */
const StyledHeaderNav = styled.div`
  user-select: none;
`;
/** [Styled Component] 페이지 헤더 메뉴 아이템 */
const StyledHeaderMenuItem = styled.span`
  border-left: 1px solid #F0F0F0;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  padding-left: 24px;
  padding-right: 24px;
  &:first-child {
    border-left: none;
  }
`;
/** [Styled Component] 페이지 컨텐츠 기본 패딩 */
export const PLIPLayoutPadding = styled.div`
  padding: 74px;
  position: relative;
`;
/** [Styled Component] 페이지 컨텐츠 가로 기본 패딩 */
export const PLIPLayoutHorizontalPadding = styled.div`
  padding-left: 74px;
  padding-right: 74px;
  position: relative;
`;
/** [Styled Component] 페이지 컨텐츠 세로 기본 패딩 */
export const PIIPLayoutVerticalPadding = styled.div`
  padding-bottom: 74px;
  padding-top: 74px;
  position: relative;
`;