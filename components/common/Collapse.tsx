import styled from 'styled-components';
import React from 'react';
// Component
import { Collapse, Descriptions, Input, Popover, Radio, Space } from 'antd';
// Icon
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AddableTagSelect } from './Select';

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
export const CollapseForPIPP = ({ data, onChange }: any): JSX.Element => {
  const THIS_STEP: string = 'aInfo';
  // Return an element
  return (
    <StyledCollapse activeKey={Object.keys(data).filter((key: string): boolean => data[key].usage)}>
      <CDPCollapsePanel header={{ description: 'a', title: '쿠키(cookie)를 사용하나요?' }} id='cookie' key='cookie' onChange={(category: string, value: any) => onChange('aInfo', category, 'usage', value)} status={data.cookie.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '사용목적', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, 'cookie', 'purpose', value)} options={['쿠키 사용 목적 1', '쿠키 사용 목적 2', '쿠키 사용 목적 3', '쿠키 사용 목적 4', '쿠키 사용 목적 5', '쿠키 사용 목적 6']} value={data.cookie.purpose} />) },
          { subject: '거부 시 불이익', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, 'cookie', 'disadvantage', value)} options={['쿠키 거부 시 불이익 1', '쿠키 거부 시 불이익 2', '쿠키 거부 시 불이익 3', '쿠키 거부 시 불이익 4']} value={data.cookie.disadvantage} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: 'b', title: '웹 로그 분석도구를 사용하시나요? (ex. 구글 애널리틱스)' }} id='webLog' key='webLog' onChange={(category: string, value: any) => onChange('aInfo', category, 'usage', value)} status={data.webLog.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '사용 목적', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, 'webLog', 'purpose', value)} options={['a', 'b', 'c']} value={data.webLog.purpose} />) },
          { subject: '거부 방법', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, 'webLog', 'method', value)} options={['a', 'b', 'c']} value={data.webLog.method} />) },
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
          { subject: '광고 사업자명', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'thirdParty', 'company', value)} options={['광고 사업자 1', '광고 사업자 2', '광고 사업자 3', '광고 사업자 4', '광고 사업자 5']} value={data.thirdParty.company} />) },
          { subject: '형태정보 항목', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'thirdParty', 'items', value)} options={['이용자의 서비스 방문이력', '검색이력', '구매이력', '클릭내역', '광고식별자']} value={data.thirdParty.items} />) },
          { subject: '형태정보 수집 방법', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'thirdParty', 'method', e.target.value)} value={data.thirdParty.method} />) },
          { subject: '보유 및 이용기간', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, 'thirdParty', 'period', e.target.value)} placeholder='예) 3개월 또는 사용자 쿠키 삭제시까지' value={data.thirdParty.period} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: 'e', title: '별도의 사용자 동의 없이, 개인정보를 추가 이용 및 제공하는 경우가 있나요?' }} id='additional' key='additional' onChange={(category: string, value: any) => onChange('aInfo', category, 'usage', value)} status={data.additional.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '개인정보 항목', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, 'additional', 'items', value)} options={['이름', '연락처', '주소']} value={data.additional.items} />) },
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