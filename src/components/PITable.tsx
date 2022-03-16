import { useRecoilValue } from 'recoil';
// Components
import { TableForm, TableFormHeader } from '../components/pim/Table';
// State
import { getPITableFieldVisibleSelector } from '../models/State_h';
// Styled
import { StyledItem, StyledList, StyledTable } from '../components/pim/Table';
// Type
import { PITableContentData, TableDataProps, TableHeaderData, TableHeaderDataProps } from '../models/Type';

const PITable = ({ table }: TableDataProps): JSX.Element => {
  return (
    <TableForm>
      <TableFormHeader title={table.title}></TableFormHeader>
      <StyledTable>
        <PITableHeader header={table.header} />
        <PITableBody content={table.content} />
      </StyledTable>
    </TableForm>
  )
}

const PITableHeader = ({ header }: TableHeaderDataProps): JSX.Element => {
  // Get a state
  const visible = useRecoilValue(getPITableFieldVisibleSelector);

  // Create the header items
  const items: JSX.Element[] = header.map((item: TableHeaderData, index: number): JSX.Element => <th key={index} hidden={visible[item.key] !== undefined && visible[item.key] ? false : true}>{item.name}</th>);
  // Return an element
  return (
    <thead>
      <tr>{items}</tr>
    </thead>
  )
}

const PITableBody = ({ content }: any): JSX.Element => {
  // Create the rows
  const rows: JSX.Element[] = content.map((data: PITableContentData, index: number): JSX.Element => <PITableRow key={index} row={data}></PITableRow>);
  // Return an element
  return (
    <tbody>{rows}</tbody>
  )
}

const PITableRow = ({ row }: any): JSX.Element => {
  const order: string[] = ['subject', 'purpose', 'items', 'period'];
  // Get a state
  const visible = useRecoilValue(getPITableFieldVisibleSelector);

  // Create the columns
  const items: JSX.Element[] = order.map((key: string, index: number): JSX.Element => <PITableRowItem key={index} data={row[key]} type={key} visible={visible[key]}></PITableRowItem>);
  // Return an element
  return (
    <tr>{items}</tr>
  )
}

const PITableRowItem = ({ data, type, visible }: any): JSX.Element => {
  let items: JSX.Element;
  // Create the items by type
  if (type === 'items') {
    items = data.map((item: any): JSX.Element => <StyledItem>{item.name}</StyledItem>);
  } else if (type === 'purpose') {
    items = <StyledList>{data.map((item: any): JSX.Element => <li>{item.name}</li>)}</StyledList>;
  } else {
    items = <>{data}</>
  }
  // Return an element
  return (
    <td hidden={!visible}>{items}</td>
  )
}

export default PITable;