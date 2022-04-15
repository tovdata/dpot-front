import { MutableRefObject, useEffect, useRef, useState } from 'react';
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
// Type
import { SelectOptionsByColumn, TableHeaderData, TableHeadersData } from '../../models/type';
import { LinkOutlined } from '@ant-design/icons';

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

// Styled element (Empty table footer)
const StyledEmptyTableFooter = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
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
  refData: any;
  tableName: string;
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
/** [Interface] Properties for table content for item  */
interface TableContentForItemProps {
  items: string[];
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
export const EditableTable = ({ dataSource, defaultSelectOptions, expandKey, headers, innerHeaders, onAdd, onDelete, onSave, pagination, refData, tableName }: EditableTableProps): JSX.Element => {
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
  const [selectOptions, setSelectOptions] = useState<SelectOptionsByColumn>(resetSelectOptions(dataSource, headers, tableName, refData, defaultSelectOptions));

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
      const newItem: string[] = (item as string[]).map((value: string): string => {
        if (RegExp('^[주민].*[번호]').test(value)) {
          return '주민등록번호';
        } else if (RegExp('^[여권].*[번호]').test(value)) {
          return '여권번호';
        } else if (RegExp('^[운전].*[번호]').test(value)) {
          return '운전면허번호';
        } else if (RegExp('^[외국].*[번호]').test(value)) {
          return '외국인등록번호';
        } else {
          return value;
        }
      });
      // Set a row
      setRow({ ...row, [key]: newItem });
    } else {
      // Set a row
      setRow({ ...row, [key]: item });
      if (innerHeaders && Object.keys(innerHeaders).includes(key)) {
        // Check a required
        setFocus({ ...focus, [key]: checkRequired(innerHeaders[key].name, item, required) });
      } else {
        // Check a required
        setFocus({ ...focus, [key]: checkRequired(headers[key].name, item, required) });
      }
    }
    // Update the select options
    changeSelectOptions(key, onUpdateSelectOptions, refData, tableName, item);
  }
  /**
   * [Event Handler] Set a edit state
   * @param record selected row
   */
  const onEdit = (record: any): void => {
    clearFocus();
    (row.uuid && record.uuid && row.uuid !== record.uuid) ? createSimpleWarningNotification('현재 수정 중인 데이터를 저장하고 진행해주세요.') : setRow(record);
    // Update the select options
    changeSelectOptions('subject', onUpdateSelectOptions, refData, tableName, record.subject);
  }
  /**
   * [Event Handler] Update to select options
   * @param value updated select options
   */
  const onUpdateSelectOptions = (value: any): void => {
    if (tableName === 'pi') {
      value['items'] = value.items ? extractProcessingItems(dataSource).filter((item: string): boolean => !value.items.includes(item)).concat(value.items) : extractProcessingItems(dataSource);
      setSelectOptions({ ...selectOptions, ...value });
    } else {
      setSelectOptions({ ...selectOptions, ...value });
    }
  }

  /**
   * UseEffect
   */
  useEffect(() => setSelectOptions(resetSelectOptions(dataSource, headers, tableName, refData, defaultSelectOptions)), [dataSource]);

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
              return (<TagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required, 'item')} options={selectOptions[key] ? selectOptions[key] : []} value={row[key]} />);
            } else {
              return item.length > 0 ? (<TableContentForTags items={item} key={index} tooltip='고유식별정보' />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
            }
          case 'itemA':
            if (row.uuid === record.uuid) {
              // Extract a options
              const options: string[] = (key === 'essentialItems' || key === 'selectionItems') ? selectOptions['items'].filter((item: string): boolean => key === 'essentialItems' ? !row['selectionItems'].includes(item) : !row['essentialItems'].includes(item)) : selectOptions[key] ? selectOptions[key] : [];
              // Return an element
              return (<AddableTagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required, 'item')} options={options} value={row[key]} />);
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
                  <IFTTTSelect onAdd={(value: string): void => { row[key].some((item: string): boolean => item === value) ? createWarningMessage('동일한 기간이 존재합니다!', 1.6) : onChange(key, [...row[key], value], header.required) }} options={selectOptions[key] ? selectOptions[key] : []} />
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

  if (dataSource?.length === 0)
    return <>
      <EmptyTable columns={createColumns(headers, true)} dataSource={dataSource} pagination={pagination ? undefined : false} />
      <EmptyTableFooter onClick={onCreate} />
    </>

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
export const EditableTableForm = ({ dataSource, defaultSelectOptions, expandKey, headers, innerHeaders, onAdd, onDelete, onSave, refData, tableName, title }: EditableTableFormProps): JSX.Element => {
  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
      </StyledTableFormHeader>
      <EditableTable dataSource={dataSource} defaultSelectOptions={defaultSelectOptions} expandKey={expandKey} headers={headers} innerHeaders={innerHeaders} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={refData} tableName={tableName} />
    </StyledTableForm>
  );
}

/**
 * [Component] Editable url table form
 */
export const EditableURLTableForm = ({ dataSource, defaultSelectOptions, expandKey, headers, innerHeaders, onAdd, onDelete, onSave, refData, tableName, title }: EditableTableFormProps): JSX.Element => {
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
      <EditableTable dataSource={dataSource} defaultSelectOptions={defaultSelectOptions} expandKey={expandKey} headers={headers} innerHeaders={innerHeaders} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={refData} tableName={tableName} />
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

const EmptyTableFooter = ({ onClick }: TableFooterContainAddButtonProps): JSX.Element => {
  return (
    <StyledEmptyTableFooter onClick={onClick}>
      <span className='message'>내용이 없습니다.</span>
      <Button>{"추가하기"}</Button>
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
      {items.map((item: string, index: number): JSX.Element => (
        ['주민등록번호', '여권번호', '운전면허번호', '외국인등록번호'].includes(item) ? (
          <Tooltip key={index} title={tooltip}>
            <Tag color='geekblue'>{item}</Tag>
          </Tooltip>
        ) : (
          <Tag color='default' key={index}>{item}</Tag>
        )
      ))}
    </Space>
  );
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
 * [Internal Function] 특정 컬럼(Column)의 Select Option 선택에 따라 다른 컬럼(Column)에 대한 Select Options을 변경하는 함수
 * @param key 컬럼 구분을 위한 이름
 * @param onUpdate Select Option 갱신을 위한 Hanlder
 * @param ref 참조 데이터
 * @param tableName 테이블 구분을 위한 이름
 * @param value 현재 선택된 Select Option 값 (= 선택한 칼럼의 값)
 */
const changeSelectOptions = (key: string, onUpdate: (value: any) => void, ref: any, tableName: string, value?: string | string[]): void => {
  // 테이블 이름에 따른 처리
  switch (tableName) {
    case 'pi':
      // "업무명"이 변경된 경우, "업무명"에 따라 "목적"과 "항목(필수 및 선택)"에 대한 Select Options을 변경
      if (key === 'subject') {
        value && ref[value as string] ? onUpdate({ purpose: ref[value as string].purpose, items: ref[value as string].items, period: ref[value as string].period }) : onUpdate({ purpose: [], items: [], period: [] });
      }
      break;
    case 'fni':
      // "업무명"이 변경된 경우, "업무명"에 따라 "목적"과 "처리항목"에 대한 Select Options을 변경
      if (key === 'subject') {
        if (value) {
          const [refRow] = Array.isArray(value) ? ref.filter((elem: any): boolean => value.includes(elem[key])) : ref.filter((elem: any): boolean => elem[key] === value);
          refRow ? onUpdate({ ['items']: refRow['essentialItems'].concat(refRow['selectionItems']) }) : onUpdate({ ['items']: [] });
        }
      }
      break;
    default:
      break;
  }
}
/**
 * [Internal Function] 테이블 데이터로부터 필수항목 및 선택항목을 추출하는 함수 (개인정보 수집 및 이용 테이블에서만 사용)
 * @param dataSource 테이블 데이터 소스
 * @returns 추출된 항목 데이터
 */
const extractProcessingItems = (dataSource: any[]): string[] => {
  const options: SelectOptionsByColumn = {};
  for (const row of dataSource) {
    // 테이블 데이터 소스로부터 필수항목(essentialItems)과 선택항목(selectionItems) 데이터 추출 (중복 제거)
    for (const key of ['essentialItems', 'selectionItems']) {
      if (options[key] === undefined) options[key] = [];
      if (row[key] !== undefined) options[key].push(...row[key].filter((item: string): boolean => !options[key].includes(item)));
    }
    // 추출한 필수항목과 선택항목에 대한 데이터를 이용하여 'items'라는 속성을 생성
    options['items'] = options['essentialItems'].concat(options['selectionItems']);
  }
  // 반환
  return options['items'];
}
/**
 * [Internal Function] 테이블 칼럼(Column)별 Select 옵션 초기화 함수
 * @param dataSource 테이블 데이터 소스
 * @param headers 테이블 헤더 데이터
 * @param tableName 테이블 구분을 위한 이름
 * @param ref 참조 데이터
 * @param defaultSelectOptions 기본으로 제공될 각 칼럼(Column)별 Select 옵션 데이터
 * @returns 각 칼럼(Column)별 Select 옵션 데이터
 */
const resetSelectOptions = (dataSource: any, headers: TableHeadersData, tableName: string, ref: any, defaultSelectOptions?: SelectOptionsByColumn): SelectOptionsByColumn => {
  const options: SelectOptionsByColumn = {};
  // 각 컬럼(Column)에 따라 부모 컴포넌트로부터 받은 기본 옵션을 포함한 Select 옵션 설정
  Object.keys(headers).forEach((key: string): string[] => defaultSelectOptions && defaultSelectOptions[key] ? options[key] = [...defaultSelectOptions[key]] : []);
  // 테이블에 따라 초기 각각의 컬럼(Column)의 Select 옵션 설정
  switch (tableName) {
    case 'pi':
      options['items'] = defaultSelectOptions && defaultSelectOptions['items'] ? defaultSelectOptions['items'] : [];
      options['items'] = extractProcessingItems(dataSource).filter((item: string): boolean => !options['items'].includes(item)).concat(options['items']);
      break;
    case 'fni':
      const subjectOptions: string[] = ref.map((elem: any): string => elem.subject).filter((item: string): boolean => options['subject'] ? !options['subject'].includes(item) : true)
      options['subject'] ? options['subject'].push(...subjectOptions) : options['subject'] = [...subjectOptions];
      break;
    case 'ppi':
    case 'fpni':
      options['items'] = extractProcessingItems(ref);
      break;
    default:
      break;
  }
  // 반환
  return options;
}