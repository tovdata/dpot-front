import { useState } from 'react';
import styled from 'styled-components';
// Component
import { Button, Tag, Tooltip } from 'antd';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
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
// Styled element (List)
const StyledList = styled.ul`
  margin: 0;
  padding-left: 1.125rem;
`;
const StyledListItem = styled.li``;

/** Interface */
interface TableProps {
  table: JSX.Element | JSX.Element[];
  title: string;
}
interface TableContentListProps {
  items: string[];
}
interface TableProcessItemsProps {
  items: TableProcessItemProps[];
  tooltip: string;
}

// Component (form)
export const CommonTableForm = ({ title, table }: TableProps): JSX.Element => {
  // Set a local state
  const [edit, setEdit] = useState<boolean>(false);
  // Create an event handler (onEdit)
  const onEdit = (): void => setEdit(true);
  // Create an event handler (onSave)
  const onSave = (): void => setEdit(false);

  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
          { edit ? (
            <>
              <Button>추가하기</Button>
              <Button onClick={onSave} type='primary'>저장하기</Button>
            </>
          ) : (
            <Button onClick={onEdit}>수정하기</Button>
          ) }
        </StyledTableTool>
      </StyledTableFormHeader>
      {table}
    </StyledTableForm>
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