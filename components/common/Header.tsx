import styled from 'styled-components';
// Color
import { WHITE } from '../../static/color';
// Component
import { Button, Steps } from 'antd';
// Icon
import { AiOutlineBell, AiOutlineLogout } from 'react-icons/ai';
import { VscChevronLeft } from 'react-icons/vsc';

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
// Styled component (pageHeader)
const StyledPageHeader = styled.div`
  position: relative;
  user-select: none;
`;
// Styled component (pageHeaderHeading)
const StyledPageHeaderHeading = styled.div`
  align-items: start;
  display: flex;
  justify-content: space-between;
  margin-bottom: 4.5rem;
  position: relative;
`;
// Styled component (pageHeaderHeadingLeft)
const StyledPageHeaderHeadingLeft = styled.div`
  align-items: center;
  display: flex;
  margin-right: 7rem;
  position: relative;
`;
// Styled component (pageHeaderHeadingRight)
const StyledPageHeaderHeadingRight = styled.div`
  position: relative;
`;
// Styled component (pageHeaderContent)
const StyledPageHeaderExtra = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
`;
// Styled component (pageBackIcon)
const StyledPageBackIcon = styled.span`
  align-items: center;
  color: #242424;
  cursor: pointer;
  display: flex;
  font-size: 1.5rem;
  margin-right: 1.5rem;
`;
// Styled component (pageTitle)
const StyledPageTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  margin: 0;
  white-space: nowrap;
`;

// Interface
interface PageHeaderProps {
  title: string;
}
interface PageHeaderContainStepProps extends PageHeaderProps {
  current: number;
  onNext: () => void;
  onPrev: () => void;
  steps: string[];
}

export const Header = (): JSX.Element => {
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
// Component (page header contain step)
export const PageHeaderContainStep = ({ current, onNext, onPrev, title, steps }: PageHeaderContainStepProps): JSX.Element => {
  // Create a step item
  const items: JSX.Element[] = steps.map((item: string, index: number): JSX.Element => (<Steps.Step key={index} title={item} />));
  // Return an element
  return (
    <StyledPageHeader>
      <StyledPageHeaderHeading>
        <StyledPageHeaderHeadingLeft>
          <StyledPageBackIcon>
            <VscChevronLeft />
          </StyledPageBackIcon>
          <StyledPageTitle>{title}</StyledPageTitle>
        </StyledPageHeaderHeadingLeft>
        <StyledPageHeaderHeadingRight>
          <Steps current={current} progressDot>{items}</Steps>
        </StyledPageHeaderHeadingRight>
      </StyledPageHeaderHeading>
      <StyledPageHeaderExtra>
        {current > 0 ? <Button type='default' onClick={onPrev}>이전</Button> : <span></span>}
        {current < steps.length - 1 ? <Button type='primary' onClick={onNext}>다음</Button> : <Button type='primary'>완료</Button>}
      </StyledPageHeaderExtra>
    </StyledPageHeader>
  );
}