import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { GetCPIDefaultSelector, GetPersonalInfoSelector } from '../models/state';
import { consignmentPersonalInfo, provisionPersonalInfo } from "../models/temporary";
import { SelectOptionsByColumn } from '../models/type';
import { ModalToInputURL } from './common/Modal';
import { EditableTable, EditableURLTableForm, setDataSource } from "./common/Table";
// Data
import { cpiTableHeader, ecpiTableHeader, eppiTableHeader, ppiTableHeader } from '../models/static/header';


/** 
 * [Component] 개인정보 제공 테이블
 */
const PPITable: React.FC<any> = ({ url }: any): JSX.Element => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(provisionPersonalInfo));
  // Get a state (for select options)
  const ref: any = useRecoilValue(GetPersonalInfoSelector);

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setData([...data, record]);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  };

  // Return an element
  return (<EditableTable dataSource={data} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='ppi' url={url} />);
}
/**
 * [Component] 개인정보 제공 테이블 Form
 */
export const PPITableForm: React.FC<any> = ({ mode }: any): JSX.Element => {
  // Set a URL modal open state
  const [isModalOpen, setIseModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');

  // Return an element
  return (
    <EditableURLTableForm onClickURL={() => setIseModalOpen(true)} title={mode ? '' : '개인정보 제공'}>
      {isModalOpen ? (
        <ModalToInputURL discription='제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url} open={isModalOpen} onClose={() => { setIseModalOpen(false) }} onSave={setUrl} />
      ) : (<></>)}
      <PPITable />
    </EditableURLTableForm>
  );
}
/**
 * [Component] 가명정보 제공 테이블
 */
export const PFNITable: React.FC<any> = ({ url }: any) => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(provisionPersonalInfo));
  // Get a state (for select options)
  const ref: any = useRecoilValue(GetPersonalInfoSelector);

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setData([...data, record]);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  };

  // Return an element
  return (<EditableTable dataSource={data} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='pfni' url={url} />)
};
/**
 * [Component] 개인정보 제공 테이블 Form
 */
export const PFNITableForm: React.FC<any> = ({ mode }: any): JSX.Element => {
  // Set a URL modal open state
  const [isModalOpen, setIseModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');

  // Return an element
  return (
    <EditableURLTableForm onClickURL={() => setIseModalOpen(true)} title={mode ? '' : '가명정보 제공'}>
      {isModalOpen ? (
        <ModalToInputURL discription='제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url} open={isModalOpen} onClose={() => { setIseModalOpen(false) }} onSave={setUrl} />
      ) : (<></>)}
      <PFNITable />
    </EditableURLTableForm>
  );
}
/**
 * [Component] 개인정보 위탁 테이블
 */
export const CPITable: React.FC<any> = ({ url }: any): JSX.Element => {
  // Set a local state (for data)
  const [data, setData] = useState<any[]>(setDataSource(consignmentPersonalInfo));
  // Get a state (for select options)
  const ref: any = {
    'ppi': useRecoilValue(GetPersonalInfoSelector),
    'cpi': useRecoilValue(GetCPIDefaultSelector)
  }
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    subject: ["이벤트 경품 물류 업무", "알림발송", "안심번호 서비스"]
  };

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setData([...data, record]);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (index: number): void => data.length - 1 === index ? setData([...data.slice(0, index)]) : setData([...data.slice(0, index), ...data.slice(index + 1)]);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (index: number, record: any): boolean => {
    data.length - 1 === index ? setData([...data.slice(0, index), record]) : setData([...data.slice(0, index), record, ...data.slice(index + 1)]);
    return true;
  };

  // Return an element
  return (
    <EditableTable dataSource={data} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={cpiTableHeader} innerHeaders={ecpiTableHeader} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='cpi' url={url} />
  );
}
/**
 * [Component] 개인정보 제공 테이블 Form
 */
export const CPITableForm: React.FC<any> = ({ mode }: any): JSX.Element => {
  // Set a URL modal open state
  const [isModalOpen, setIseModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');

  // Return an element
  return (
    <EditableURLTableForm onClickURL={() => setIseModalOpen(true)} title={mode ? '' : '개인정보 위탁'}>
      {isModalOpen ? (
        <ModalToInputURL discription='위탁 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url} open={isModalOpen} onClose={() => { setIseModalOpen(false) }} onSave={setUrl} />
      ) : (<></>)}
      <CPITable />
    </EditableURLTableForm>
  );
}