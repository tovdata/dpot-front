import { useRecoilValue } from 'recoil';
// Components
import { TableForm, TableFormHeader } from '../components/pim/Table';
// State
import { getPITableFieldVisibleSelector, getPITableHeaderSelector } from '../models/state_h';
// Styled
import { StyledItem, StyledList, StyledTable } from '../components/pim/Table';
// Type
import { TableContentData, TableContentDataProps, TableDataProps, TableHeaderData, TableHeaderDataProps } from '../models/type';

const PITable = ({ table }: TableDataProps): JSX.Element => {
  // Return an element
  return (
    <TableForm>
      <TableFormHeader title={table.title} type='PI'></TableFormHeader>
      <StyledTable>
        <PITableHeader />
        <PITableBody content={table.content} />
      </StyledTable>
    </TableForm>
  )
}

const PITableHeader = (): JSX.Element => {
  // Get a state
  const header = useRecoilValue(getPITableHeaderSelector);

  // Create the header items
  const items: JSX.Element[] = Object.keys(header).map((key: string, index: number): JSX.Element => <th key={index} hidden={header[key].visible !== undefined && header[key].visible ? false : true}>{header[key].name}</th>);
  // Return an element
  return (
    <thead>
      <tr>{items}</tr>
    </thead>
  )
}

const PITableBody = ({ content }: TableContentDataProps): JSX.Element => {
  // Create the rows
  const rows: JSX.Element[] = content.map((data: TableContentData, index: number): JSX.Element => <PITableRow key={index} row={data}></PITableRow>);
  // Return an element
  return (
    <tbody>{rows}</tbody>
  )
}

const PITableRow = ({ row }: any): JSX.Element => {
  // Get a state
  const header = useRecoilValue(getPITableHeaderSelector);

  // Create the columns
  const items: JSX.Element[] = Object.keys(header).map((key: string, index: number): JSX.Element => <PITableRowItem key={index} data={row[key]} type={key} visible={header[key].visible}></PITableRowItem>);
  // Return an element
  return (
    <tr>{items}</tr>
  )
}

const PITableRowItem = ({ data, type, visible }: any): JSX.Element => {
  let items: JSX.Element;
  // Create the items by type
  if (type === 'items') {
    items = data.map((item: any, index: number): JSX.Element => <StyledItem key={index}>{item.name}</StyledItem>);
  } else if (type === 'purpose') {
    items = <StyledList>{data.map((item: any, index: number): JSX.Element => <li key={index}>{item.name}</li>)}</StyledList>;
  } else {
    items = <>{data}</>
  }
  // Return an element
  return (
    <td hidden={!visible}>{items}</td>
  )
}

export default PITable;