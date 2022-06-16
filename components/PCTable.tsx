import { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient, QueryClient, UseMutateFunction } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { Button, Tooltip } from 'antd';
import { ModalToInputURL } from './common/Modal';
import { EditableExpandTable } from "./common/ExpandTable";
import { EditableTableForm } from "./common/Table";
// Data (header)
import { cfniTableHeader, cpiTableHeader, ecfniTableHeader, ecpiTableHeader, epfniTableHeader, eppiTableHeader, pfniTableHeader, ppiTableHeader } from '@/models/static/header';
import { SERVICE_CFNI, SERVICE_CPI, SERVICE_FNI, SERVICE_PFNI,SERVICE_PI, SERVICE_PPI } from '@/models/queries/type';
// Icon
import { LinkOutlined } from '@ant-design/icons';
// Type
import { SelectOptionsByColumn } from '@/models/type';
// Status
import { GetCPIDefaultSelector } from '@/models/state';
import { serviceSelector } from '@/models/session';
// Query
import { setQueryData } from '@/models/queryState';
import { getCFNIDatas, getCPIDatas, getFNIDatas, getPFNIDatas, getPIDatas, getPPIDatas, setDataByTableType } from '@/models/queries/api';

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
 * [Handler] URL 정보를 저장하는 Handler
 * @param {string} newUrl 새로 입력 받은 URL
 * @param {any} url 기존의 URL 정보
 * @param {string} serviceType 서비스 타입
 * @param {QueryClient} queryClient query client
 * @param {UseMutateFunction<any, unknown, any, unknown>} mutate mutate
 * @returns 결과 데이터
 */
const onURLSaveHandler = (newUrl: string, url:any, serviceType:string, queryClient:QueryClient, mutate: UseMutateFunction<any, unknown, any, unknown>) => {
  let newURL = { ...url };
  const mode = url.id ? (newUrl==='' ? 'url/delete' : 'url/save') : 'url/add';
  newURL.url = newUrl;
  setQueryData(queryClient, serviceType, mutate, mode, newURL);
};
/**
 * [Component] 개인정보 제공 테이블 Form
 */
export const PPITableForm: React.FC<any> = ({ modal }: any): JSX.Element => {
  // 서비스 정보 가져오기
  const service = useRecoilValue(serviceSelector);
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    period: ["제공동의", "구매", "거래종료", "배송 완료", "서비스 해지", "회원 탈퇴", "위탁계약 종료"]
  };

  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(SERVICE_PPI, async () => await getPPIDatas(service.id));
  // Get a state (for select options)
  const { isLoading: piLoading, data: piData } = useQuery(SERVICE_PI, async () => await getPIDatas(service.id));
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => setDataByTableType(service.id, SERVICE_PPI, val.mode, val.data));
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<any>({ url: '' });

  // data로 부터 url 셋팅
  useEffect(() => {
    const _url = data?.filter((item:any) => typeof item.url !== 'undefined');
    if (_url && _url.length > 0) setUrl(_url[0]);
  }, [data]);

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, SERVICE_PPI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, SERVICE_PPI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, SERVICE_PPI, mutate, 'add', record);
      return true;
    } else {
      if (!record.isForeign) {
        setQueryData(queryClient, SERVICE_PPI, mutate, 'save', { ...record, country: '', location: '', method: [], charger: [] });
      } else {
        setQueryData(queryClient, SERVICE_PPI, mutate, 'save', record);
      }
      return true;
    }
  };
  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = (
    <div>
      <Button style={{ marginRight: 8 }} type='default'>제공 정보 입력 가이드</Button>
      <LinkButton onClick={() => setIsModalOpen(true)} url={url.url} />
    </div>
  );
  // URL 정보를 제외한 PIM List
  const PIMList = data?.filter((item:any) => item.url === undefined);
  // 개인정보 제공 테이블
  const PPITable = <EditableExpandTable dataSource={isLoading ? [] : data ? PIMList as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={piLoading ? [] : piData} tableName={SERVICE_PPI} />
  // 컴포넌트 반환
  return (
    <EditableTableForm description='‘개인정보 제3자 제공’이란, 제3자의 목적을 위해 개인정보를 외부에 제공하는 것을 말해요.\n각 제공 건에 대해 아래의 내용을 입력해주세요. 국외로 제공되는 경우에는 ‘국외 여부’에 체크한 뒤 추가 정보도 입력해야 해요.\n제3자 제공내역이 정리된 별도의 페이지가 있다면, 우측에 ‘링크(URL)’ 버튼을 클릭하여 연결시킬 수 있어요.' modal={modal} title='개인정보 제3자 제공' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url.url} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} onSave={(newURL:string) => onURLSaveHandler(newURL, url, SERVICE_PPI, queryClient, mutate)} />
      ) : (<></>)}
      {PPITable}
    </EditableTableForm>
  );
}
/**
 * [Component] 가명정보 제공 테이블 Form
 */
export const PFNITableForm: React.FC<any> = ({ modal, style }: any): JSX.Element => {
  // 서비스 정보 가져오기
  const service = useRecoilValue(serviceSelector);
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    period: ["연구 종료", "계약", "처리 완료", "이용신청"]
  };

  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(SERVICE_PFNI, async () => await getPFNIDatas(service.id));
  // Get a state (for select options)
  const { isLoading: fniLoading, data: fniData } = useQuery(SERVICE_FNI, async () => await getFNIDatas(service.id));
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => setDataByTableType(service.id, SERVICE_PFNI, val.mode, val.data));
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<any>({ url: '' });

  // data로 부터 url 셋팅
  useEffect(() => {
    const _url = data?.filter((item:any) => typeof item.url !== 'undefined');
    if (_url && _url.length > 0) setUrl(_url[0]);
  }, [data]);

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, SERVICE_PFNI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, SERVICE_PFNI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, SERVICE_PFNI, mutate, 'add', record);
      return true;
    } else {
      if (!record.isForeign) {
        setQueryData(queryClient, SERVICE_PFNI, mutate, 'save', { ...record, country: '', location: '', method: [], charger: [] });
      } else {
        setQueryData(queryClient, SERVICE_PFNI, mutate, 'save', record);
      }
      return true;
    }
  };
  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = (
    <LinkButton onClick={() => setIsModalOpen(true)} url={url.url} />
  );
  // URL 정보를 제외한 PIM List
  const PIMList = data?.filter((item:any) => item.url === undefined);
  // 가명정보 제공 테이블
  const PFNITable = <EditableExpandTable dataSource={isLoading ? [] : data ? PIMList as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={pfniTableHeader} innerHeaders={epfniTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={fniLoading ? [] : fniData} tableName={SERVICE_PFNI} />
  // 컴포넌트 반환
  return (
    <EditableTableForm modal={modal} style={style} title='가명정보 제3자 제공' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url.url} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} onSave={(newURL:string) => onURLSaveHandler(newURL, url, SERVICE_PFNI, queryClient, mutate)} />
      ) : (<></>)}
      {PFNITable}
    </EditableTableForm>
  );
}
/**
 * [Component] 개인정보 위탁 테이블 Form
 */
export const CPITableForm: React.FC<any> = ({ modal }: any): JSX.Element => {
  // 서비스 정보 가져오기
  const service = useRecoilValue(serviceSelector);
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    subject: ["본인확인", "안심번호 서비스", "결제 및 요금정산", "고객 상담 및 문의", "상품 배송", "클라우드 및 인프라", "알림 발송", "홍보 및 마케팅", "방문 트래픽·로그 분석"],
  };

  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(SERVICE_CPI, async () => await getCPIDatas(service.id));
  const { isLoading: piLoading, data: piData } = useQuery(SERVICE_PI, async () => await getPIDatas(service.id));
  // Get a state (for select options)
  const ref: any = {
    [SERVICE_PI]: piLoading ? [] : piData,
    [SERVICE_CPI]: useRecoilValue(GetCPIDefaultSelector)
  }
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => setDataByTableType(service.id, SERVICE_CPI, val.mode, val.data));
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<any>({ url: '' });

  // data로 부터 url 셋팅
  useEffect(() => {
    const _url = data?.filter((item:any) => item.url !== undefined);
    if (_url && _url.length > 0) setUrl(_url[0]);
  }, [data]);

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, SERVICE_CPI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, SERVICE_CPI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, SERVICE_CPI, mutate, 'add', record);
      return true;
    } else {
      if (!record.isForeign) {
        setQueryData(queryClient, SERVICE_CPI, mutate, 'save', { ...record, country: '', location: '', method: [], items: [], period: [], charger: [] });
      } else {
        setQueryData(queryClient, SERVICE_CPI, mutate, 'save', record);
      }
      return true;
    }
  }
  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = (
    <div>
      <Button style={{ marginRight: 8 }} type='default'>위탁 정보 입력 가이드</Button>
      <LinkButton onClick={() => setIsModalOpen(true)} url={url.url} />
    </div>
  );
  // URL 정보를 제외한 PIM List
  const PIMList = data?.filter((item:any) => item.url === undefined);
  // 개인정보 위탁 테이블
  const CPITable = <EditableExpandTable dataSource={isLoading ? [] : data ? PIMList as any[] : []} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={cpiTableHeader} innerHeaders={ecpiTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName={SERVICE_CPI} />
  // 컴포넌트 반환
  return (
    <EditableTableForm description='‘개인정보 위탁’이란 개인정보 처리 업무의 일부를 다른 업체에 맡겨 처리하는 것을 말합니다(콜센터, A/S센터, 클라우드 등).\n각 위탁 건에 대해 아래의 내용을 입력해주세요. 국외로 제공되는 경우에는 ‘국외 여부’에 체크한 뒤 추가 정보도 입력해야 해요.\n위탁 내역이 정리된 별도의 페이지가 있다면, 우측에 ‘링크(URL)’ 버튼을 클릭하여 연결시킬 수 있어요.' modal={modal} title='개인정보 위탁' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='위탁 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url.url} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} onSave={(newURL:string) => onURLSaveHandler(newURL, url, SERVICE_CPI, queryClient, mutate)} />
      ) : (<></>)}
      {CPITable}
    </EditableTableForm>
  );
}
/**
 * [Component] 가명정보 위탁 테이블 Form
 */
export const CFNITableForm: React.FC<any> = ({ modal, style }: any): JSX.Element => {
  // 서비스 정보 가져오기
  const service = useRecoilValue(serviceSelector);
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(SERVICE_CFNI, async () => await getCFNIDatas(service.id));
  // Get a state (for select options)
  const { isLoading: fniLoading, data: fniData } = useQuery(SERVICE_FNI, async () => await getFNIDatas(service.id));
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => setDataByTableType(service.id, SERVICE_CFNI, val.mode, val.data));
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<any>({ url: '' });

  // data로 부터 url 셋팅
  useEffect(() => {
    const _url = data?.filter((item:any) => item.url !== undefined);
    if (_url && _url.length > 0) setUrl(_url[0]);
  }, [data]);

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, SERVICE_CFNI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, SERVICE_CFNI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, SERVICE_CFNI, mutate, 'add', record);
      return true;
    } else {
      if (!record.isForeign) {
        setQueryData(queryClient, SERVICE_CFNI, mutate, 'save', { ...record, country: '', location: '', method: [], items: [], period: [], charger: [] });
      } else {
        setQueryData(queryClient, SERVICE_CFNI, mutate, 'save', record);
      }
      return true;
    }
  }
  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = (
    <div>
      <LinkButton onClick={() => setIsModalOpen(true)} url={url.url} />
    </div>
  );
  // URL 정보를 제외한 PIM List
  const PIMList = data?.filter((item:any) => item.url === undefined);
  // 가명정보 위탁 테이블 
  const CFNITable = <EditableExpandTable dataSource={isLoading ? [] : data ? PIMList as any[] : []} expandKey='isForeign' headers={cfniTableHeader} innerHeaders={ecfniTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={fniLoading ? [] : fniData} tableName={SERVICE_CFNI} />
  // 컴포넌트 반환
  return (
    <EditableTableForm modal={modal} style={style} title='가명정보 위탁' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='위탁 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url.url} open={isModalOpen} onClose={() => { setIsModalOpen(false) }} onSave={(newURL:string) => onURLSaveHandler(newURL, url, SERVICE_CFNI, queryClient, mutate)} />
      ) : (<></>)}
      {CFNITable}
    </EditableTableForm>
  );
}