import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
// Component
import { ModalToInputURL } from './common/Modal';
import { EditableTable, EditableTableForm } from "./common/Table";
// Data (header)
import { cpiTableHeader, ecpiTableHeader, eppiTableHeader, ppiTableHeader } from '../models/static/header';
import { API_DT_CFNI, API_DT_CPI, API_DT_PFNI, API_DT_PI, API_DT_PPI, getListForPIM, processPIMData, setQueryData } from '../models/queryState';
// Type
import { SelectOptionsByColumn } from '../models/type';
// Status
import { Button, Popover, Tooltip } from 'antd';
import { LinkOutlined } from '@ant-design/icons';
import { useRecoilValue } from 'recoil';
import { GetCPIDefaultSelector } from '../models/state';

/** [Interface] Properties for LinkButton */
interface LinkButtonProps {
  onClick: () => void;
  url: string;
}

/**
 * [Internal Component] URL 입력을 위한 링크 버튼
 */
const LinkButton: React.FC<LinkButtonProps> = ({ onClick, url }: LinkButtonProps): JSX.Element => {
  return (
    <Tooltip title={url}>
      <Button icon={<LinkOutlined />} onClick={onClick} style={url === '' ? { borderColor: '#096DD9', color: '#096DD9' } : undefined} type={url === '' ? 'dashed' : 'primary'}>링크(URL)</Button>
    </Tooltip>
  );
}
/** 
 * [Internal Component] 개인정보 제공 테이블
 */
const PPITable: React.FC<any> = ({ url }: any): JSX.Element => {
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(API_DT_PPI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PPI));
  // Get a state (for select options)
  const { isLoading: piLoading, data: piData } = useQuery(API_DT_PI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PI));
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
      if (!record.isForeign) {
        setQueryData(queryClient, API_DT_PPI, mutate, 'save', { ...record, country: '', location: '', method: [], charger: [] });
      } else {
        setQueryData(queryClient, API_DT_PPI, mutate, 'save', record);
      }
      return true;
    }
  };
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    period: ["제공동의", "구매", "거래종료", "배송 완료", "서비스 해지", "회원 탈퇴", "위탁계약 종료"]
  };

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={piLoading ? [] : piData} tableName={API_DT_PPI} url={url} />);
}
/**
 * [Component] 개인정보 제공 테이블 Form
 */
export const PPITableForm: React.FC<any> = ({ modal }: any): JSX.Element => {
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');
  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = (
    <div>
      <Button style={{ marginRight: 8 }} type='default'>제공 정보 입력 가이드</Button>
      <LinkButton onClick={() => setIsModalOpen(true)} url={url} />
    </div>
  );
  // 컴포넌트 반환
  return (
    <EditableTableForm description='‘개인정보 제3자 제공’이란, 제3자의 목적을 위해 개인정보를 외부에 제공하는 것을 말해요.\n각 제공 건에 대해 아래의 내용을 입력해주세요. 국외로 제공되는 경우에는 ‘국외 여부’에 체크한 뒤 추가 정보도 입력해야 해요.\n제3자 제공내역이 정리된 별도의 페이지가 있다면, 우측에 ‘링크(URL)’ 버튼을 클릭하여 연결시킬 수 있어요.' modal={modal} title='개인정보 제3자 제공' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} onSave={setUrl} />
      ) : (<></>)}
      <PPITable />
    </EditableTableForm>
  );
}
/**
 * [Component] 가명정보 제공 테이블
 */
export const PFNITable: React.FC<any> = ({ url }: any) => {
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(API_DT_PFNI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PFNI));
  // Get a state (for select options)
  const { isLoading: pfniLoading, data: pfniData } = useQuery(API_DT_PFNI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PFNI));
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
      if (!record.isForeign) {
        setQueryData(queryClient, API_DT_PFNI, mutate, 'save', { ...record, country: '', location: '', method: [], charger: [] });
      } else {
        setQueryData(queryClient, API_DT_PFNI, mutate, 'save', record);
      }
      return true;
    }
  };

  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    period: ["연구 종료", "계약", "처리 완료", "이용신청"]
  };

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={pfniLoading ? [] : pfniData} tableName={API_DT_PFNI} url={url} />);
};
/**
 * [Component] 개인정보 제공 테이블 Form
 */
export const PFNITableForm: React.FC<any> = ({ modal }: any): JSX.Element => {
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');
  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = (
    <LinkButton onClick={() => setIsModalOpen(true)} url={url} />
  );
  // 컴포넌트 반환
  return (
    <EditableTableForm modal={modal} style={ modal ? undefined : { marginBottom: '4.625rem' }} title='가명정보 제3자 제공' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} onSave={setUrl} />
      ) : (<></>)}
      <PFNITable />
    </EditableTableForm>
  );
}
/**
 * [Component] 개인정보 위탁 테이블
 */
export const CPITable: React.FC<any> = ({ url }: any): JSX.Element => {
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(API_DT_CPI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_CPI));
  const { isLoading: ppiLoading, data: ppiData } = useQuery(API_DT_PPI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PPI));
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
      if (!record.isForeign) {
        setQueryData(queryClient, API_DT_CPI, mutate, 'save', { ...record, country: '', location: '', method: [], items: [], period: [], charger: [] });
      } else {
        setQueryData(queryClient, API_DT_CPI, mutate, 'save', record);
      }
      return true;
    }
  }

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={cpiTableHeader} innerHeaders={ecpiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName={API_DT_CPI} url={url} />);
}
/**
 * [Component] 개인정보 위탁 테이블 Form
 */
export const CPITableForm: React.FC<any> = ({ modal }: any): JSX.Element => {
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');
  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = (
    <LinkButton onClick={() => setIsModalOpen(true)} url={url} />
  );
  // 컴포넌트 반환
  return (
    <EditableTableForm description='‘개인정보 위탁’이란 개인정보 처리 업무의 일부를 다른 업체에 맡겨 처리하는 것을 말합니다(콜센터, A/S센터, 클라우드 등).\n각 위탁 건에 대해 아래의 내용을 입력해주세요. 국외로 제공되는 경우에는 ‘국외 여부’에 체크한 뒤 추가 정보도 입력해야 해요.\n위탁 내역이 정리된 별도의 페이지가 있다면, 우측에 ‘링크(URL)’ 버튼을 클릭하여 연결시킬 수 있어요.' modal={modal} title='개인정보 위탁' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='위탁 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} onSave={setUrl} />
      ) : (<></>)}
      <CPITable />
    </EditableTableForm>
  );
}
/**
 * [Component] 가명정보 위탁 테이블
 */
export const CFNITable: React.FC<any> = ({ url }: any): JSX.Element => {
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(API_DT_CFNI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_CFNI));

  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_CFNI, val.mode, val.data));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, API_DT_CFNI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, API_DT_CFNI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, API_DT_CFNI, mutate, 'add', record);
      return true;
    } else {
      if (!record.isForeign) {
        setQueryData(queryClient, API_DT_CFNI, mutate, 'save', { ...record, country: '', location: '', method: [], items: [], period: [], charger: [] });
      } else {
        setQueryData(queryClient, API_DT_CFNI, mutate, 'save', record);
      }
      return true;
    }
  }

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} expandKey='isForeign' headers={cpiTableHeader} innerHeaders={ecpiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={[]} tableName={API_DT_CFNI} url={url} />);
}
/**
 * [Component] 개인정보 위탁 테이블 Form
 */
export const CFNITableForm: React.FC<any> = ({ modal }: any): JSX.Element => {
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<string>('');
  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = (
    <div>
      <Button style={{ marginRight: 8 }} type='default'>위탁 정보 입력 가이드</Button>
      <LinkButton onClick={() => setIsModalOpen(true)} url={url} />
    </div>
  );
  // 컴포넌트 반환
  return (
    <EditableTableForm modal={modal} style={ modal ? undefined : { marginBottom: '4.625rem' }} title='가명정보 위탁' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='위탁 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} onSave={setUrl} />
      ) : (<></>)}
      <CFNITable />
    </EditableTableForm>
  );
}