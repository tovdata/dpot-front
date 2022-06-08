// import { useEffect, useState } from 'react';
// import styled, { css } from 'styled-components';
// // Component
// import { RecoilRoot } from 'recoil';
// import { Header } from './Header';
// import SideMenu, { TOVSideMenu } from './SideMenu';
// // Type
// import { CommonElementProps } from '../../models/type';

// // Set a side width
// const CLOSE_SIDE_WIDTH: number = 88;
// const OPEN_SIDE_WIDTH: number = 256;

// // Styled element (Layout)
// const StyledLayout = styled.div`
//   display: flex;
//   flex-direction: column;
//   min-height: 100vh;
//   position: relative;
//   width: 100vw;
// `;
// // Styled element (Container)
// const StyledContainer = styled.div`
//   display: flex;
//   flex: 1;
//   position: relative;
// `;
// // Styled element (Content)
// const StyledContent = styled.div`
//   display: block;
//   flex: 1;
//   padding: 0 4rem;
//   position: relative;
// `;
// // Styled element (Sider)
// const StyledSider = styled.div<SiderProps>`
//   display: block;
//   position: relative;
//   transition: width 0.42s;
//   width: ${CLOSE_SIDE_WIDTH}px;
//   ${(props: any) => props.open && css`
//     width: ${OPEN_SIDE_WIDTH}px;
//   `}
//   ${(props: any) => props.pos <= 56 && css`
//     height: calc(100vh - 56px + ${props.pos}px);
//   `}

//   .scroll-bar{
//     width:8px;
//     height:100%;
//     position:absolute;
//     top:0;
//     right:0;
//     -webkit-transition: all .5s;
//     opacity: 1;
//     /* 배경색을 상자색과 똑같이 맞춰준다 */
//     background-color:white;
//   }
//   &:hover{
//     .scroll-bar{
//       opacity: 0;
//     }
//   }
// `;

// /** [Interface] Menu open status */
// interface SiderProps {
//   open: boolean;
//   pos: number;
// }

// /**
//  * [Component] Page Layout
//  */
// const Layout = ({ children }: CommonElementProps): JSX.Element => {
//   // Set a local state
//   const [scrollPos, setScrollPos] = useState<number>(0);
//   const [openMenu, setOpenMenu] = useState<boolean>(true);

//   // Create an event handler (onOpenMenu)
//   const onOpenMenu = (): void => setOpenMenu(!openMenu);
//   // Create a function (updateScrollPos)
//   const updateScrollPos = () => setScrollPos(window.scrollY || document.documentElement.scrollTop);

//   // Set a effect
//   useEffect(() => {
//     // Add an event listenr (onScroll)
//     window.addEventListener('scroll', updateScrollPos);
//     // Return a trigger to remove an event listener
//     return () => {
//       window.removeEventListener('scroll', updateScrollPos);
//     }
//   }, []);
//   // Set a status to fixed a sider
//   const isFixed: boolean = scrollPos > 56 ? true : false;

//   // Return an element
//   return (
//     <RecoilRoot>
//       <StyledLayout>
//         <Header />
//         <StyledContainer>
//           <StyledSider open={openMenu} pos={scrollPos}>
//             <TOVSideMenu />
//             {/* <SideMenu isFixed={isFixed} onOpen={onOpenMenu} open={openMenu} /> */}
//             <div className='scroll-bar' />
//           </StyledSider>
//           <StyledContent>{children}</StyledContent>
//         </StyledContainer>
//       </StyledLayout>
//     </RecoilRoot>
//   );
// }

// export default Layout;


import { useEffect, useState } from 'react';
import Router from 'next/router';
// Component
import { Layout } from 'antd';
import { TOVSideMenu } from './SideMenu';
// Icon
import { UserOutlined } from '@ant-design/icons';
// Style
import styled from 'styled-components';

/** [Interface] Properties for Sider */
interface SiderProps {
  scroll: number;
}
/** [Interface] Properties for TOVPageLayout */
interface TOVPageLayoutProps {
  children?: JSX.Element | JSX.Element[];
  expand: boolean;
  onExpand: () => void;
  selectedKey: string;
}
/** [Interface] Properties for TOVPageSide */
interface TOVPageSideProps {
  expand: boolean;
  onExpand: () => void;
  scroll: number;
  selectedKey: string;
}

/** [Styled Component] 페이지 사이드 */
const Sider = styled(Layout.Sider)<SiderProps>`
  background-color: #FFFFFF;
  height: ${(props: any) => props.scroll < 64 ? `calc(100vh - 64px + ${props.scroll}px)` : '100vh'};
  left: 0;
  overflow-y: auto;
  position: ${(props: any) => props.scroll >= 64 ? 'fixed' : 'relative'};
  top: 0;
  // 스크롤 숨기기
  &:hover {
    &::-webkit-scrollbar-thumb { background-color: #CCCCCC; }
  }
  // 스크롤 스타일
  &::-webkit-scrollbar { width: 6px; }
  &::-webkit-scrollbar-thumb { background-color: #FFFFFF; border-radius: 6px; }
`;
/** [Styled Component] 페이지 헤더 */
const Header = styled(Layout.Header)`
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
const HeaderNav = styled.div`
  user-select: none;
`;
/** [Styled Component] 페이지 헤더 메뉴 아이템 */
const HeaderMenuItem = styled.span`
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

/** [Component] 페이지 레이아웃 */
export const TOVPageLayout: React.FC<TOVPageLayoutProps> = ({ children, expand, onExpand, selectedKey }): JSX.Element => {
  // 스크롤 상태
  const [scroll, setScroll] = useState<number>(0);

  // 스크롤 값 저장을 위한 Hook
  const onScroll = () => setScroll(window.scrollY);
  // 스크롤 이벤트 등록 (최초 1회)
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, []);

  // 컴포넌트 반환
  return (
    <Layout>
      <TOVPageHeader />
      <Layout hasSider style={{ backgroundColor: '#FFFFFF' }}>
        <TOVPageSide expand={expand} selectedKey={selectedKey} onExpand={onExpand} scroll={scroll} />
        <Layout.Content style={{ backgroundColor: '#FFFFFF', marginLeft: scroll >= 64 ? expand ? 246 : 80 : undefined, minHeight: 'calc(100vh - 64px)', paddingLeft: 74, paddingRight: 74 }}>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
/** [Component] 페이지 레이아웃 (헤더) */
export const TOVPageHeader: React.FC<any> = (): JSX.Element => {
  return (
    <Header>
      <div>
        <a href='/' style={{ color: '#000000', cursor: 'pointer' }}>MOPH</a>
      </div>
      <HeaderNav>
        <HeaderMenuItem>사용가이드</HeaderMenuItem>
        <HeaderMenuItem onClick={() => Router.push('/company/info')}>회사 관리</HeaderMenuItem>
        <span onClick={() => Router.push('/login')} style={{ cursor: 'pointer', marginLeft: 12 }}>
          <UserOutlined />
        </span>
      </HeaderNav>
    </Header>
  );
}
/** [Interneal Component] 페이지 레이아웃 (사이드) */
const TOVPageSide: React.FC<TOVPageSideProps> = ({ expand, onExpand, scroll, selectedKey }): JSX.Element => {
  return (
    <Sider collapsed={!expand} scroll={scroll} width={246}>
      <div style={{ borderRight: '1px solid #F0F0F0', height: '100%', paddingTop: 32 }}>
        <TOVSideMenu expand={expand} onExpand={onExpand} selectedKey={selectedKey} />
      </div>
    </Sider>
  );
}