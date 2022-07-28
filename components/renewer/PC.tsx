import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import type { QueryClient, UseMutateFunction } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { Button, Tooltip } from 'antd';
import { EditableExpandTable, prerequisiteModal } from '@/components/common/ExpandTable';
import { ModalToInputURL } from '@/components/common/Modal';
import { EditableTableForm } from '@/components/common/Table';
// Data
import { cfniTableHeader, cpiTableHeader, ecfniTableHeader, ecpiTableHeader, epfniTableHeader, eppiTableHeader, pfniTableHeader, ppiTableHeader } from '@/models/static/header';
// Icon
const LinkOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.LinkOutlined));
// State
import { GetCPIDefaultSelector } from '@/models/state';
// Type
import { SelectOptionsByColumn } from '@/models/type';
// Query
import { getCFNIDatas, getCPIDatas, getFNIDatas, getPFNIDatas, getPIDatas, getPPIDatas, setDataByTableType } from '@/models/queries/apis/manage';
import { getUser } from '@/models/queries/apis/user';
import { setQueryData } from '@/models/queryState';
import { getService } from '@/models/queries/apis/company';
// Query key
import { KEY_SERVICE, KEY_USER } from '@/models/queries/key';
import { SERVICE_CFNI, SERVICE_CPI, SERVICE_FNI, SERVICE_PFNI, SERVICE_PI, SERVICE_PPI } from '@/models/queries/type';
// Util
import { decodeAccessToken } from 'utils/utils';

/**
 * [Internal Component] URL 입력을 위한 링크 버튼
 */
 const LinkButton: React.FC<any> = ({ onClick, url }): JSX.Element => {
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
 * @param {any} serviceType 서비스 타입
 * @param {QueryClient} queryClient query client
 * @param {UseMutateFunction<any, unknown, any, unknown>} mutate mutate
 * @returns 결과 데이터
 */
const onURLSaveHandler = (newUrl: string, url: any, serviceType: any, queryClient: QueryClient, mutate: UseMutateFunction<any, unknown, any, unknown>) => {
  const newURL = { ...url };
  const mode = url.id ? (newUrl==='' ? 'url/delete' : 'url/save') : 'url/add';
  newURL.url = newUrl;
  setQueryData(queryClient, serviceType, mutate, mode, newURL);
};


/** [Component] 개인정보 제3자 제공 테이블 */
export const PPITableForm: React.FC<any> = ({ accessToken, modal, serviceId }): JSX.Element => {
  // 사용자 ID 추출
  const userId: string = useMemo(() => decodeAccessToken(accessToken), [accessToken]);
  // 사용자 조회
  const { data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));
  // 서비스 조회
  const { data: service } = useQuery([KEY_SERVICE, serviceId], async () => await getService(serviceId));
  // 전제 조건
  const [prerequisite, setPrerequisite] = useState<boolean>(false);

  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = useMemo(() => ({
    period: ["제공동의", "구매", "거래종료", "배송 완료", "서비스 해지", "회원 탈퇴", "위탁계약 종료"]
  }), []);

  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery([SERVICE_PPI, serviceId], async () => await getPPIDatas(serviceId));
  // Get a state (for select options)
  const { isLoading: loadingPI, data: pi } = useQuery([SERVICE_PI, serviceId], async () => await getPIDatas(serviceId));
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((value: any) => setDataByTableType({ id: userId, userName: user?.userName }, { id: serviceId, serviceName: service?.serviceName }, SERVICE_PPI, value.mode, value.data));
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<any>({ url: '' });

  // data로 부터 url 셋팅
  useEffect(() => {
    const _url = data?.filter((item:any) => typeof item.url !== 'undefined');
    if (_url && _url.length > 0) setUrl(_url[0]);
  }, [data]);
  // 전제 조건 검토
  useEffect(() => pi && pi.length > 0 ? setPrerequisite(true) : setPrerequisite(false), [pi]);

  /** [Event handler] 행(Row) 추가 이벤트 */
  const onAdd = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_PPI, serviceId], mutate, 'create', record), [mutate, queryClient, serviceId]);
  /** [Event handler] 모달 닫기 */
  const onClose = useCallback(() => setIsModalOpen(false), []);
  /** [Event handler] 행(Row) 삭제 이벤트 */
  const onDelete = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_PPI, serviceId], mutate, 'delete', record), [mutate, serviceId, queryClient]);
  /** [Event handler] 가이드 */
  const onGuide = useCallback(() => window.open('https://support.plip.kr/954ae661-0897-4dbe-9f00-a382c2392c65', '_blank'), []);
  /** [Event handler] 링크 모달 오픈 */
  const onOpenModal = useCallback(() => prerequisite ? setIsModalOpen(true) : modal ? prerequisiteModal(false) : prerequisiteModal(), [modal, prerequisite]);
  /** [Event handler] 행(Row) 저장 이벤트 */
  const onSave = useCallback((record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, [SERVICE_PPI, serviceId], mutate, 'add', record);
      return true;
    } else {
      if (!record.isForeign) {
        setQueryData(queryClient, [SERVICE_PPI, serviceId], mutate, 'save', { ...record, country: '', location: '', method: [], charger: [] });
      } else {
        setQueryData(queryClient, [SERVICE_PPI, serviceId], mutate, 'save', record);
      }
      return true;
    }
  }, [mutate, queryClient, serviceId]);
  /** [Event handler] URL 저장 */
  const onSaveUrl = useCallback((newUrl: string): void => onURLSaveHandler(newUrl, url, [SERVICE_PPI, serviceId], queryClient, mutate), [mutate, queryClient, serviceId, url]);

  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = useMemo(() => (
    <div>
      <Button onClick={onGuide} style={{ marginRight: 8 }} type='default'>제공 정보 입력 가이드</Button>
      <LinkButton onClick={onOpenModal} url={url.url} />
    </div>
  ), [onOpenModal, url]);
  // URL 정보를 제외한 PIM List
  const PIMList: any[] = useMemo(() => data ? data.filter((item:any) => item.url === undefined): [], [data]);

  // 컴포넌트 반환
  return (
    <EditableTableForm description='‘개인정보 제3자 제공’이란, 제3자의 목적을 위해 개인정보를 외부에 제공하는 것을 말해요.\n각 제공 건에 대해 아래의 내용을 입력해주세요. 국외로 제공되는 경우에는 ‘국외 여부’에 체크한 뒤 추가 정보도 입력해야 해요.\n제3자 제공내역이 정리된 별도의 페이지가 있다면, 우측에 ‘링크(URL)’ 버튼을 클릭하여 연결시킬 수 있어요.' modal={modal} title='개인정보 제3자 제공' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url.url} open={isModalOpen} onClose={onClose} onSave={onSaveUrl} />
      ) : (<></>)}
      <EditableExpandTable dataSource={isLoading ? [] : PIMList} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={ppiTableHeader} innerHeaders={eppiTableHeader} isLoading={isLoading} modal={modal} onAdd={onAdd} onDelete={onDelete} onSave={onSave} prerequisite={prerequisite} refData={loadingPI ? [] : pi} tableName={SERVICE_PPI} />
    </EditableTableForm>
  );
}
/** [Component] 가명정보 제3자 제공 테이블 */
export const PFNITableForm: React.FC<any> = ({ accessToken, modal, serviceId, style }): JSX.Element => {
  // 사용자 ID 추출
  const userId: string = useMemo(() => decodeAccessToken(accessToken), [accessToken]);
  // 사용자 조회
  const { data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));
  // 서비스 조회
  const { data: service } = useQuery([KEY_SERVICE, serviceId], async () => await getService(serviceId));
  // 전제 조건
  const [prerequisite, setPrerequisite] = useState<boolean>(false);

  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = useMemo(() => ({
    period: ["연구 종료", "계약", "처리 완료", "이용신청"]
  }), []);

  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery([SERVICE_PFNI, serviceId], async () => await getPFNIDatas(serviceId));
  // Get a state (for select options)
  const { isLoading: loadingFNI, data: fni } = useQuery([SERVICE_FNI, serviceId], async () => await getFNIDatas(serviceId));
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((value: any) => setDataByTableType({ id: userId, userName: user?.userName }, { id: serviceId, serviceName: service?.serviceName }, SERVICE_PFNI, value.mode, value.data));
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<any>({ url: '' });

  // data로 부터 url 셋팅
  useEffect(() => {
    const _url = data?.filter((item:any) => typeof item.url !== 'undefined');
    if (_url && _url.length > 0) setUrl(_url[0]);
  }, [data]);
  // 전제 조건 검토
  useEffect(() => fni && fni.length > 0 ? setPrerequisite(true) : setPrerequisite(false), [fni, loadingFNI]);

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_PFNI, serviceId], mutate, 'create', record), [mutate, serviceId, queryClient]);
  /** [Event handler] 모달 닫기 */
  const onClose = useCallback(() => setIsModalOpen(false), []);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_PFNI, serviceId], mutate, 'delete', record), [mutate, serviceId, queryClient]);
  /** [Event handler] 링크 모달 오픈 */
  const onOpenModal = useCallback(() => prerequisite ? setIsModalOpen(true) : modal ? prerequisiteModal(false, true) : prerequisiteModal(true, true), [modal, prerequisite]);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = useCallback((record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, [SERVICE_PFNI, serviceId], mutate, 'add', record);
      return true;
    } else {
      if (!record.isForeign) {
        setQueryData(queryClient, [SERVICE_PFNI, serviceId], mutate, 'save', { ...record, country: '', location: '', method: [], charger: [] });
      } else {
        setQueryData(queryClient, [SERVICE_PFNI, serviceId], mutate, 'save', record);
      }
      return true;
    }
  }, [mutate, serviceId, queryClient]);
  /** [Event handler] URL 저장 */
  const onSaveUrl = useCallback((newUrl: string): void => onURLSaveHandler(newUrl, url, [SERVICE_PFNI, serviceId], queryClient, mutate), [mutate, queryClient, serviceId, url]);

  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = useMemo(() => (
    <LinkButton onClick={onOpenModal} url={url.url} />
  ), [onOpenModal, url]);
  // URL 정보를 제외한 PIM List
  const PIMList = useMemo(() => data ? data.filter((item:any) => item.url === undefined) : [], [data]);
  // 컴포넌트 반환
  return (
    <EditableTableForm modal={modal} style={style} title='가명정보 제3자 제공' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='제공 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url.url} open={isModalOpen} onClose={onClose} onSave={onSaveUrl} />
      ) : (<></>)}
      <EditableExpandTable dataSource={isLoading ? [] : PIMList} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={pfniTableHeader} innerHeaders={epfniTableHeader} isLoading={isLoading} modal={modal} onAdd={onAdd} onDelete={onDelete} onSave={onSave} prerequisite={prerequisite} refData={loadingFNI ? [] : fni} tableName={SERVICE_PFNI} />
    </EditableTableForm>
  );
}
/** [Component] 개인정보 제3자 위탁 테이블 */
export const CPITableForm: React.FC<any> = ({ accessToken, modal, serviceId }): JSX.Element => {
  // 사용자 ID 추출
  const userId: string = useMemo(() => decodeAccessToken(accessToken), [accessToken]);
  // 사용자 조회
  const { data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));
  // 서비스 조회
  const { data: service } = useQuery([KEY_SERVICE, serviceId], async () => await getService(serviceId));
  // 전제 조건
  const [prerequisite, setPrerequisite] = useState<boolean>(false);

  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = useMemo(() => ({
    subject: ["본인확인", "안심번호 서비스", "결제 및 요금정산", "고객 상담 및 문의", "상품 배송", "클라우드 및 인프라", "알림 발송", "홍보 및 마케팅", "방문 트래픽·로그 분석"],
  }), []);

  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery([SERVICE_CPI, serviceId], async () => await getCPIDatas(serviceId));
  const { isLoading: loadingPI, data: pi } = useQuery([SERVICE_PI, serviceId], async () => await getPIDatas(serviceId));
  // Get a state (for select options)
  const ref: any = {
    [SERVICE_PI]: loadingPI ? [] : pi,
    [SERVICE_CPI]: useRecoilValue(GetCPIDefaultSelector)
  }
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((value: any) => setDataByTableType({ id: userId, userName: user?.userName }, { id: serviceId, serviceName: service?.serviceName }, SERVICE_CPI, value.mode, value.data));
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<any>({ url: '' });

  // data로 부터 url 셋팅
  useEffect(() => {
    const _url = data?.filter((item:any) => item.url !== undefined);
    if (_url && _url.length > 0) setUrl(_url[0]);
  }, [data]);
  // 전제 조건 검토
  useEffect(() => pi && pi.length > 0 ? setPrerequisite(true) : setPrerequisite(false), [pi]);

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_CPI, serviceId], mutate, 'create', record), [mutate, serviceId, queryClient]);
  /** [Event handler] 모달 닫기 */
  const onClose = useCallback(() => setIsModalOpen(false), []);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_CPI, serviceId], mutate, 'delete', record), [mutate, serviceId, queryClient]);
  /** [Event handler] 가이드 */
  const onGuide = useCallback(() => window.open('https://support.plip.kr/eb41bd26-7ba3-4703-a8e4-c047503f98f7', '_blank'), []);
  /** [Event handler] 링크 모달 오픈 */
  const onOpenModal = useCallback(() => prerequisite ? setIsModalOpen(true) : modal ? prerequisiteModal(false) : prerequisiteModal(), [modal, prerequisite]);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = useCallback((record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, [SERVICE_CPI, serviceId], mutate, 'add', record);
      return true;
    } else {
      if (!record.isForeign) {
        setQueryData(queryClient, [SERVICE_CPI, serviceId], mutate, 'save', { ...record, country: '', location: '', method: [], items: [], period: [], charger: [] });
      } else {
        setQueryData(queryClient, [SERVICE_CPI, serviceId], mutate, 'save', record);
      }
      return true;
    }
  }, [mutate, serviceId, queryClient]);
  /** [Event handler] URL 저장 */
  const onSaveUrl = useCallback((newUrl: string): void => onURLSaveHandler(newUrl, url, [SERVICE_CPI, serviceId], queryClient, mutate), [mutate, queryClient, serviceId, url]);

  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = useMemo(() => (
    <div>
      <Button onClick={onGuide} style={{ marginRight: 8 }} type='default'>위탁 정보 입력 가이드</Button>
      <LinkButton onClick={onOpenModal} url={url.url} />
    </div>
  ), [onOpenModal, url]);
  // URL 정보를 제외한 PIM List
  const PIMList: any[] = useMemo(() => data ? data.filter((item:any) => item.url === undefined) : [], [data]);
  // 컴포넌트 반환
  return (
    <EditableTableForm description='‘개인정보 위탁’이란 개인정보 처리 업무의 일부를 다른 업체에 맡겨 처리하는 것을 말합니다(콜센터, A/S센터, 클라우드 등).\n각 위탁 건에 대해 아래의 내용을 입력해주세요. 국외로 제공되는 경우에는 ‘국외 여부’에 체크한 뒤 추가 정보도 입력해야 해요.\n위탁 내역이 정리된 별도의 페이지가 있다면, 우측에 ‘링크(URL)’ 버튼을 클릭하여 연결시킬 수 있어요.' modal={modal} title='개인정보 위탁' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='위탁 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url.url} open={isModalOpen} onClose={onClose} onSave={onSaveUrl} />
      ) : (<></>)}
      <EditableExpandTable dataSource={isLoading ? [] : PIMList} defaultSelectOptions={defaultSelectOptions} expandKey='isForeign' headers={cpiTableHeader} innerHeaders={ecpiTableHeader} isLoading={isLoading} modal={modal} onAdd={onAdd} onDelete={onDelete} onSave={onSave} prerequisite={prerequisite} refData={ref} tableName={SERVICE_CPI} />
    </EditableTableForm>
  );
}
/** [Component] 가명정보 제3자 위탁 테이블 */
export const CFNITableForm: React.FC<any> = ({ accessToken, modal, serviceId, style }): JSX.Element => {
  // 사용자 ID 추출
  const userId: string = useMemo(() => decodeAccessToken(accessToken), [accessToken]);
  // 사용자 조회
  const { data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));
  // 서비스 조회
  const { data: service } = useQuery([KEY_SERVICE, serviceId], async () => await getService(serviceId));
  // 전제 조건
  const [prerequisite, setPrerequisite] = useState<boolean>(false);

  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery([SERVICE_CFNI, serviceId], async () => await getCFNIDatas(serviceId));
  // Get a state (for select options)
  const { isLoading: loadingFNI, data: fni } = useQuery([SERVICE_FNI, serviceId], async () => await getFNIDatas(serviceId));
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((value: any) => setDataByTableType({ id: userId, userName: user?.userName }, { id: serviceId, serviceName: service?.serviceName }, SERVICE_CFNI, value.mode, value.data));
  // Set a URL modal open state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  // Set a url value
  const [url, setUrl] = useState<any>({ url: '' });

  // data로 부터 url 셋팅
  useEffect(() => {
    const _url = data?.filter((item:any) => item.url !== undefined);
    if (_url && _url.length > 0) setUrl(_url[0]);
  }, [data]);
  // 전제 조건 검토
  useEffect(() => fni && fni.length > 0 ? setPrerequisite(true) : setPrerequisite(false), [fni]);

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_CFNI, serviceId], mutate, 'create', record), [mutate, serviceId, queryClient]);
  /** [Event handler] 모달 닫기 */
  const onClose = useCallback(() => setIsModalOpen(false), []);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_CFNI, serviceId], mutate, 'delete', record), [mutate, serviceId, queryClient]);
  /** [Event handler] 링크 모달 오픈 */
  const onOpenModal = useCallback(() => prerequisite ? setIsModalOpen(true) : modal ? prerequisiteModal(false, true) : prerequisiteModal(true, true), [modal, prerequisite]);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = useCallback((record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, [SERVICE_CFNI, serviceId], mutate, 'add', record);
      return true;
    } else {
      if (!record.isForeign) {
        setQueryData(queryClient, [SERVICE_CFNI, serviceId], mutate, 'save', { ...record, country: '', location: '', method: [], items: [], period: [], charger: [] });
      } else {
        setQueryData(queryClient, [SERVICE_CFNI, serviceId], mutate, 'save', record);
      }
      return true;
    }
  }, [mutate, serviceId, queryClient]);
  /** [Event handler] URL 저장 */
  const onSaveUrl = useCallback((newUrl: string): void => onURLSaveHandler(newUrl, url, [SERVICE_CFNI, serviceId], queryClient, mutate), [mutate, queryClient, serviceId, url]);

  // 헤더에 들어갈 버튼 정의
  const tools: JSX.Element = useMemo(() => (
    <div>
      <LinkButton onClick={onOpenModal} url={url.url} />
    </div>
  ), [onOpenModal, url]);
  // URL 정보를 제외한 PIM List
  const PIMList: any[] = useMemo(() => data ? data.filter((item:any) => item.url === undefined) : [], [data]);
  // 컴포넌트 반환
  return (
    <EditableTableForm modal={modal} style={style} title='가명정보 위탁' tools={tools}>
      {isModalOpen ? (
        <ModalToInputURL discription='위탁 내용이 링크로 존재하는 경우 아래에 URL 주소를 입력해주세요.' defaultValue={url.url} open={isModalOpen} onClose={onClose} onSave={onSaveUrl} />
      ) : (<></>)}
      <EditableExpandTable dataSource={isLoading ? [] : PIMList} expandKey='isForeign' headers={cfniTableHeader} innerHeaders={ecfniTableHeader} isLoading={isLoading} modal={modal} onAdd={onAdd} onDelete={onDelete} onSave={onSave} prerequisite={prerequisite} refData={loadingFNI ? [] : fni} tableName={SERVICE_CFNI} />
    </EditableTableForm>
  );
}