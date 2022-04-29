import styled from 'styled-components';
import React, { useState } from 'react';
// Component
import { Collapse, Descriptions, Form, Input, Popover, Radio, Space } from 'antd';
// Icon
import { QuestionCircleOutlined } from '@ant-design/icons';
import { EditableInput } from './Input';
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
export const CollapseForPIPP = ({ collapseItems, data, onChange }: any): JSX.Element => {
  // Create the collapse panels
  const panelElements: JSX.Element[] = Object.keys(collapseItems).map((key: string): JSX.Element => {
    // Extract a item for collapse panel header
    const item: CollapsePanelHeaderData = collapseItems[key];
    // Set the children element by panel id
    let children: JSX.Element = (<></>);
    if (key === 'cookie') {
      children = (
        <CDPCollapsePanelContent items={[
          { subject: '사용목적', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange('additionalInfo', key, 'purpose', value)} options={['a', 'b', 'c']} value={data[key].purpose} />) },
          { subject: '거부 시 불이익', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange('additionalInfo', key, 'disadvantage', value)} options={['a', 'b', 'c']} value={data[key].disadvantage} />) },
        ]} />
      );
    } else if (key === 'webLog') {
      children = (
        <CDPCollapsePanelContent items={[
          { subject: '사용 목적', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange('additionalInfo', key, 'purpose', value)} options={['a', 'b', 'c']} value={data[key].purpose} />) },
          { subject: '거부 방법', children: (<AddableTagSelect onChange={(value: string|string[]) => onChange('additionalInfo', key, 'method', value)} options={['a', 'b', 'c']} value={data[key].method} />) },
          { subject: '거부 시 불이익', children: (<Input allowClear onChange={(e: any): void => onChange('additionalInfo', key, 'disadvantage', e.target.value)} value={data[key].disadvantage} />) }
        ]} />
      );
    } else if (key === 'advertising') {
      children = (
        <CDPCollapsePanelContent items={[
          { subject: '수집하는 형태정보 항목', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange('additionalInfo', key, 'item', value)} options={['이용자의 서비스 방문이력', '검색이력', '구매이력', '클릭내역', '광고식별자']} value={data[key].item} />) },
          { subject: '형태정보 수집 방법', children: (<Input allowClear onChange={(e: any): void => onChange('additionalInfo', key, 'method', e.target.value)} value={data[key].method} />) },
          { subject: '형태정보 수집 목적', children: (<Input allowClear onChange={(e: any): void => onChange('additionalInfo', key, 'purpose', e.target.value)} value={data[key].purpose} />) },
          { subject: '보유 및 이용기간 및 이후 정보처리 방법', children: (<Input allowClear onChange={(e: any): void => onChange('additionalInfo', key, 'period', e.target.value)} placeholder='예) 수집일로부터 00일 후 파기' value={data[key].period} />) }
        ]} />
      );
    } else if (key === 'thirdParty') {
      children = (
        <CDPCollapsePanelContent items={[
          { subject: '광고 사업자명', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange('additionalInfo', key, 'company', value)} options={['이용자의 서비스 방문이력', '검색이력', '구매이력', '클릭내역', '광고식별자']} value={data[key].company} />) },
          { subject: '형태정보 항목', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange('additionalInfo', key, 'items', value)} options={['이용자의 서비스 방문이력', '검색이력', '구매이력', '클릭내역', '광고식별자']} value={data[key].items} />) },
          { subject: '형태정보 수집 방법', children: (<Input allowClear onChange={(e: any): void => onChange('additionalInfo', key, 'method', e.target.value)} value={data[key].method} />) },
          { subject: '보유 및 이용기간', children: (<Input allowClear onChange={(e: any): void => onChange('additionalInfo', key, 'period', e.target.value)} placeholder='예) 3개월 또는 사용자 쿠키 삭제시까지' value={data[key].period} />) }
        ]} />
      );
    } else if (key === 'additional') {
      children = (
        <CDPCollapsePanelContent items={[
          { subject: '개인정보 항목', children: (<AddableTagSelect onChange={(value: string|string[]): void => onChange('additionalInfo', key, 'items', value)} options={['이름', '연락처', '주소']} value={data[key].items} />) },
          { subject: '이용 및 제공 목적', children: (<Input allowClear onChange={(e: any): void => onChange('additionalInfo', key, 'purpose', e.target.value)} value={data[key].purpose} />) },
          { subject: '보유 및 이용기간', children: (<Input allowClear onChange={(e: any): void => onChange('additionalInfo', key, 'period', e.target.value)} value={data[key].period} />) }
        ]} />
      );
    }
    // Return an element
    return (<CDPCollapsePanel header={item} id={key} key={key} onChange={(category: string, value: any) => onChange('additionalInfo', category, 'usage', value)} status={data[key].usage}>{children}</CDPCollapsePanel>);



    // // Return
    // return (
    //   <CollapsePanelContainToggle description={item.description} disabled={disabled} id={key} key={key} onOpenPanel={onOpenPanel} status={openPanel[key]} title={item.title}>
    //     <>{children}</>
    //   </CollapsePanelContainToggle>
    // );
  });
  // Return an element
  return (<StyledCollapse activeKey={Object.keys(data).filter((key: string): boolean => data[key].usage)}>{panelElements}</StyledCollapse>);
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
    <Form>
      <Descriptions bordered column={1} labelStyle={{ width: 200 }}>
        {items.map((item: any): JSX.Element => (
          <Descriptions.Item label={item.subject}>
            {item.children}
          </Descriptions.Item>
        ))}
      </Descriptions>
    </Form>
  );
}