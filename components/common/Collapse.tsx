import styled from 'styled-components';
import React from 'react';
// Component
import { Collapse, Descriptions, Input, Popover, Radio, Space } from 'antd';
// Icon
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AddableTagSelect, TagSelect } from './Select';

// Styled element (collapse)
export const StyledCollapse = styled(Collapse)`
  .ant-collapse-item > .ant-collapse-header {
    align-items: center;
    display: flex;
    user-select: none;
  }
`;

/** [Interface] Collapse header data */
export interface CollapsePanelHeaderData {
  description?: string;
  precedence?: string|number;
  title: string;
}
/** [Interface] Radio Option */
interface RadioOption {
  label: string;
  value: boolean|string;
}
/** [Properties] Properties for clleapse header (in create a document part)  */
interface CDPCollapseHeaderProps {
  description?: string;
  title: string;
}
/** [Properties] Properties for clleapse panel (in create a document part)  */
interface CDPCollapsePanelProps {
  children?: JSX.Element|JSX.Element[];
  header: CDPCollapseHeaderProps;
  id: string;
  onChange: (target: string, status: boolean) => void;
  status: boolean;
}

/**
 * [Component] Custom collapse
 */
export const CollapseForPIPP = ({ data, items, onChange }: any): JSX.Element => {
  const THIS_STEP: string = 'aInfo';
  // Return an element
  return (
    <StyledCollapse activeKey={Object.keys(data).filter((key: string): boolean => data[key].usage)}>
      <CDPCollapsePanel header={{ description: 'a', title: '쿠키(cookie)를 사용하나요?' }} id='cookie' key='cookie' onChange={(category: string, value: any) => onChange('aInfo', category, 'usage', value)} status={data.cookie.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '사용목적', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, 'cookie', 'purpose', value)} options={["이용자의 환경설정 유지", "서비스 편의 기능 제공", "이용자의 서비스 이용 통계 분석을 통한 서비스 개선", "맞춤형 서비스 제공", "관심 분야 분석을 통한 타겟 마케팅", "각종 이벤트 참여 정도 파악"]} value={data.cookie.purpose} />) },
          { subject: '거부 시 불이익', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, 'cookie', 'disadvantage', value)} options={["로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다.", "리워드 지급에 제한이 생길 수 있습니다.", "맞춤형 서비스 이용에 어려움이 있을 수 있습니다."]} value={data.cookie.disadvantage} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: 'b', title: '웹 로그 분석도구를 사용하시나요? (ex. 구글 애널리틱스)' }} id='webLog' key='webLog' onChange={(category: string, value: any) => onChange('aInfo', category, 'usage', value)} status={data.webLog.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '사용 목적', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, 'webLog', 'purpose', value)} options={['이용자의 서비스 이용 통계 분석을 통한 서비스 개선', '맞춤형 서비스 및 혜택 제공', '맞춤형 광고 제공']} value={data.webLog.purpose} />) },
          { subject: '거부 방법', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, 'webLog', 'method', value)} options={["(Google Analytics) https://tools.google.com/dlpage/gaoptout 접속, 확장 프로그램 추가 및 실행", "(Clicky) https://clicky.com/optout?optin=1 접속, 'Current status' Opt-out 상태로 변경", "(Internet Explorer) 도구 → 인터넷 옵션 → 개인정보 → 설정 → 고급 → '쿠키의 차단' 선택", "(Microsoft Edge) 설정 → 개인정보, 검색 및 서비스 → 추적방지 →'추적방지 엄격' 선택, 'Inprivate를 검색할 때 항상 엄격 추적 방지 사용', '추적 안함 요청보내기' 선택", "(Chrome) 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이 데이터 →'쿠키 차단' 선택", "(안드로이드) 설정 → 개인정보보호 → 광고 → '광고 맞춤설정' 선택 해제", "(아이폰) 설정 → 개인 정보 보호 → 추적 → '앱이 추적을 요청하도록 허용' 끔"]} value={data.webLog.method} />) },
          { subject: '거부 시 불이익', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'webLog', 'disadvantage', e.target.value)} value={data.webLog.disadvantage} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: 'c', title: '타겟 광고를 위하여 사용자의 행태정보를 사용하나요?' }} id='advertising' key='advertising' onChange={(category: string, value: any) => onChange('aInfo', category, 'usage', value)} status={data.advertising.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '수집하는 형태정보 항목', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'advertising', 'items', value)} options={['이용자의 서비스 방문이력', '검색이력', '구매이력', '클릭내역', '광고식별자']} value={data.advertising.items} />) },
          { subject: '형태정보 수집 방법', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'advertising', 'method', e.target.value)} value={data.advertising.method} />) },
          { subject: '형태정보 수집 목적', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'advertising', 'purpose', e.target.value)} value={data.advertising.purpose} />) },
          { subject: '보유 및 이용기간 및 이후 정보처리 방법', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'advertising', 'period', e.target.value)} placeholder='예) 수집일로부터 00일 후 파기' value={data.advertising.period} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: 'd', title: '사용자의 행태정보를 제3자(온라인 광고사업자 등)가 수집・처리할 수 있도록 허용한 경우가 있나요?' }} id='thirdParty' key='thirdParty' onChange={(category: string, value: any) => onChange('aInfo', category, 'usage', value)} status={data.thirdParty.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '광고 사업자명', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'thirdParty', 'company', value)} options={['Facebook', 'Google', 'Adjust', 'Braze', 'AppsFlyer', 'Unity', 'Criteo', 'Airbridge', 'Vungle', 'AppLovin', 'IGAWorks', 'TNK Factory', 'Metapsplus', 'Youappi', 'Fyber', 'AdColony'].sort()} value={data.thirdParty.company} />) },
          { subject: '형태정보 항목', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'thirdParty', 'items', value)} options={['이용자의 서비스 방문이력', '검색이력', '구매이력', '클릭내역', '광고식별자']} value={data.thirdParty.items} />) },
          { subject: '형태정보 수집 방법', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'thirdParty', 'method', e.target.value)} value={data.thirdParty.method} />) },
          { subject: '보유 및 이용기간', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'thirdParty', 'period', e.target.value)} placeholder='예) 3개월 또는 사용자 쿠키 삭제시까지' value={data.thirdParty.period} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: 'e', title: '별도의 사용자 동의 없이, 개인정보를 추가 이용 및 제공하는 경우가 있나요?' }} id='additional' key='additional' onChange={(category: string, value: any) => onChange('aInfo', category, 'usage', value)} status={data.additional.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '개인정보 항목', children: (<TagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'additional', 'items', value)} options={items} value={data.additional.items} />) },
          { subject: '이용 및 제공 목적', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'additional', 'purpose', e.target.value)} value={data.additional.purpose} />) },
          { subject: '보유 및 이용기간', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'additional', 'period', e.target.value)} value={data.additional.period} />) }
        ]} />
      </CDPCollapsePanel>
    </StyledCollapse>
  );
}

/**
 * [Internal Component] Collapse header (for create a document part)
 */
const CDPCollapseHeader: React.FC<CDPCollapseHeaderProps> = ({ description, title }): JSX.Element => {
  return (
    <Space align='center'>
      {title}
      {description && description !== '' ? (
        <Popover content={description}>
          <span style={{ alignItems: 'center', color: '#949593', display: 'flex', fontSize: '14px', marginLeft: '0.25rem' }}>
            <QuestionCircleOutlined />
          </span>
        </Popover>
      ) : (<></>)}
    </Space>
  );
}
/**
 * [Internal Component] Collapse panel (for create a document part)
 */
const CDPCollapsePanel: React.FC<CDPCollapsePanelProps> = ({ children, header, id, onChange, status, ...props }): JSX.Element => {
  // 라디오 그룹에서 사용할 옵션 생성
  const options: RadioOption[] = [{ label: '예', value: true }, { label: '아니오', value: false }];
  // 패널에 대한 헤더 도구 생성
  const extraElement: JSX.Element = (<Radio.Group buttonStyle='outline' onChange={(e: any) => onChange(id, e.target.value)} options={options} optionType='button' value={status} />);
  // 패널에 대한 헤더 생성
  const headerElement: JSX.Element = (<CDPCollapseHeader description={header.description} title={header.title} />);

  // Return an element
  return (<Collapse.Panel {...props} extra={extraElement} header={headerElement} key={id}>{children}</Collapse.Panel>);
}
/** 
 * [Internal Component] Collapse panel content (for create a document part)
 */
const CDPCollapsePanelContent: React.FC<any> = ({ items }: any): JSX.Element => {
  return (
    <Descriptions bordered column={1} labelStyle={{ width: 200 }}>
      {items.map((item: any, index: number): JSX.Element => (
        <Descriptions.Item key={index} label={item.subject}>
          {item.children}
        </Descriptions.Item>
      ))}
    </Descriptions>
  );
}