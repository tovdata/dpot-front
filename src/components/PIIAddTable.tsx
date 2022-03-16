import styled from 'styled-components';
import { InputDivElementProps, PIIAddTableProps } from '../models/Type2';
import { IoChevronDownOutline } from 'react-icons/io5';
import { IoChevronUpOutline } from 'react-icons/io5';
import { useState } from 'react';
import { FS_BS, FS_BXS } from '../static/Font';
// Create a styled element (TableForm)
const TableForm = styled.div`
  position: relative;
`;
// Create a styled element (Table)
const Table = styled.table`
  width: 100%;
  table-layout: fixed;
  margin:1rem 0;
  border-collapse: collapse;
  border:none;
  tbody{
    tr{
      border-bottom: 1px solid #C3C8E5;
      display: flex;
      cursor: pointer;
      &:first-child{
        background-color: #E7E9F5;
      }
    } 
    td{
      font-size: ${FS_BS};
      display: flex;
      &:first-child{
        width: 25%;
        font-weight: 700;
        padding: 1rem 1rem 1rem 2rem;
      }
      &:nth-child(2){
        width: 60%;
      }
      &:last-child{
        width: 15%;
        display: flex;
        justify-content: center;
      }
    }
  }
`;

// Create a styled element (THead)
const THead = styled.thead`
`;
// Create a styled element (InputDiv)
const InputDiv = styled.div`
  width: 100%;
  max-width: 100%;
  overflow-x: auto;
  display: flex;
  align-items: center;
  margin: 0.5rem;
  height: 2.125rem;
  padding:0 0.25rem;
  border: 1px solid #C6C9DC;
  border-radius: 0.5rem;
  font-size: ${FS_BS};
  p{
    padding:0;
    margin: 0;
  }
`;
// Create a styled element (FoldButton)
const FoldButton = styled.button`
  margin: 0.5rem;
  padding:0;
  border:none;
  background-color: transparent;
  svg{
    cursor: pointer;
  }
`;
// Create a styled element (TagSpan)
const TagSpan = styled.span`
  background-color: #E7E9F5;
  border-radius: 0.75rem;
  font-size: ${FS_BXS};
  padding:0.25rem 0.625rem;
  margin:0 0.125rem;
  word-break:keep-all;
  font-weight: 500;
`;
/**
 * If data is string, create string element
 * @param {string} data
 * @returns {JSX.Element}
 */
const StringElement = (data: string): JSX.Element => <p>{data}</p>
/**
 * If data is string array, create tag element list
 * @param {string[]} data
 * @returns {JSX.Element[]}
 */
const ArrayElement = (data: string[]): JSX.Element[] => {
  return data.map((item: string, index: number) => // create tag element
    <TagSpan key={index}>{item}</TagSpan>
  )
};
/**
 * 각 테이블 셀에 들어갈 Input
 * @param data 표시할 data 
 * @returns 
 */
const InputDivElement = ({ data }: InputDivElementProps): JSX.Element => {
  let inputObject = typeof data === "string" ? StringElement(data) : ArrayElement(data);
  return <InputDiv>{inputObject}</InputDiv>
}

const PIIAddTable = ({ information }: PIIAddTableProps): JSX.Element => {
  const [isOpen, setIsOpen] = useState(true);
  const name: any = {
    'name': '업무명',
    'pPurpose': '처리목적',
    'required': '필수항목',
    'optional': '선택항목',
    'period': '처리 및 보유기간'
  };

  // Open/Close Cell Handler
  const openHandler = () => {
    setIsOpen(!isOpen);
  };

  const TrElement = (index: number, trName: string, data: string | string[], isOpen: boolean): JSX.Element => {
    const ButtonImg: JSX.Element = isOpen ? <IoChevronUpOutline size='18' /> : <IoChevronDownOutline size='18' />
    return (
      <tr key={index}>
        <td>{`${trName} *`}</td>
        <td><InputDivElement data={data} /></td>
        <td>{index === 0 && <FoldButton onClick={() => openHandler()}>{ButtonImg}</FoldButton>}</td>
      </tr>
    );
  }
  const TBody: JSX.Element =
    <tbody>
      {isOpen ?
        // open
        Object.keys(information).map((key: any, trIndex: number) => TrElement(trIndex, name[key], (information as any)[key], isOpen)
        )
        : // close
        TrElement(0, name['name'], information.name, isOpen)}
    </tbody>
  return (
    <TableForm>
      <Table>
        <THead />
        {TBody}
      </Table>
    </TableForm>
  )
}

export default PIIAddTable;