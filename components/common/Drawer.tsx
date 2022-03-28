import { useState } from 'react';
// Component
import { Drawer, Form, Input, Select } from 'antd';
// Temporary
import { processingItems, purposes } from '../../models/temporary';

/** Interface */
interface EditableDrawerProps {
  data?: any;
  onChange: (data: any) => void;
  onClose: () => void;
  title: string;
  type: string;
  visible: boolean;
}

// Component (editable table drawer)
export const EditableDrawer = ({ data, onChange, onClose, title, type, visible }: EditableDrawerProps): JSX.Element => {
  // Set a children element for type
  let children: JSX.Element;
  switch (type) {
    case 'personalInfo':
      children = <EditableDrawerContentForPersonalInfo data={data} onChange={onChange} />
    default:
      children = <EditableDrawerContentForPersonalInfo data={data} onChange={onChange} />
  }
  // Return an element
  return (
    <Drawer onClose={onClose} placement='right' title={title} visible={visible}>
      <>{children}</>
    </Drawer>
  );
}

export const EditableDrawerContentForPersonalInfo = ({ data, onChange }: any): JSX.Element => {
  // Create the select options
  const purposeOptions: JSX.Element[] = purposes.filter((item: string): boolean => !data.purpose.includes(item)).map((item: string): JSX.Element => <Select.Option key={item} value={item}>{item}</Select.Option>);
  // const essentialItemOptions: JSX.Element[] = processingItems.filter((item: any): boolean => !data.essentialItems.includes(item)).map((item: any): JSX.Element => <Select.Option key={item.name} value={item.name}>{item.name}</Select.Option>);
  
  // Create an event handlers
  const changeSubject = (e: any): void => onChange({...data, subject: e.target.value});
  const changePurpose = (items: string[]): void => onChange({...data, purpose: items});

  return (
    <Form layout='vertical'>
      <Form.Item label='업무명' required tooltip='업무명을 입력하세요.'>
        <Input onChange={changeSubject} value={data.subject} />
      </Form.Item>
      <Form.Item label='목적' required tooltip='목적'>
        <Select mode='multiple' onChange={changePurpose} style={{ width: '100%' }} value={data.purpose}>
          {purposeOptions}
        </Select>
      </Form.Item>
      <Form.Item label='필수 항목' required tooltip='필수 항목'>
        <Select mode='multiple' style={{ width: '100%' }} >
        </Select>
      </Form.Item>
    </Form>
  );
}