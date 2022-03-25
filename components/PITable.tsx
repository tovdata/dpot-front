import { useState } from 'react';
// Component
import { Table, TableColumnProps } from 'antd';
import { TableContentList, TableEditCell, TableForm, TableHeader, TableProcessItems } from '../components/common/Table';
// Data
import { personalInfoTableHeader, pseudonymInfoTableHeader } from '../models/data';
import { personalInfo, pseudonymInfo } from '../models/temporary';
// Type
import { TableProcessItemProps } from '../models/type';

// Component (personal info table)
export const PersonalInfoTable = (): JSX.Element => {
  // Set a local state
  const [edit, setEdit] = useState<boolean>(false);
  // Create an event handler
  const onEdit = (): void => setEdit(true);
  // Create an event handler
  const onSave = (): void => setEdit(false);

  // Create the columns
  const columns: TableColumnProps<any>[] = Object.keys(personalInfoTableHeader).map((key: string): TableColumnProps<any> => {
    const column: TableColumnProps<any> = {
      dataIndex: key,
      key: key,
      title: <TableHeader description={personalInfoTableHeader[key].description} name={personalInfoTableHeader[key].name} />
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
  // Append a edit cell
  columns.push({
    dataIndex: 'edit',
    key: 'edit',
    title: '',
    render: () => <TableEditCell edit={edit} />
  });

  // Append a key property to data source
  const dataSource = personalInfo.map((elem: any, index: number): any => { return { ...elem, key: index.toString() }; });
  // Create a table
  const table: JSX.Element = <Table columns={columns} dataSource={dataSource} pagination={false} />

  // Return an element
  return (
    <TableForm edit={edit} onEdit={onEdit} onSave={onSave} title='개인정보 수집・이용 현황' table={table} />
  );
}
// Component (pseudonym info table)
export const PseudonymInfoTable = (): JSX.Element => {
  // Set a local state
  const [edit, setEdit] = useState<boolean>(false);
  // Create an event handler
  const onEdit = (): void => setEdit(true);
  // Create an event handler
  const onSave = (): void => setEdit(false);

  // Create the columns
  const columns: TableColumnProps<any>[] = Object.keys(pseudonymInfoTableHeader).map((key: string): TableColumnProps<any> => {
    const column: TableColumnProps<any> = {
      dataIndex: key,
      key: key,
      title: <TableHeader description={pseudonymInfoTableHeader[key].description} name={pseudonymInfoTableHeader[key].name} />
    };
    // Set a render
    if (key === 'period') {
      column.render = (items: string[]): JSX.Element => <TableContentList items={items} />;
    } else if (key === 'items') {
      column.render = (items: TableProcessItemProps[]): JSX.Element => <TableProcessItems items={items} tooltip='고유식별정보' />;
    }
    // Return
    return column;
  });
  // Append a edit cell
  columns.push({
    dataIndex: 'edit',
    key: 'edit',
    title: '',
    render: () => <TableEditCell edit={edit} />
  });
  
  // Append a key property to data source
  const dataSource = pseudonymInfo.map((elem: any, index: number): any => { return { ...elem, key: index.toString() }; });
  // Create a table
  const table: JSX.Element = <Table columns={columns} dataSource={dataSource} pagination={false} />

  // Return an element
  return (
    <TableForm edit={edit} onEdit={onEdit} onSave={onSave} title='가명정보 수집・이용 현황' table={table} />
  )
}