import { MutableRefObject, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// Component
import { Col, Divider, Input, InputNumber, Row, Select, Space, Typography } from 'antd';
// Module
import { warningNotification } from './Notification';
// Type
import { PlusOutlined } from '@ant-design/icons';
// Util
import { blankCheck } from '../../utils/utils';

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
  onClick?: () => void;
  options: string[];
  placeholder?: string;
  refElement?: any;
  value: string | string[];
}
/** [Interface] IFTTT Data format */
interface IFTTTData {
  event: string;
  adverb: string;
  digit?: number;
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
export const SingleSelect = ({ error, onChange, placeholder, refresh, options, refElement, value }: SingleSelectProps): JSX.Element => {
  // Set the options for select box
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Return an element
  return (<Select style={{ width: '100%' }} key={refresh ? refresh.current : undefined} options={selectOptions} onSelect={onChange} placeholder={placeholder} ref={refElement} status={error ? 'error' : undefined} value={value === '' ? undefined : value} />);
}
/** 
 * [Component] Addable select
 */
export const AddableSelect = ({ error, onChange, options, placeholder, refElement, value }: GeneralPurposeSelectProps): JSX.Element => {
  // Create the select options
  // const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });

  const { Option } = Select;
  const [items, setItems] = useState(options);
  const [name, setName] = useState('');

  // Create an event handler (onInputKeyDown)
  const onInputKeyDown = (e: any): void => {
    // e.stopPropagation(); // ??? ??????
    if (!e.nativeEvent.isComposing) {
      addItem(e);
    }
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

  useEffect(() =>setItems(options), [options]);

  // Return an element
  return (
    <Select
      ref={refElement}
      style={{ 'width': '100%' }}
      placeholder={placeholder}
      value={value}
      onMouseDown={onMouseDown}
      dropdownRender={menu => (
        <>
          {menu}
          <Divider style={{ margin: '8px 0' }} />
          <Space align="center" style={{ padding: '0 8px 4px' }}>
            <Input placeholder="" value={name} onChange={onNameChange} onPressEnter={onInputKeyDown} />
            <Typography.Link onClick={addItem} style={{ whiteSpace: 'nowrap' }}>
              <PlusOutlined />??????
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
export const AddableTagSelect = ({ error, onChange, onClick, options, placeholder, refElement, value }: GeneralPurposeSelectProps): JSX.Element => {
  // Create the select options
  const selectOptions: SelectOptionFormat[] = options?.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Return an element
  return (<Select style={{ 'width': '100%' }} mode='tags' onChange={onChange} onClick={onClick} options={selectOptions} placeholder={placeholder} ref={refElement} status={error ? 'error' : undefined} tokenSeparators={[',']} value={value as string[]} />);
}
/**
 * [Component] Tag select
 */
export const TagSelect = ({ error, onChange, options, placeholder, refElement, value }: GeneralPurposeSelectProps): JSX.Element => {
  // Create the select options
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Return an element
  return (<Select style={{ 'width': '100%' }} mode='multiple' onChange={onChange} options={selectOptions} placeholder={placeholder} ref={refElement} status={error ? 'error' : undefined} value={value as string[]} />);
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
    if (changed.adverb === '?????????') {
      if (!blankCheck(changed.event)) {
        onAdd(`${changed.event} ${changed.adverb}`);
        // Reset a value
        setData(defaultValue);
        // Update a variable for refresh
        refresh.current++
      }
      // Update a state
      setHidden(true);
    } else if (changed.adverb === '????????????') {
      setHidden(false);
      // Create an item
      if (!blankCheck(changed.unit) && !blankCheck(changed.event)) {
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
          <SingleSelect onChange={(value: string | string[]) => onChange('adverb', value as string)} refresh={refresh} options={['????????????', '?????????']} placeholder='??????' value={data.adverb} />
        </Col>
        {hidden ? (
          <></>
        ) : (
          <>
            <Col span={12}>
              <InputNumber max={999} min={1} onChange={(value: any) => onChange('digit', value === null ? 1 : value.toString())} value={data.digit} style={{ width: '100%' }} />
            </Col>
            <Col span={12}>
              <SingleSelect onChange={(value: string | string[]) => onChange('unit', value as string)} options={['???', '??????', '???']} placeholder='??????' value={data.unit} />
            </Col>
          </>
        )}
      </Row>
    </StyledIFTTTForm>
  );
}