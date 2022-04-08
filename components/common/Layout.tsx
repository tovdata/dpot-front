import styled, { css } from 'styled-components';
// Component
import { RecoilRoot } from 'recoil';
import { Header } from './Header';
import SideMenu from './SideMenu';
// Type
import { CommonElementProps } from '../../models/type';
import { useState } from 'react';

// Set a side width
const CLOSE_SIDE_WIDTH: number = 80;
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
  position: relative;
  z-index: 2;
`;
// Styled element (Content)
const StyledContent = styled.div<MenuOpenStatus>`
  margin-left: ${CLOSE_SIDE_WIDTH}px;
  padding: 4.625rem 4rem;
  position: relative;
  transition: margin-left 0.42s;
  ${(props: any) => props.open && css`
    margin-left: ${OPEN_SIDE_WIDTH}px;
  `}
`;
// Styled element (Sider)
const StyledSider = styled.div<MenuOpenStatus>`
  height: 100%;
  position: fixed;
  transition: width 0.42s;
  width: ${CLOSE_SIDE_WIDTH}px;
  z-index: 4;
  ${(props: any) => props.open && css`
    width: ${OPEN_SIDE_WIDTH}px;
  `}
`;

/** [Interface] Menu open status */
interface MenuOpenStatus {
  open: boolean;
}

/**
 * [Component] Page Layout
 */
const Layout = ({ children }: CommonElementProps): JSX.Element => {
  // Set a local state
  const [openMenu, setOpenMenu] = useState<boolean>(true);
  // Create an event handler (onOpenMenu)
  const onOpenMenu = (): void => setOpenMenu(!openMenu);

  // Return an element
  return (
    <RecoilRoot>
      <StyledLayout>
        <Header />
        <StyledContainer>
          <StyledSider open={openMenu}>
            <SideMenu onOpen={onOpenMenu} open={openMenu} />
          </StyledSider>
          <StyledContent open={openMenu}>{children}</StyledContent>
        </StyledContainer>
      </StyledLayout>
    </RecoilRoot>
  );
}

export default Layout;