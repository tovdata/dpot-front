import { useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Popover, TableColumnProps, Table, Tag, Tooltip, Checkbox } from 'antd';
import { EditableDrawer } from './Drawer';
import { EditableSelect } from './Select';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle, AiOutlineSave } from 'react-icons/ai';
// Temporary
import { processingItems } from '../../models/temporary';
// Type
import { TableProcessItemData } from '../../models/type';

const OuterTable = styled(Table)`
  border-collapse: collapse;
  .ant-table-expanded-row>td{
    border-bottom: 1px solid #acacac;
  }
`;
// Styled element (TableForm)
const StyledTableForm = styled.div`
  display: block;
  margin-bottom: 5rem;
  &:last-child {
    margin-bottom: 0;
  }
  .ant-table-cell {
    user-select: none;
  }
  .ant-table-cell > .ant-tag {
    cursor: pointer;
  }
`;
// Styled element (TableFormHeader)
const StyledTableFormHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1.75rem;
  user-select: none;
`;
// Styled element (TableTitle)
const StyledTableTitle = styled.h2`
  font-size: ${FS_HXXS};
  font-weight: 600;
  line-height: ${LH_HXXS};
`;
// Styled element (TableTool)
const StyledTableTool = styled.div`
  align-items: center;
  display: flex;
  justify-content: end;
  .ant-btn {
    cursor: pointer;
    margin-left: 1rem;
  }
  .ant-btn:first-child {
    margin-left: 0;
  }
`;
// Styled element (TableHeader)
const StyledTableHeader = styled.div`
  align-items: center;
  display: flex;
`;
// Styled element (TableHeaderQuestionItem)
const StyledTableHeaderQuestionItem = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  margin-left: 0.5rem;
`;
// Styled element (TableEditCell)
const StyledTableEditCell = styled.span`
  align-items: center;
  display: flex;
  font-size: 1.125rem;
  svg {
    cursor: pointer;
    margin-right: 0.5rem;
  }
  svg:last-child {
    margin-right: 0;
  }
`;
// Styled element (List)
const StyledList = styled.ul`
  margin: 0;
  padding-left: 1.125rem;
`;
const StyledListItem = styled.li``;

/** Interface (Props) */
interface TableHeaderProps {
  description?: string;
  name: string;
}
interface TableProps {
  dataSource: any[],
  headers: TableHeadersData;
  title: string;
  expandKey?: string;
  innerHeaders?: TableHeadersData;
}
interface TableEditCellProps {
  edit: boolean;
  onEdit: () => void;
  onSave: () => void;
}
interface TableContentListProps {
  items: string[];
}
interface TableProcessItemsProps {
  items: TableProcessItemData[];
  tooltip: string;
}
interface EditableTableProps extends TableProps { }
/** Interface (Data Type) */
interface TableHeaderData extends TableHeaderProps {
  display: string;
}
interface TableHeadersData {
  [key: string]: TableHeaderData;
}

// // Component (editable table form)
// export const EditableTableForm1 = ({ columns, dataSource, drawer, title }: EditableTableProps): JSX.Element => {
//   // Set a data source
//   const editedDataSource: any[] = dataSource.map((elem: any, index: number): any => { return { ...elem, key: index.toString(), edit: elem }; });

//   // Set a local state
//   const [edit, setEdit] = useState<boolean>(false);
//   const [data, setData] = useState<any[]>(editedDataSource);
//   const [row, setRow] = useState<any>(drawer.data);
//   // Get a state
//   const [show, setShow] = useState<boolean>(false);

//   // Create an event handler (onEdit)
//   const onEdit = (): void => setEdit(true);
//   // Create an event handler (onSave)
//   const onSave = (): void => setEdit(false);
//   // Create an event handler (onShow)
//   const onShow = (rowData: any): void => {
//     setRow(rowData);
//     setShow(true);
//   }
//   // Create an event handler (onClose)
//   const onClose = (): void => setShow(false);
//   // Create an event handler (onChange)
//   const onChange = (value: any): void => {
//     setRow(value);

//     let totalData: any[] = [];
//     const index: number = data.findIndex((item: any): boolean => item.uuid === value.uuid);
//     if (index >= 0) {
//       totalData = [...data.slice(0, index), value, ...data.slice(index + 1)];
//     } else {
//       totalData = [...data, value];
//     }
//     setData(totalData.map((item: any, index: number): any => { return {...item, key: index.toString()} }));
//   }

//   // Set a columns
//   const editedColumns: TableColumnProps<any>[] = [...columns, { dataIndex: 'edit', key: 'edit', title: 'edit', render: (data: any) => { console.log(data); return <TableEditCell edit={edit} onEdit={() => onShow(data)} onSave={onChange}></TableEditCell> } }];

//   // Return an element
//   return (
//     <StyledTableForm>
//       <StyledTableFormHeader>
//         <StyledTableTitle>{title}</StyledTableTitle>
//         <StyledTableTool>
//           { edit ? (
//             <>
//               <Button onClick={onShow}>추가하기</Button>
//               <Button onClick={onSave} type='primary'>저장하기</Button>
//             </>
//           ) : (
//             <Button onClick={onEdit}>수정하기</Button>
//           ) }
//         </StyledTableTool>
//       </StyledTableFormHeader>
//       <Table columns={editedColumns} dataSource={data} pagination={false} />
//       <EditableDrawer data={row} onChange={onChange} onClose={onClose} title={drawer.title} type={drawer.type} visible={show} />
//     </StyledTableForm>
//   );
// }

// Component (editable table form)
export const EditableTableForm = ({ dataSource, headers, title, expandKey, innerHeaders }: EditableTableProps): JSX.Element => {
  // Set a data source
  const editedDataSource: any[] = dataSource.map((item: any): any => { return { ...item, key: item.uuid } });

  // Set a local state (for edit mode)
  const [editRow, setEditRow] = useState<boolean>(false);
  const [editTable, setEditTable] = useState<boolean>(false);
  // Set a local state (for data)
  const [row, setRow] = useState<any>({});
  const [table, setTable] = useState<any[]>(editedDataSource);

  // Create an event handler (onEditRow)
  const onEditRow = (value: any): void => { setEditRow(true); setRow(value) }
  // Create an event handler (onEditTable)
  const onEditTable = (): void => setEditTable(true);
  // Create an event handler (onChangeRow)
  const onChangeRow = (column: string, display: string, value: any): void => {
    console.log('onChangeRow', column, display, value)
    if (display === 'item') {
      const newItem: any[] = value.map((item: string): TableProcessItemData => {
        // Find an index
        const index: number = processingItems.findIndex((elem: TableProcessItemData): boolean => elem.name === item);
        // Return
        return index >= 0 ? processingItems[index] : { intrinsic: false, name: item };
      });
      // Update a state for row
      setRow({ ...row, [column]: newItem });
    } else if (display === 'checkbox') {
      setRow({ ...row, [column]: value });
    } else {
      setRow({ ...row, [column]: value });
    }
  }
  // Create an event handler (onSave)
  const onSave = (): void => {
    // Find an index for selected row
    const index: number = table.findIndex((item: any): boolean => item.uuid === row.uuid);
    // Set a new table data
    const total: any[] = index >= 0 ? [...table.slice(0, index), row, ...table.slice(index + 1)] : [...table, row];
    // Update a state for table
    setTable(total.map((item: any, index: number): any => { return { ...item, key: index.toString() } }));
    // Change an edit mode
    setEditRow(false);
  }

  // Set the columns
  const createColumns = (_headers: any): TableColumnProps<any>[] => {
    return Object.keys(_headers).map((key: string): TableColumnProps<any> => {
      // Set a column
      const column: TableColumnProps<any> = { dataIndex: key, key: key, title: <TableHeader description={_headers[key].description} name={_headers[key].name} /> };
      // Set a render for column
      if (_headers[key].display === 'list') {
        column.render = (items: string[], record: any): JSX.Element => (editRow && row.uuid === record.uuid) ? <EditableSelect column={key} defaultOptions={row[key]} display={_headers[key].display} onChange={onChangeRow} totalOptions={[]} /> : <TableContentList items={items} />
      } else if (_headers[key].display === 'period') {
        column.render = (items: string[], record: any): JSX.Element => (editRow && row.uuid === record.uuid) ? <EditableSelect column={key} defaultOptions={row[key]} display={_headers[key].display} onChange={onChangeRow} totalOptions={[]} /> : <TableContentList items={items} />
      } else if (_headers[key].display === 'item') {
        column.render = (items: TableProcessItemData[], record: any): JSX.Element => (editRow && row.uuid === record.uuid) ? <EditableSelect column={key} defaultOptions={row[key].map((item: TableProcessItemData): string => item.name)} display={_headers[key].display} onChange={onChangeRow} totalOptions={[]} /> : <TableProcessItems items={items} tooltip='고유식별정보' />
      } else if (_headers[key].display === 'checkbox') {
        column.render = (check: boolean, record: any): JSX.Element => (editRow && row.uuid === record.uuid) ? <Checkbox checked={row[key]} onChange={(e) => onChangeRow(key, _headers[key].display, e.target.checked)} /> : <Checkbox checked={check} />
      } else {  // display type is 'string'
        column.render = (value: string): JSX.Element => (<>{value}</>);
      }
      // Return
      return column;
    });
  };
  const columns = createColumns(headers);
  // Add an edit column
  columns.push({ dataIndex: 'edit', key: 'edit', title: 'edit', render: (_: any, record: any) => { return <TableEditCell edit={editRow && record.uuid === row.uuid} onEdit={() => onEditRow(record)} onSave={() => onSave()}></TableEditCell> } });

  const CustomTable = expandKey ? <OuterTable columns={columns} dataSource={table} pagination={false}
    expandable={{
      expandedRowRender: (record: any, index: number) => {
        const dataSource = (editRow && row.uuid === record.uuid) ? [row] : [record];
        return <Table key={index} columns={createColumns(innerHeaders)} dataSource={dataSource} pagination={false} />
      },
      rowExpandable: (record: any) => (editRow && row.uuid === record.uuid) ? row[expandKey] : record[expandKey]
    }} /> : <Table columns={columns} dataSource={table} pagination={false} />;
  // Return an element
  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
          {editTable ? (
            <>
              {/* <Button onClick={onShow}>추가하기</Button> */}
              <Button onClick={onEditTable} type='primary'>저장하기</Button>
            </>
          ) : (
            <Button onClick={onEditTable}>수정하기</Button>
          )}
        </StyledTableTool>
      </StyledTableFormHeader>
      {CustomTable}
    </StyledTableForm>
  );
}
// Component (table form)
export const TableForm = ({ dataSource, headers, title }: TableProps): JSX.Element => {
  // Create the columns
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => { return { dataIndex: key, key: key, title: <TableHeader description={headers[key].description} name={headers[key].name} /> } });
  // Return an element
  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
        </StyledTableTool>
      </StyledTableFormHeader>
      <Table columns={columns} dataSource={dataSource} />
    </StyledTableForm>
  );
}
// Component (table header)
export const TableHeader = ({ description, name }: TableHeaderProps): JSX.Element => {
  return (
    <StyledTableHeader>
      <>{name}</>
      {description ? (
        <Popover content={description} trigger='click'>
          <StyledTableHeaderQuestionItem>
            <AiOutlineQuestionCircle />
          </StyledTableHeaderQuestionItem>
        </Popover>
      ) : (<></>)
      }
    </StyledTableHeader>
  );
}
// Component (table edit cell)
const TableEditCell = ({ edit, onEdit, onSave }: TableEditCellProps): JSX.Element => {
  return (
    <StyledTableEditCell>
      {edit ? <AiOutlineSave onClick={onSave} /> : <AiOutlineEdit onClick={onEdit} />}
      <AiOutlineDelete />
    </StyledTableEditCell>
  );
}
// Component (cell for list)
export const TableContentList = ({ items }: TableContentListProps): JSX.Element => {
  return (<StyledList>{items.map((key: string, index: number): JSX.Element => <StyledListItem key={index}>{key}</StyledListItem>)}</StyledList>);
}
// Component (cell for tags)
export const TableProcessItems = ({ items, tooltip }: TableProcessItemsProps): JSX.Element => {
  return (<>{items.map((item: TableProcessItemData, index: number): JSX.Element => (item.intrinsic ? <Tooltip key={index} title={tooltip}><Tag color='geekblue'>{item.name}</Tag></Tooltip> : <Tag color='default' key={index}>{item.name}</Tag>))}</>);
}