import { useState } from 'react';
// Component
import { Drawer, Form, Input, Select } from 'antd';
// Temporary
import { processingItems, purposes } from '../../models/temporary';
// Type
import { TableProcessItemData } from '../../models/type';

/** Interface */
interface EditableDrawerProps {
  data?: any;
  onChange: (data: any) => void;
  onClose: () => void;
  title: string;
  type: string;
  visible: boolean;
}
interface EditableDrawerContentProps {
  data: any;
  onChange: (data: any) => void;
}
interface SelectOption {
  value: string;
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
// Component (editable drawer content for personal information)
const EditableDrawerContentForPersonalInfo = ({ data, onChange }: EditableDrawerContentProps): JSX.Element => {
  // Create the select options
  const purposeOptions: SelectOption[] = purposes.filter((item: string): boolean => !data.purpose.includes(item)).map((item: string): SelectOption => { return { value: item } });
  const itemOptions: SelectOption[] = processingItems.filter((item: TableProcessItemData): boolean => !data.essentialItems.map((item: TableProcessItemData): string => item.name).includes(item.name)).filter((item: TableProcessItemData): boolean => !data.selectionItems.map((item: TableProcessItemData): string => item.name).includes(item.name)).map((item: TableProcessItemData): SelectOption => { return { value: item.name } });
  
  // Create an event handlers
  const changeSubject = (e: any): void => onChange({...data, subject: e.target.value});
  const changePurpose = (items: string[]): void => onChange({...data, purpose: items});
  const changeEssentialItems = (items: string[]): void => {
    const selected: TableProcessItemData[] = items.map((item: string): TableProcessItemData => {
      const extracted: TableProcessItemData|undefined = data.essentialItems.find((elem: TableProcessItemData): boolean => elem.name === item);
      return extracted ? extracted : { intrinsic: false, name: item };
    });
    // Update a state
    onChange({...data, essentialItems: selected});
  }
  const changeSelectionItems = (items: string[]): void => {
    const selected: TableProcessItemData[] = items.map((item: string): TableProcessItemData => {
      const extracted: TableProcessItemData|undefined = data.selectionItems.find((elem: TableProcessItemData): boolean => elem.name === item);
      return extracted ? extracted : { intrinsic: false, name: item };
    });
    // Update a state
    onChange({...data, selectionItems: selected});
  }
  // Return an element
  return (
    <Form layout='vertical'>
      <Form.Item label='업무명' required tooltip='업무명을 입력하세요.'>
        <Input onChange={changeSubject} value={data.subject} />
      </Form.Item>
      <Form.Item label='목적' required tooltip='목적'>
        <Select mode='multiple' onChange={changePurpose} options={purposeOptions} placement='bottomLeft' style={{ width: '100%' }} value={data.purpose} />
      </Form.Item>
      <Form.Item label='필수 항목' required tooltip='필수 항목'>
        <Select mode='multiple' onChange={changeEssentialItems} options={itemOptions} placement='bottomLeft'  style={{ width: '100%' }} value={data.essentialItems.map((item: TableProcessItemData): string => item.name)} >
        </Select>
      </Form.Item>
      <Form.Item label='선택 항목' tooltip='선택 항목'>
        <Select mode='multiple' onChange={changeSelectionItems} options={itemOptions} placement='bottomLeft'  style={{ width: '100%' }} value={data.selectionItems.map((item: TableProcessItemData): string => item.name)} >
        </Select>
      </Form.Item>
    </Form>
  );
}