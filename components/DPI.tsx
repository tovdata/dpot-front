import { MutableRefObject, useRef, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
// Component
import { Button, DatePicker, Descriptions, Input, Table } from 'antd';
import ReactToPrint from 'react-to-print';
import { BasicPageLoading } from './common/Loading';
import { warningNotification } from './common/Notification';
import { EditableTableForm, TableContentForList, TableContentForTags } from './common/Table';
import { AddableTagSelect, TagSelect } from './common/Select';
// Icon
import { PlusOutlined } from '@ant-design/icons';
import { VscChevronLeft } from 'react-icons/vsc';
// Module
import { blankCheck } from '../utils/utils';
import moment from 'moment';
// API
import { getDPIDatas, getPIItems, setDataByTableType } from '../models/queries/api';
import { SERVICE_DPI } from '../models/queries/type';

/** [Interface] Properties for DPITable */
interface DPITableProps {
  onEdit: (id: string) => void;
}
/** [Interface] Properties for DPITableForm */
interface DPITableFormProps extends DPITableProps {
  onCreate: () => void;
}
/** [Interface] Properties for InformationForm */
interface InformationFormProps {
  data: any;
  onBack: () => void;
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
  refElements?: MutableRefObject<any[]>;
}
/** [Interface] Properties for PrintElement */
interface PrintElementProps {
  data: any;
  printRef: MutableRefObject<any>;
}
/** [Interface] Properties for DescriptionLabel */
interface DescriptionLabelProps {
  content: string;
  required?: boolean;
}

/** [Component] 개인정보 파기 테이블 */
export const DPITable: React.FC<DPITableProps> = ({ onEdit }): JSX.Element => {
  // 데이터 조회
  const { isLoading, data } = useQuery(SERVICE_DPI, async () => await getDPIDatas('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  // 컴포넌트 반환
  return (
    <Table columns={[
      { title: '파기 일시', dataIndex: 'date', key: 'date', sorter: (a, b) => moment(a.date).unix() - moment(b.date).unix() },
      { title: '파기 대상 개인정보', dataIndex: 'subject', key: 'subject', render: (value: any, record: any): JSX.Element => (<p onClick={(e: any) => onEdit(record)} style={{ cursor: 'pointer', margin: 0 }}>{value}</p>) },
      { title: '파기 사유', dataIndex: 'reason', key: 'reason', render: (value: string[]): JSX.Element => (<TableContentForList items={value} />) },
      { title: '파기 항목', dataIndex: 'items', key: 'items', render: (value: string[]): JSX.Element => (<TableContentForTags items={value} tooltip='고유식별정보' />) }
    ]} dataSource={data ? data : []} loading={isLoading} />
  );
}
/** [Component] 개인정보 파기 테이블 Form */
export const DPITableForm: React.FC<DPITableFormProps> = ({ onCreate, onEdit }): JSX.Element => {
  // 파기에 대한 문서 생성 버튼 정의
  const tool: JSX.Element = (<Button icon={<PlusOutlined />} onClick={onCreate} type='default'>추가하기</Button>);
  // 컴포넌트 반환
  return (
    <EditableTableForm title='개인정보 파기 관리대장' tools={tool}>
      <DPITable onEdit={onEdit} />
    </EditableTableForm>
  );
}
/** [Component] 개인정보 파기에 대한 자세한 정보 확인 Form (보기/편집/추가) */
export const InformationForm: React.FC<InformationFormProps> = ({ data, onBack }): JSX.Element => {
  // 현재 상태가 추가인지 편집인지 확인하는 메서드
  const checkNew = (): boolean => !('id' in data);
  // 개인정보 수집 및 이용으로부터 항목 조회 (서버 API)
  const { isLoading, data: items } = useQuery('piItems', async () => getPIItems('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  // 편집 상태 관리
  const [edit, setEdit] = useState<boolean>(checkNew() ? true : false);
  // 데이터 상태 관리
  const [temp, setTemp] = useState<any>(data);
  // HTML 요소 관리 (for focus)
  const refs: any = useRef<any[]>([]);
  const printRef: any = useRef<any>();
  // 쿼리 클라이언트 생성
  const queryClient = useQueryClient();

  /** [Event handler] 데이터 변경 이벤트 */
  const onChange = (property: string, value: any) => setTemp({ ...temp, [property]: value });
  /** [Event handler] 편집 이벤트 */
  const onEdit = (status: boolean): void => {
    if (checkNew() && !status) {    // 추가이면서 취소일 경우, 테이블로 복귀
      onBack();
    } else if (!status) {           // 취소일 경우, 데이터 롤백
      setTemp(data);
    }
    // 상태 갱신
    setEdit(status);
  }
  /** [Event handler] 인쇄 이벤트 */
  const onPrint = (): void => {
  }
  /** [Event handler] 저장 이벤트 */
  const onSave = async (): Promise<void> => {
    if (blankCheck(temp.subject)) {
      warningNotification('파기 대상 개인정보는 필수로 입력되어야 합니다.');
      refs.current[0].focus();
    } else if (blankCheck(temp.date)) {
      warningNotification('파기 일시는 필수로 입력되어야 합니다.');
      refs.current[1].focus();
    } else if (temp.reason.length === 0) {
      warningNotification('파기 사유는 필수로 입력되어야 합니다.');
      refs.current[2].focus();
    } else if (temp.items.length === 0) {
      warningNotification('파기 항목은 필수로 입력되어야 합니다.');
      refs.current[3].focus();
    } else if (blankCheck(temp.charger)) {
      warningNotification('담당자에 대한 정보는 필수로 입력되어야 합니다.');
      refs.current[4].focus();
    } else {
      const response: any = await setDataByTableType('b7dc6570-4be9-4710-85c1-4c3788fcbd12', SERVICE_DPI, checkNew() ? 'add' : 'save', temp);
      // 응답에 따른 처리
      if (response && 'id' in response) {
        temp.id = response.id;
      }
      // 데이터 갱신
      queryClient.invalidateQueries(SERVICE_DPI);
      // 편집 모드 종료
      setEdit(false);
    }
  }

  // 컴포넌트 반환
  return (
    <>
      {isLoading ? (
        <BasicPageLoading />
      ) : (
        <>
          <InformationFormHeader edit={edit} onBack={onBack} onEdit={onEdit} onSave={onSave} printRef={printRef} />
          <InformationFormBody data={temp} edit={edit} items={items ? items : []} onChange={onChange} refElements={refs} />
          <div style={{ display: 'none' }}>
            <PrintElement data={temp} printRef={printRef} />
          </div>
        </>
      )}
    </>
  );
}
/** [Internal Component] 개인정보 파기에 대한 자세한 정보 확인 Form header (보기/편집/추가) */
const InformationFormHeader: React.FC<InformationFormHeaderProps> = ({ edit, onBack, onEdit, onSave, printRef }): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 74 }}>
      <div style={{ alignItems: 'center', display: 'flex', userSelect: 'none' }}>
        <span onClick={onBack} style={{ alignItems: 'center', color: '#242424', cursor: 'pointer', display:'flex', fontSize: 24, marginRight: 24 }}>
          <VscChevronLeft />
        </span>
        <h2 style={{ fontSize: 20, fontWeight: '600', lineHeight: '24px', marginBottom: 0 }}>개인정보 파기 정보</h2>
      </div>
      <div>
        {edit ? (
          <>
            <Button onClick={() => onEdit(false)} style={{ marginRight: 16 }} type='default'>취소</Button>
            <Button onClick={onSave} type='primary'>저장</Button>
          </>
        ) : (
          <>
            <ReactToPrint trigger={() => (<Button style={{ marginRight: 16 }} type='default'>인쇄</Button>)} content={() => printRef.current} />
            
            <Button onClick={() => onEdit(true)} type='primary'>편집</Button>
          </>
        )}
      </div>
    </div>
  );
}
/** [Internal Component] 개인정보 파기에 대한 자세한 정보 확인 Form body (보기/편집/추가) */
const InformationFormBody: React.FC<InformationFormBodyProps> = ({ data, edit, items, onChange, refElements }): JSX.Element => {
  return (
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
          <AddableTagSelect onChange={(value: string|string[]): void => onChange('reason', value)} options={[]} placeholder='선택 및 직접 입력' refElement={refElements ? (el: any) => (refElements.current[2] = el) : undefined} value={data.reason} />
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
          <Input onChange={(e: any): void => onChange('charger', e.target.value)} placeholder='직접 입력' ref={refElements ? (el: any) => (refElements.current[4] = el) : undefined}  value={data.charger} />
        ) : (<>{data.charger}</>)}
      </Descriptions.Item>
      <Descriptions.Item label={<DescriptionLabel content='파기 건수(정보주체 수)' />}>
        {edit ? (
          <Input onChange={(e: any): void => onChange('quantity', e.target.value)} placeholder='직접 입력' value={data.quantity}  />
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
  );
}
/** [Internal Component] 파기 문서 인쇄를 위한 컴포넌트 */
const PrintElement: React.FC<PrintElementProps> = ({ data, printRef }): JSX.Element => {
  return (
    <div ref={printRef} style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'start', padding: '10%', width: '100%' }}>
      <h2 style={{ color: '#000000', fontSize: 24, fontWeight: '700', marginBottom: 82, textAlign: 'center' }}>개인정보 파기 확인서</h2>
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
      <div style={{ fontSize: 16, fontWeight: '500', lineHeight: '32px', marginTop: 84, textAlign: 'center' }}>
        <h4 style={{ marginBottom: 16 }}>{moment(data.date).year()}년 {moment(data.date).month() + 1}월 {moment(data.date).date()}일</h4>
        <p style={{ margin: 0 }}>개인정보 보호책임자 {data.charger} (인)</p>
      </div>
    </div>
  );
}
/** [Internal Component] 커스텀 설명 제목 */
const DescriptionLabel: React.FC<DescriptionLabelProps> = ({ content, required }: DescriptionLabelProps): JSX.Element => {
  return (
    <p style={{ margin: 0 }}>
      {content}
      {required ? (
        <label style={{ color: '#FF4D4F', fontSize: 14, fontWeight: '600', marginLeft: 4 }}>*</label>
      ) : (<></>)}
    </p>
  );
}