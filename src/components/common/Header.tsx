import styled from 'styled-components';
// Color
import { GRAYSCALE300, GRAYSCALE_D } from '../../static/Color';
// Font
import { FS_HXXXXS, LH_HXXXXS } from '../../static/Font';
// Type
import { BasicElement } from '../../models/Type';
// Menu Item (type)
type MenuItem = {
  name: string;
  link: string;
}

// Create a styled element (HeaderNav)
const StyledNav = styled.div<BasicElement>`
  align-items: center;
  background-color: #F8FAFC;
  border-bottom: 1px solid ${GRAYSCALE300};
  display: flex;
  height: 4.375rem;
  justify-content: space-between;
  left: 0;
  padding: 1rem 3.5rem;
  position: relative;
  top: 0;
  width: 100vw;
  z-index: 10;
`;
// Create a styled element (Logo)
const StyledLogo = styled.a<BasicElement>`
  background-color: #E7E9F5;
  border-radius: 20px;
  cursor: pointer;
  height: 1.875rem;
  width: 100px;
`;
// Create a styled element (HeaderOptionForm)
const StyledTools = styled.div<BasicElement>`
  align-items: center;
  display: flex;
  justify-content: end;
  position: relative;
`;
// Create a styled element (HeaderMenu)
const StyledMenu = styled.div<BasicElement>`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`;
// Create a styled element (HeaderMenuItem)
const StyledMenuItem = styled.a<BasicElement>`
  color: ${GRAYSCALE_D};
  cursor: pointer;
  font-size: ${FS_HXXXXS};
  font-weight: 700;
  line-height: ${LH_HXXXXS};
  margin-right: 3.5rem;
  text-decoration: none;
  &:last-child {
    margin-right: 0;
  }
`;

/**
 * Create an element (for header)
 * @returns created element
 */
const Header = (): JSX.Element => {
  // Menu Item (data)
  const menuItems: MenuItem[] = [
    { name: '개인정보 관리', link: '/pi/view' },
    { name: '문서 관리', link: '/' },
    { name: '활동이력 관리', link: '/' },
    { name: '회사 관리', link: '/' }
  ]

  // Create the element for menu items
  const items: JSX.Element[] = menuItems.map((item: MenuItem, index: number): JSX.Element => <StyledMenuItem href={item.link} key={index}>{item.name}</StyledMenuItem>)
  // Return an element
  return (
    <StyledNav>
      <StyledLogo></StyledLogo>
      <StyledMenu>{items}</StyledMenu>
      <StyledTools></StyledTools>
    </StyledNav>
  )
}

export default Header;