import { MutableRefObject, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
// Component
import { Button, Popover, TableColumnProps, Table, Tag, Tooltip, Checkbox, Popconfirm, Form, Input, Space, Typography } from 'antd';
import { notification } from 'antd';
import { EditableInput, SearchableInput } from './Input';
import { AddableSelect, EditableSelectMulti, EditableSelectSingle, IFTTPSelect, SingleSelect } from './Select';
// Data
import { defaultExtendPersonalInfoTable } from '../../models/data';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { AiOutlineDelete, AiOutlineDownload, AiOutlineEdit, AiOutlineQuestionCircle, AiOutlineSave } from 'react-icons/ai';
import { IoAddCircle } from 'react-icons/io5';
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons';
// State
import { updateEditLogSelector } from '../../models/state';
// Temporary
import { processingItems } from '../../models/temporary';
// Type
import { ProcessingItemDF, TableHeaderData, TableHeadersData } from '../../models/type';
import { CustomizeComponent } from 'rc-table/lib/interface';
import { ModalToCreatePipp } from './Modal';

// Styled element (OuterTable)
const OuterTable = styled(Table)`
  border-collapse: collapse;
  .ant-table-expanded-row > td {
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
// Styled element (Table footer)
const StyledTableFooter = styled.span`
  align-items: center;
  cursor: pointer;
  display: flex;
  svg {
    margin-right: 0.625rem;
  }
`;

/** [Interface] Properties for addable table */
interface AddableTableProps extends TableProps {
  onAdd: () => void;
  onChange: (index: number, key: string, record: any, value: any) => void;
  onDelete: (index: number) => void;
}
/** [Interface] Properties for editable table */
interface EditableTableProps extends TableProps {
  onAdd: (record: any) => void;
  onDelete: (index: number) => void;
  onSave: (index: number, value: any) => void;
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
interface TableFormProps extends TableProps {
  title: string;
}
interface TableHeaderProps {
  description?: string;
  name: string;
}
interface TableFooterContainAddButtonProps {
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
export const BasicTable = ({ dataSource, pagination, headers }: TableProps): JSX.Element => {
  // Create the columns
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => createTableColumnProps(key, headers[key].name, headers[key].description));
  // Return an element
  return (<Table columns={columns} dataSource={dataSource} pagination={pagination ? undefined : false} />);
}
/**
 * [Component] Editable table
 */
export const EditableTable = ({ dataSource, headers, onAdd, onDelete, onSave, pagination }: EditableTableProps): JSX.Element => {
  // Set a ref
  const newProjectCnt: MutableRefObject<number> = useRef(0);
  // Set a local state
  const [row, setRow] = useState<any>({});

  // Create an event handler (onCreate)
  const onCreate = (): void => {
    // Set a key
    const key: string = `npc_${newProjectCnt.current++}`;
    // Create a new row
    const row: any = {...defaultExtendPersonalInfoTable, uuid: key,  key: key};
    // Add a row
    onAdd(row);
    // Update a state
    setRow(row);
  }
  // Create an event handler (onChange)
  const onChange = (key: string, item: string[]|string): void => setRow({...row, [key]: item});
  // Create an event handler (onEdit)
  const onEdit = (record: any): void => {
    if (row.uuid && record.uuid && row.uuid !== record.uuid) {
      notification.warning({
        description: '현재 수정 중인 데이터를 저장하고 진행해주세요.',
        duration: 2.6,
        message: 'Warning'
      });
    } else {
      setRow(record);
    }
  }

  // Set a columns
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a header data
    const header: TableHeaderData = headers[key];
    // Create a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description);
    // Set a render for column
    column.render = (item: any, record: any, index: number): JSX.Element => {
      switch (header.display) {
        case 'item':
          if (row.uuid === record.uuid) {
            const childElement: JSX.Element = (<AddableSelect multiple onChange={(items: string[]): void => onChange(key, items)} totalOptions={[]} values={item.map((elem: ProcessingItemDF): string => elem.name)} />);
            return header.required ? (<Form.Item key={index}>{childElement}</Form.Item>) : childElement;
          } else {
            return item.length > 0 ? (<TableContentForTags items={item} key={index} tooltip='고유식별정보' />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
          }
        case 'list':
          if (row.uuid === record.uuid) {
            const childElement: JSX.Element = (<AddableSelect multiple onChange={(items: string[]): void => onChange(key, items)} totalOptions={[]} values={item} />);
            return header.required ? (<Form.Item key={index}>{childElement}</Form.Item>) : childElement;
          } else {
            return (<TableContentForList items={item} key={index} />);
          }
        case 'period':
          if (row.uuid === record.uuid) {
            const childElement: JSX.Element = (
              <>
                <Space size={[6, 6]} wrap>
                  {row[key].map((elem: string, index: number): JSX.Element => (<Tag closable key={index} onClose={(e: any): void => { e.preventDefault(); onChange(key, row[key].length - 1 === index ? [...row[key].slice(0, index)] : [...row[key].slice(0, index), ...row[key].slice(index + 1)])}}>{elem}</Tag>))}
                </Space>
                <IFTTPSelect onAdd={(value: string): void => onChange(key, [...row[key], value])} />
              </>
            );
            return header.required ? (<Form.Item key={index}>{childElement}</Form.Item>) : childElement;
          } else {
            return (<TableContentForList items={item} key={index} />);
          }
        default:
          if (row.uuid === record.uuid) {
            const childElement: JSX.Element = (<Input key={index} onChange={(e: any): void => onChange(key, e.target.value)} value={item} />);
            return header.required ? (<Form.Item key={index}>{childElement}</Form.Item>) : childElement;
          } else {
            return (<>{item}</>);
          }
      }
    }
    // Return
    return column;
  });
  // Add a column for delete
  columns.push({dataIndex: 'edit', key: 'edit', title: '', render: (item: any, record: any, index: number): JSX.Element => <TableEditCell edit={row.uuid === record.uuid} key={index} onDelete={() => { onDelete(index); onEdit({}) }} onEdit={() => onEdit(record)} onSave={() => { onSave(index, row); onEdit({}) }}/>});

  // Set a footer (add an add button)
  const footer = (): JSX.Element => (<TableFooterContainAddButton onClick={onCreate} />);
  // Return an element
  return (
    <Form>
      <Table columns={columns} dataSource={dataSource} footer={footer} pagination={pagination ? undefined : false} />
    </Form>
  );
}
/**
 * [Component] Editable table form
 */
export const EditableTableForm = ({ dataSource, headers, onAdd, onDelete, onSave, title }: EditableTableFormProps): JSX.Element => {
  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
      </StyledTableFormHeader>
      <Form>
        <EditableTable dataSource={dataSource} headers={headers} onAdd={onAdd} onDelete={onDelete} onSave={onSave} />
      </Form>
    </StyledTableForm>
  );
}
/** 
 * [Component] Inputable table
 */
export const InputableTable = ({ dataSource, onAdd, onChange, onDelete, pagination, headers }: AddableTableProps): JSX.Element => {
  // Set the columns
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a header data
    const header: TableHeaderData = headers[key];
    // Create a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description);
    // Set a render for column
    column.render = (item: any, record: any, index: number): JSX.Element => {
      switch(header.display) {
        case 'list':
          return (<AddableSelect multiple onChange={(value: string[]): void => onChange(index, key, record, value)} totalOptions={[]} values={item} />);
        default:
          return (<Input onChange={(e: any): void => onChange(index, key, record, e.target.value)} value={item} />);
      }
    }
    // Return
    return column;
  });
  // Add a column for delete
  columns.push({dataIndex: 'delete', key: 'delete', title: '', render: (item: any, record: any, index: number): JSX.Element => <DeleteOutlined onClick={() => onDelete(index)} />});

  // Set a footer (add an add button)
  const footer = (): JSX.Element => (<TableFooterContainAddButton onClick={onAdd} />);
  // Return an element
  return (
    <Form>
      <Table columns={columns} dataSource={dataSource} footer={footer} pagination={pagination ? undefined : false} />
    </Form>
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
      ): (<></>)}
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
/**
 * [Internal Component] Table edit cell
 */
const TableEditCell = ({ edit, onDelete, onEdit, onSave }: TableEditCellProps): JSX.Element => {
  return (
    <StyledTableEditCell>
      { edit ? (
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
// const RemovableTags = (): JSX.Element => {

// }

/**
 * [Function] Set a data source 
 * @param dataSource raw data source
 * @returns data source
 */
 export const setDataSource = (dataSource: any): any[] => {
  return dataSource.map((item: any): any => { return {...item, key: item.uuid} });
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