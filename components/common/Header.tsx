import styled from 'styled-components';
import { useRouter, NextRouter } from 'next/router';
// Component
import { Button, Col, Modal, Row, Steps } from 'antd';
// Icon
import { ExclamationCircleOutlined } from '@ant-design/icons'
import { VscChevronLeft } from 'react-icons/vsc';

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
// Styled component
export const StyledTitleHeader = styled.h2`
  color: #000000D9;
  font-size: 20px;
  font-weight: 600;
  line-height: 24px;
  margin-bottom: 36px;
  user-select: none;
`;

/** [Interface] Properties for page header */
interface TOVPageTitleProps {
  title: string;
  style?: React.CSSProperties;
}
/** [Interface] Properties for page header contain step */
interface PageHeaderContainStepProps extends TOVPageTitleProps {
  current: number;
  canTemporarySave?: boolean;
  goTo?: string;
  onBack?: () => void;
  onMove: (type: string) => void;
  onSave: (temp?: boolean) => void;
  steps: string[];
}

/** [Component] 페이지 제목 */
export const TOVPageTitle: React.FC<TOVPageTitleProps> = ({ title, style }): JSX.Element => {
  return (
    <h2 style={{ color: '#000000D9', fontSize: 20, fontWeight: '600', lineHeight: '28px', ... style }}>{title}</h2>
  );
}

/** [Component] Page header contain step */
export const PageHeaderContainStep = ({ current, goTo, onBack, onMove, onSave, title, steps, canTemporarySave = true }: PageHeaderContainStepProps): JSX.Element => {
  // Get a router
  const router: NextRouter = useRouter();
  // Create a step item
  const items: JSX.Element[] = steps.map((item: string, index: number): JSX.Element => current === index ? (<Steps.Step key={index} status='process' title={item} />) : current < index ? (<Steps.Step key={index} status='wait' title={item} />) : (<Steps.Step key={index} status='finish' title={item} />));
  // Create an event handler (onBackRoute)
  const onBackRoute = () => {
    Modal.confirm({
      title: '작성중인 내용이 있습니다. 나가시겠습니까?',
      icon: <ExclamationCircleOutlined />,
      content: '임시저장하지 않고 페이지를 벗어날 경우, 지금까지 작성한 내용이 사라집니다.',
      okText: '예',
      // okType: 'danger',
      cancelText: '아니요',
      onOk() {
        // Clear
        onBack ? onBack() : undefined;
        // Move
        goTo ? router.push(goTo) : router.back();
      }
    })
  }

  // Return an element
  return (
    <StyledPageHeader>
      <Row style={{ marginBottom: '2.5rem' }}>
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
        {current > 0 ? <Button type='default' onClick={() => onMove('prev')}>이전</Button> : <span></span>}
        <div>
          {canTemporarySave && <Button onClick={() => onSave(true)} type='default'>임시저장</Button>}
          {current < steps.length - 1 ? <Button type='primary' onClick={() => onMove('next')} style={{ marginLeft: 16 }}>다음</Button> : <Button onClick={() => onMove('complete')} style={{ marginLeft: 16 }} type='primary'>확인</Button>}
        </div>
      </StyledPageHeaderExtra>
    </StyledPageHeader>
  );
}