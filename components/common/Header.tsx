import styled from 'styled-components';
import { useRouter, NextRouter } from 'next/router';
// Component
import { Button, Col, Row, Steps } from 'antd';
// Icon
import { AiOutlineBell, AiOutlineLogout } from 'react-icons/ai';
import { VscChevronLeft } from 'react-icons/vsc';

// Styled element (HeaderNav)
const StyledHeaderNav = styled.div`
  align-items: center;
  background-color: #ffffff;
  box-shadow: inset 0px -1px 0px #f0f0f0;
  display: flex;
  height: 3.5rem;
  justify-content: space-between;
  padding: 0 1.875rem;
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
  margin-right: 0.875rem;
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
  margin-bottom: 2rem;
  position: relative;
  user-select: none;
`;
// Styled component (pageHeaderHeading)
const StyledPageHeaderHeading = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
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

/** [Interface] Properties for page header */
interface PageHeaderProps {
  title: string;
}
/** [Interface] Properties for page header contain step */
interface PageHeaderContainStepProps extends PageHeaderProps {
  current: number;
  goTo?: string;
  onBack?: () => void;
  onMove: (type: string) => void;
  steps: string[];
}

/** [Component] Main header */
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
/** [Component] Page header contain step */
export const PageHeaderContainStep = ({ current, goTo, onBack, onMove, title, steps }: PageHeaderContainStepProps): JSX.Element => {
  // Get a router
  const router: NextRouter = useRouter(); 
  // Create a step item
  const items: JSX.Element[] = steps.map((item: string, index: number): JSX.Element => current === index ? (<Steps.Step key={index} status='process' title={item} />) : current < index ? (<Steps.Step key={index} status='wait' title={item} />) : (<Steps.Step key={index} status='finish' title={item} />));
  // Create an event handler (onBackRoute)
  const onBackRoute = () => {
    // Clear
    onBack ? onBack() : undefined;
    // Move
    goTo ? router.push(goTo) : router.back();
  }
  // Return an element
  return (
    <StyledPageHeader>
      <Row style={{ marginBottom: '4.5rem' }}>
        <Col flex='auto'>
          <StyledPageHeaderHeading>
            <StyledPageBackIcon onClick={onBackRoute}>
              <VscChevronLeft />
            </StyledPageBackIcon>
            <StyledPageTitle>{title}</StyledPageTitle>
          </StyledPageHeaderHeading>
        </Col>
        <Col flex='auto'>
          <Steps current={current} type='navigation'>{items}</Steps>
        </Col>
      </Row>
      <StyledPageHeaderExtra>
        {current > 0 ? <Button type='default' onClick={() => onMove('prev')}>이전</Button> : undefined}
        <Button type='default'>임시저장</Button>
        {current < steps.length - 1 ? <Button type='primary' onClick={() => onMove('next')}>다음</Button> : <Button type='primary'>완료</Button>}
      </StyledPageHeaderExtra>
    </StyledPageHeader>
  );
}