import { useState } from 'react';
// Component
import { Input, Modal } from 'antd';

// Interface
interface ModalProps {
  onClose: () => void;
  open: boolean;
}
interface InputModalProps extends ModalProps {
  placeholder?: string;
  title: string;
}

// Component (modal to create a pipp)
export const ModalToCreatePipp = ({ onClose, open }: ModalProps): JSX.Element => {
  return (<SingleInputModal onClose={onClose} open={open} placeholder='주식회사 OOO 개인정보 처리방침' title='개인정보 처리방침명 입력' />);
}

// [Internal] Component (single input modal)
const SingleInputModal = ({ onClose, open, placeholder, title }: InputModalProps): JSX.Element => {
  // Set a local state
  const [value, setValue] = useState<string>('');
  // Create an event handler (onChange)
  const onChange = (e: any): void => setValue(e.target.value);
  // Create an event handler (onCreate)
  const onCreate = (): void => { console.log(value); onClose() }
  // Create an event handler (onCancel)
  const onCancel = (): void => { setValue(''); onClose() }

  // Return an element
  return (
    <Modal cancelText='취소' centered onCancel={onCancel} onOk={onCreate} okText='완료' title={title} visible={open}>
      <Input allowClear onChange={onChange} placeholder={placeholder} value={value} />
    </Modal>
  )
}