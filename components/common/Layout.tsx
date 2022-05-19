import { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
// Component
import { RecoilRoot } from 'recoil';
import { Header } from './Header';
import SideMenu from './SideMenu';
// Type
import { CommonElementProps } from '../../models/type';

// Set a side width
const CLOSE_SIDE_WIDTH: number = 88;
const OPEN_SIDE_WIDTH: number = 256;

// Styled element (Layout)
const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  position: relative;
  width: 100vw;
`;
// Styled element (Container)
const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;
// Styled element (Content)
const StyledContent = styled.div`
  display: block;
  flex: 1;
  padding: 4.625rem 4rem 0 4rem;
  position: relative;
`;
// Styled element (Sider)
const StyledSider = styled.div<SiderProps>`
  display: block;
  position: relative;
  transition: width 0.42s;
  width: ${CLOSE_SIDE_WIDTH}px;
  ${(props: any) => props.open && css`
    width: ${OPEN_SIDE_WIDTH}px;
  `}
  ${(props: any) => props.pos <= 56 && css`
    height: calc(100vh - 56px + ${props.pos}px);
  `}

  .scroll-bar{
    width:8px;
    height:100%;
    position:absolute;
    top:0;
    right:0;
    -webkit-transition: all .5s;
    opacity: 1;
    /* 배경색을 상자색과 똑같이 맞춰준다 */
    background-color:white;
  }
  &:hover{
    .scroll-bar{
      opacity: 0;
    }
  }
`;

/** [Interface] Menu open status */
interface SiderProps {
  open: boolean;
  pos: number;
}

/**
 * [Component] Page Layout
 */
const Layout = ({ children }: CommonElementProps): JSX.Element => {
  // Set a local state
  const [scrollPos, setScrollPos] = useState<number>(0);
  const [openMenu, setOpenMenu] = useState<boolean>(true);

  // Create an event handler (onOpenMenu)
  const onOpenMenu = (): void => setOpenMenu(!openMenu);
  // Create a function (updateScrollPos)
  const updateScrollPos = () => setScrollPos(window.scrollY || document.documentElement.scrollTop);

  // Set a effect
  useEffect(() => {
    // Add an event listenr (onScroll)
    window.addEventListener('scroll', updateScrollPos);
    // Return a trigger to remove an event listener
    return () => {
      window.removeEventListener('scroll', updateScrollPos);
    }
  }, []);
  // Set a status to fixed a sider
  const isFixed: boolean = scrollPos > 56 ? true : false;

  // Return an element
  return (
    <RecoilRoot>
      <StyledLayout>
        <Header />
        <StyledContainer>
          <StyledSider open={openMenu} pos={scrollPos}>
            <SideMenu isFixed={isFixed} onOpen={onOpenMenu} open={openMenu} />
            <div className='scroll-bar' />
          </StyledSider>
          <StyledContent>{children}</StyledContent>
        </StyledContainer>
      </StyledLayout>
    </RecoilRoot>
  );
}

export default Layout;