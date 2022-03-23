import styled from 'styled-components';
// Color
import { WHITE } from '../../static/color';
// Icon
import { AiOutlineBell, AiOutlineLogout } from 'react-icons/ai';

// Styled element (HeaderNav)
const StyledHeaderNav = styled.div`
  align-items: center;
  background-color: ${WHITE};
  box-shadow: inset 0px -1px 0px #F0F0F0;
  display: flex;
  height: 3.5rem;
  justify-content: space-between;
  padding: 0 3.75rem;
  position: relative;
  user-select: none;
  width: 100vw;
  z-index: 99;
`;
// Styled element (HeaderLogo)
const StyledHeaderLogo = styled.div`
  background-color: #C4C4C4;
  border-radius: 0.25rem;
  height: 1.5rem;
  width: 5rem;
`;
// Styled element (HeaderTool)
const StyledHeaderTool = styled.div`
  align-items: center;
  display: flex;
  justify-content: end;
  position: relative;
`;
// Styled element (HeaderToolItem)
const StyledHeaderToolItem = styled.span`
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  margin-right: 1.25rem;
  height: 1.5rem;
  width: 1.5rem;
  transition: background-color 0.25s;
  &:last-child {
    margin-right: 0;
  }
  &:active,
  &:hover {
    background-color: #1890FF16;
  }
`;

const Header = (): JSX.Element => {
  return (
    <StyledHeaderNav>
      <StyledHeaderLogo />
      <StyledHeaderTool>
        <StyledHeaderToolItem><AiOutlineBell /></StyledHeaderToolItem>
        <StyledHeaderToolItem><AiOutlineLogout /></StyledHeaderToolItem>
      </StyledHeaderTool>
    </StyledHeaderNav>
  )
}

export default Header;