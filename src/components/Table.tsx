import styled from 'styled-components';
// Color
import { GRAYSCALE200, GRAYSCALE400, GRAYSCALE800, GRAYSCALE_D, PRIMARY200, PRIMARY600, PRIMARY_D, RED100, RED_D, WHITE_B } from '../static/Color';
// Font
import { FS_BS, FS_BXS, FS_HXXS, FS_HXXXXS, LH_BS, LH_BXS, LH_HXXS, LH_HXXXXS } from '../static/Font';
// Icon
import { IoEllipsisHorizontal } from 'react-icons/io5';
// Type
import { ContainerProps, TableFormHeaderProps, TableHeaderData, TableHeaderProps } from '../models/Type';

// Create a styled element (TableForm)
const StyledTableForm = styled.div`
  position: relative;
  margin-bottom: 5.625rem;
`;
// Create a styled element (TableFormHeader)
const StyledTableFormHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.625rem;
  user-select: none;
  h2 {
    color: ${GRAYSCALE_D};
    font-size: ${FS_HXXS};
    font-weight: 600;
    line-height: ${LH_HXXS};
    margin: 0;
  }
`;
// Create a styled element (TableTools)
const StyledTableTools = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: end;
  position: relative;
`;
// Create a styled element (Table)
export const StyledTable = styled.table`
  border-collapse: collapse;
  position: relative;
  width: 100%;
  td {
    border-bottom: 1px solid ${GRAYSCALE200};
    color: ${GRAYSCALE_D};
    cursor: pointer;
    font-size: ${FS_BS};
    line-height: ${LH_BS};
    margin: 0;
    padding: 0.75rem 0;
    text-align: center;
    user-select: none;
  }
  th {
    background-color: #F6F6F6;
    border: none;
    border-bottom: 1px solid ${GRAYSCALE400};
    color: ${GRAYSCALE800};
    font-size: ${FS_HXXXXS};
    line-height: ${LH_HXXXXS};
    margin: 0;
    padding: 0.75rem 0;
    user-select: none;
    &:first-child {
      border-top-left-radius: 0.5rem;
    }
    &:last-child {
      border-top-right-radius: 0.5rem;
    }
  }
  tr {
    margin: 0;
    padding: 0;
  }
  .item {
    border-radius: 0.75rem;
    border-none;
    font-size: ${FS_BXS};
    font-weight: 500;
    line-height: ${LH_BXS};
    margin-right: 0.375rem;
    padding: 0.25rem 0.625rem;
    &:last-child {
      margin-right: 0;
    }
  }
  .item.mr {
    margin-right: 0.375rem;
  }
  .item.outline {
    border: 1px solid ${PRIMARY200};
    color: ${PRIMARY600};
  }
  .item.outline.sensitive {
    border-color: ${RED100};
    color: ${RED_D};
  }
  .item.inline {
    background-color: ${PRIMARY_D};
    color: ${WHITE_B};
  }
`;

export const TableForm = ({ children }: ContainerProps): JSX.Element => {
  // Return an element
  return (
    <StyledTableForm>{children}</StyledTableForm>
  )
}

export const TableFormHeader = ({ options, title }: TableFormHeaderProps): JSX.Element => {
  // Return an element
  return (
    <StyledTableFormHeader>
      <h2>{title}</h2>
      <StyledTableTools>
        <IoEllipsisHorizontal />
      </StyledTableTools>
    </StyledTableFormHeader>
  )
}

export const TableHeader = ({ header }: TableHeaderProps): JSX.Element => {
  // Return an element
  return (
    <thead>
      <tr>{header.map((header: TableHeaderData, index: number): JSX.Element => <th hidden={!header.visible} key={index}>{header.name}</th>)}</tr>
    </thead>
  )
}

export const TableBody = ({})