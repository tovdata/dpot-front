import styled from 'styled-components';
// Component
import { Table, TableColumnProps, Tag, Tooltip } from 'antd';
// Data (temporary)
import { personalInfoTableHeader } from '../../models/data';
import { personalInfo } from '../../models/temporary';
// Font
import { FS_HXXS, LH_HXXS } from '../../static/font';
// Icon
import { IoRestaurantOutline } from 'react-icons/io5';
// Type
import { CommonTableProps, TableProcessItemProps } from '../../models/type';

// Styled element (TableForm)
const StyledTableForm = styled.div`
  display: block;
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

const CommonTableForm = ({ title, table }: CommonTableProps): JSX.Element => {
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

export const PersonalInfoTable = (): JSX.Element => {
  // Create the columns
  const columns = Object.keys(personalInfoTableHeader).map((key: string): TableColumnProps<any> => {
    const column: TableColumnProps<any> = {
      dataIndex: key,
      key: key,
      title: personalInfoTableHeader[key]
    };
    // Process
    if (key === 'period' || key === 'purpose') {
      column.render = (data: any): JSX.Element => (<ul style={{ margin: 0, paddingLeft: '1.125rem' }}>{data.map((name: string, index: number): JSX.Element => <li key={index}>{name}</li>)}</ul>);
    } else if (key === 'essentialItems' || key === 'selectionItems') {
      column.render = (data: TableProcessItemProps[]): JSX.Element => <>{data.map((item: TableProcessItemProps, index: number): JSX.Element => item.intrinsic ? <Tooltip title='고유식별정보' key={index}><Tag color='geekblue'>{item.name}</Tag></Tooltip> : <Tag color='default' key={index}>{item.name}</Tag>)}</>;
    }
    // Return
    return column;
  });
  // Append a key property to data source
  const dataSource = personalInfo.map((elem: any, index: number): any => { return { ...elem, key: index.toString() }; });
  // Create a table
  const table: JSX.Element = <Table columns={columns} dataSource={dataSource} pagination={false} />

  // Return an element
  return (
    <CommonTableForm title='개인정보 수집・이용 현황' table={table} />
  );
}