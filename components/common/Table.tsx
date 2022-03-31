import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
// Component
import { Button, Popover, TableColumnProps, Table, Tag, Tooltip, Checkbox } from 'antd';
import { EditableInput } from './Input';
import { EditableSelectMulti, EditableSelectSingle } from './Select';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle, AiOutlineSave } from 'react-icons/ai';
// State
import { updateEditLogSelector } from '../../models/state';
// Temporary
import { processingItems } from '../../models/temporary';
// Type
import { TableHeadersData, TableProcessItemData } from '../../models/type';
import { CustomizeComponent } from 'rc-table/lib/interface';

// Styled element (OuterTable)
const OuterTable = styled(Table)`
  border-collapse: collapse;
  .ant-table-expanded-row > td {
    border-bottom: 1px solid #acacac;
  }
`;
// Styled element (TableForm)
const StyledTableForm = styled.div<{edit?: boolean}>`
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
  .ant-table-content > table > tbody > tr > .edit {
    ${(props: any) => !props.edit && css`
      display: none;
    `}
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
interface ExpandTableProps extends TableProps {
  expandKey: string;
  innerHeaders: TableHeadersData;
}
interface TableContentListProps {
  items: string[];
}
interface TableEditCellProps {
  edit: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onSave: () => void;
}
interface TableHeaderProps {
  description?: string;
  name: string;
}
interface TableProcessItemsProps {
  items: TableProcessItemData[];
  tooltip: string;
}
interface TableProps {
  dataSource: any[];
  headers: TableHeadersData;
  title: string;
}
/** Interface (Data type) */

// Component (Basic table - readable)
export const BasicTable = ({ dataSource, headers, title }: TableProps): JSX.Element => {
  // Create the columns
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => createTableColumnProps(key, headers[key].name, headers[key].description));
  // Return an element
  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool></StyledTableTool>
      </StyledTableFormHeader>
      <Table columns={columns} dataSource={dataSource} />
    </StyledTableForm>
  );
}
// Component (Editable table)
export const EditableTable = ({ dataSource, headers, title }: TableProps): JSX.Element => {
  // Set a data source
  const editedDataSource: any[] = setDataSource(dataSource);

  // Get a state (for log)
  const [_log, setLog] = useRecoilState(updateEditLogSelector);
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
  // Create an event handler (onSaveTable)
  const onSaveTable = (): void => { setEditRow(false); setEditTable(false) }
  // Create an event handler (onChangeRow)
  const onChangeRow = (column: string, display: string, value: any): void => {
    if (display === 'item') {
      const newItem: any[] = value.map((item: string): TableProcessItemData => {
        // Find an index
        const index: number = processingItems.findIndex((elem: TableProcessItemData): boolean => elem.name === item);
        // Return
        return index >= 0 ? processingItems[index] : { intrinsic: false, name: item };
      });
      // Update a state for row
      setRow({...row, [column]: newItem});
    } else {
      setRow({...row, [column]: value});
    }
    // Set a state (for log)
    setLog({ date: new Date(), type: 'table_name', row: row.uuid, column: column, status: 'edit' });
  }
  // Create an event handler (onDelete)
  const onDelete = (value: any): void => {
    // Find an index for selected row
    const index: number = table.findIndex((item: any): boolean => item.uuid === value.uuid);
    // Set a new table data
    const total: any[] = [...table.slice(0, index), ...table.slice(index + 1)];
    // Update a state for table
    setTable(total.map((item: any, index: number): any => { return {...item, key: index.toString()} }));
    // Set a state (for log)
    setLog({ date: new Date(), type: 'table_name', row: value.uuid, status: 'delete' });
  }
  // Create an event handler (onSaveRow)
  const onSaveRow = (): void => {
    // Find an index for selected row
    const index: number = table.findIndex((item: any): boolean => item.uuid === row.uuid);
    // Set a new table data
    const total: any[] = index >= 0 ? [...table.slice(0, index), row, ...table.slice(index + 1)] : [...table, row];
    // Update a state for table
    setTable(total.map((item: any, index: number): any => { return {...item, key: index.toString()} }));
    // Change an edit mode
    setEditRow(false);
  }

  // Set the columns
  const columns: any[] = createEditableTableColumns(editRow, editTable, headers, false, onChangeRow, onDelete, onEditRow, onSaveRow, row);

  // Return an element
  return (
    <StyledTableForm edit={editTable}>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
          {editTable ? (
            <>
              <Button onClick={onSaveTable} type='primary'>저장하기</Button>
            </>
          ) : (
            <Button onClick={onEditTable} type='default'>수정하기</Button>
          )}
        </StyledTableTool>
      </StyledTableFormHeader>
      <Table columns={columns} components={{ header: { row: (props: any) => renderHeader(props, columns) } }} dataSource={table} pagination={false} />
    </StyledTableForm>
  );
}
// Component (Editable expand table)
export const EditableExpandTable = ({ dataSource, expandKey, headers, innerHeaders, title }: ExpandTableProps): JSX.Element => {
  // Set a data source
  const editedDataSource: any[] = setDataSource(dataSource);

  // Get a state (for log)
  const [_log, setLog] = useRecoilState(updateEditLogSelector);
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
  // Create an event handler (onSaveTable)
  const onSaveTable = (): void => { setEditRow(false); setEditTable(false) }
  // Create an event handler (onChangeRow)
  const onChangeRow = (column: string, display: string, value: any): void => {
    if (display === 'item') {
      const newItem: any[] = value.map((item: string): TableProcessItemData => {
        // Find an index
        const index: number = processingItems.findIndex((elem: TableProcessItemData): boolean => elem.name === item);
        // Return
        return index >= 0 ? processingItems[index] : { intrinsic: false, name: item };
      });
      // Update a state for row
      setRow({...row, [column]: newItem});
    } else if (display === 'checkbox') {
      setRow({...row, [column]: value});
    } else {
      setRow({...row, [column]: value});
    }
    // Set a state (for log)
    setLog({ date: new Date(), type: 'table_name', row: row.uuid, column: column, status: 'edit' });
  }
  // Create an event handler (onDelete)
  const onDelete = (value: any): void => {
    // Find an index for selected row
    const index: number = table.findIndex((item: any): boolean => item.uuid === value.uuid);
    // Set a new table data
    const total: any[] = [...table.slice(0, index), ...table.slice(index + 1)];
    // Update a state for table
    setTable(total.map((item: any, index: number): any => { return {...item, key: index.toString()} }));
    // Set a state (for log)
    setLog({ date: new Date(), type: 'table_name', row: value.uuid, status: 'delete' });
  }
  // Create an event handler (onSaveRow)
  const onSaveRow = (): void => {
    // Find an index for selected row
    const index: number = table.findIndex((item: any): boolean => item.uuid === row.uuid);
    // Set a new table data
    const total: any[] = index >= 0 ? [...table.slice(0, index), row, ...table.slice(index + 1)] : [...table, row];
    // Update a state for table
    setTable(total.map((item: any, index: number): any => { return {...item, key: index.toString()} }));
    // Change an edit mode
    setEditRow(false);
  }

  // Set the columns
  const columns: any[] = createEditableTableColumns(editRow, editTable, headers, false, onChangeRow, onDelete, onEditRow, onSaveRow, row);
  const innerColumns: any[] = createEditableTableColumns(editRow, editTable, innerHeaders, true, onChangeRow, onDelete, onEditRow, onSaveRow, row);
  // // Expanded row render handler
  const expandedRowRender = (record: any, index: number) => (<Table key={index} columns={innerColumns} dataSource={(editRow && row.uuid === record.uuid) ? [row] : [record]} pagination={false} />);
  // // Row expandable handler
  const rowExpandable = (record: any) => (editRow && row.uuid === record.uuid) ? row[expandKey] : record[expandKey];

  // Return an element
  return (
    <StyledTableForm edit={editTable}>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
          {editTable ? (
            <>
              <Button onClick={onSaveTable} type='primary'>저장하기</Button>
            </>
          ) : (
            <Button onClick={onEditTable} type='default'>수정하기</Button>
          )}
        </StyledTableTool>
      </StyledTableFormHeader>
      <OuterTable columns={columns} components={{ header: { row: (props: any) => renderHeader(props, columns) } }} dataSource={table} expandable={{ expandedRowRender, rowExpandable }} pagination={false} />
    </StyledTableForm>
  );
}
// [Internal] Component (Table header)
const TableHeader = ({ description, name }: TableHeaderProps): JSX.Element => {
  return (
    <StyledTableHeader>
      <>{name}</>
      {description ? (
        <Popover content={description} trigger='click'>
          <StyledTableHeaderQuestionItem>
            <AiOutlineQuestionCircle />
          </StyledTableHeaderQuestionItem>
        </Popover>
      ): (<></>)}
    </StyledTableHeader>
  );
}
// [Internal] Component (Table edit cell)
const TableEditCell = ({ edit, onDelete, onEdit, onSave }: TableEditCellProps): JSX.Element => {
  return (
    <StyledTableEditCell>
      { edit ? <AiOutlineSave onClick={onSave} /> : <AiOutlineEdit onClick={onEdit} />}
      <AiOutlineDelete onClick={onDelete} />
    </StyledTableEditCell>
  )
}
// [Internal] Component (cell for list)
const TableContentList = ({ items }: TableContentListProps): JSX.Element => {
  return (<StyledList>{items.map((key: string, index: number): JSX.Element => <StyledListItem key={index}>{key}</StyledListItem>)}</StyledList>);
}
// [Internal] Component (cell for tags)
const TableProcessItems = ({ items, tooltip }: TableProcessItemsProps): JSX.Element => {
  return (<>{items.map((item: TableProcessItemData, index: number): JSX.Element => (item.intrinsic ? <Tooltip key={index} title={tooltip}><Tag color='geekblue'>{item.name}</Tag></Tooltip> : <Tag color='default' key={index}>{item.name}</Tag>))}</>);
}

/**
 * [Internal function] Create the editable table columns
 * @param editRow row edit status
 * @param editTable table edit status
 * @param headers headers
 * @param onChangeRow event handler for change row
 * @param onDelete event handler for delete row
 * @param onEditRow event handler for edit row status
 * @param onSaveRow event handler for save row
 * @param row row data
 * @returns created the columns
 */
const createEditableTableColumns = (editRow: boolean, editTable: boolean, headers: TableHeadersData, isInner: boolean, onChangeRow: (column: string, display: string, value: any) => void, onDelete: (value: any) => void, onEditRow: (value: any) => void, onSaveRow: () => void, row: any): any[] => {
  const columns: any[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Set a column
    const column: TableColumnProps<any> = createTableColumnProps(key, headers[key].name, headers[key].description);
    // Set a render for column
    if (headers[key].display === 'list') {
      column.render = (items: string[], record: any): JSX.Element => (editRow && row.uuid === record.uuid) ? <EditableSelectMulti defaultOptions={row[key]} onChange={(items: string[]): void => onChangeRow(key, headers[key].display, items)} totalOptions={[]} /> : <TableContentList items={items} />
    } else if (headers[key].display === 'period') {
      column.render = (items: string[], record: any): JSX.Element => (editRow && row.uuid === record.uuid) ? <EditableSelectMulti defaultOptions={row[key]} onChange={(items: string[]): void => onChangeRow(key, headers[key].display, items)} totalOptions={[]} /> : <TableContentList items={items} />
    } else if (headers[key].display === 'item') {
      column.render = (items: TableProcessItemData[], record: any): JSX.Element => (editRow && row.uuid === record.uuid) ? <EditableSelectMulti defaultOptions={row[key].map((item: TableProcessItemData): string => item.name)} onChange={(items: string[]): void => onChangeRow(key, headers[key].display, items)} totalOptions={['이름', '아이디', '비밀번호', '이메일주소', '실주소', 'aa', 'bb']} /> : <TableProcessItems items={items} tooltip='고유식별정보' />
    } else if (headers[key].display === 'checkbox') {
      column.render = (check: boolean, record: any): JSX.Element => (editRow && row.uuid === record.uuid) ? <Checkbox checked={row[key]} onChange={(e: any) => onChangeRow(key, headers[key].display, e.target.checked)} /> : <Checkbox checked={check} disabled />
    } else {  // display type is 'string'
      column.render = (value: string, record: any): JSX.Element => (editRow && row.uuid === record.uuid) ? <EditableInput onChange={(value: string): void => onChangeRow(key, headers[key].display, value)} value={row[key]} /> : (<>{value}</>);
    }
    // Return
    return column;
  });
  // Add an edit column
  if (!isInner) {
    columns.push({ className: 'edit', dataIndex: 'edit', key: 'edit', title: 'edit', visible: editTable, render: (_: any, record: any) => (<TableEditCell edit={editRow && record.uuid === row.uuid} onDelete={() => onDelete(record)} onEdit={() => onEditRow(record)} onSave={onSaveRow}></TableEditCell>) });
  }
  // Return
  return columns;
}
/**
 * [Internal function] Create a table column(= header) property
 * @param key unique key
 * @param name header name
 * @param description header description
 * @returns created columns
 */
const createTableColumnProps = (key: string, name: string, description?: string): any => {
  return { dataIndex: key, key: key, title: <TableHeader description={description} name={name} />, visible: true };
}
/**
 * [Internal function] Set a data source 
 * @param dataSource raw data source
 * @returns data source
 */
const setDataSource = (dataSource: any): any[] => {
  return dataSource.map((item: any): any => { return {...item, key: item.uuid} });
}
/**
 * [Internal function] Render a table header
 * @param props properties
 * @param columns columns
 * @returns rendered table header
 */
const renderHeader = (props: any, columns: TableColumnProps<any>[]): JSX.Element => {
  return (<tr>{extractVisibleColumns(props, columns)}</tr>);
}
/**
 * [Internal function] Render a table body (Deprecated)
 * @param props properties
 * @param columns columns
 * @returns rendered table body
 */
// const renderBody = (props: any, columns: TableColumnProps<any>[]): JSX.Element => {
//   return (<tr className={props.className}>{extractVisibleColumns(props, columns)}</tr>)
// }
/**
 * [Internal function] Extract a visible chilren for columns
 * @param props properties
 * @param columns columns
 * @returns extracted a column children
 */
const extractVisibleColumns = (props: any, columns: TableColumnProps<any>[]): CustomizeComponent|undefined[] => {
  // Extract the columns
  const customColumns: CustomizeComponent|undefined[] = columns.map((item: any, index: number): any => item.visible ? props.children.find((elem: any): boolean => item.key === elem.key) : undefined);
  // Find a table key row
  const index: number = props.children.findIndex((item: any): boolean => item.key === 'RC_TABLE_KEY');
  if (index >= 0) {
    customColumns.unshift(props.children[index]);
  }
  // Return
  return customColumns;
}