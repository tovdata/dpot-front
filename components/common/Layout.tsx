import styled, { createGlobalStyle } from 'styled-components';
// Component
import { RecoilRoot } from 'recoil';
import Header from './Header';
import SideMenu from './SideMenu';
// Type
import { CommonElementProps } from '../../models/type';

// Global style
const GlobalStyle = createGlobalStyle`
  .ant-select-item-option-selected {
    display: none;
  }
`;
// Styled element (Layout)
const StyledLayout = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
`;
// Styled element (Container)
const StyledContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
// Styled element (Content)
const StyledContent = styled.div`
  flex: 1;
  padding: 4.625rem 4rem;
`;

const Layout = ({ children }: CommonElementProps): JSX.Element => {
  return (
    <RecoilRoot>
      <GlobalStyle />
      <StyledLayout>
        <Header />
        <StyledContainer>
          <SideMenu />
          <StyledContent>{children}</StyledContent>
        </StyledContainer>
      </StyledLayout>
    </RecoilRoot>
  );
}

export default Layout;