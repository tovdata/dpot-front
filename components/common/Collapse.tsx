import styled from 'styled-components';
import { useState } from 'react';
// Component
import { Collapse, Descriptions, Input, Popover, Radio, Space } from 'antd';
// Icon
import { QuestionCircleOutlined } from '@ant-design/icons';
import { EditableInput } from './Input';

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

/**
 * [Component] Custom collapse
 */
export const CollapseForPIPP = ({ collapseItems, data, openPanel, onOpenPanel }: any): JSX.Element => { 
  // Create the collapse panels
  const panelElements: JSX.Element[] = Object.keys(collapseItems).map((key: string): JSX.Element => {
    // Extract a item for collapse panel header
    const item: CollapsePanelHeaderData = collapseItems[key];
    // Set a disabled state for panel
    const disabled: boolean|undefined = item.precedence ? openPanel[item.precedence] !== undefined ? !openPanel[item.precedence] : true : undefined;
    // Set the children element by panel id
    let children: JSX.Element = (<></>);
    if (key === 'cookie') {
      children = (
        <Descriptions bordered labelStyle={{ width: '200px' }}>
          <Descriptions.Item label="사용 목적" span={3}>
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="거부 방법" span={3}>
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="거부 시 불이익" span={3}>
            <Input allowClear onChange={(e: any): void => console.log(e.target.value)} />
          </Descriptions.Item>
        </Descriptions>
      );
    } else if (key === 'advertising') {
      children = (
        <Descriptions bordered labelStyle={{ width: '200px' }}>
          <Descriptions.Item label="수집하는 형태정보 항목" span={3}>
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="형태정보 수집 방법" span={3}>
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="형태정보 수집 목적" span={3}>
            <Input allowClear onChange={(e: any): void => console.log(e.target.value)} />
          </Descriptions.Item>
          <Descriptions.Item label="보유.이용기간 및 이후 정보처리 방법" span={3}>
            <Input allowClear onChange={(e: any): void => console.log(e.target.value)} />
          </Descriptions.Item>
        </Descriptions>
      );
    } else if (key === 'thirdParty') {
      children = (
        <Descriptions bordered labelStyle={{ width: '200px' }}>
          <Descriptions.Item label="광고 사업자명" span={3}>
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="형태정보 항목" span={3}>
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="형태정보 수집 방법" span={3}>
            <Input allowClear onChange={(e: any): void => console.log(e.target.value)} />
          </Descriptions.Item>
          <Descriptions.Item label="보유 및 이용기간" span={3}>
            <Input allowClear onChange={(e: any): void => console.log(e.target.value)} />
          </Descriptions.Item>
        </Descriptions>
      );
    } else if (key === 'etc') {
      children = (
        <Descriptions bordered labelStyle={{ width: '200px' }}>
          <Descriptions.Item label="개인정보 항목" span={3}>
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="이용 및 제공 목적" span={3}>
            <Input />
          </Descriptions.Item>
          <Descriptions.Item label="보유 및 이용기간" span={3}>
            <Input allowClear onChange={(e: any): void => console.log(e.target.value)} />
          </Descriptions.Item>
        </Descriptions>
      );
    }
    // Return
    return (
      <CollapsePanelContainToggle description={item.description} disabled={disabled} id={key} key={key} onOpenPanel={onOpenPanel} status={openPanel[key]} title={item.title}>
        <>{children}</>
      </CollapsePanelContainToggle>
    );
  });
  // Return an element
  return (<StyledCollapse activeKey={Object.keys(openPanel).filter((key: string): boolean => openPanel[key])}>{panelElements}</StyledCollapse>);
}
/**
 * [Component] Collapse panel
 */
export const CollapsePanelContainToggle = ({ description, children, disabled, id, onOpenPanel, status, title, ...props }: any): JSX.Element => {
  // Set a radio option data
  const options: RadioOption[] = [{ label: '예', value: true }, { label: '아니오', value: false }];
  // Create an extra in panel header
  const extraElement: JSX.Element = (<Radio.Group disabled={disabled} buttonStyle='outline' onChange={(e: any): void => { console.log("onChange"); onOpenPanel(id, e.target.value) }} options={options} optionType='button' value={status} />);
  // Create a header in panel
  const headerElement: JSX.Element = (
    <Space align='center'>
      <>{title}</>
      {description && description !== '' ? (
        <Popover>
          <span style={{ alignItems: 'center', color: '#949593', display: 'flex', fontSize: '14px', marginLeft: '0.25rem' }}>
            <QuestionCircleOutlined />
          </span>
        </Popover>
      ) : (<></>)}
    </Space>
  );

  // Return an element
  return (<Collapse.Panel {...props} collapsible={disabled} extra={extraElement} header={headerElement} key={id}>{children}</Collapse.Panel>);
}