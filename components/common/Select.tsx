import { MutableRefObject, useRef, useState } from 'react';
import styled from 'styled-components';
// Component
import { Col, Divider, Input, Row, Select, Space, Typography } from 'antd';
// Module
import { createWarningMessage } from './Notification';
// Type
import { SelectOptionsByColumn } from '../../models/type';
import { PlusOutlined } from '@ant-design/icons';

// Styled component (IFTTT form)
const StyledIFTTTForm = styled.div`
  position: relative;
  .ant-select {
    width: 100%;
  }
`;

/** [Interface] Properties for general purpose select */
interface GeneralPurposeSelectProps {
  error?: boolean;
  onChange: (value: string | string[]) => void;
  options: string[];
  value: string | string[];
}
/** [Interface] IFTTT Data format */
interface IFTTTData {
  event: string;
  adverb: string;
  digit: number;
  unit: string;
}
/** [Interface] Select option format */
interface SelectOptionFormat {
  label: string;
  value: string;
}
/**  [Interface] Single select props */
interface SingleSelectProps extends GeneralPurposeSelectProps {
  placeholder?: string;
  refresh?: MutableRefObject<number>;
}
/** [Interface] IFTTT select props */
interface IFTTTSelectProps {
  onAdd: (value: string) => void;
  options: string[];
}

/**
 * [Component] Single select
 */
export const SingleSelect = ({ error, onChange, placeholder, refresh, options, value }: SingleSelectProps): JSX.Element => {
  // Set the options for select box
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Return an element
  return (<Select style={{ 'width': '100%' }} key={refresh ? refresh.current : undefined} options={selectOptions} onSelect={onChange} placeholder={placeholder} status={error ? 'error' : undefined} value={value === '' ? undefined : value} />);
}
/** 
 * [Component] Addable select
 */
export const AddableSelect = ({ error, onChange, options, value }: GeneralPurposeSelectProps): JSX.Element => {
  // Create the select options
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });

  const { Option } = Select;
  const [items, setItems] = useState(selectOptions.map(item => item.value));
  const [name, setName] = useState('');

  // Create an event handler (onInputKeyDown)
  const onInputKeyDown = (e: any): void => {
    // e.stopPropagation(); // 창 닫기
    addItem(e);
  }
  const onMouseDown = (e: any): void => {
    e.stopPropagation();
    const target = e.target.closest('.ant-select-item-option-content');
    target && onChange(e.target.textContent);
  }

  const onNameChange = (event: any) => {
    setName(event.target.value);
  };
  const addItem = (e: any) => {
    e.preventDefault();
    if (name) {
      setItems([name, ...items]);
      onChange(name)
    }
    setName('');
  };
  // Return an element
  return (
    <Select
      style={{ 'width': '100%' }}
      placeholder=""
      value={value}
      onMouseDown={onMouseDown}
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space align="center" style={{ padding: '0 8px 4px' }}>
            <Input placeholder="" value={name} onChange={onNameChange} onPressEnter={onInputKeyDown} />
            <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
              <PlusOutlined />추가
            </Typography.Link>
          </Space>
        </>
      )}
    >
      {
        items.map(item => (
          <Option key={item}>{item}</Option>
        ))
      }
    </Select >
  )
}
/**
 * [Component] Addable tag select
 */
export const AddableTagSelect = ({ error, onChange, options, value }: GeneralPurposeSelectProps): JSX.Element => {
  // Create the select options
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Return an element
  return (<Select style={{ 'width': '100%' }} mode='tags' onChange={onChange} options={selectOptions} status={error ? 'error' : undefined} tokenSeparators={[',']} value={value as string[]} />);
}
/**
 * [Component] Tag select
 */
export const TagSelect = ({ error, onChange, options, value }: GeneralPurposeSelectProps): JSX.Element => {
  // Create the select options
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Return an element
  return (<Select style={{ 'width': '100%' }} mode='multiple' onChange={onChange} options={selectOptions} status={error ? 'error' : undefined} value={value as string[]} />);
}
/**
 * [Component] IFTTT select
 */
export const IFTTTSelect = ({ onAdd, options }: IFTTTSelectProps): JSX.Element => {
  // For refresh for element
  const refresh: MutableRefObject<number> = useRef(0);
  // Set a data type
  const defaultValue: IFTTTData = { adverb: '', digit: 1, event: '', unit: '' };

  // Set a local state
  const [hidden, setHidden] = useState<boolean>(true);
  const [data, setData] = useState<IFTTTData>(defaultValue);

  // Create an event handler (onChange)
  const onChange = (key: string, value: string): void => {
    // Change a value
    const changed: IFTTTData = { ...data, [key]: value };
    setData(changed);
    // Hidden a second row
    if (changed.adverb === '시까지') {
      onAdd(`${changed.event} ${changed.adverb}`);
      // Update a state
      setHidden(true);
      setData(defaultValue);
      // Update a variable for refresh
      refresh.current++
    } else if (changed.adverb === '일로부터') {
      setHidden(false);
      // Create an item
      if (changed.digit <= 0) {
        createWarningMessage('0보다 큰 정수 값을 입력해주세요.', 1.6);
        setData({ ...data, digit: 1 });
      } else if (changed.digit > 0 && changed.unit !== '') {
        onAdd(`${changed.event}${changed.adverb} ${changed.digit}${changed.unit}`);
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
          <AddableSelect onChange={(value: string | string[]) => onChange('event', value as string)} options={options} value={data.event} />
        </Col>
        <Col span={8}>
          <SingleSelect onChange={(value: string | string[]) => onChange('adverb', value as string)} refresh={refresh} options={['일로부터', '시까지']} placeholder='선택' value={data.adverb} />
        </Col>
        {hidden ? (
          <></>
        ) : (
          <>
            <Col span={12}>
              <Input onChange={(e: any) => onChange('digit', e.target.value.toString())} type='number' value={data.digit} />
            </Col>
            <Col span={12}>
              <SingleSelect onChange={(value: string | string[]) => onChange('unit', value as string)} options={['일', '개월', '년']} placeholder='선택' value={data.unit} />
            </Col>
          </>
        )}
      </Row>
    </StyledIFTTTForm>
  );
}