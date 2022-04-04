import { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
// Component
import { Button, Popover, TableColumnProps, Table, Tag, Tooltip, Checkbox, Popconfirm, Form } from 'antd';
import { EditableInput, SearchableInput } from './Input';
import { EditableSelectMulti, EditableSelectSingle } from './Select';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { AiOutlineDelete, AiOutlineDownload, AiOutlineEdit, AiOutlinePlus, AiOutlineQuestionCircle, AiOutlineSave } from 'react-icons/ai';
// State
import { updateEditLogSelector } from '../../models/state';
// Temporary
import { processingItems } from '../../models/temporary';
// Type
import { TableHeaderData, TableHeadersData, TableProcessItemData } from '../../models/type';
import { CustomizeComponent } from 'rc-table/lib/interface';
import { ColumnsType } from 'antd/lib/table';

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
  .ant-form-item {
    margin: 0;
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
interface BaseEditableTableProps extends TableProps {
  expandKey?: string;
  innerHeaders?: TableHeadersData;
}
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
      </StyledTableFormHeader>
      <Table columns={columns} dataSource={dataSource} />
    </StyledTableForm>
  );
}
// Component (Editable table)
export const EditableTable = ({ dataSource, headers, title }: TableProps): JSX.Element => {
  return (<BaseEditableTable dataSource={dataSource} headers={headers} title={title} />);
}
// Component (Editable expand table)
export const EditableExpandTable = ({ dataSource, expandKey, headers, innerHeaders, title }: ExpandTableProps): JSX.Element => {
  return (<BaseEditableTable dataSource={dataSource} expandKey={expandKey} headers={headers} innerHeaders={innerHeaders} title={title} />);
}
// [Internal] Component (Editable table)
const BaseEditableTable = ({ dataSource, expandKey, headers, innerHeaders, title }: BaseEditableTableProps): JSX.Element => {
  // Set a data source
  const editedDataSource: any[] = setDataSource(dataSource);

  // Get a form
  const [form] = Form.useForm();
  // Get a state (for log)
  const [_log, setLog] = useRecoilState(updateEditLogSelector);
  // Set a local state (for edit mode)
  const [editRow, setEditRow] = useState<boolean>(false);
  const [editTable, setEditTable] = useState<boolean>(false);
  // Set a local state (for data)
  const [row, setRow] = useState<any>({});
  const [table, setTable] = useState<any[]>(editedDataSource);

  // Create an event handler (onAdd)
  const onAdd = (): void => {
    // Set a new column
    const newRow: any = {uuid: 'newProject', key: 'newProject'};
    // Set a properties for column
    Object.keys(headers).map((key: string): any => headers[key].display === 'item' || headers[key].display === 'list' || headers[key].display === 'period' ? newRow[key] = [] : newRow[key] = '');
    // If not existance
    if (!table.some((project: any): boolean => project.uuid === newRow.uuid)) {
      // Add a column
      setTable([...table, newRow]);
      // Set a state (for row)
      setRow(newRow);
    }
    // Set a state
    setEditRow(true);
  }
  // Create an event handler (onEditRow)
  const onEditRow = async (value: any): Promise<void> => {
    // Validate the form values
    await form.validateFields();
    // Update the form values
    form.setFieldsValue(value);
    // Update a state
    setEditRow(true);
    setRow(value);
  }
  // Create an event handler (onEditTable)
  const onEditTable = (): void => setEditTable(true);
  // Create an event handler (onSaveTable)
  const onSaveTable = async (): Promise<void> => {
    // Validate the form values
    await form.validateFields();
    // Update a states
    setEditRow(false);
    setEditTable(false);
  }
  // Create an event handler (onChangeRow)
  const onChangeRow = (column: string, display: string, value: any): void => {
    let changedRow: any = {};
    if (display === 'item') {
      const items: any[] = value.map((item: string): TableProcessItemData => {
        // Find an index
        const index: number = processingItems.findIndex((elem: TableProcessItemData): boolean => elem.name === item);
        // Return
        return index >= 0 ? processingItems[index] : { intrinsic: false, name: item };
      });
      // Set a row
      changedRow = {...row, [column]: items}
    } else {
      changedRow = {...row, [column]: value}
    }
    // Update a state for row
    setRow(changedRow);
    // Set a form value
    form.setFieldsValue(changedRow);
    // Set a state (for log)
    if (changedRow.uuid === 'newProject') {
      setLog({ date: new Date(), type: 'table_name', row: changedRow.uuid, column: column, status: 'create' });
    } else {
      setLog({ date: new Date(), type: 'table_name', row: changedRow.uuid, column: column, status: 'edit' });
    }
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
  const onSaveRow = async (): Promise<void> => {
    try {
      // Validate a input or select
      await form.validateFields();
      // Find an index for selected row
      const index: number = table.findIndex((item: any): boolean => item.uuid === row.uuid);
      // Set a new table data
      const total: any[] = index >= 0 ? [...table.slice(0, index), row, ...table.slice(index + 1)] : [...table, row];
      // Update a state for table
      setTable(total.map((item: any, index: number): any => { return {...item, key: index.toString()} }));
      // Change an edit mode
      setEditRow(false);
    } catch (err: any) {
      console.error(`[ERROR] ${JSON.stringify(err)}`);
    }
  }

  // Set the columns
  const columns: any[] = createEditableTableColumns(editRow, editTable, headers, false, onChangeRow, onDelete, onEditRow, onSaveRow, row);
  // Create a table
  const tableElement: JSX.Element = expandKey ? (
    <OuterTable columns={columns} components={{ header: { row: (props: any) => renderHeader(props, columns) } }} dataSource={table} expandable={{
      expandedRowRender: (record: any, index: number) => innerHeaders ? (<Table key={index} columns={createEditableTableColumns(editRow, editTable, innerHeaders, true, onChangeRow, onDelete, onEditRow, onSaveRow, row)} dataSource={(editRow && row.uuid === record.uuid) ? [row] : [record]} pagination={false} />) : (<></>),
      rowExpandable: (record: any) => (editRow && row.uuid === record.uuid) ? row[expandKey] : record[expandKey]
    }} pagination={false} />
  ) : (<Table columns={columns} components={{ header: { row: (props: any) => renderHeader(props, columns) } }} dataSource={table} pagination={false} />);

  // Return an element
  return (
    <StyledTableForm edit={editTable}>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
          {editTable ? (
            <>
              <Button onClick={onAdd} type='default'>추가하기</Button>
              <Button onClick={onSaveTable} type='primary'>저장하기</Button>
            </>
          ) : (
            <Button onClick={onEditTable} type='default'>수정하기</Button>
          )}
        </StyledTableTool>
      </StyledTableFormHeader>
      <Form form={form}>{tableElement}</Form>
    </StyledTableForm>
  );
}
// Component (Searchable table)
export const SearchableTable = ({ dataSource, headers, title }: TableProps): JSX.Element => {
  // Set a data source
  const editedDataSource: any[] = setDataSource(dataSource);
  // Set a columns
  const columns: any[] = createSearchableTableColumnProps(headers);

  // Return an element
  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
          <SearchableInput content='' onSearch={() => {}} />
          <Button type='primary'><AiOutlinePlus /> 문서 만들기</Button>
        </StyledTableTool>
      </StyledTableFormHeader>
      <Table columns={columns} dataSource={editedDataSource} />
    </StyledTableForm>
  )
}
// [Internal] Component (Table header)
const TableHeader = ({ description, name }: TableHeaderProps): JSX.Element => {
  return (
    <StyledTableHeader>
      <>{name}</>
      {description ? (
        <Popover content={description} trigger='hover'>
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
      <Popconfirm title='해당 업무를 삭제하시겠습니까?' onConfirm={onDelete}>
        <AiOutlineDelete />
      </Popconfirm>
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
// [Internal] Component (cell for tools)
const TableToolCell = (): JSX.Element => {
  return (
    <StyledTableEditCell>
      <AiOutlineDownload />
      <AiOutlineEdit />
      <AiOutlineDownload />
      <AiOutlineDelete />
    </StyledTableEditCell>
  );
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
 * @param row selected row data
 * @returns created the columns
 */
const createEditableTableColumns = (editRow: boolean, editTable: boolean, headers: TableHeadersData, isInner: boolean, onChangeRow: (column: string, display: string, value: any) => void, onDelete: (value: any) => void, onEditRow: (value: any) => void, onSaveRow: () => void, row: any): any[] => {
  const columns: any[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a this header info
    const header: TableHeaderData = headers[key];
    // Set a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description);
    // Set a render for column
    if (header.display === 'list') {
      column.render = (items: string[], record: any): JSX.Element => {
        if (editRow && row.uuid === record.uuid) {
          if (header.required) {
            return (
              <Form.Item name={key} rules={[{ required: true }]}>
                <EditableSelectMulti defaultOptions={row[key]} onChange={(items: string[]): void => onChangeRow(key, header.display, items)} totalOptions={[]} />
              </Form.Item>
            );
          } else {
            return (<EditableSelectMulti defaultOptions={row[key]} onChange={(items: string[]): void => onChangeRow(key, header.display, items)} totalOptions={[]} />);
          }
        } else {
          return (<TableContentList items={items} />);
        }
      }
    } else if (header.display === 'period') {
      column.render = (items: string[], record: any): JSX.Element => {
        if (editRow && row.uuid === record.uuid) {
          if (header.required) {
            return (
              <Form.Item name={key} rules={[{ required: true }]}>
                <EditableSelectMulti defaultOptions={row[key]} onChange={(items: string[]): void => onChangeRow(key, header.display, items)} totalOptions={[]} />
              </Form.Item>
            );
          } else {
            return (<EditableSelectMulti defaultOptions={row[key]} onChange={(items: string[]): void => onChangeRow(key, header.display, items)} totalOptions={[]} />);
          }
        } else {
          return (<TableContentList items={items} />);
        }
      }
    } else if (header.display === 'item') {
      column.render = (items: TableProcessItemData[], record: any): JSX.Element => {
        if (editRow && row.uuid === record.uuid) {
          // Set a compare the items
          let compareItems: TableProcessItemData[] = [];
          if (key === 'essentialItems') {
            compareItems = row['selectionItems'];
          } else if (key === 'selectionItems') {
            compareItems = row['essentialItems'];
          }
          // Set a render for select box
          if (header.required) {
            return (
              <Form.Item name={key} rules={[{ required: true }]}>
                <EditableSelectMulti compareOptions={compareItems.map((item: TableProcessItemData): string => item.name)} defaultOptions={row[key].map((item: TableProcessItemData): string => item.name)} onChange={(items: string[]): void => onChangeRow(key, header.display, items)} totalOptions={['이름', '아이디', '비밀번호', '이메일주소', '실주소', '휴대전화번호', '생년월일', 'aa', 'bb']} />
              </Form.Item>
            );
          } else {
            return (<EditableSelectMulti compareOptions={compareItems.map((item: TableProcessItemData): string => item.name)} defaultOptions={row[key].map((item: TableProcessItemData): string => item.name)} onChange={(items: string[]): void => onChangeRow(key, header.display, items)} totalOptions={['이름', '아이디', '비밀번호', '이메일주소', '실주소', '휴대전화번호', '생년월일', 'aa', 'bb']} />);
          }
        } else {
          return (<TableProcessItems items={items} tooltip='고유식별정보' />);
        }
      }
    } else if (header.display === 'checkbox') {
      column.render = (check: boolean, record: any): JSX.Element => {
        if (editRow && row.uuid === record.uuid) {
          if (header.required) {
            return (
              <Form.Item name={key} rules={[{ required: true }]}>
                <Checkbox checked={row[key]} onChange={(e: any) => onChangeRow(key, header.display, e.target.checked)} />
              </Form.Item>
            );
          } else {
            return (<Checkbox checked={row[key]} onChange={(e: any) => onChangeRow(key, header.display, e.target.checked)} />);
          }
        } else {
          return (<Checkbox checked={check} disabled />);
        }
      }
    } else if (header.display === 'select') {
      column.render = (value: string, record: any): JSX.Element => {
        if (editRow && row.uuid === record.uuid) {
          if (header.required) {
            return (
              <Form.Item name={key} rules={[{ required: true }]}>
                <EditableSelectSingle defaultOptions={[row[key]]} onChange={(value: string): void => onChangeRow(key, header.display, value)} totalOptions={[]} />
              </Form.Item>
            );
          } else {
            return (<EditableSelectSingle defaultOptions={[row[key]]} onChange={(value: string): void => onChangeRow(key, header.display, value)} totalOptions={[]} />);
          }
        } else {
          return (<>{value}</>);
        }
      }
    } else {  // display type is 'string'
      column.render = (value: string, record: any): JSX.Element => {
        if (editRow && row.uuid === record.uuid) {
          if (header.required) {
            return (
              <Form.Item name={key} rules={[{ required: true }]}>
                <EditableInput content={row[key]} onChange={(value: string): void => onChangeRow(key, header.display, value)} />
              </Form.Item>
            );
          } else {
            return (<EditableInput content={row[key]} onChange={(value: string): void => onChangeRow(key, header.display, value)} />);
          }
        } else {
          return (<>{value}</>);
        }
      }
    }
    // Return
    return column;
  });
  // Add an edit column
  if (!isInner) {
    columns.push({ className: 'edit', dataIndex: 'edit', key: 'edit', title: 'edit', visible: editTable, render: (_: any, record: any) => (<TableEditCell edit={editRow && row.uuid === record.uuid} onDelete={() => onDelete(record)} onEdit={() => onEditRow(record)} onSave={onSaveRow}></TableEditCell>) });
  }
  // Return
  return columns;
}
const createSearchableTableColumnProps = (headers: any): any[] => {
  const columns: any[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a this header info
    const header: TableHeaderData = headers[key];
    // Set a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description);
    // Set a render for column
    if (header.display === 'tag') {
      column.render = (item: string): JSX.Element => {
        // Set a tag color and content
        let content: string = '';
        let color: string = 'geekblue';
        switch (item) {
          case 'complete':
            content = '게재완료';
            color = 'green';
            break;
          default:
            content = '임시저장'
            color = 'geekblue';
            break;
        }
        // Return
        return <Tag color={color}>{content}</Tag>
      }
    }
    // Return
    return column;
  });
  // Add a tools columns
  columns.push({ className: 'tools', dataIndex: 'tools', key: 'tools', title: '', render: (_: any, record: any) => (<TableToolCell />) });
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
  const customColumns: CustomizeComponent|undefined[] = columns.map((item: any): any => item.visible ? props.children.find((elem: any): boolean => item.key === elem.key) : undefined);
  // Find a table key row
  const index: number = props.children.findIndex((item: any): boolean => item.key === 'RC_TABLE_KEY');
  if (index >= 0) {
    customColumns.unshift(props.children[index]);
  }
  // Return
  return customColumns;
}