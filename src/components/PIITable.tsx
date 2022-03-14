import styled from 'styled-components';
// Icon
import { IoEllipsisHorizontal } from 'react-icons/io5';
// Type
import { TableDataProps } from '../models/Type';

// Create a styled element (TableForm)
const TableForm = styled.div`
  position: relative;
`;
// Create a styled element (TableFormHeader)
const TableFormHeader = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.625rem;
  user-select: none;
`;
// Create a styled element (TableTitle)
const TableTitle = styled.h2`
  color: #212121;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
`;
// Create a styled element (TableTools)
const TableTools = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  justify-content: end;
  position: relative;
`;
// Create a styled element (Table)
const Table = styled.table`
  border-collapse: collapse;
  position: relative;
  width: 100%;
  td {
    color: #212121;
    margin: 0;
    padding: 0.75rem 0;
  }
  th {
    background-color: #F6F6F6;
    border: none;
    border-bottom: 1px solid #BDBDBD;
    color: #424242;
    font-size: 14.4px;
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
`;

const PIITable = ({ table }: TableDataProps): JSX.Element => {
  // Create a table header
  const tableHeader: JSX.Element = <thead><tr>{table.header.map((name: string, index: number): JSX.Element => <th key={index} >{name}</th>)}</tr></thead>;
  // const tableHeader: JSX.Element = <thead><tr>{table.header.map((name: string, index: number): JSX.Element => <th key={index} >{name}</th>)}</tr></thead>;
  // Return an element
  return (
    <TableForm>
      <TableFormHeader>
        <TableTitle>{table.title}</TableTitle>
        <TableTools>
          <IoEllipsisHorizontal />
        </TableTools>
      </TableFormHeader>
      <Table>{tableHeader}</Table>
    </TableForm>
  )
}

export default PIITable;