import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { ModalToInputURL } from './common/Modal';
import { EditableTable, EditableURLTableForm } from "./common/Table";
// Data (header)
import { cpiTableHeader, ecpiTableHeader, eppiTableHeader, ppiTableHeader } from '../models/static/header';
import { getListForPIM, PIMType, processPIMData, setQueryData } from '../models/queryState';
// Type
import { SelectOptionsByColumn } from '../models/type';
// Status
import { GetCPIDefaultSelector } from '../models/state';

// Set a type
const TYPE_PI: PIMType = 'pi';
const TYPE_FNI: PIMType = 'fni';
const TYPE_PPI: PIMType = 'ppi';
const TYPE_CPI: PIMType = 'cpi';
const TYPE_PFNI: PIMType = 'pfni';
const TYPE_CFNI: PIMType = 'cfni';

/** 
 * [Component] 개인정보 제공 테이블
 */
const PPITable: React.FC<any> = ({ url }: any): JSX.Element => {
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(TYPE_PPI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_PPI));
  // 서버로부터 pi테이블 데이터 가져오기 (for select options)
  const { isLoading: piLoading, data: piData } = useQuery(TYPE_PI, () => getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_PI));
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_PPI, val.mode, val.data));
  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, TYPE_PPI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, TYPE_PPI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, TYPE_PPI, mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, TYPE_PPI, mutate, 'save', record);
      return true;
    }
  };
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    period: ["제공동의", "구매", "거래종료", "배송 완료", "서비스 해지", "회원 탈퇴", "위탁계약 종료"]
  };

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={piLoading ? [] : piData} tableName={TYPE_PPI} url={url} />);
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
  const { isLoading, data } = useQuery(TYPE_PFNI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_PFNI));
  // 서버로부터 pi테이블 데이터 가져오기 (for select options)
  const { isLoading: fniLoading, data: fniData } = useQuery(TYPE_FNI, () => getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_FNI));
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_PFNI, val.mode, val.data));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, TYPE_PFNI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, TYPE_PFNI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, TYPE_PFNI, mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, TYPE_PFNI, mutate, 'save', record);
      return true;
    }
  };

  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    period: ["연구 종료", "계약", "처리 완료", "이용신청"]
  };

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={fniLoading ? [] : fniData} tableName={TYPE_PFNI} url={url} />);
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
  const { isLoading, data } = useQuery(TYPE_CPI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_CPI));
  // 서버로부터 pi테이블 데이터 가져오기 (for select options)
  const { isLoading: ppiLoading, data: ppiData } = useQuery(TYPE_PPI, () => getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_PPI));

  // Get a state (for select options)
  const ref: any = {
    'ppi': ppiLoading ? [] : ppiData,
    'cpi': useRecoilValue(GetCPIDefaultSelector)
  }
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    subject: ["본인확인", "안심번호 서비스", "결제 및 요금정산", "고객 상담 및 문의", "상품 배송", "클라우드 및 인프라", "알림 발송", "홍보 및 마케팅", "방문 트래픽·로그 분석"],
  };

  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_CPI, val.mode, val.data));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, TYPE_CPI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, TYPE_CPI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, TYPE_CPI, mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, TYPE_CPI, mutate, 'save', record);
      return true;
    }
  }

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={cpiTableHeader} innerHeaders={ecpiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName={TYPE_CPI} url={url} />);
}
/**
 * [Component] 개인정보 위탁 테이블 Form
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
/**
 * [Component] 가명정보 위탁 테이블
 */
export const CFNITable: React.FC<any> = ({ url }: any): JSX.Element => {
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(TYPE_CFNI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_CFNI));

  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', TYPE_CFNI, val.mode, val.data));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, TYPE_CFNI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, TYPE_CFNI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, TYPE_CFNI, mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, TYPE_CFNI, mutate, 'save', record);
      return true;
    }
  }

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} expandKey='isForeign' headers={cpiTableHeader} innerHeaders={ecpiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={[]} tableName={TYPE_CFNI} url={url} />);
}
/**
 * [Component] 개인정보 위탁 테이블 Form
 */
export const CFNITableForm: React.FC<any> = ({ mode }: any): JSX.Element => {
  // Set a URL modal open state
  const [isModalOpen, setIseModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');

  // Return an element
  return (
    <EditableURLTableForm onClickURL={() => setIseModalOpen(true)} title={mode ? '' : '가명정보 위탁'}>
      {isModalOpen ? (
        <ModalToInputURL discription='위탁 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url} open={isModalOpen} onClose={() => { setIseModalOpen(false) }} onSave={setUrl} />
      ) : (<></>)}
      <CFNITable />
    </EditableURLTableForm>
  );
}