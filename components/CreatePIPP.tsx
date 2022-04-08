import styled from 'styled-components';
import { MutableRefObject, useRef, useState } from 'react';
// Component
import { PageHeaderContainStep } from './common/Header';
import { Collapse, Radio } from 'antd';
import { InputableTable } from './common/RenewerTable';
// Data
import { personalInfoTableHeader, defaultExtendPersonalInfoTable } from '../models/data';
// Type
import { ExtendPersonalInfoTableDF } from '../models/type';

// Styled component ()
const StyledContainer = styled.div`
  .ant-table-tbody > tr:last-child > td {
    border-bottom: none;
  }
  .ant-table-footer {
    background-color: #ffffff;
    border: 1px dashed #D9D9D9;
    padding-bottom: 0.5rem;
    padding-top: 0.5rem;
  }
`;

export const CreateForm = (): JSX.Element => {
  const steps: string[] = ['기본정보 입력', '제공/위탁', '해당사항 입력', '가명처리사항', '편집하기', '완성'];

  // Set a local state
  const [current, setCurrent] = useState<number>(0);
  // Create an event handler (onNext)
  const onNext = (): void => current + 1 < steps.length ? setCurrent(current + 1) : undefined;
  // Create an event handler (onPrev)
  const onPrev = (): void => current - 1 >= 0 ? setCurrent(current - 1) : undefined;

  // Return an element
  return (
    <>
      <PageHeaderContainStep current={current} onNext={onNext} onPrev={onPrev} title='개인정보 처리방침 만들기' steps={steps} />
      <Step1Panal />
    </>
  );
}

/** [Internal Component] Step 1 panel */
const Step1Panal = (): JSX.Element => {
  // Set a ref
  const cnt: MutableRefObject<number> = useRef(1);
  // Set a local state
  const [table, setTable] = useState<ExtendPersonalInfoTableDF[]>([defaultExtendPersonalInfoTable]);

  // Create an event handler (onAdd)
  const onAdd = (): void => setTable([...table, {...defaultExtendPersonalInfoTable, key: (cnt.current++).toString()}]);
  // Create an event handler (onChange)
  const onChange = (column: string, index: number, record: ExtendPersonalInfoTableDF, value: any): void => setTable([...table.slice(0, index), {...record, [column]: value}, ...table.slice(index + 1)]);
  // Create an event handler (onDelete)
  const onDelete = (index: number): void => setTable([...table.slice(0, index), ...table.slice(index + 1)]);

  // Return an element
  return (
    <StyledContainer>
      <InputableTable dataSource={table} onAdd={onAdd} onChange={onChange} onDelete={onDelete} headers={personalInfoTableHeader} />
    </StyledContainer>
  );
}

// // [Internal] Component (step 2)
// const BasicInfo = (): JSX.Element => {
//   // Set a local state
//   const [open, setOpen] = useState<any>({'1': false, '2': false});
//   const [table, setTable] = useState<any[]>([]);
//   // Create an event handler (onChange)
//   const onChange = (key: string, value: string): void => setOpen({...open, [key]: value});

//   console.log('reafsdfsdfs')

//   // Return an element
//   return (
//     <Collapse collapsible='disabled' activeKey={Object.keys(open).filter((key: string): boolean => open[key])}>
//       <Collapse.Panel extra={<CollapseExtrac onChange={(e: any) => onChange('1', e.target.value)} />} header='제3자에게 제공하는 개인정보가 있나요?' key='1'>
//         <InputableTable data={table} headers={personalInfoTableHeader} pagination={false} setData={setTable} />
//       </Collapse.Panel>
//       <Collapse.Panel extra={<CollapseExtrac onChange={(e: any) => onChange('2', e.target.value)} />} header='위탁하는 개인정보가 있나요?' key='2'>
        
//       </Collapse.Panel>
//     </Collapse>
//   );
// }
// [Internal] Component (collapseExtra)
const CollapseExtrac = ({ onChange }: any): JSX.Element => {
  return (
    <Radio.Group onChange={onChange}>
      <Radio.Button value={true}>예</Radio.Button>
      <Radio.Button value={false}>아니오</Radio.Button>
    </Radio.Group>
  )
}