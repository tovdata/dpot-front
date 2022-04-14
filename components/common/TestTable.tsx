import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
// Component
import { Popover, TableColumnProps, Table, Tag, Tooltip, Checkbox, Popconfirm, Input, Space, Typography, Button } from 'antd';
import { AddableSelect, AddableTagSelect, SingleSelect, TagSelect, IFTTTSelect } from './Select';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle, AiOutlineSave } from 'react-icons/ai';
import { IoAddCircle } from 'react-icons/io5';
import { AiOutlineDownload, AiOutlineExport } from 'react-icons/ai';
// Module
import { createWarningMessage, createSimpleWarningNotification } from './Notification';
// State
import { UpdatePersonalInfoSelector } from '../../models/state';
// Temporary
import { personalInfo, processingItems } from '../../models/temporary';
// Type
import { ProcessingItemDF, SelectOptionsByColumn, TableHeaderData, TableHeadersData } from '../../models/type';
import { LinkOutlined } from '@ant-design/icons';
import { personalInfoTableHeader } from '../../models/data';

// Styled element (OuterTable)
const OuterTable = styled(Table)`
  border-collapse: collapse;
  .ant-table-expanded-row > td {
    border-bottom: 1px solid #acacac;
  }
`;
const EmptyTable = styled(Table)`
  .ant-table-placeholder{
    display: none;
  }
`
// Styled element (TableForm)
export const StyledTableForm = styled.div`
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
  table > tbody > tr > td .ant-tag {
    margin: 0;
  }
  .ant-table > .ant-table-footer {
    background-color: #ffffff;
    border: 1px dashed #D9D9D9;
    padding-bottom: 8px;
    padding-top: 8px;
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
// Styled element (TableFormHeader contain URL)
const StyledURLTableFormHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.75rem;
  user-select: none;
`;
// Styled element (TableTitle)
const StyledTableTitle = styled.h2`
  font-size: ${FS_HXXS};
  font-weight: 600;
  line-height: ${LH_HXXS};
`;

// Styled element (TableTools)
const StyledTableTools = styled.div``;
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
// Styled element (TableToolCellItem)
const StyledTableToolCellItem = styled.span`
  cursor: pointer;
  font-size: 1rem;
  margin-right: 0.5rem;
  &:last-child {
    margin-right: 0;
  }
`;
// Styled element (List)
const StyledList = styled.ul`
  margin: 0;
  padding-left: 1.125rem;
`;
const StyledListItem = styled.li``;
// Styled element (Table footer)
const StyledTableFooter = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  svg {
    margin-right: 0.625rem;
  }
`;
// Styled element (Empty table footer)
const StyledEmptyTableFooter = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  .message{
    color:#BFBFBF;
    font-weight: bold;
    margin: 1rem 0;
  }
  button{
    border-color: #096DD9;
    color:#096DD9;
    font-weight: bold;
  }
`;
const URLButton = styled(Button)`
  margin-left: 1rem;
  font-weight: 400;
`;
/** [Interface] Properties for document table */
interface DocumentTableProps extends TableProps {
  onDelete: (index: number) => void;
}
/** [Interface] Properties for editable table */
interface EditableTableProps extends TableProps {
  defaultSelectOptions?: any;
  expandKey?: string;
  innerHeaders?: TableHeadersData;
  onAdd: (record: any) => void;
  onDelete: (index: number) => void;
  onSave: (index: number, value: any) => boolean;
  tableName: string;
  emptyText?: string;
}
/** [Internal] Properties for table form */
interface EditableTableFormProps extends EditableTableProps {
  title: string;
}
/** [Interface] Properties for table */
interface TableProps {
  dataSource: any[];
  pagination?: boolean;
  headers: TableHeadersData;
}
/** [Interface] Properties for table form */
interface TableFormHeaderProps {
  title: string;
  tools?: JSX.Element | JSX.Element[];
}
/** [Interface] Properties for table header */
interface TableHeaderProps {
  description?: string;
  name: string;
}
/** [Interface] Properties for table footer contain add button */
interface TableFooterContainAddButtonProps {
  onClick: () => void;
}
/** [Interface] Properties for table footer contain add button */
interface EmptyTableFooterProps {
  text: string,
  onClick: () => void;
}
/** [Interface] Properties for table content for item  */
interface TableContentForItemProps {
  items: ProcessingItemDF[];
  tooltip: string;
}
/** [Internal] Properties for table content for list */
interface TableContentForListProps {
  items: string[];
}
/** [Interface] Properties for table edit cell */
interface TableEditCellProps {
  edit: boolean;
  onDelete: () => void;
  onEdit: () => void;
  onSave: () => void;
}

/** 
 * [Component] Basic table (only read)
 */
export const BasicTable = ({ dataSource, headers, pagination }: TableProps): JSX.Element => {
  // Create the columns
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => createTableColumnProps(key, headers[key].name, headers[key].description));
  // Return an element
  return (<Table columns={columns} dataSource={dataSource} pagination={pagination ? undefined : false} />);
}
export const DocumentTable = ({ dataSource, headers, onDelete, pagination }: DocumentTableProps): JSX.Element => {
  // Create the columns
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a header
    const header: TableHeaderData = headers[key];
    // Create a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description);
    // Set a render
    column.render = (item: any, _record: any, _index: number) => {
      if (header.display === 'status') {
        return item === 'processing' ? <Tag color='geekblue'>임시저장</Tag> : item === 'fail' ? <Tag color='red'>작성실패</Tag> : <Tag color='green'>게재완료</Tag>;
      } else {
        return item;
      }
    }
    // Return
    return column;
  });
  // Add a tool cell
  columns.push({
    dataIndex: 'tools',
    key: 'tools',
    render: (_item: any, record: any) => (
      <>
        <StyledTableToolCellItem>
          <AiOutlineExport />
        </StyledTableToolCellItem>
        <StyledTableToolCellItem>
          <AiOutlineEdit />
        </StyledTableToolCellItem>
        <StyledTableToolCellItem>
          <AiOutlineDownload />
        </StyledTableToolCellItem>
        <StyledTableToolCellItem>
          <Popconfirm title='해당 문서를 삭제하시겠습니까?' onConfirm={() => onDelete(record)}>
            <AiOutlineDelete />
          </Popconfirm>
        </StyledTableToolCellItem>
      </>
    )
  });

  // Return an element
  return (
    <Table columns={columns} dataSource={dataSource} pagination={pagination ? undefined : false} />
  );
}
/**
 * [Component] Editable table
 */
export const EditableTable = ({ dataSource, defaultSelectOptions, expandKey, headers, innerHeaders, onAdd, onDelete, onSave, pagination, tableName, emptyText = '추가하기' }: EditableTableProps): JSX.Element => {
  // Set a default focus and default record for columns in row
  const defaultFocusState: any = {};
  const defaultRecord: any = {};
  // Extract a focus state and record by header key
  Object.keys(headers).forEach((key: string): void => {
    defaultFocusState[key] = false;
    const type: string = headers[key].display;
    defaultRecord[key] = type === 'checkbox' ? false : (type === 'item' || type === 'itemA' || type === 'list' || type === 'period' || type === 'purpose') ? [] : '';
  });
  // Extract a focus state by inner header key
  if (innerHeaders) {
    Object.keys(innerHeaders).forEach((key: string): void => {
      defaultFocusState[key] = false;
      const type: string = innerHeaders[key].display;
      defaultRecord[key] = type === 'checkbox' ? false : (type === 'item' || type === 'itemA' || type === 'list' || type === 'period' || type === 'purpose') ? [] : '';
    });
  }

  // Set a ref
  const newProjectCnt: MutableRefObject<number> = useRef(0);
  // Set a local state
  const [row, setRow] = useState<any>({});
  const [focus, setFocus] = useState<any>(defaultFocusState);
  const [selectOptions, setSelectOptions] = useState<SelectOptionsByColumn>(extractSelectOptionsByColumn(dataSource, defaultSelectOptions, headers));
  // Get a state (for personal info)
  let ref: any;
  switch (tableName) {
    case 'falseNameInfo':
      ref = useRecoilValue(UpdatePersonalInfoSelector);
      break;
    default:
      ref = null;
      break;
  }

  /**
   * [Event Handler] Create a row
   */
  const onCreate = (): void => {
    // Set a key
    const key: string = `npc_${newProjectCnt.current++}`;
    // Create a new row
    const record: any = { ...defaultRecord, uuid: key, key: key };

    // Check a editing status
    if (row.uuid !== undefined) {
      createSimpleWarningNotification('현재 수정 중인 데이터를 저장하고 진행해주세요.');
    } else {
      // Add a row
      onAdd(record);
      // Update a state
      setRow(record);
    }
  }
  /**
   * [Event Handler] Change a row
   * @param key column key
   * @param item column value
   * @param required required
   * @param type column type
   */
  const onChange = (key: string, item: string[] | string, required: boolean, type?: string): void => {
    if (type && type === 'item') {
      const newItem: ProcessingItemDF[] = (item as string[]).map((value: string): ProcessingItemDF => {
        // Find
        const index: number = processingItems.findIndex((elem: ProcessingItemDF): boolean => elem.name === value);
        // Return
        return index === -1 ? { intrinsic: false, name: value } : processingItems[index];
      });
      // Set a row
      setRow({ ...row, [key]: newItem });
    } else {

      switch (tableName) {
        case 'personalProvision':
          break;
        default:
          // Set a row
          setRow({ ...row, [key]: item });
          break;
      }
      // Check a required
      setFocus({ ...focus, [key]: checkRequired(headers[key].name, item, required) });
    }
    // Update the select options
    setSelectOptionsByColumn((value: any) => setSelectOptions(value), ref, selectOptions, { [key]: item }, tableName, key);
  }
  /**
   * [Event Handler] Set a edit state
   * @param record selected row
   */
  const onEdit = (record: any): void => {
    clearFocus();
    (row.uuid && record.uuid && row.uuid !== record.uuid) ? createSimpleWarningNotification('현재 수정 중인 데이터를 저장하고 진행해주세요.') : setRow(record);
    // Update the select options
    setSelectOptionsByColumn((value: any) => setSelectOptions(value), ref, selectOptions, { subject: record.subject }, tableName);
  }

  /**
   * UseEffect
   */
  useEffect(() => setSelectOptions(extractSelectOptionsByColumn(dataSource, defaultSelectOptions, headers)), [dataSource]);

  /**
   * [Inner Function] Check a required for column in row (using state)
   * @returns check result
   */
  const checkRequiredForRow = (): boolean => {
    const state: any = {};
    // Check a required
    const result: boolean[] = Object.keys(headers).map((key: string): boolean => {
      const warning: boolean = checkRequired(headers[key].name, row[key], headers[key].required);
      // Set a local state
      state[key] = warning;
      // Return
      return warning;
    });
    // Set a state
    setFocus(state);
    // Return
    return !result.includes(true);
  }
  /**
   * [Inner Function] Check a required for column
   * @param columnName column key
   * @param item column value
   * @param required required
   * @returns check result
   */
  const checkRequired = (columnName: string, item: string[] | string, required: boolean): boolean => {
    // Check a warning
    const warning: boolean = required && ((typeof item === 'string' && item === '') || (Array.isArray(item) && item.length === 0));
    // Alert a message
    if (warning) {
      createWarningMessage(`해당 필드(${columnName})는 필수로 입력해야 합니다.`, 1.6, columnName);
    }
    // Return
    return warning;
  }
  /**
   * [Inner Function] Clear a state for focus
   */
  const clearFocus = (): void => {
    setFocus(defaultFocusState);
  }
  /**
   * [Inner Function] Create the columns
   * @param headers header data
   * @returns created columns
   */
  const createColumns = (headers: TableHeadersData, isMainHeader: boolean): TableColumnProps<any>[] => {
    // Set a columns
    const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
      // Extract a header data
      const header: TableHeaderData = headers[key];
      // Create a column
      const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description);
      // Set a render for column
      column.render = (item: any, record: any, index: number): JSX.Element => {
        switch (header.display) {
          case 'checkbox':
            if (row.uuid === record.uuid) {
              return (<Checkbox checked={row[key]} onChange={(e: any): void => onChange(key, e.target.checked, header.required)} />);
            } else {
              return (<Checkbox checked={item} disabled />);
            }
          case 'item':
            if (row.uuid === record.uuid) {
              return (<TagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required, 'item')} options={selectOptions[key] ? selectOptions[key] : []} value={row[key].map((elem: ProcessingItemDF): string => elem.name)} />);
            } else {
              return item.length > 0 ? (<TableContentForTags items={item} key={index} tooltip='고유식별정보' />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
            }
          case 'itemA':
            if (row.uuid === record.uuid) {
              // Extract a options
              const options: string[] = (key === 'essentialItems' || key === 'selectionItems') ? selectOptions['items'].filter((item: string): boolean => {
                const standard: string = key === 'essentialItems' ? 'selectionItems' : 'essentialItems';
                return !row[standard].some((elem: ProcessingItemDF): boolean => elem.name === item);
              }) : selectOptions[key] ? selectOptions[key] : [];
              // Return an element
              return (<AddableTagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required, 'item')} options={options} value={row[key].map((elem: ProcessingItemDF): string => elem.name)} />);
            } else {
              return item.length > 0 ? (<TableContentForTags items={item} key={index} tooltip='고유식별정보' />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
            }
          case 'list':
            if (row.uuid === record.uuid) {
              return (<AddableTagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required)} options={selectOptions[key] ? selectOptions[key] : []} value={row[key]} />);
            } else {
              return (<TableContentForList items={item} key={index} />);
            }
          case 'period':
            if (row.uuid === record.uuid) {
              return (
                <>
                  <Space size={[6, 6]} style={{ marginBottom: '10px' }} wrap>
                    {row[key].map((elem: string, index: number): JSX.Element => (<Tag closable key={index} onClose={(e: any): void => { e.preventDefault(); onChange(key, row[key].length - 1 === index ? [...row[key].slice(0, index)] : [...row[key].slice(0, index), ...row[key].slice(index + 1)], header.required) }}>{elem}</Tag>))}
                  </Space>
                  <IFTTTSelect onAdd={(value: string): void => { row[key].some((item: string): boolean => item === value) ? createWarningMessage('동일한 기간이 존재합니다!', 1.6) : onChange(key, [...row[key], value], header.required) }} status={focus[key]} />
                </>
              );
            } else {
              return (<TableContentForList items={item} key={index} />);
            }
          case 'select':
            if (row.uuid === record.uuid) {
              return (<SingleSelect error={focus[key]} onChange={(item: string | string[]): void => onChange(key, item, header.required)} options={selectOptions[key] ? selectOptions[key] : []} value={row[key]} />);
            } else {
              return (<>{item}</>);
            }
          case 'selectA':
            if (row.uuid === record.uuid) {
              return (<AddableSelect error={focus[key]} onChange={(item: string | string[]): void => onChange(key, item, header.required)} options={selectOptions[key] ? selectOptions[key] : []} value={row[key]} />);
            } else {
              return (<>{item}</>);
            }
          default:
            if (row.uuid === record.uuid) {
              return (<Input key={index} onChange={(e: any): void => onChange(key, e.target.value, header.required)} value={row[key]} status={focus[key] ? 'error' : undefined} />);
            } else {
              return (<>{item}</>);
            }
        }
      }
      // Return
      return column;
    });
    // Add a column for delete
    if (isMainHeader) {
      columns.push({
        dataIndex: 'edit',
        key: 'edit',
        title: '',
        render: (_: any, record: any, index: number): JSX.Element => (<TableEditCell edit={row.uuid === record.uuid} key={index} onDelete={() => { clearFocus(); onDelete(index); onEdit({}) }} onEdit={() => onEdit(record)} onSave={() => { checkRequiredForRow() ? onSave(index, row) ? onEdit({}) : undefined : undefined }} />)
      });
    }
    // Return
    return columns;
  }

  // Set a footer (add an add button)
  const footer = (): JSX.Element => (<TableFooterContainAddButton onClick={onCreate} />);
  // Set a footer when table is empty (add an add button)
  const emptyFooter = (): JSX.Element => (<EmptyTableFooter text={emptyText} onClick={onCreate} />);
  if (dataSource?.length === 0) return <EmptyTable columns={createColumns(headers, true)} dataSource={dataSource} footer={emptyFooter
  } pagination={pagination ? undefined : false} />
  // Return an element
  return expandKey ? (
    <OuterTable columns={createColumns(headers, true)} dataSource={dataSource} expandable={{
      expandedRowRender: (record: any, index: number) => innerHeaders ? (<Table key={index} columns={createColumns(innerHeaders, false)} dataSource={row.uuid === record.uuid ? [row] : [record]} pagination={false} />) : (<></>),
      rowExpandable: (record: any) => (row.uuid === record.uuid) ? row[expandKey] : record[expandKey]
    }} footer={footer} pagination={pagination ? undefined : false} />
  ) : (
    <Table columns={createColumns(headers, true)} dataSource={dataSource} footer={footer} pagination={pagination ? undefined : false} />
  );
}
/**
 * [Component] Editable table form
 */
export const EditableTableForm = ({ dataSource, defaultSelectOptions, expandKey, headers, innerHeaders, onAdd, onDelete, onSave, tableName, title }: EditableTableFormProps): JSX.Element => {
  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
      </StyledTableFormHeader>
      <EditableTable dataSource={dataSource} defaultSelectOptions={defaultSelectOptions} expandKey={expandKey} headers={headers} innerHeaders={innerHeaders} onAdd={onAdd} onDelete={onDelete} onSave={onSave} tableName={tableName} />
    </StyledTableForm>
  );
}
/**
 * [Component] Editable url table form
 */
export const EditableURLTableForm = ({ dataSource, defaultSelectOptions, expandKey, headers, innerHeaders, onAdd, onDelete, onSave, tableName, title, emptyText = '추가하기' }: EditableTableFormProps): JSX.Element => {
  const isExistDataSource = dataSource?.length > 0 ? true : false;
  return (
    <StyledTableForm>
      {isExistDataSource ?
        <StyledTableFormHeader >
          <StyledTableTitle>{title}</StyledTableTitle>
          <URLButton disabled><LinkOutlined />URL 입력</URLButton>
        </StyledTableFormHeader>
        :
        <StyledURLTableFormHeader>
          <StyledTableTitle>{title}</StyledTableTitle>
          <URLButton><LinkOutlined />URL 입력</URLButton>
        </StyledURLTableFormHeader>
      }
      <EditableTable dataSource={dataSource} defaultSelectOptions={defaultSelectOptions} expandKey={expandKey} headers={headers} innerHeaders={innerHeaders} onAdd={onAdd} onDelete={onDelete} onSave={onSave} tableName={tableName} emptyText={emptyText} />
    </StyledTableForm>
  );
}
/**
 * [Component] Table form header
 */
export const TableFormHeader = ({ title, tools }: TableFormHeaderProps): JSX.Element => {
  return (
    <StyledTableFormHeader>
      <StyledTableTitle>{title}</StyledTableTitle>
      <StyledTableTools>{tools}</StyledTableTools>
    </StyledTableFormHeader>
  );
}
/** 
 * [Component] Inputable table
 */
// export const InputableTable = ({ dataSource, onAdd, onChange, onDelete, pagination, headers }: AddableTableProps): JSX.Element => {
//   // Set the columns
//   const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
//     // Extract a header data
//     const header: TableHeaderData = headers[key];
//     // Create a column
//     const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description);
//     // Set a render for column
//     column.render = (item: any, record: any, index: number): JSX.Element => {
//       switch(header.display) {
//         case 'list':
//           return (<AddableSelect multiple onChange={(value: string[]): void => onChange(index, key, record, value)} totalOptions={[]} values={item} />);
//         default:
//           return (<Input onChange={(e: any): void => onChange(index, key, record, e.target.value)} value={item} />);
//       }
//     }
//     // Return
//     return column;
//   });
//   // Add a column for delete
//   columns.push({dataIndex: 'delete', key: 'delete', title: '', render: (item: any, record: any, index: number): JSX.Element => <DeleteOutlined onClick={() => onDelete(index)} />});

//   // Set a footer (add an add button)
//   const footer = (): JSX.Element => (<TableFooterContainAddButton onClick={onAdd} />);
//   // Return an element
//   return (<Table columns={columns} dataSource={dataSource} footer={footer} pagination={pagination ? undefined : false} />);
// }
/**
 * [Internal Component] Create an element for table header
 */
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
      ) : (<></>)}
    </StyledTableHeader>
  );
}
/**
 * [Internal Component] Table footer containing an additional button
 */
const TableFooterContainAddButton = ({ onClick }: TableFooterContainAddButtonProps): JSX.Element => {
  return (
    <StyledTableFooter onClick={onClick}>
      <IoAddCircle />
      <>행 추가</>
    </StyledTableFooter>
  );
}

const EmptyTableFooter = ({ text, onClick }: EmptyTableFooterProps): JSX.Element => {
  return (
    <StyledEmptyTableFooter onClick={onClick}>
      <span className='message'>내용이 없습니다.</span>
      <Button>{text}</Button>
    </StyledEmptyTableFooter>
  );
}

/**
 * [Internal Component] Table edit cell
 */
const TableEditCell = ({ edit, onDelete, onEdit, onSave }: TableEditCellProps): JSX.Element => {
  return (
    <StyledTableEditCell>
      {edit ? (
        <>
          <AiOutlineSave onClick={onSave} />
          <Popconfirm title='해당 업무를 삭제하시겠습니까?' onConfirm={onDelete}>
            <AiOutlineDelete />
          </Popconfirm>
        </>
      ) : (
        <AiOutlineEdit onClick={onEdit} />
      )}
    </StyledTableEditCell>
  )
}
/**
 * [Internal Component] Table content for list
 */
const TableContentForList = ({ items }: TableContentForListProps): JSX.Element => {
  return (
    <StyledList>
      {items.map((key: string, index: number): JSX.Element => (<StyledListItem key={index}>{key}</StyledListItem>))}
    </StyledList>
  );
}
/**
 * [Internal Component] Table content for tags
 */
const TableContentForTags = ({ items, tooltip }: TableContentForItemProps): JSX.Element => {
  return (
    <Space size={[6, 6]} wrap>
      {items.map((item: ProcessingItemDF, index: number): JSX.Element => (
        item.intrinsic ? (
          <Tooltip key={index} title={tooltip}>
            <Tag color='geekblue'>{item.name}</Tag>
          </Tooltip>
        ) : (
          <Tag color='default' key={index}>{item.name}</Tag>
        )
      ))}
    </Space>
  );
}
/**
 * [Internal Function] Set the select options by column
 * @param onUpdate update handler
 * @param ref ref table data
 * @param selectOptions select options
 * @param tableName table name
 * @param standard standard object
 * @param key column key
 */
const setSelectOptionsByColumn = (onUpdate: (value: any) => void, ref: any, selectOptions: any, standard: any, tableName: string, key?: string) => {
  switch (tableName) {
    case 'falseNameInfo':
      if (key) {
        const [refRow] = ref.filter((elem: any): boolean => elem[key] === standard[key]);
        if (key === 'subject') {
          refRow ? onUpdate({ ...selectOptions, ['items']: refRow['essentialItems'].concat(refRow['selectionItems']).map((item: ProcessingItemDF): string => item.name) }) : onUpdate({ ...selectOptions, ['items']: [] });
        }
      } else {
        const [refRow] = ref.filter((elem: any): boolean => elem.subject === standard.subject);
        refRow ? onUpdate({ ...selectOptions, ['items']: refRow['essentialItems'].concat(refRow['selectionItems']).map((item: ProcessingItemDF): string => item.name) }) : onUpdate({ ...selectOptions, ['items']: [] });
      }
      break;
    case 'personalProvision':
      const personalData = extractSelectOptionsByColumn(personalInfo, [], personalInfoTableHeader);
      onUpdate({ ...selectOptions, ['items']: [...personalData.essentialItems, ...personalData.selectionItems] });
      break;
    default:
      break;
  }
}

/**
 * [Function] Set a data source 
 * @param dataSource raw data source
 * @returns data source
 */
export const setDataSource = (dataSource: any): any[] => {
  return dataSource.map((item: any): any => { return { ...item, key: item.uuid } });
}
/**
 * [Internal Function] Create a table column(= header) property
 * @param key unique key
 * @param name header name
 * @param description header description
 * @returns created columns
 */
const createTableColumnProps = (key: string, name: string, description?: string): any => {
  return { dataIndex: key, key: key, title: <TableHeader description={description} name={name} />, visible: true };
}
/**
 * [Function] Extract the select option by column
 * @param dataSource data source
 * @param defaultOptions default select options
 * @param headers table header data
 */
export const extractSelectOptionsByColumn = (dataSource: any[], defaultOptions: any, headers: TableHeadersData): SelectOptionsByColumn => {
  const options: SelectOptionsByColumn = {};
  // Set the default select options by columns
  defaultOptions ? Object.keys(defaultOptions).forEach((key: string): string[] => defaultOptions[key] ? options[key] = [...defaultOptions[key]] : []) : undefined;
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
        if (display === 'itemA') {
          options[key].push(...row[key].filter((item: ProcessingItemDF): boolean => !options[key].includes(item.name)).map((item: ProcessingItemDF): string => item.name));
        } else {
          options[key].push(...row[key].filter((item: string): boolean => !options[key].includes(item)));
        }
      } else {
        !options[key].includes(row[key]) ? options[key].push(row[key]) : undefined;
      }
    }
  }
  // Set the items
  if (Object.keys(options).includes('essentialItems') && Object.keys(options).includes('selectionItems')) {
    options['items'] = options['essentialItems'].concat(options['selectionItems']);
  }
  // Return
  return options;
}