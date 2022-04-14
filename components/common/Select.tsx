import { MutableRefObject, useRef, useState } from 'react';
import styled from 'styled-components';
// Component
import { Col, Input, Row, Select } from 'antd';
// Module
import { createWarningMessage } from './Notification';

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
  onChange: (value: string|string[]) => void;
  options: string[];
  value: string|string[];
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

/**
 * [Component] Single select
 */
export const SingleSelect = ({ error, onChange, placeholder, refresh, options, value }: SingleSelectProps): JSX.Element => {
  // Set the options for select box
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Return an element
  return (<Select key={refresh ? refresh.current : undefined} options={selectOptions} onSelect={onChange} placeholder={placeholder} status={error ? 'error' : undefined} style={{ width: '100%' }} value={value === '' ? undefined : value} />);
}
/** 
 * [Component] Addable select
 */
export const AddableSelect = ({ error, onChange, options, value }: GeneralPurposeSelectProps): JSX.Element => {
  // Create the select options
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Create an event handler (onInputKeyDown)
  const onInputKeyDown = (e: any): void => (e.key === 'Enter' && e.target.value !== '') ? onChange(e.target.value) : undefined;
  // Return an element
  return (<Select showSearch onSelect={(item: string): void => onChange(item)} options={selectOptions} onInputKeyDown={onInputKeyDown} status={error ? 'error' : undefined} style={{ width: '100%' }} value={value} />);
}
/**
 * [Component] Addable tag select
 */
export const AddableTagSelect = ({ error, onChange, options, value }: GeneralPurposeSelectProps): JSX.Element => {
  // Create the select options
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Return an element
  return (<Select mode='tags' onChange={onChange} options={selectOptions} status={error ? 'error' : undefined} style={{ width: '100%' }} tokenSeparators={[',']} value={value as string[]} />);
}
/**
 * [Component] Tag select
 */
export const TagSelect = ({ error, onChange, options, value }: GeneralPurposeSelectProps): JSX.Element => {
  // Create the select options
  const selectOptions: SelectOptionFormat[] = options.map((item: string): SelectOptionFormat => { return { label: item, value: item } });
  // Return an element
  return (<Select mode='multiple' onChange={onChange} options={selectOptions} status={error ? 'error' : undefined} style={{ width: '100%' }} value={value as string[]} />);
}
/**
 * [Component] IFTTT select
 */
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
        createWarningMessage('0보다 큰 정수 값을 입력해주세요.', 1.6);
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
          <SingleSelect onChange={(value: string|string[]) => onChange('event', value as string)} options={['이벤트 종료', '회원 탈퇴', '재화 및 서비스 공급 완료']} placeholder='선택' value={data.event} />
        </Col>
        <Col span={8}>
          <SingleSelect onChange={(value: string|string[]) => onChange('adverb', value as string)} refresh={refresh} options={['후', '시까지']} placeholder='선택' value={data.adverb} />
        </Col>
        {hidden ? (
          <></>
        ) : (
          <>
            <Col span={12}>
              <Input onChange={(e: any) => onChange('digit', e.target.value.toString())} type='number' value={data.digit} />
            </Col>
            <Col span={12}>
              <SingleSelect onChange={(value: string|string[]) => onChange('unit', value as string)} options={['일', '개월', '년']} placeholder='선택' value={data.unit} />
            </Col>
          </>
        )}
      </Row>
    </StyledIFTTTForm>
  );
}