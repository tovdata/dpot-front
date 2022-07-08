import { MutableRefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
// Component
import { TableColumnProps, Table, Tag, Tooltip, Checkbox, Popconfirm, Input, Space, Typography, Button } from 'antd';
import { AddableSelect, AddableTagSelect, SingleSelect, TagSelect, IFTTTSelect } from './Select';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle, AiOutlineSave } from 'react-icons/ai';
import { IoAddCircle } from 'react-icons/io5';
// Module
import { warningNotification } from './Notification';
// Type
import { SelectOptionsByColumn, TableHeaderData, TableHeadersData } from '../../models/type';
import { changeSelectOptions, extractProcessingItems, resetSelectOptions } from '../../utils/table';
import { CloseOutlined } from '@ant-design/icons';

// styled element (EmptyTable)
const EmptyTable = styled(Table)`
  .ant-table-placeholder{
    display: none;
  }
`;
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
`;
// Styled element (TableFormHeader)
const StyledTableFormHeader = styled.div`
  margin-bottom: 28px;
  user-select: none;
`;
// Styled element (TableTitle)
const StyledTableTitle = styled.h2`
  font-size: ${FS_HXXS};
  font-weight: 600;
  line-height: ${LH_HXXS};
  margin-bottom: 0;
`;
// Styled element (TableTools)
const StyledTableTools = styled.div``;
// Styled element (TableHeader)
const StyledTableHeader = styled.div`
  align-items: center;
  display: flex;
`;
// Styled element (Custom table footer)
const StyledCustomTableFooter = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
`;

// Styled element (Empty table footer)
const StyledEmptyTableFooter = styled(StyledCustomTableFooter)`
  .message{
    color:#BFBFBF;
    font-weight: 500;
    margin: 1rem 0;
  }
  button{
    border-color: #096DD9;
    color:#096DD9;
    font-weight: 500;
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

/** [Interface] Properties for editable table */
interface EditableTableProps extends TableProps {
  defaultSelectOptions?: any;
  isLoading?: boolean;
  onAdd: (record: any) => void;
  onDelete: (value: any) => void;
  onSave: (value: any) => boolean;
  onClickURL?: () => void;
  refData: any;
  tableName: string;
}
/** [Internal] Properties for table form */
interface TableFormProps {
  children: JSX.Element | JSX.Element[];
  description?: string;
  modal?: boolean;
  title: string;
  tools?: JSX.Element | JSX.Element[];
  style?: React.CSSProperties;
}
/** [Interface] Properties for table */
interface TableProps {
  dataSource: any[];
  pagination?: boolean;
  headers: TableHeadersData;
}
/** [Interface] Properties for table form */
interface TableFormHeaderProps {
  description?: string;
  modal?: boolean;
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
  onCancel: () => void;
}

/** 
 * [Component] Basic table (only read)
 */
export const BasicTable = ({ dataSource, headers, pagination }: TableProps): JSX.Element => {
  // Create the columns
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => createTableColumnProps(key, headers[key].name, headers[key].description, headers[key].width!));
  // Return an element
  return (<Table columns={columns} dataSource={dataSource} pagination={pagination ? undefined : false} />);
}
/**
 * [Component] Editable table
 */
export const EditableTable = ({ dataSource, defaultSelectOptions, headers, isLoading, onAdd, onDelete, onSave, pagination, refData, tableName }: EditableTableProps): JSX.Element => {
  // 포커즈 및 기본 레코드 값 정의
  const defaultFocusState: any = useMemo(() => Object.keys(headers).reduce((acc: any, key: string): any => { acc[key] = false; return acc }, {}), [headers]);
  const defaultRecord: any = useMemo(() => {
    return Object.keys(headers).reduce((acc: any, key: string): any => {
      const type: string = headers[key].display;
      acc[key] = type === 'checkbox' ? false : (type === 'item' || type === 'itemA' || type === 'list' || type === 'period' || type === 'purpose') ? [] : '';
      return acc;
    }, {});
  }, [headers]);
  
  // // Extract a focus state and record by header key
  // Object.keys(headers).forEach((key: string): void => {
  //   defaultFocusState[key] = false;
  //   const type: string = headers[key].display;
  //   defaultRecord[key] = type === 'checkbox' ? false : (type === 'item' || type === 'itemA' || type === 'list' || type === 'period' || type === 'purpose') ? [] : '';
  // });

  // Set a ref
  const newProjectCnt: MutableRefObject<number> = useRef(0);
  // Set a local state
  const [row, setRow] = useState<any>({});
  const [focus, setFocus] = useState<any>(defaultFocusState);
  const [selectOptions, setSelectOptions] = useState<SelectOptionsByColumn>(resetSelectOptions(dataSource, headers, tableName, refData, defaultSelectOptions));

  /** [Event handler] 업무 생성 */
  const onCreate = useCallback((): void => {
    // 새로운 Key 생성
    const key: string = `npc_${newProjectCnt.current++}`;
    // 빈 레코드 값 생성
    const record: any = { ...defaultRecord, id: key, key: key };

    // 기존에 편집 중인 데이터가 있는지 확인
    if (row.id !== undefined) {
      warningNotification('작성 중인 내용을 먼저 저장해주세요.');
    } else {
      // Add a row
      onAdd(record);
      // Update a state
      setRow(record);
    }
  }, [dataSource, defaultRecord, newProjectCnt, row]);
  /** [Event handler] 변경 */
  const onChange = useCallback((key: string, item: any, required: boolean, type?: string): void => {
    if (type && type === 'item') {
      const newItem: string[] = (item as string[]).map((value: string): string => {
        if (RegExp('^주민.*번호$').test(value)) {
          return '주민등록번호';
        } else if (RegExp('^여권.*번호$').test(value)) {
          return '여권번호';
        } else if (RegExp('^운전.*번호$').test(value)) {
          return '운전면허번호';
        } else if (RegExp('^외국.*번호$').test(value)) {
          return '외국인등록번호';
        } else {
          return value;
        }
      });
      // 중복 제거
      const filtering = newItem.reduce((arr: string[], value: string) => {
        if (!arr.includes(value)) {
          arr.push(value);
        }
        return arr;
      }, []);
      // Set a row
      setRow({ ...row, [key]: filtering });
    } else {
      // Set a row
      setRow({ ...row, [key]: item });
      // Check a required
      setFocus({ ...focus, [key]: checkRequired(headers[key].name, item, required) });
    }
    // Update the select options
    changeSelectOptions(key, onUpdateSelectOptions, refData, tableName, item, row);
  }, [dataSource, refData, row, tableName]);
  /** [Event handler] 포커즈 초기화 */
  const clearFocus = useCallback((): void => {
    setFocus(defaultFocusState);
  }, [defaultFocusState]);
  /** [Event Handler] 취소 이벤트 */
  const onRollback = useCallback((record: any): void => {
    if ((new RegExp('^npc_')).test(record.id)) {
      onDelete(record);
    }
  }, []);
  /** [Event Handler] 편집 */
  const onEdit = useCallback((record: any): void => {
    clearFocus();
    (row.id && record.id && row.id !== record.id) ? warningNotification('작성 중인 내용을 먼저 저장해주세요.') : setRow(record);
    // Update the select options
    changeSelectOptions('subject', onUpdateSelectOptions, refData, tableName, record.subject);
  }, [dataSource, refData, row, tableName]);

  useEffect(() => console.log('row', row), [row]);

  /**
   * [Event Handler] Update to select options
   * @param value updated select options
   */
  const onUpdateSelectOptions = (value: any): void => {
    if (tableName === 'pi') {
      value['items'] = dataSource.length > 0 ? value.items ? extractProcessingItems(dataSource).filter((item: string): boolean => !value.items.includes(item)).concat(value.items) : extractProcessingItems(dataSource) : [];
      if (value['period'].length === 0) value['period'] = defaultSelectOptions['period'];
      setSelectOptions({ ...selectOptions, ...value });
    } else {
      setSelectOptions({ ...selectOptions, ...value });
    }
  };

  /**
   * UseEffect
   */
  useEffect(() => setSelectOptions(resetSelectOptions(dataSource, headers, tableName, refData, defaultSelectOptions)), [dataSource]);

  /**
   * [Inner Function] Check a required for column in row (using state)
   * @returns check result
   */
  const checkRequiredForRow = useCallback((): boolean => {
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
  }, [headers, row]);
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
      const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description, header.width);
      // Set a render for column
      column.render = (item: any, record: any, index: number): JSX.Element => {
        switch (header.display) {
          case 'checkbox':
            if (('id' in row) && row.id === record.id) {
              return (<Checkbox checked={row[key]} onChange={(e: any): void => onChange(key, e.target.checked, header.required)} />);
            } else {
              return (<Checkbox checked={item} disabled />);
            }
          case 'item':
            if (('id' in row) && row.id === record.id) {
              return (<TagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required, 'item')} options={selectOptions[key] ? selectOptions[key] : []} placeholder={header.placeholder ? header.placeholder : undefined} value={row[key]} />);
            } else {
              return item && item.length > 0 ? (<TableContentForTags items={item} key={index} tooltip='고유식별정보' />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
            }
          case 'itemA':
            if (('id' in row) && row.id === record.id) {
              // Extract a options
              const options: string[] = (key === 'essentialItems' || key === 'selectionItems') ? selectOptions['items']?.filter((item: string): boolean => key === 'essentialItems' ? ('selectionItems' in row) ? !row['selectionItems'].includes(item) : false : ('essentialItems' in row) ? !row['essentialItems'].includes(item) : false) : selectOptions[key] ? selectOptions[key] : [];
              // Return an element
              return (<AddableTagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required, 'item')} options={options} placeholder={header.placeholder ? header.placeholder : undefined} value={row[key]} />);
            } else {
              return item && item.length > 0 ? (<TableContentForTags items={item} key={index} tooltip='고유식별정보' />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
            }
          case 'list':
            if (('id' in row) && row.id === record.id) {
              return (<AddableTagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required)} options={selectOptions[key] ? selectOptions[key] : []} placeholder={header.placeholder ? header.placeholder : undefined} value={row[key]} />);
            } else {
              return (<TableContentForList items={item} key={index} />);
            }
          case 'period':
            if (('id' in row) && row.id === record.id) {
              return (
                <>
                  <Space size={[6, 6]} style={{ marginBottom: '10px' }} wrap>
                    {row[key]?.map((elem: string, index: number): JSX.Element => (<Tag closable key={index} onClose={(e: any): void => { e.preventDefault(); onChange(key, row[key].length - 1 === index ? [...row[key].slice(0, index)] : [...row[key].slice(0, index), ...row[key].slice(index + 1)], header.required) }}>{elem}</Tag>))}
                  </Space>
                  <IFTTTSelect onAdd={(value: string): void => { row[key].some((item: string): boolean => item === value) ? warningNotification('동일한 기간이 존재합니다') : onChange(key, [...row[key], value], header.required) }} options={selectOptions[key] ? selectOptions[key] : []} />
                </>
              );
            } else {
              return (<TableContentForList items={item} key={index} />);
            }
          case 'select':
            if (('id' in row) && row.id === record.id) {
              return (<SingleSelect error={focus[key]} onChange={(item: string | string[]): void => onChange(key, item, header.required)} options={selectOptions[key] ? selectOptions[key] : []} placeholder={header.placeholder ? header.placeholder : undefined} value={row[key]} />);
            } else {
              return (<>{item}</>);
            }
          case 'selectA':
            if (('id' in row) && row.id === record.id) {
              return (<AddableSelect error={focus[key]} onChange={(item: string | string[]): void => onChange(key, item, header.required)} options={selectOptions[key] ? selectOptions[key] : []} placeholder={header.placeholder ? header.placeholder : undefined} value={row[key]} />);
            } else {
              return (<>{item}</>);
            }
          default:
            if (('id' in row) && row.id === record.id) {
              return (<Input key={index} onChange={(e: any): void => onChange(key, e.target.value, header.required)} placeholder={header.placeholder ? header.placeholder : undefined} value={row[key]} status={focus[key] ? 'error' : undefined} />);
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
        dataIndex: 'id',
        key: 'id',
        title: '',
        render: (_: any, record: any, index: number): JSX.Element => (<TableEditCell edit={row.id === record.id} key={index} onDelete={() => { clearFocus(); onDelete(record); onEdit({}) }} onEdit={() => onEdit(record)} onSave={() => { checkRequiredForRow() ? onSave(row) ? onEdit({}) : undefined : undefined }} onCancel={() => { clearFocus(); onEdit({}); onRollback(record) }} />),
        width: '4%'
      });
    }
    // Return
    return columns;
  }

  // Set a footer (add an add button)
  const footer = (): JSX.Element => (<TableFooterContainAddButton onClick={onCreate} />);
  // 테이블 정보가 없는 경우 빈 테이블 UI를 보여준다.
  if (dataSource?.length === 0)
    return (
      <>
        <EmptyTable columns={createColumns(headers, true)} dataSource={dataSource} loading={isLoading} pagination={pagination ? undefined : false} />
        <EmptyTableFooter onClick={onCreate} />
      </>
    );
  // Return an element
  return (
    <Table columns={createColumns(headers, true)} dataSource={dataSource} footer={footer} loading={isLoading} pagination={pagination ? undefined : false} />
  );
}
/**
 * [Component] Editable table form
 */
export const EditableTableForm = ({ children, description, modal, style, title, tools }: TableFormProps): JSX.Element => {
  return (
    <StyledTableForm style={style}>
      <TableFormHeader description={description} modal={modal} title={title} tools={tools} />
      {children}
    </StyledTableForm>
  );
}

/**
 * [Component] Table form header
 */
export const TableFormHeader = ({ description, modal, title, tools }: TableFormHeaderProps): JSX.Element => {
  return (
    <StyledTableFormHeader>
      {modal ? description ? (
        <div style={{ alignItems: 'start', display: 'flex', justifyContent: 'space-between' }}>
          <div>
            {description.split('\\n').map((elem: string, index: number): JSX.Element => (
              <p key={index} style={{ color: '#8C8C8C', fontSize: 14, fontWeight: '500', lineHeight: '22px', margin: 0 }}>{elem}</p>
            ))}
          </div>
          <StyledTableTools>{tools}</StyledTableTools>
        </div>
      ) : (
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <p style={{ fontSize: 15, fontWeight: '500', margin: 0 }}>{title}</p>
          <StyledTableTools>{tools}</StyledTableTools>
        </div>
      ) : description ? (
        <>
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <StyledTableTitle>{title}</StyledTableTitle>
            <StyledTableTools>{tools}</StyledTableTools>
          </div>
          <div>
            {description.split('\\n').map((elem: string, index: number): JSX.Element => (
              <p key={index} style={{ color: '#8C8C8C', fontSize: 14, fontWeight: '500', lineHeight: '22px', margin: 0 }}>{elem}</p>
            ))}
          </div>
        </>
      ) : (
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
          <StyledTableTitle>{title}</StyledTableTitle>
          <StyledTableTools>{tools}</StyledTableTools>
        </div>
      )}
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
        <Tooltip title={description} trigger='hover'>
          <StyledTableHeaderQuestionItem>
            <AiOutlineQuestionCircle />
          </StyledTableHeaderQuestionItem>
        </Tooltip>
      ) : (<></>)}
    </StyledTableHeader>
  );
}
/**
 * [Internal Component] Table footer containing an additional button
 */
export const TableFooterContainAddButton = ({ onClick }: TableFooterContainAddButtonProps): JSX.Element => {
  return (
    <StyledTableFooter onClick={onClick}>
      <IoAddCircle />
      <>행 추가</>
    </StyledTableFooter>
  );
}

/**
 * [Internal Component] Table footer of empty table
 * @param onClick click handler
 */
export const EmptyTableFooter = ({ onClick }: TableFooterContainAddButtonProps): JSX.Element => {
  return (
    <StyledEmptyTableFooter>
      <span className='message'>내용이 없습니다.</span>
      <Button onClick={onClick}>{"추가하기"}</Button>
    </StyledEmptyTableFooter>
  );
}
/**
 * [Internal Component] Table edit cell
 */
export const TableEditCell = ({ edit, onDelete, onEdit, onSave, onCancel }: TableEditCellProps): JSX.Element => {
  return (
    <StyledTableEditCell>
      {edit ? (
        <>
          <AiOutlineSave onClick={onSave} />
          <CloseOutlined onClick={onCancel} />
        </>
      ) : (
        <>
          <AiOutlineEdit onClick={onEdit} />
          <Popconfirm cancelText='아니오' placement='topRight' title='현재 행을 삭제하시겠습니까?' okText='예' onConfirm={onDelete}>
            <AiOutlineDelete />
          </Popconfirm>
        </>
      )}
    </StyledTableEditCell>
  )
}
/**
 * [Internal Component] Table content for list
 */
export const TableContentForList = ({ items }: TableContentForListProps): JSX.Element => {
  return (
    <StyledList>
      {items?.map((key: string, index: number): JSX.Element => (<StyledListItem key={index}>{key}</StyledListItem>))}
    </StyledList>
  );
}
/**
 * [Internal Component] Table content for tags
 */
export const TableContentForTags = ({ items, tooltip }: TableContentForItemProps): JSX.Element => {
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
 * [Function] Create a table column(= header) property
 * @param key unique key
 * @param name header name
 * @param description header description
 * @param width column width
 * @returns created columns
 */
export const createTableColumnProps = (key: string, name: string, description?: string, width?: string): any => {
  return { dataIndex: key, key: key, title: <TableHeader description={description} name={name} />, visible: true, width: width ? width : '4%' };
}

/**
 * [Function] Check a required for column
 * @param columnName column key
 * @param item column value
 * @param required required
 * @returns check result
 */
export const checkRequired = (columnName: string, item: string[] | string, required: boolean): boolean => {
  // Check a warning
  const warning: boolean = required && ((typeof item === 'string' && item === '') || (Array.isArray(item) && item.length === 0)) || item === undefined && required;
  // Alert a message
  if (warning) {
    warningNotification(`${columnName}은/는 필수로 입력해야 합니다.`);
  }
  // Return
  return warning;
}