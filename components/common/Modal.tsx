import { useState } from 'react';
// Component
import { Input, Modal } from 'antd';
import styled from 'styled-components';

const StyledDescription = styled.p`
  color: rgba(0, 0, 0, 0.45);
`;
// Interface
interface ModalProps {
  onClose: () => void;
  open: boolean;
  onSave?: (value: string) => void;
  defaultValue?: string;
  discription?: string;
}
interface InputModalProps extends ModalProps {
  placeholder?: string;
  title: string;
}
// Component (modal to create a pipp)
export const ModalToCreatePipp = ({ onClose, open }: ModalProps): JSX.Element => {
  return (<SingleInputModal onClose={onClose} open={open} placeholder='주식회사 OOO 개인정보 처리방침' title='개인정보 처리방침명 입력' />);
}

// Component (modal to input a ppi url)
export const ModalToInputURL = ({ onClose, onSave, open, defaultValue, discription }: ModalProps): JSX.Element => {
  return (<SingleInputModal onClose={onClose} onSave={onSave} open={open} defaultValue={defaultValue} placeholder='https://www.' discription={discription} title='링크(URL 입력)' />);
}

// [Internal] Component (single input modal)
const SingleInputModal = ({ onClose, onSave, open, placeholder, discription, title, defaultValue = '' }: InputModalProps): JSX.Element => {
  // Set a local state
  const [value, setValue] = useState<string>(defaultValue);
  // Create an event handler (onChange)
  const onChange = (e: any): void => setValue(e.target.value);
  // Create an event handler (onCreate)
  const onOk = (): void => {
    if (onSave) onSave(value);
    onClose();
  }
  // Create an event handler (onCancel)
  const onCancel = (): void => { setValue(''); onClose() }

  // Return an element
  return (
    <Modal cancelText='취소' centered onCancel={onCancel} onOk={onOk} okText='완료' title={title} visible={open}>
      {discription && <StyledDescription>{discription}</StyledDescription>}
      <Input allowClear onChange={onChange} placeholder={placeholder} value={value} />
    </Modal>
  )
}