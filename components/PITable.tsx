import { useState } from 'react';
// Component
import { notification } from 'antd';
// import { EditableTable } from './common/Table';
import { EditableTableForm } from './common/RenewerTable';
// Data
import { personalInfoTableHeader, falseNameInfoTableHeader } from '../models/data';
import { personalInfo, falseNameInfo } from '../models/temporary';

/**
 * [Component] Personal information table
 */
export const PersonalInfoTable = (): JSX.Element => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(personalInfo);

  // Create an event handler (onAdd)
  const onAdd = (record: any): void => setData([...data, record]);
  // Create an event handler (onDelete)
  const onDelete = (index: number) => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // Create an event handler (onSave)
  const onSave = (index: number, record: any): void => {
    if (record.essentialItems.length === 0 && record.selectionItems.length === 0) {
      createWarningNotification('');
    } else {
      data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)])
    }
  };

  return (<EditableTableForm dataSource={data} headers={personalInfoTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} title='개인정보 수집・이용 현황' />);
}
// // // Component (pseudonym info table)
// export const FalseNameInfoTable = (): JSX.Element => {
//   return (<EditableTable dataSource={falseNameInfo} headers={falseNameInfoTableHeader} title='가명정보 수집・이용 현황' />);
// }

/**
 * [Internal Function] Create a warning notification
 * @param message notification message
 */
 const createWarningNotification = (message: string): void => {
  notification.warning({
    description: message,
    duration: 2.4,
    message: 'Warning'
  });
}