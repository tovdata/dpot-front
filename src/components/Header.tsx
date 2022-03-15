import styled from 'styled-components';
// Color
import { GRAYSCALE300, GRAYSCALE_D } from '../static/Color';
// Font
import { FS_HXXXXS, LH_HXXXXS } from '../static/Font';
// Type
import { BasicElement } from '../models/Type';

// Menu Item (type)
type MenuItem = {
  name: string;
  link: string;
}
// Menu Item (data)
const menuItems: MenuItem[] = [
  { name: '개인정보 관리', link: '/' },
  { name: '문서 관리', link: '/' },
  { name: '활동이력 관리', link: '/' },
  { name: '회사 관리', link: '/' }
]

// Create a styled element (HeaderNav)
const HeaderNav = styled.div<BasicElement>`
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
const Logo = styled.a<BasicElement>`
  background-color: #E7E9F5;
  border-radius: 20px;
  cursor: pointer;
  height: 1.875rem;
  width: 100px;
`;
// Create a styled element (HeaderOptionForm)
const HeaderOptionForm = styled.div<BasicElement>`
  align-items: center;
  display: flex;
  justify-content: end;
  position: relative;
`;
// Create a styled element (HeaderMenu)
const HeaderMenu = styled.div<BasicElement>`
  align-items: center;
  display: flex;
  justify-content: center;
  position: relative;
`;
// Create a styled element (HeaderMenuItem)
const HeaderMenuItem = styled.a<BasicElement>`
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

const Header = (): JSX.Element => {
  // Create the element for menu items
  const items: JSX.Element[] = menuItems.map((item: MenuItem, index: number): JSX.Element => <HeaderMenuItem href={item.link} key={index}>{item.name}</HeaderMenuItem>)
  // Return an element
  return (
    <HeaderNav>
      <Logo></Logo>
      <HeaderMenu>{items}</HeaderMenu>
      <HeaderOptionForm></HeaderOptionForm>
    </HeaderNav>
  )
}

export default Header;