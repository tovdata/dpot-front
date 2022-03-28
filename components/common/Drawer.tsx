// Component
import { Drawer, Form, Input, Select } from 'antd';

/** Interface */
interface EditableDrawerProps {
  data?: any;
  onClose: () => void;
  title: string;
  type: string;
  visible: boolean;
}

// Component (editable table drawer)
export const EditableDrawer = ({ data, onClose, title, type, visible }: EditableDrawerProps): JSX.Element => {
  // Set a children element for type
  let children: JSX.Element;
  switch (type) {
    case 'personalInfo':
      children = <EditableDrawerContentForPersonalInfo data={data} />
    default:
      children = <EditableDrawerContentForPersonalInfo data={data} />
  }


  return (
    <Drawer onClose={onClose} placement='right' title={title} visible={visible}>
      <>{children}</>
    </Drawer>
  );
}

export const EditableDrawerContentForPersonalInfo = ({ data }: any): JSX.Element => {
  return (
    <Form layout='vertical'>
      <Form.Item label='업무명' required tooltip='업무명을 입력하세요.'>
        <Input />
      </Form.Item>
      <Form.Item label='목적' required tooltip='목적'>
        <Select mode='multiple' style={{ width: '100%' }}>
          <Select.Option>a10</Select.Option>
          <Select.Option>a11</Select.Option>
          <Select.Option>a12</Select.Option>
          <Select.Option>a13</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label='필수 항목' required tooltip='필수 항목'>
        <Select mode='multiple' style={{ width: '100%' }}>
          <Select.Option>b10</Select.Option>
          <Select.Option>b11</Select.Option>
          <Select.Option>b12</Select.Option>
          <Select.Option>b13</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
}