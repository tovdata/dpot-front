import { MutableRefObject, useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
// Component
import { TableColumnProps, Table, Tag, Tooltip, Checkbox, Popconfirm, Input, Space, Typography, Button, Modal } from 'antd';
import { AddableSelect, AddableTagSelect, SingleSelect, TagSelect, IFTTTSelect } from './Select';
import { checkRequired, TableFooterContainAddButton, TableEditCell, EmptyTableFooter, TableContentForList, createTableColumnProps, TableContentForTags } from './Table';
// FontcreateTableColumnProps
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle, AiOutlineSave } from 'react-icons/ai';
import { IoAddCircle } from 'react-icons/io5';
// Module
import { createWarningMessage, createSimpleWarningNotification } from './Notification';
// Type
import { SelectOptionsByColumn, TableHeaderData, TableHeadersData } from '../../models/type';
import { SERVICE_PI, SERVICE_FNI, SERVICE_PPI, SERVICE_PFNI, SERVICE_CPI, SERVICE_CFNI } from '../../models/queries/type';
// Utils
import { changeSelectOptions, extractProcessingItems, resetSelectOptions, setDataSource } from '../../utils/table';
import { CloseOutlined } from '@ant-design/icons';
import Router from 'next/router';

// Styled element (OuterTable)
const OuterTable = styled(Table)`
  border-collapse: collapse;
  .ant-table-expanded-row > td {
    border-bottom: 1px solid #d9d9d9;
  }
`;
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
/** [Interface] Properties for editable table */
interface EditableTableProps extends TableProps {
  defaultSelectOptions?: any;
  expandKey: string;
  innerHeaders: TableHeadersData;
  isLoading?: boolean;
  modal?: boolean;
  onAdd: (record: any) => void;
  onDelete: (value: any) => void;
  onSave: (value: any) => boolean;
  onClickURL?: () => void;
  prerequisite: boolean;
  refData: any;
  tableName: string;
}
/** [Interface] Properties for table */
interface TableProps {
  dataSource: any[];
  pagination?: boolean;
  headers: TableHeadersData;
}

/**
 * [Component] Editable table
 */
export const EditableExpandTable = ({ dataSource, defaultSelectOptions, expandKey, headers, innerHeaders, isLoading, modal, onAdd, onDelete, onSave, pagination, prerequisite, refData, tableName }: EditableTableProps): JSX.Element => {
  // Set a default focus and default record for columns in row
  const defaultFocusState: any = {};
  const defaultRecord: any = {};
  const totalheaders = { ...innerHeaders, ...headers };
  // Extract a focus state by inner header key
  Object.keys(totalheaders).forEach((key: string): void => {
    defaultFocusState[key] = false;
    const type: string = totalheaders[key].display;
    defaultRecord[key] = type === 'checkbox' ? false : (type === 'item' || type === 'itemA' || type === 'list' || type === 'period' || type === 'purpose') ? [] : '';
  });
  // Set a ref
  const newProjectCnt: MutableRefObject<number> = useRef(0);
  // Set a local state
  const [row, setRow] = useState<any>({});
  const [focus, setFocus] = useState<any>(defaultFocusState);
  const [selectOptions, setSelectOptions] = useState<SelectOptionsByColumn>(resetSelectOptions(dataSource, headers, tableName, refData, defaultSelectOptions));
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  /**
   * [Event Handler] Create a row
   */
  const onCreate = useCallback((): void => {
    if (prerequisite) {
      // Set a key
      const key: string = `npc_${newProjectCnt.current++}`;
      // Create a new row
      const record: any = { ...defaultRecord, id: key, key: key };

      // Check a editing status
      if (row.id !== undefined) {
        createSimpleWarningNotification('현재 수정 중인 데이터를 저장하고 진행해주세요.', 2.4, 'topRight');
      } else {
        // Add a row
        onAdd(record);
        // Update a state
        setRow(record);
      }
    } else {
      tableName === 'ppi' || tableName === 'cpi' ? prerequisiteModal(!modal) : prerequisiteModal(!modal, true);
    }
  }, [defaultRecord, onAdd, prerequisite, row.id, tableName]);
  /**
   * [Event Handler] Change a row
   * @param key column key
   * @param item column value
   * @param required required
   * @param type column type
   */
  const onChange = (key: string, item: any, required: boolean, type?: string): void => {
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
      // Set a row
      setRow({ ...row, [key]: newItem });
    } else if (tableName === 'cpi' && key === 'company') {
      if (typeof item === 'string') {
        const companys = refData['cpi'][row.subject];
        const infos = companys ? companys[item] : null;
        infos ? setRow({ ...row, [key]: item, 'isForeign': infos.isForeign, 'country': infos.country, 'location': infos.location, 'charger': infos.charger }) : setRow({ ...row, [key]: item });
      } else {
        setRow({ ...row, [key]: item });
      }
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
    changeSelectOptions(key, onUpdateSelectOptions, refData, tableName, item, row);
  }
  /**
   * [Event Handler] 취소 이벤트
   * @param record 현재 행(Row)에 대한 데이터
   */
  const onRollback = (record: any): void => {
    if ((new RegExp('^npc_')).test(record.id)) {
      onDelete(record);
    }
  }
  /**
   * [Event Handler] Set a edit state
   * @param record selected row
   */
  const onEdit = (record: any): void => {
    clearFocus();
    (row.id && record.id && row.id !== record.id) ? createSimpleWarningNotification('현재 수정 중인 데이터를 저장하고 진행해주세요.') : setRow(record);
    // Update the select options
    changeSelectOptions('subject', onUpdateSelectOptions, refData, tableName, record.subject, record, true);
  }
  /**
   * [Event Handler] Update to select options
   * @param value updated select options
   */
  const onUpdateSelectOptions = (value: any): void => setSelectOptions({ ...selectOptions, ...value });

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
    let innerResult;
    // Check a required inner
    if (row[expandKey] && innerHeaders) {
      innerResult = Object.keys(innerHeaders).map((key: string): boolean => {
        const warning: boolean = checkRequired(innerHeaders[key].name, row[key], innerHeaders[key].required);
        state[key] = warning;
        return warning;
      })
    }
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
    return !result.includes(true) && !innerResult?.includes(true);
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
      const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description, header.width);
      // Set a render for column
      column.render = (item: any, record: any, index: number): JSX.Element => {
        switch (header.display) {
          case 'checkbox':
            if (row.id === record.id) {
              return (<Checkbox checked={row[key]} onChange={(e: any): void => onChange(key, e.target.checked, header.required)} />);
            } else {
              return (<Checkbox checked={item} disabled />);
            }
          case 'item':
            if (row.id === record.id) {
              return (<TagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required, 'item')} options={selectOptions[key] ? selectOptions[key] : []} value={row[key]} />);
            } else {
              return item && item.length > 0 ? (<TableContentForTags items={item} key={index} tooltip='고유식별정보' />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
            }
          case 'itemA':
            if (row.id === record.id) {
              // Extract a options
              const options: string[] = (key === 'essentialItems' || key === 'selectionItems') ? selectOptions['items']?.filter((item: string): boolean => key === 'essentialItems' ? !row['selectionItems'].includes(item) : !row['essentialItems'].includes(item)) : selectOptions[key] ? selectOptions[key] : [];
              // Return an element
              return (<AddableTagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required, 'item')} options={options} value={row[key]} />);
            } else {
              return item && item.length > 0 ? (<TableContentForTags items={item} key={index} tooltip='고유식별정보' />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
            }
          case 'list':
            if (row.id === record.id) {
              return (<AddableTagSelect error={focus[key]} onChange={(items: string | string[]): void => onChange(key, items, header.required)} options={selectOptions[key] ? selectOptions[key] : []} value={row[key]} />);
            } else {
              return (<TableContentForList items={item} key={index} />);
            }
          case 'period':
            if (row.id === record.id) {
              return (
                <>
                  <Space size={[6, 6]} style={{ marginBottom: '10px' }} wrap>
                    {row[key]?.map((elem: string, index: number): JSX.Element => (<Tag closable key={index} onClose={(e: any): void => { e.preventDefault(); onChange(key, row[key].length - 1 === index ? [...row[key].slice(0, index)] : [...row[key].slice(0, index), ...row[key].slice(index + 1)], header.required) }}>{elem}</Tag>))}
                  </Space>
                  <IFTTTSelect onAdd={(value: string): void => { row[key].some((item: string): boolean => item === value) ? createWarningMessage('동일한 기간이 존재합니다!', 1.6) : onChange(key, [...row[key], value], header.required) }} options={selectOptions[key] ? selectOptions[key] : []} />
                </>
              );
            } else {
              return (<TableContentForList items={item} key={index} />);
            }
          case 'select':
            if (row.id === record.id) {
              return (<SingleSelect error={focus[key]} onChange={(item: string | string[]): void => onChange(key, item, header.required)} options={selectOptions[key] ? selectOptions[key] : []} value={row[key]} />);
            } else {
              return (<>{item}</>);
            }
          case 'selectA':
            if (row.id === record.id) {
              return (<AddableSelect error={focus[key]} onChange={(item: string | string[]): void => onChange(key, item, header.required)} options={selectOptions[key] ? selectOptions[key] : []} value={row[key]} />);
            } else {
              return (<>{item}</>);
            }
          default:
            if (row.id === record.id) {
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
    <OuterTable columns={createColumns(headers, true)} dataSource={dataSource} expandable={{
      expandedRowRender: (record: any, index: number) => innerHeaders ? (<Table key={index} columns={createColumns(innerHeaders, false)} dataSource={row.id === record.id ? [row] : [record]} pagination={false} />) : (<></>),
      rowExpandable: (record: any) => (row.id === record.id) ? row[expandKey] : record[expandKey],
      expandedRowKeys: row[expandKey] ? [...expandedKeys, row.key] : expandedKeys,
      onExpandedRowsChange: (expandedRows: any) => setExpandedKeys(expandedRows)
    }} footer={footer} loading={isLoading} pagination={pagination ? undefined : false} />
  )
}

/**
 * [Function] 전제 조건 미부합 모달
 * @param fni 가명정보 여부
 * @param isRedirect 리다이렉트 경로
 */
 export const prerequisiteModal = (isRedirect: boolean = true, fni?: boolean) => {
  Modal.confirm({
    cancelText: '아니오',
    centered: true,
    content: fni ? `가명정보 관리 탭에서 개인정보 처리에 관한 내용을 입력하셔야 문서를 만드실 수 있습니다.` : `개인정보 관리 탭에서 개인정보 처리에 관한 내용을 입력하셔야 문서를 만드실 수 있습니다.`,
    okText: '입력하러가기',
    onOk: () => isRedirect ? Router.push('/pim/cu') : undefined,
    title: '입력된 정보가 없습니다.'
  });
}