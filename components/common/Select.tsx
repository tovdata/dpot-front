import { useState } from 'react';
// Component
import { Select } from 'antd';

/** Interface (Props) */
interface EditableSelectProps {
  column: string;
  defaultOptions: string[];
  display: string;
  onChange: (column: string, display: string, items: string[]) => void;
  totalOptions: string[];
}
/** Interface (Data type) */
interface SelectOption {
  value: string;
}

export const EditableSelect = ({ column, defaultOptions, display, onChange, totalOptions }: EditableSelectProps): JSX.Element => {
  // Set a local state
  const [selected, setSelected] = useState<string[]>(defaultOptions);
  // Set the select options
  const options: SelectOption[] = totalOptions.filter((item: string): boolean => !selected.includes(item)).map((item: string): SelectOption => { return { value: item } });
  // Create an event handler (onChange)
  const onSelect = (items: string[]): void => { setSelected(items); onChange(column, display, items) }
  // Return an element
  return (<Select mode='multiple' onChange={onSelect} options={options} style={{ width: '100%' }} value={selected} />);
};