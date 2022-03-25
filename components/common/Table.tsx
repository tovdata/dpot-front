import { useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Drawer, Popover, Tag, Tooltip } from 'antd';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { AiOutlineDelete, AiOutlineEdit, AiOutlineQuestionCircle } from 'react-icons/ai';
// Type
import { TableProcessItemProps } from '../../models/type';

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
  edit: boolean;
  onEdit: () => void;
  onSave: () => void;
  table: JSX.Element | JSX.Element[];
  title: string;
}
interface TableEditCellProps {
  edit: boolean;
}
interface TableEditPanelProps {
  children?: JSX.Element | JSX.Element[];
  onClose: () => void;
  title: string;
  visible: boolean;
}
interface TableHeaderProps {
  description?: string;
  name: string;
}
interface TableContentListProps {
  items: string[];
}
interface TableProcessItemsProps {
  items: TableProcessItemProps[];
  tooltip: string;
}

// Component (form)
export const TableForm = ({ edit, onEdit, onSave, title, table }: TableProps): JSX.Element => {
  // Set a local state
  const [visible, setVisible] = useState<boolean>(false);
  // Create an event handler (onClose)
  const onClose = (): void => setVisible(false);
  // Create an event handler (onShowDrawer)
  const onShowDrawer = (): void => setVisible(true);

  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
          { edit ? (
            <>
              <Button onClick={onShowDrawer}>추가하기</Button>
              <Button onClick={onSave} type='primary'>저장하기</Button>
            </>
          ) : (
            <Button onClick={onEdit}>수정하기</Button>
          ) }
          <TableEditPanel title='Basic Drawer' onClose={onClose} visible={visible}>
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </TableEditPanel>
        </StyledTableTool>
      </StyledTableFormHeader>
      {table}
    </StyledTableForm>
  );
}
// Component (table header)
export const TableHeader = ({ description, name }: TableHeaderProps): JSX.Element => {
  // Return an element
  return (
    <StyledTableHeader>
      <>{name}</>
      {description ? (
          <Popover content={description} trigger='click'>
            <StyledTableHeaderQuestionItem>
              <AiOutlineQuestionCircle />
            </StyledTableHeaderQuestionItem>
          </Popover>
        ) : (undefined)
      }
    </StyledTableHeader>
  );
}
// Component (table edit cell)
export const TableEditCell = ({ edit }: TableEditCellProps): JSX.Element => {
  return (<>
    <StyledTableEditCell hidden={!edit}>
      <AiOutlineEdit />
      <AiOutlineDelete />
    </StyledTableEditCell>
  </>);
}
// Component (table edit panel)
export const TableEditPanel = ({ children, title, onClose, visible }: TableEditPanelProps): JSX.Element => {
  return (
    <Drawer onClose={onClose} placement='right' title={title} visible={visible}>
      {children}
    </Drawer>
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