import styled from 'styled-components';
// Component
import { Tag, Tooltip } from 'antd';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { IoRestaurantOutline } from 'react-icons/io5';
// Type
import { CommonTableProps, TableProcessItemProps } from '../../models/type';

// Styled element (TableForm)
const StyledTableForm = styled.div`
  display: block;
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
`;
// Styled element (TableToolItem)
const StyledTableToolItem = styled.div`
  cursor: pointer;
  margin-right: 1rem;
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

/** Interface */
interface TableContentListProps {
  items: string[];
}
interface TableProcessItemsProps {
  items: TableProcessItemProps[];
  tooltip: string;
}

// Component (form)
export const CommonTableForm = ({ title, table }: CommonTableProps): JSX.Element => {
  return (
    <StyledTableForm>
      <StyledTableFormHeader>
        <StyledTableTitle>{title}</StyledTableTitle>
        <StyledTableTool>
          <StyledTableToolItem><IoRestaurantOutline /></StyledTableToolItem>
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