import styled from 'styled-components';
import React from 'react';
// Component
import { Collapse, Descriptions, Input, Popover, Radio, Space } from 'antd';
// Data
import { additionalInfoOptions } from '../../models/static/selectOption';
// Icon
import { QuestionCircleOutlined } from '@ant-design/icons';
import { AddableTagSelect, TagSelect } from '../common/Select';

// Styled element (collapse)
export const StyledCollapse = styled(Collapse)`
  .ant-collapse-item > .ant-collapse-header {
    align-items: center;
    display: flex;
    user-select: none;
  }
  .ant-collapse-item > .ant-collapse-content {
    background-color: #FFFFFF;
  }
  .ant-collapse-item > .ant-collapse-content > .ant-collapse-content-box {
    padding-top: 16px;
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
  status: boolean|undefined;
}

/**
 * [Component] Custom collapse
 */
export const CollapseForPIPP = ({ data, items, onChange }: any): JSX.Element => {
  const THIS_STEP: string = 'aInfo';
  // Return an element
  return (
    <StyledCollapse activeKey={Object.keys(data).filter((key: string): boolean => data[key].usage)} bordered={false}>
      <CDPCollapsePanel header={{ description: '웹이나 앱에서 사용자의 브라우저에 전송하는 소량의 정보', title: '1. 쿠키(cookie)를 사용하나요?' }} id='cookie' key='cookie' onChange={(category: string, value: any) => onChange('aInfo', value, category, 'usage')} status={data.cookie.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '사용목적', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, value, 'cookie', 'purpose')} options={additionalInfoOptions.cookie.purpose} placeholder='선택 및 직접입력' value={data.cookie.purpose} />) },
          { subject: '거부 시 불이익', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, value, 'cookie', 'disadvantage')} options={additionalInfoOptions.cookie.disadvantage} placeholder='선택 및 직접입력' value={data.cookie.disadvantage} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: '웹이나 앱에서 발생하는 다양한 데이터를 분석하여 서비스 접속이력 및 경로 등에 대한 통계 정보를 제공해주는 도구', title: '2. 웹 로그 분석도구를 사용하시나요? (ex. 구글 애널리틱스)' }} id='webLog' key='webLog' onChange={(category: string, value: any) => onChange('aInfo', value, category, 'usage')} status={data.webLog.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '사용 목적', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, value, 'webLog', 'purpose')} options={additionalInfoOptions.webLog.purpose} placeholder='선택 및 직접입력' value={data.webLog.purpose} />) },
          { subject: '거부 방법', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange(THIS_STEP, value, 'webLog', 'method')} options={additionalInfoOptions.webLog.method} placeholder='[웹 로그 분석도구] 거부 방법(URL)' value={data.webLog.method} />) },
          { subject: '거부 시 불이익', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'webLog', 'disadvantage')} value={data.webLog.disadvantage} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: '서비스 방문이력, 사용이력 등 온라인 상의 이용자 활동정보\n- 온라인 맞춤형 광고: 행태정보를 처리하여 이용자의 관심, 흥미, 기호 및 성향 등을 분석·추정한 후 이용자에 따라 다르게 제공되는 온라인 광고\n※ 이용자 편의 제공을 위해 사용 환경(UX,UI 등)을 이용자별로 상이하게 구성하는 등의 맞춤형 서비스는 해당하지 않음', title: '3. 타겟 광고를 위하여 사용자의 행태정보를 사용하나요?' }} id='advertising' key='advertising' onChange={(category: string, value: any) => onChange('aInfo', value, category, 'usage')} status={data.advertising.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '수집하는 행태정보 항목', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, value, 'advertising', 'items')} options={additionalInfoOptions.advertising.items} placeholder='선택 및 직접입력' value={data.advertising.items} />) },
          { subject: '행태정보 수집 방법', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'advertising', 'method')} value={data.advertising.method} />) },
          { subject: '행태정보 수집 목적', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'advertising', 'purpose')} value={data.advertising.purpose} />) },
          { subject: '보유 및 이용기간 및 이후 정보처리 방법', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'advertising', 'period')} placeholder='예) 수집일로부터 00일 후 파기' value={data.advertising.period} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: 'Google Ads나 Facebook Ads 등 온라인 맞춤형 광고 등을 위해 제3자(온라인 광고사업자 등)가 이용자의 행태정보를 수집·처리하고 있다면, 아래의 내용을 모두 입력해야 해요.', title: '4. 사용자의 행태정보를 제3자(온라인 광고사업자 등)가 수집・처리할 수 있도록 허용한 경우가 있나요?' }} id='thirdParty' key='thirdParty' onChange={(category: string, value: any) => onChange('aInfo', value, category, 'usage')} status={data.thirdParty.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '광고 사업자명', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, value, 'thirdParty', 'company')} options={additionalInfoOptions.thirdParty.company.sort()} placeholder='선택 및 직접입력' value={data.thirdParty.company} />) },
          { subject: '형태정보 항목', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, value, 'thirdParty', 'items')} options={additionalInfoOptions.thirdParty.items} placeholder='선택 및 직접입력' value={data.thirdParty.items} />) },
          { subject: '형태정보 수집 방법', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'thirdParty', 'method')} value={data.thirdParty.method} />) },
          { subject: '보유 및 이용기간', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'thirdParty', 'period')} placeholder='예) 3개월 또는 사용자 쿠키 삭제 시까지' value={data.thirdParty.period} />) }
        ]} />
      </CDPCollapsePanel>
      <CDPCollapsePanel header={{ description: '정보주체의 동의 없이 개인정보를 추가적으로 이용하거나 제공하고 있다면, 아래에 내용을 모두 입력해야 해요.', title: '5. 별도의 사용자 동의 없이, 개인정보를 추가 이용 및 제공하는 경우가 있나요?' }} id='additional' key='additional' onChange={(category: string, value: any) => onChange('aInfo', value, category, 'usage')} status={data.additional.usage}>
        <CDPCollapsePanelContent items={[
          { subject: '개인정보 항목', children: (<TagSelect onChange={(value: string|string[]): void => onChange(THIS_STEP, value, 'additional', 'items')} options={items} placeholder='예시에서 선택' value={data.additional.items} />) },
          { subject: '이용 및 제공 목적', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'additional', 'purpose')} placeholder='직접 입력' value={data.additional.purpose} />) },
          { subject: '보유 및 이용기간', children: (<Input allowClear onChange={(e: any): void => onChange(THIS_STEP, e.target.value, 'additional', 'period')} placeholder='직접 입력' value={data.additional.period} />) }
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
        <Popover content={description.split('\n').map((elem: string, index: number): JSX.Element => (<p key={index} style={{ margin: 0 }}>{elem}</p>))}>
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