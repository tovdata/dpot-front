import { useEffect, useState } from 'react';
// Component
import { EditableTableForm, setDataSource } from './common/Table';
// Data
import { personalInfoTableHeader, falseNameInfoTableHeader } from '../models/data';
import { personalInfo, falseNameInfo } from '../models/temporary';
// Module
import { createSimpleWarningNotification } from './common/Notification';
// Type
import { ProcessingItemDF, SelectOptionsByColumn, TableHeadersData } from '../models/type';

/**
 * [Component] Personal information table
 */
export const PersonalInfoTable = (): JSX.Element => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(personalInfo));
  // Set a local state (for select option)
  const [selectOptions, setSelectOptions] = useState<any>({});

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

  // If update a data source, update the select options
  useEffect(() => {
    const options: SelectOptionsByColumn = extractSelectOptionsByColumn(data, {}, personalInfoTableHeader);
    // Combine the items
    options['items'] = options['essentialItems'].concat(options['selectionItems']);
    // Delete
    delete options['essentialItems'];
    delete options['selectionItems'];
    // Update the options state
    setSelectOptions(options);
  }, [data]);

  // Return an element
  return (<EditableTableForm dataSource={data} headers={personalInfoTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} selectOptions={selectOptions} title='개인정보 수집・이용 현황' />);
}
/**
 * [Component] False name information table
 */
export const FalseNameInfoTable = (): JSX.Element => {
  // Set a local state
  const [data, setData] = useState<any[]>(setDataSource(falseNameInfo));
  // Set a local state (for select option)
  const [selectOptions, setSelectOptions] = useState<any>({});
  
  // Create an event handler (onAdd)
  const onAdd = (record: any): void => setData([...data, record]);
  // Create an event handler (onDelete)
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // Create an event handler (onSave)
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  }

  // If update a data source, update the select options
  useEffect(() => {
    const options: SelectOptionsByColumn = extractSelectOptionsByColumn(data, { basis: ['과학적 연구', '처리 근거 1', '처리 근거 2'], subject: ['회원가입 및 관리', '새로운 업무 1', '새로운 업무 2'] }, falseNameInfoTableHeader);
    // Update the options state
    setSelectOptions(options);
  }, [data]);

  // Return an element
  return (<EditableTableForm dataSource={data} headers={falseNameInfoTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} selectOptions={selectOptions} title='가명정보 수집・이용 현황' />);
}

/**
 * [Internal Function] Extract the select option by column
 * @param dataSource data source
 * @param defaultOptions default select options
 * @param headers table header data
 */
const extractSelectOptionsByColumn = (dataSource: any[], defaultOptions: any, headers: TableHeadersData): SelectOptionsByColumn => {
  const options: SelectOptionsByColumn = {};
  // Set the default select options by columns
  Object.keys(defaultOptions).forEach((key: string): string[] => options[key] = [...defaultOptions[key]]);
  // Set the select options by columns
  for (const row of dataSource) {
    for (const key of Object.keys(headers)) {
      // Processing by display option
      const display: string = headers[key].display;
      if (display === 'period' || display === 'string' || display === 'select') {
        continue;
      }
      // Set a select option object by key
      if (options[key] === undefined) options[key] = [];
      // Add the select options
      if (Array.isArray(row[key])) {
        if (display === 'item') {
          options[key].push(...row[key].filter((item: ProcessingItemDF): boolean => !options[key].includes(item.name)).map((item: ProcessingItemDF): string => item.name));
        } else {
          options[key].push(...row[key].filter((item: string): boolean => !options[key].includes(item)));
        }
      } else {
        !options[key].includes(row[key]) ? options[key].push(row[key]) : undefined;
      }
    }
  }
  // Return
  return options;
}