// Component
import { EditableTableForm } from '../components/common/Table';
// Data
import { personalInfoTableHeader, pseudonymInfoTableHeader } from '../models/data';
import { personalInfo, pseudonymInfo } from '../models/temporary';

// Component (personal info table)
export const PersonalInfoTable = (): JSX.Element => {
  return (<EditableTableForm dataSource={personalInfo} headers={personalInfoTableHeader} title='개인정보 수집・이용 현황' />);
}
// // Component (pseudonym info table)
// export const PseudonymInfoTable = (): JSX.Element => {
//   // Set a local state
//   const [edit, setEdit] = useState<boolean>(false);
//   // Create an event handler
//   const onEdit = (): void => setEdit(true);
//   // Create an event handler
//   const onSave = (): void => setEdit(false);

//   // Create the columns
//   const columns: TableColumnProps<any>[] = Object.keys(pseudonymInfoTableHeader).map((key: string): TableColumnProps<any> => {
//     const column: TableColumnProps<any> = {
//       dataIndex: key,
//       key: key,
//       title: <TableHeader description={pseudonymInfoTableHeader[key].description} name={pseudonymInfoTableHeader[key].name} />
//     };
//     // Set a render
//     if (key === 'period') {
//       column.render = (items: string[]): JSX.Element => <TableContentList items={items} />;
//     } else if (key === 'items') {
//       column.render = (items: TableProcessItemProps[]): JSX.Element => <TableProcessItems items={items} tooltip='고유식별정보' />;
//     }
//     // Return
//     return column;
//   });
//   // Append a edit cell
//   columns.push({
//     dataIndex: 'edit',
//     key: 'edit',
//     title: '',
//     render: () => <TableEditCell edit={edit} />
//   });

//   // Append a key property to data source
//   const dataSource = pseudonymInfo.map((elem: any, index: number): any => { return { ...elem, key: index.toString() }; });
//   // Create a table
//   const table: JSX.Element = <Table columns={columns} dataSource={dataSource} pagination={false} />

//   // Return an element
//   return (
//     <TableForm edit={edit} onEdit={onEdit} onSave={onSave} title='가명정보 수집・이용 현황' table={table} />
//   )
// }