import { useState } from 'react';
// Component
import { Input } from 'antd';

/** Interface (Props) */
interface EditableInputProps {
  content: string;
  onChange: (e: any) => void;
}

// Component (editable input)
export const EditableInput = ({ content, onChange }: EditableInputProps): JSX.Element => {
  // Set a local state
  const [value, setValue] = useState<string>(content);
  // Create an event handler (onChange)
  const onNewChange = (e: any): void => { setValue(e.target.value); onChange(e.target.value) }
  // Return an element
  return (<Input onChange={onNewChange} type='text' value={content} style={{ width: '100%' }} />);
}