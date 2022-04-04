import { useState } from 'react';
// Component
import { Select } from 'antd';

/** Interface (Props) */
interface EditableSelectProps {
  compareOptions?: string[];
  defaultOptions: string[];
  totalOptions: string[];
}
interface EditableSelectMultiProps extends EditableSelectProps {
  onChange: (items: string[]) => void;
}
interface EditableSelectSingleProps extends EditableSelectProps {
  onChange: (items: string) => void;
}
/** Interface (Data type) */
interface SelectOption {
  value: string;
}

// Component (editable select)
export const EditableSelectSingle = ({ defaultOptions, onChange, totalOptions }: EditableSelectSingleProps): JSX.Element => {
  // Set a local state
  const [selected, setSelected] = useState<string[]>(defaultOptions);
  // Set the select options
  const options: SelectOption[] = totalOptions.filter((item: string): boolean => !selected.includes(item)).map((item: string): SelectOption => { return { value: item } });
  // Create an event handler (onChange)
  const onSelect = (items: string[]): void => { setSelected(items); onChange(items[0] ? items[0] : '') }
  // Return an element
  return (<Select onChange={onSelect} options={options} showSearch style={{ width: '100%' }} value={selected} />);
};
// Component (editable select)
export const EditableSelectMulti = ({ compareOptions, defaultOptions, onChange, totalOptions }: EditableSelectMultiProps): JSX.Element => {
  // Set a local state
  const [selected, setSelected] = useState<string[]>(defaultOptions);
  // Set the select options
  const options: SelectOption[] = totalOptions.filter((item: string): boolean => compareOptions ? !compareOptions.includes(item) : true).filter((item: string): boolean => !selected.includes(item)).map((item: string): SelectOption => { return { value: item } });
  // Create an event handler (onChange)
  const onSelect = (items: string[]): void => { setSelected(items); onChange(items) }
  // Return an element
  return (<Select mode='tags' onChange={onSelect} options={options} style={{ width: '100%' }} filterOption={true} tokenSeparators={[',']} value={selected} />);
};