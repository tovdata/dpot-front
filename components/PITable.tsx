import { useEffect, useState } from 'react';
// Component
import { EditableTableForm, setDataSource } from './common/Table';
// Data
import { personalInfoTableHeader, falseNameInfoTableHeader } from '../models/data';
import { personalInfo, falseNameInfo } from '../models/temporary';
// Module
import { createSimpleWarningNotification } from './common/Notification';

/**
 * [Component] Personal information table
 */
export const PersonalInfoTable = (): JSX.Element => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(personalInfo));

  // Create an event handler (onAdd)
  const onAdd = (record: any): void => setData([...data, record]);
  // Create an event handler (onDelete)
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // Create an event handler (onSave)
  const onSave = (index: number, record: any): boolean => {
    if (record.essentialItems.length === 0 && record.selectionItems.length === 0) {
      createSimpleWarningNotification('필수 항목과 선택 항목 중에서 하나의 항목을 필수로 입력해야 합니다.');
      return false;
    } else {
      data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
      return true;
    }
  };

  // Return an element
  return (<EditableTableForm dataSource={data} headers={personalInfoTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} tableName='personalInfo' title='개인정보 수집・이용 현황' />);
}
/**
 * [Component] False name information table
 */
export const FalseNameInfoTable = (): JSX.Element => {
  // Set a local state
  const [data, setData] = useState<any[]>(setDataSource(falseNameInfo));
  
  // Create an event handler (onAdd)
  const onAdd = (record: any): void => setData([...data, record]);
  // Create an event handler (onDelete)
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // Create an event handler (onSave)
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  }

  // // If update a data source, update the select options
  // useEffect(() => {
  //   const options: SelectOptionsByColumn = extractSelectOptionsByColumn(data, { basis: ['과학적 연구', '처리 근거 1', '처리 근거 2'], subject: ['회원가입 및 관리', '새로운 업무 1', '새로운 업무 2'] }, falseNameInfoTableHeader);
  //   // Update the options state
  //   setSelectOptions(options);
  // }, [data]);

  // Return an element
  return (<EditableTableForm dataSource={data} defaultSelectOptions={{ basis: ['과학적 연구', '처리 근거 1', '처리 근거 2'], subject: ['회원가입 및 관리', '새로운 업무 1', '새로운 업무 2'] }} headers={falseNameInfoTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} tableName='falseNameInfo' title='가명정보 수집・이용 현황' />);
}