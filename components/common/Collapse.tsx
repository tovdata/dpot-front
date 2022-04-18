import styled from 'styled-components';
import { useState } from 'react';
// Component
import { Collapse, Popover, Radio, Space } from 'antd';
// Icon
import { QuestionCircleOutlined } from '@ant-design/icons';

// Styled element (collapse)
const StyledCollapse = styled(Collapse)`
  .ant-collapse-item > .ant-collapse-header {
    align-items: center;
    display: flex;
    user-select: none;
  }
`;

/** [Interface] Radio Option */
interface RadioOption {
  label: string;
  value: boolean|string;
}

/**
 * [Component] Custom collapse
 */
export const CollapseContainToggle = ({ activeKey, panels, onActiveKey }: any): JSX.Element => { 
  // Create the collapse panels
  const panelElements: JSX.Element[] = panels.map((item: any, index: number): JSX.Element => (<CollapsePanelContainToggle description={item.description} disabled={item.precedence ? activeKey[item.precedence] ? !activeKey[item.precedence] : true : undefined} id={item.id} key={index} onActiveKey={onActiveKey} title={item.title} />));
  console.log(activeKey)
  // Return an element
  return (<StyledCollapse activeKey={Object.keys(activeKey).filter((key: string): boolean => activeKey[key])}>{panelElements}</StyledCollapse>);
}
/**
 * [Internal Component] Collapse panel
 */
const CollapsePanelContainToggle = ({ description, children, disabled, id, onActiveKey, title, ...props }: any): JSX.Element => {
  // Set a radio option data
  const options: RadioOption[] = [{ label: '예', value: true }, { label: '아니오', value: false }];
  // Create an extra in panel header
  const extraElement: JSX.Element = (<Radio.Group disabled={disabled} buttonStyle='outline' onChange={(e: any): void => onActiveKey(e.target.value, id)} options={options} optionType='button' />);
  // console.log(description, disabled, id, title)
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
  return (<Collapse.Panel collapsible={disabled} extra={extraElement} header={'asdfsf'} key={id} {...props}></Collapse.Panel>);
}