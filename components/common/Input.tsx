import { useState } from 'react';
// Component
import { Input } from 'antd';

/** Interface (Props) */
interface EditableInputProps {
  content: string;
  onChange: (e: any) => void;
}
interface SearchableInputProps {
  content: string;
  onSearch: (value: string, e: any) => void;
}

// Component (editable input)
export const EditableInput = ({ content, onChange }: EditableInputProps): JSX.Element => {
  // Set a local state
  const [value, setValue] = useState<string>(content);
  // Create an event handler (onChange)
  const onNewChange = (e: any): void => { setValue(e.target.value); onChange(e.target.value) }
  // Return an element
  return (<Input onChange={onNewChange} type='text' value={value} style={{ width: '100%' }} />);
}
// Component (searchable input)
export const SearchableInput = ({ content, onSearch }: SearchableInputProps): JSX.Element => {
  // Set a local state
  const [value, setValue] = useState<string>(content); 
  // Create an event handler (onChange)
  const onChange = (e: any): void => setValue(e.target.value);
  // Return an elemtn
  return (
    <Input.Group>
      <Input.Search allowClear onChange={onChange} onSearch={onSearch} style={{ width: '100%' }} value={value} />
    </Input.Group>
  )
}