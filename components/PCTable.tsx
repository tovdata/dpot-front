import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { ModalToInputURL } from './common/Modal';
import { EditableTable, EditableURLTableForm } from "./common/Table";
// Data (header)
import { cpiTableHeader, ecpiTableHeader, eppiTableHeader, ppiTableHeader } from '../models/static/header';
import { API_DT_CPI, API_DT_PFNI, API_DT_PPI, getListForPIM, processPIMData, setQueryData } from '../models/queryState';
// Type
import { SelectOptionsByColumn } from '../models/type';
// Status
import { GetCPIDefaultSelector, GetPersonalInfoSelector } from '../models/state';

/** 
 * [Component] 개인정보 제공 테이블
 */
const PPITable: React.FC<any> = ({ url }: any): JSX.Element => {
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(API_DT_PPI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PPI));
  // Get a state (for select options)
  const ref: any = useRecoilValue(GetPersonalInfoSelector);

  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PPI, val.mode, val.data));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, API_DT_PPI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, API_DT_PPI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, API_DT_PPI, mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, API_DT_PPI, mutate, 'save', record);
      return true;
    }
  };

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='ppi' url={url} />);
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
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(API_DT_PFNI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PFNI));
  // Get a state (for select options)
  const ref: any = useRecoilValue(GetPersonalInfoSelector);

  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PFNI, val.mode, val.data));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, API_DT_PFNI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, API_DT_PFNI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, API_DT_PFNI, mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, API_DT_PFNI, mutate, 'save', record);
      return true;
    }
  };

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='pfni' url={url} />);
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
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(API_DT_CPI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_CPI));
  // Get a state (for select options)
  const ref: any = {
    'ppi': useRecoilValue(GetPersonalInfoSelector),
    'cpi': useRecoilValue(GetCPIDefaultSelector)
  }
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    subject: ["이벤트 경품 물류 업무", "알림발송", "안심번호 서비스"]
  };

  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_CPI, val.mode, val.data));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, API_DT_CPI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, API_DT_CPI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, API_DT_CPI, mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, API_DT_CPI, mutate, 'save', record);
      return true;
    }
  }

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={cpiTableHeader} innerHeaders={ecpiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='cpi' url={url} />);
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