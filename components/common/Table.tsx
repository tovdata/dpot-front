import { useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Popover, TableColumnProps, Table, Tag, Tooltip } from 'antd';
import { EditableDrawer } from './Drawer';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle } from 'react-icons/ai';
// Type
import { EditableDrawerContent, TableProcessItemProps } from '../../models/type';

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

/** Interface */
interface TableProps {
  columns: TableColumnProps<any>[],
  dataSource: any[],
  title: string;
}
interface TableHeaderProps {
  description?: string;
  name: string;
}
interface TableEditCellProps {
  onEdit: () => void;
}
interface TableContentListProps {
  items: string[];
}
interface TableProcessItemsProps {
  items: TableProcessItemProps[];
  tooltip: string;
}
interface EditableTableProps extends TableProps {
  drawer: EditableDrawerContent
}

// Component (editable table form)
export const EditableTableForm = ({ columns, dataSource, drawer, title }: EditableTableProps): JSX.Element => {
  // Set a local state
  const [edit, setEdit] = useState<boolean>(false);
  // Get a state
  const [show, setShow] = useState<boolean>(false);

  // Create an event handler (onEdit)
  const onEdit = (): void => setEdit(true);
  // Create an event handler (onSave)
  const onSave = (): void => setEdit(false);
  // Create an event handler (onShow)
  const onShow = (): void => setShow(true);
  // Create an event handler (onClose)
  const onClose = (): void => setShow(false);

  // Set a columns
  const editedColumns: TableColumnProps<any>[] = [...columns, { dataIndex: 'edit', key: 'edit', title: 'edit', render: () => <TableEditCell onEdit={onShow}></TableEditCell> }];

  // Return an element
  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
          { edit ? (
            <>
              <Button onClick={onShow}>추가하기</Button>
              <Button onClick={onSave} type='primary'>저장하기</Button>
            </>
          ) : (
            <Button onClick={onEdit}>수정하기</Button>
          ) }
        </StyledTableTool>
      </StyledTableFormHeader>
      <Table columns={editedColumns} dataSource={dataSource} pagination={false} />
      <EditableDrawer data={drawer.data} onClose={onClose} title={drawer.title} type={drawer.type} visible={show} />
    </StyledTableForm>
  );
}
// Component (table form)
export const TableForm = ({ columns, dataSource, title }: TableProps): JSX.Element => {
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
const TableEditCell = ({ onEdit }: TableEditCellProps): JSX.Element => {
  return (
    <StyledTableEditCell>
      <AiOutlineEdit onClick={onEdit} />
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
  return (<>{items.map((item: TableProcessItemProps, index: number): JSX.Element => (item.intrinsic ? <Tooltip key={index} title={tooltip}><Tag color='geekblue'>{item.name}</Tag></Tooltip> : <Tag color='default' key={index}>{item.name}</Tag>))}</>);
}