import { useState } from 'react';
// Component
import { Select } from 'antd';

/** Interface (Props) */
interface EditableSelectProps {
  defaultOptions: string[];
  onChange: (items: string[]) => void;
  totalOptions: string[];
}
/** Interface (Data type) */
interface SelectOption {
  value: string;
}

// Component (editable select)
export const EditableSelectSingle = ({ defaultOptions, onChange, totalOptions }: EditableSelectProps): JSX.Element => {
  // Set a local state
  const [selected, setSelected] = useState<string[]>(defaultOptions);
  // Set the select options
  const options: SelectOption[] = totalOptions.filter((item: string): boolean => !selected.includes(item)).map((item: string): SelectOption => { return { value: item } });
  // Create an event handler (onChange)
  const onSelect = (items: string[]): void => { setSelected(items); onChange(items) }
  // Return an element
  return (<Select onChange={onSelect} options={options} style={{ width: '100%' }} value={selected} />);
};
// Component (editable select)
export const EditableSelectMulti = ({ defaultOptions, onChange, totalOptions }: EditableSelectProps): JSX.Element => {
  // Set a local state
  const [selected, setSelected] = useState<string[]>(defaultOptions);
  // Set the select options
  const options: SelectOption[] = totalOptions.filter((item: string): boolean => !selected.includes(item)).map((item: string): SelectOption => { return { value: item } });
  // Create an event handler (onChange)
  const onSelect = (items: string[]): void => { setSelected(items); onChange(items) }
  // Return an element
  return (<Select mode='tags' onChange={onSelect} options={options} style={{ width: '100%' }} filterOption={true} tokenSeparators={[',']} value={selected} />);
};