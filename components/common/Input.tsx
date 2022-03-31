import { useState } from 'react';
// Component
import { Input } from 'antd';

/** Interface (Props) */
interface EditableInputProps {
  onChange: (e: any) => void;
  value: string;
}

// Component (editable input)
export const EditableInput = ({ onChange, value }: EditableInputProps): JSX.Element => {
  // Set a local state
  const [content, setContent] = useState<string>(value);
  // Create an event handler (onChange)
  const onNewChange = (e: any): void => { setContent(e.target.value); onChange(e.target.value) }
  // Return an element
  return (<Input onChange={onNewChange} type='text' value={content} style={{ width: '100%' }} />);
}