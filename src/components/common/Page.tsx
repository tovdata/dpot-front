import styled from 'styled-components';
// Component
import Header from './Header';
import SideMenu from './SideMenu';
// Style
import 'antd/dist/antd.css';
// Type
import { CommonElementProps } from '../../models/type';

// Styled element (Page)
const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
`;
// Styled element (Wrapper)
const StyledWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
`;
// Styled element (Content)
const StyledContent = styled.div`
  flex: 1;
  padding: 4.625rem 4rem;
`;

const Page = ({ children }: CommonElementProps): JSX.Element => {
  return (
    <>
      <StyledPage>
        <Header />
        <StyledWrapper>
          <SideMenu />
          <StyledContent>
            {children}
          </StyledContent>
        </StyledWrapper>
      </StyledPage>
    </>
  )
}

export default Page;