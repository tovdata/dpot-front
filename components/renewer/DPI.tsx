import dynamic from 'next/dynamic';
import { MutableRefObject, useCallback, useMemo, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import ReactToPrint from 'react-to-print';
// Component
import { Button, DatePicker, Descriptions, Input, Popconfirm, Table } from 'antd';
import { warningNotification } from '../common/Notification';
import { EditableTableForm, TableContentForList, TableContentForTags } from '../common/Table';
import { AddableTagSelect, TagSelect } from '../common/Select';
import { StyledDescriptionLabel, StyledInformationFormFooter, StyledInformationFormHeader, StyledPrintLayout } from '../styled/DPI';
import { PLIPLoadingContainer } from './Page';
// Icon
const PlusOutlined =  dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.PlusOutlined));
const VscChevronLeft = dynamic(() => import('react-icons/vsc').then((mod: any): any => mod.VscChevronLeft));
// Query
import { getDPIDatas, getPIItems, setDataByTableType } from '@/models/queries/apis/manage';
import { getUser } from '@/models/queries/apis/user';
import { getCompany } from '@/models/queries/apis/company';
// Query key
import { SERVICE_DPI } from '@/models/queries/type';
import { KEY_COMPANY, KEY_USER } from '@/models/queries/key';
// Util
import { blankCheck, decodeAccessToken } from '../../utils/utils';
import moment from 'moment';


/** [Interface] Properties for DPITable */
interface DPITableProps {
  accessToken: string
  onEdit: (id: string) => void;
  serviceId: string;
}
/** [Interface] Properties for DPITableForm */
export interface DPITableFormProps extends DPITableProps {
  onCreate: () => void;
}
/** [Interface] Properties for InformationForm */
export interface InformationFormProps {
  accessToken: string;
  companyId: string;
  data: any;
  onBack: () => void;
  serviceId: string;
}
/** [Interface] Properties for InformationFormHeader */
interface InformationFormHeaderProps {
  edit: boolean;
  onBack: () => void;
  onEdit: (status: boolean) => void;
  onSave: () => void;
  printRef: MutableRefObject<any>;
}
/** [Interface] Properties for InformationFormBodyProps */
interface InformationFormBodyProps {
  data: any;
  edit: boolean;
  items: string[];
  onChange: (property: string, value: any) => void;
  onDelete: (id: string) => void;
  refElements?: MutableRefObject<any[]>;
}
/** [Interface] Properties for PrintElement */
interface PrintElementProps {
  data: any;
  managerName: string;
  printRef: MutableRefObject<any>;
}
/** [Interface] Properties for DescriptionLabel */
interface DescriptionLabelProps {
  content: string;
  required?: boolean;
}

/** [Component] 개인정보 파기 테이블 Form */
export const DPITableForm: React.FC<DPITableFormProps> = ({ accessToken, onCreate, onEdit, serviceId }): JSX.Element => {
  // 파기에 대한 문서 생성 버튼 정의
  const tool: JSX.Element = useMemo(() => (<Button icon={<PlusOutlined />} onClick={onCreate} type='default'>추가하기</Button>), []);

  // 컴포넌트 반환
  return (
    <EditableTableForm title='개인정보 파기 관리대장' tools={tool}>
      <DPITable accessToken={accessToken} onEdit={onEdit} serviceId={serviceId} />
    </EditableTableForm>
  );
}
/** [Component] 개인정보 파기에 대한 자세한 정보 확인 Form (보기/편집/추가) */
export const InformationForm: React.FC<InformationFormProps> = ({ accessToken, companyId, data, onBack, serviceId }): JSX.Element => {
  // 사용자 ID 추출
  const userId: string = useMemo(() => decodeAccessToken(accessToken), [accessToken]);
  // 개인정보 수집 및 이용으로부터 항목 조회 (서버 API)
  const { isLoading: loadingItems, data: items } = useQuery(['piItems', serviceId], async () => await getPIItems(serviceId));
  // 사용자 조회
  const { isLoading: loadingUser, data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));
  // 회사 조회
  const { isLoading: loadingCompany, data: company } = useQuery([KEY_COMPANY, companyId], async () => await getCompany(companyId));

  // 데이터 상태 관리
  const [temp, setTemp] = useState<any>(data);
  // 현재 상태가 추가인지 편집인지 확인하는 메서드
  const checkNew = useCallback(() => !('id' in temp), [temp]);
  // 편집 상태 관리
  const [edit, setEdit] = useState<boolean>(checkNew() ? true : false);
  // HTML 요소 관리 (for focus)
  const refs: any = useRef<any[]>([]);
  const printRef: any = useRef<any>();
  // 쿼리 클라이언트 생성
  const queryClient = useQueryClient();

  /** [Event handler] 데이터 변경 이벤트 */
  const onChange = useCallback((property: string, value: any) => setTemp({ ...temp, [property]: value }), [temp]);
  /** [Event handler] 삭제 이벤트 */
  const onDelete = useCallback(async (id: string) => {
    if (user) {
      await setDataByTableType({ id: userId, userName: user.userName }, serviceId, SERVICE_DPI, 'delete', { id: id });
      // 데이터 갱신
      queryClient.invalidateQueries([SERVICE_DPI, serviceId]);
      // 목록으로 이동
      onBack();
    }
  }, [accessToken, serviceId, user, queryClient]);
  /** [Event handler] 편집 이벤트 */
  const onEdit = useCallback((status: boolean): void => {
    if (checkNew() && !status) {    // 추가이면서 취소일 경우, 테이블로 복귀
      onBack();
    } else if (!status) {           // 취소일 경우, 데이터 롤백
      setTemp(data);
    }
    // 상태 갱신
    setEdit(status);
  }, [checkNew]);
  /** [Event handler] 저장 이벤트 */
  const onSave = useCallback(async (): Promise<void> => {
    if (blankCheck(temp.subject)) {
      warningNotification('파기 대상 개인정보를 입력해주세요.');
      refs.current[0].focus();
    } else if (blankCheck(temp.date)) {
      warningNotification('파기 일시를 선택해주세요.');
      refs.current[1].focus();
    } else if (temp.reason.length === 0) {
      warningNotification('파기 사유를 입력해주세요.');
      refs.current[2].focus();
    } else if (temp.items.length === 0) {
      warningNotification('파기 항목을 선택해주세요.');
      refs.current[3].focus();
    } else if (blankCheck(temp.charger)) {
      warningNotification('담당자를 입력해주세요.');
      refs.current[4].focus();
    } else if (user) {
      const response: any = await setDataByTableType({ id: userId, userName: user.userName }, serviceId, SERVICE_DPI, checkNew() ? 'add' : 'save', temp);
      // 응답에 따른 처리
      if (response && 'id' in response) {
        temp.id = response.id;
        temp.unix = response.createAt;
      }
      // 데이터 갱신
      queryClient.invalidateQueries([SERVICE_DPI, serviceId]);
      // 편집 모드 종료
      setEdit(false);
    };
  }, [accessToken, checkNew, refs, serviceId, user, temp]);

  // 컴포넌트 반환
  return (
    <>
      {loadingCompany || loadingItems || loadingUser ? (
        <PLIPLoadingContainer />
      ) : (
        <>
          <InformationFormHeader edit={edit} onBack={onBack} onEdit={onEdit} onSave={onSave} printRef={printRef} />
          <InformationFormBody data={temp} edit={edit} items={items ? items : []} onChange={onChange} onDelete={onDelete} refElements={refs} />
          <div style={{ display: 'none' }}>
            <PrintElement data={temp} managerName={company ? company.manager.name : ''} printRef={printRef} />
          </div>
        </>
      )}
    </>
  );
}

/** [Internal Component] 커스텀 설명 제목 */
const DescriptionLabel: React.FC<DescriptionLabelProps> = ({ content, required }: DescriptionLabelProps): JSX.Element => {
  return (
    <StyledDescriptionLabel>
      {content}
      {required ? (
        <label className='required'>*</label>
      ) : (<></>)}
    </StyledDescriptionLabel>
  );
}
/** [Internal Component] 개인정보 파기 테이블 */
const DPITable: React.FC<DPITableProps> = ({ accessToken, onEdit, serviceId }): JSX.Element => {
  // 파기 데이터 조회
  const { isLoading, data } = useQuery([SERVICE_DPI, serviceId], async () => await getDPIDatas(serviceId));

  // 컴포넌트 반환
  return (
    <Table columns={[
      { title: '파기 일시', dataIndex: 'date', key: 'date', sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix() },
      { title: '파기 대상 개인정보', dataIndex: 'subject', key: 'subject' },
      { title: '파기 사유', dataIndex: 'reason', key: 'reason', render: (value: string[]): JSX.Element => (<TableContentForList items={value} />) },
      { title: '파기 항목', dataIndex: 'items', key: 'items', render: (value: string[]): JSX.Element => (<TableContentForTags items={value} tooltip='고유식별정보' />) }
    ]} dataSource={data ? data : []} loading={isLoading} onRow={(record: any) => ({ onClick: () => onEdit(record) })} showSorterTooltip={false} />
  );
}
/** [Internal Component] 개인정보 파기에 대한 자세한 정보 확인 Form body (보기/편집/추가) */
const InformationFormBody: React.FC<InformationFormBodyProps> = ({ data, edit, items, onChange, onDelete, refElements }): JSX.Element => {
  /** [Event handler] 파기 정보 삭제 */
  const onConfirm = useCallback(() => onDelete(data.id), [data.id]);

  // 컴포넌트 반환
  return (
    <>
      <Descriptions bordered column={1} labelStyle={{ width: 220 }}>
        <Descriptions.Item label={<DescriptionLabel content='파기 대상 개인정보' required />}>
          {edit ? (
            <Input onChange={(e: any): void => onChange('subject', e.target.value)} placeholder='직접 입력' ref={refElements ? (el: any) => (refElements.current[0] = el) : undefined} value={data.subject} />
          ) : (<>{data.subject}</>)}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 일시' required />}>
          {edit ? (
            <DatePicker format='YYYY-MM-DD' onChange={(value: any): void => onChange('date', value.format('YYYY-MM-DD'))} placeholder='날짜 선택' ref={refElements ? (el: any) => (refElements.current[1] = el) : undefined} style={{ width: '100%' }} value={data.date !== '' ? moment(data.date) : undefined} />
          ) : (<>{data.date}</>)}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 사유' required />}>
          {edit ? (
            <AddableTagSelect onChange={(value: string|string[]): void => onChange('reason', value)} options={["계약서에 명시된 보유기간 만료", "법령 의무 보유기간 만료", "이용자의 파기 요청", "1년 이상 서비스 미이용"]} placeholder='선택 및 직접 입력' refElement={refElements ? (el: any) => (refElements.current[2] = el) : undefined} value={data.reason} />
          ) : (
            <ul style={{ margin: 0, paddingLeft: 20 }}>
              {data.reason.map((item: string, index: number): JSX.Element => (<li key={index}>{item}</li>))}
            </ul>
          )}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 항목' required />}>
          {edit ? (
            <TagSelect onChange={(value: string|string[]): void => onChange('items', value)} options={items} placeholder='예시에서 선택' refElement={refElements ? (el: any) => (refElements.current[3] = el) : undefined} value={data.items} />
          ) : (<>{data.items.join(', ')}</>)}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='담당자' required />}>
          {edit ? (
            <Input onChange={(e: any): void => onChange('charger', e.target.value)} placeholder='김OO' ref={refElements ? (el: any) => (refElements.current[4] = el) : undefined} value={data.charger} />
          ) : (<>{data.charger}</>)}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 건수(정보주체 수)' />}>
          {edit ? (
            <Input onChange={(e: any): void => onChange('quantity', e.target.value)} placeholder='000건' value={data.quantity}  />
          ) : (<>{data.quantity}</>)}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 방법' />}>
          {edit ? (
              <Input onChange={(e: any): void => onChange('method', e.target.value)} placeholder='직접 입력' value={data.method}  />
            ) : (<>{data.method}</>)}
          </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 장소' />}>
          {edit ? (
              <Input onChange={(e: any): void => onChange('location', e.target.value)} placeholder='직접 입력' value={data.location} />
            ) : (<>{data.location}</>)}
          </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='생성일' />}>
          {edit ? (
            <DatePicker.RangePicker onChange={(value: any): void => onChange('period', [value[0].format('YYYY-MM-DD'), value[1].format('YYYY-MM-DD')])} placeholder={['날짜 선택', '날짜 선택']} style={{ width: '100%' }} value={data.period.length !== 0 ? [moment(data.period[0]), moment(data.period[1])] : undefined} />
          ) : data.period.length !== 0 ? (
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <span>{data.period[0]}</span>
              <span style={{ marginLeft: 16, marginRight: 16 }}>~</span>
              <span>{data.period[1]}</span>
            </div>
          ) : (<></>)}
        </Descriptions.Item>
      </Descriptions>
      {data.id !== undefined ? (
        <StyledInformationFormFooter>
          <Popconfirm cancelText='아니오' okText='예' onConfirm={onConfirm} placement='topRight' title='해당 파기 내용을 삭제하시겠습니까?'>
            <Button danger>삭제</Button>
          </Popconfirm>
        </StyledInformationFormFooter>
      ) : (<></>)}
    </>
  );
}
/** [Internal Component] 개인정보 파기에 대한 자세한 정보 확인 Form header (보기/편집/추가) */
const InformationFormHeader: React.FC<InformationFormHeaderProps> = ({ edit, onBack, onEdit, onSave, printRef }): JSX.Element => {
  return (
    <StyledInformationFormHeader>
      <div className='left'>
        <span className='back' onClick={onBack}>
          <VscChevronLeft />
        </span>
        <h2 className='title'>개인정보 파기 정보</h2>
      </div>
      <div className='right'>
        {edit ? (
          <>
            <Button onClick={() => onEdit(false)} style={{ marginRight: 16 }} type='default'>취소</Button>
            <Button onClick={onSave} type='primary'>저장</Button>
          </>
        ) : (
          <>
            <ReactToPrint trigger={() => (<Button style={{ marginRight: 16 }} type='default'>확인서 인쇄</Button>)} content={() => printRef.current} />
            <Button onClick={() => onEdit(true)} type='primary'>편집</Button>
          </>
        )}
      </div>
    </StyledInformationFormHeader>
  );
}
/** [Internal Component] 파기 문서 인쇄를 위한 컴포넌트 */
const PrintElement: React.FC<PrintElementProps> = ({ data, managerName, printRef }): JSX.Element => {
  // 컴포넌트 반환
  return (
    <StyledPrintLayout ref={printRef}>
      <h2 className='title'>개인정보 파기 확인서</h2>
      <Descriptions bordered column={1} labelStyle={{ width: 220 }}>
        <Descriptions.Item label={<DescriptionLabel content='파기 대상 개인정보' required />}>
          {data.subject}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 일시' required />}>
          {data.date}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 사유' required />}>
          <ul style={{ margin: 0, paddingLeft: 20 }}>
            {data.reason.map((item: string, index: number): JSX.Element => (<li key={index}>{item}</li>))}
          </ul>
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 항목' required />}>
          {data.items.join(', ')}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='담당자' required />}>
          {data.charger}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 건수(정보주체 수)' />}>
          {data.quantity}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 방법' />}>
          {data.method}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='파기 장소' />}>
          {data.location}
        </Descriptions.Item>
        <Descriptions.Item label={<DescriptionLabel content='생성일' />}>
          {data.period.length !== 0 ? (
            <div style={{ alignItems: 'center', display: 'flex' }}>
              <span>{data.period[0]}</span>
              <span style={{ marginLeft: 16, marginRight: 16 }}>~</span>
              <span>{data.period[1]}</span>
            </div>
          ) : (<></>)}
        </Descriptions.Item>
      </Descriptions>
      <div className='footer'>
        <h4 className='date'>{moment(data.date).year()}년 {moment(data.date).month() + 1}월 {moment(data.date).date()}일</h4>
        <p className='manager'>개인정보 보호책임자 <label>{managerName}</label> (인)</p>
      </div>
    </StyledPrintLayout>
  );
}