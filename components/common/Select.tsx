import { useState } from 'react';
import styled from 'styled-components';
// Component
import { Form, Input, Select } from 'antd';

// Styled component (IFTTP form)
const StyledIFTTPFormRow = styled.div`
  display: flex;
  flex: 1;
  position: relative;
`;

/** [Interface] Properties for addable select */
interface AddableSelectProps {
  multiple?: boolean;
  onChange: (value: any) => void;
  totalOptions: string[];
  values: string[];
}
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

/** [Component] Single select */
export const SingleSelect = ({ onSelect, totalOptions, value }: any): JSX.Element => {
  // Set the options for select box
  const options: SelectOption[] = totalOptions.map((item: string): SelectOption => { return { value: item } });
  // Return an element
  return (<Select defaultValue={value} options={options} onSelect={onSelect} placeholder='선택' value={value} />);
}
/** [Component] Addable select */
export const AddableSelect = ({ multiple, onChange, totalOptions, values }: AddableSelectProps): JSX.Element => {
  // Set a local state
  const [selected, setSelected] = useState<string[]|string>(values);
  // Set the options for select box
  const options: SelectOption[] = totalOptions.filter((item: string): boolean => !selected.includes(item)).map((item: string): SelectOption => { return { value: item } });
  // Create an event handler (onSelect)
  const onSelect = (item: string[]|string): void => { setSelected(item); onChange(item) }
  // Return an element
  return (<Select mode={multiple ? 'tags' : undefined} onChange={onSelect} options={options} style={{ width: '100%' }} tokenSeparators={[',']} value={selected} />);
}
/** [Component] IFTTP format select */
export const IFTTPSelect = ({ onAdd }: any): JSX.Element => {
  // Set a data type
  const keyList: string[] = ['1', '2', '3', '4'];
  const defaultValue: any = {'1': '이벤트 종료', '3': 0};
  // Set a local state
  const [hidden, setHidden] = useState<boolean>(true);
  const [values, setValues] = useState<any>(defaultValue);
  // Create an event handler (onChange)
  const onChange = (key: string, value: string): void => {
    // Change a value
    const changed: any = {...values, [key]: value};
    setValues(changed);
    // Hidden a second row
    if (changed['2'] === '시까지') {
      onAdd(`${changed['1']} ${changed['2']}`);
      // Update a state
      setHidden(true);
      setValues(defaultValue);
    } else if (changed['2'] === '후') {
      setHidden(false);
      // Create an item
      if (!keyList.some((key: string): boolean => changed[key] === undefined)) {
        onAdd(`${changed['1']} ${changed['2']} ${changed['3']}${changed['4']}`);
        // Update a state
        setHidden(true);
        setValues(defaultValue);
      }
    } else {
      setHidden(true);
      setValues({...changed, '3': 0, '4': undefined});
    }
  }

  // Return an element
  return (
    <Form>
      <StyledIFTTPFormRow>
        <SingleSelect onSelect={(value: string) => onChange('1', value)} totalOptions={['이벤트 종료', '회원 탈퇴', '재화 및 서비스 공급 완료']} value={values['1']} />
        <SingleSelect onSelect={(value: string) => onChange('2', value)} totalOptions={['후', '시까지']} value={values['2']} />
      </StyledIFTTPFormRow>
      {hidden ? (
        <></>
      ) : (
        <StyledIFTTPFormRow>
          <Input onChange={(e: any) => onChange('3', e.target.value.toString())} type='number' value={values['3']} />
          <SingleSelect onSelect={(value: string) => onChange('4', value)} totalOptions={['일', '개월', '년']} value={values['4']} />
        </StyledIFTTPFormRow>
      )}
    </Form>
  )
}