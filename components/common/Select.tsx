import { MutableRefObject, useRef, useState } from 'react';
import styled from 'styled-components';
// Component
import { Col, Input, Row, Select } from 'antd';
// Module
import { createSimpleWarningNotification } from './Notification';

// Styled component (IFTTT form)
const StyledIFTTTForm = styled.div`
  position: relative;
  .ant-select {
    width: 100%;
  }
`;

/** [Interface] Properties for addable select */
interface AddableSelectProps {
  error?: boolean;
  multiple?: boolean;
  onChange: (value: any) => void;
  totalOptions: string[];
  values: string[];
}
/** [Interface] IFTTT Data format */
interface IFTTTData {
  event: string;
  adverb: string;
  digit: number;
  unit: string;
}
/** Interface (Data type) */
interface SelectOption {
  value: string;
}
/**  [Interface] Single select props */
interface SingleSelectProps {
  onSelect: (item: string) => void;
  refresh?: MutableRefObject<number>;
  status?: boolean;
  totalOptions: string[];
  value: string;
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
export const SingleSelect = ({ onSelect, refresh, totalOptions, value }: SingleSelectProps): JSX.Element => {
  // Set the options for select box
  const options: SelectOption[] = totalOptions.map((item: string): SelectOption => { return { value: item } });
  // Return an element
  return (<Select key={refresh ? refresh.current : undefined} options={options} onSelect={onSelect} placeholder='선택' value={value === '' ? undefined : value} />);
}
/** [Component] Addable select */
export const AddableSelect = ({ error, multiple, onChange, totalOptions, values }: AddableSelectProps): JSX.Element => {
  // Set a local state
  const [selected, setSelected] = useState<string[]|string>(values);
  // Set the options for select box
  const options: SelectOption[] = totalOptions.filter((item: string): boolean => !selected.includes(item)).map((item: string): SelectOption => { return { value: item } });
  // Create an event handler (onSelect)
  const onSelect = (item: string[]|string): void => { setSelected(item); onChange(item) }
  // Return an element
  return (<Select mode={multiple ? 'tags' : undefined} onChange={onSelect} options={options} status={error ? 'error' : undefined} style={{ width: '100%' }} tokenSeparators={[',']} value={selected} />);
}
/** [Component] IFTTT select */
export const IFTTTSelect = ({ onAdd }: any): JSX.Element => {
  // For refresh for element
  const refresh: MutableRefObject<number> = useRef(0);
  // Set a data type
  const defaultValue: IFTTTData = { adverb: '', digit: 1, event: '이벤트 종료', unit: '' };

  // Set a local state
  const [hidden, setHidden] = useState<boolean>(true);
  const [data, setData] = useState<IFTTTData>(defaultValue);

  // Create an event handler (onChange)
  const onChange = (key: string, value: string): void => {
    // Change a value
    const changed: IFTTTData = {...data, [key]: value};
    setData(changed);
    // Hidden a second row
    if (changed.adverb === '시까지') {
      onAdd(`${changed.event} ${changed.adverb}`);
      // Update a state
      setHidden(true);
      setData(defaultValue);
      // Update a variable for refresh
      refresh.current++
    } else if (changed.adverb === '후') {
      setHidden(false);
      // Create an item
      if (changed.digit <= 0) {
        createSimpleWarningNotification('0보다 큰 정수 값을 입력해주세요.');
      }
      if (changed.digit > 0 && changed.unit !== '') {
        onAdd(`${changed.event} ${changed.adverb} ${changed.digit}${changed.unit}`);
        // Update a state
        setHidden(true);
        setData(defaultValue);
        // Update a variable for refresh
        refresh.current++;
      }
    }
  }

  // Return an element
  return (
    <StyledIFTTTForm>
      <Row gutter={[4, 4]}>
        <Col span={16}>
          <SingleSelect onSelect={(value: string) => onChange('event', value)} totalOptions={['이벤트 종료', '회원 탈퇴', '재화 및 서비스 공급 완료']} value={data.event} />
        </Col>
        <Col span={8}>
          <SingleSelect onSelect={(value: string) => onChange('adverb', value)} refresh={refresh} totalOptions={['후', '시까지']} value={data.adverb} />
        </Col>
        {hidden ? (
          <></>
        ) : (
          <>
            <Col span={12}>
              <Input onChange={(e: any) => onChange('digit', e.target.value.toString())} type='number' value={data.digit} />
            </Col>
            <Col span={12}>
              <SingleSelect onSelect={(value: string) => onChange('unit', value)} totalOptions={['일', '개월', '년']} value={data.unit} />
            </Col>
          </>
        )}
      </Row>
    </StyledIFTTTForm>
  );
}