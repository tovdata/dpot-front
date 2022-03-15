import styled from 'styled-components';
import { InputDivElementProps, PIIAddTableProps } from '../models/Type2';
import { IoChevronDownOutline } from 'react-icons/io5';
import { IoChevronUpOutline } from 'react-icons/io5';
import { useState } from 'react';
// Create a styled element (TableForm)
const TableForm = styled.div`
  position: relative;
`;
// Create a styled element (Table)
const Table = styled.table`
  width: 100%;
  margin:1rem;
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
      font-size: 0.875rem;
      &:first-child{
        width: 25%;
        font-weight: 700;
        padding: 1rem 1rem 1rem 3rem;
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
// Create a styled element (InputDiv)
const InputDiv = styled.div`
  width: -webkit-fill-available;
  overflow-x: auto;
  display: flex;
  align-items: center;
  margin: 0.5rem;
  height: 2.125rem;
  padding:0 0.25rem;
  border: 1px solid #C6C9DC;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  p{
    padding:0;
    margin: 0;
  }
`;
const FoldButton = styled.button`
  margin: 0.5rem;
  padding:0;
  border:none;
  background-color: transparent;
  svg{
    cursor: pointer;
  }
`;

const TagSpan = styled.span`
  background-color: #E7E9F5;
  border-radius: 0.75rem;
  font-size: 0.75rem;
  padding:0.25rem 0.625rem;
  margin:0 0.125rem;
  word-break:keep-all;
  font-weight: 500;
`;

/**
 * 각 테이블 셀에 들어갈 Input
 * @param data 표시할 data 
 * @returns 
 */
const InputDivElement = ({ data }: InputDivElementProps): JSX.Element => {
  let inputObject;
  if (typeof data === "string") { // type is string
    inputObject = <p>{data}</p>;
  } else { // typs is Array
    inputObject = data.map((item: string, index: number) => // create tag element
      <TagSpan key={index}>{item}</TagSpan>
    );
  }
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

  const trObject = isOpen ?
    // open
    Object.keys(information).map(
      (key: any, trIndex: number) => <tr key={trIndex}>
        <td>{`${name[key]} *`}</td>
        <td><InputDivElement data={(information as any)[key]} /></td>
        <td>{trIndex === 0 && <FoldButton onClick={() => openHandler()}><IoChevronUpOutline size='18' /></FoldButton>}</td>
      </tr>
    )
    : // close
    <tr>
      <td>{`${name['name']} *`}</td>
      <td><InputDivElement data={information.name}></InputDivElement></td>
      <td><FoldButton onClick={() => openHandler()}><IoChevronDownOutline size='18' /></FoldButton></td>
    </tr>
  return (
    <TableForm>
      <Table>
        <thead></thead>
        <tbody>{trObject}</tbody>
      </Table>
    </TableForm>
  )
}

export default PIIAddTable;