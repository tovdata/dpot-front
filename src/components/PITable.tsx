// Component
import { Table, TableColumnProps } from 'antd';
import { CommonTableForm, TableContentList, TableProcessItems } from '../components/common/Table';
// Data
import { personalInfoTableHeader } from '../models/data';
import { personalInfo } from '../models/temporary';

// Type
import { TableProcessItemProps } from '../models/type';

export const PersonalInfoTable = (): JSX.Element => {
  // Create the columns
  const columns: TableColumnProps<any>[] = Object.keys(personalInfoTableHeader).map((key: string): TableColumnProps<any> => {
    const column: TableColumnProps<any> = {
      dataIndex: key,
      key: key,
      title: personalInfoTableHeader[key]
    };
    // Set a render
    if (key === 'period' || key === 'purpose') {
      column.render = (items: string[]): JSX.Element => <TableContentList items={items} />;
    } else if (key === 'essentialItems' || key === 'selectionItems') {
      column.render = (items: TableProcessItemProps[]): JSX.Element => <TableProcessItems items={items} tooltip='고유식별정보' />;
    }
    // Return
    return column;
  });
  // Append a key property to data source
  const dataSource = personalInfo.map((elem: any, index: number): any => { return { ...elem, key: index.toString() }; });
  // Create a table
  const table: JSX.Element = <Table columns={columns} dataSource={dataSource} pagination={false} />

  // Return an element
  return (
    <CommonTableForm title='개인정보 수집・이용 현황' table={table} />
  );
}

// export const PseudonymInfoTable = (): JSX.Element => {
//   // Create the columns
//   const columns: TableColumnProps<any>[] = Object.keys(pseudonymInfoTableHeader).map((key: string): TableColumnProps<any> => {
//     const column: TableColumnProps<any> = {
//       dataIndex: key,
//       key: key,
//       title: pseudonymInfoTableHeader[key]
//     };
//     // Set a render
//     if (key === 'period') {
//       column.render = (data: any): JSX.Element => (<);
//     } else if (key === 'items') {

//     } else {

//     }
//   })

//   return (
//     <CommonTableForm title='가명정보 수집・이용 현황' table={<></>} />
//   )
// }