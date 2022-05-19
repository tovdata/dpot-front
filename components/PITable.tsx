import { useRecoilValue } from 'recoil';
// Component
import { EditableTable, EditableTableForm } from './common/Table';
// Data
import { fniTableHeader, piTableHeader } from '../models/static/header';
// Module
import { createSimpleWarningNotification } from './common/Notification';
// State
import { GetPersonalInfoSelectOptionsSelector, GetPersonalInfoSelector } from '../models/state';
// Type
import { SelectOptionsByColumn } from '../models/type';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { API_DT_PI, API_DT_FNI, getListForPIM, processPIMData, setQueryData } from '../models/queryState';
import { Button } from 'antd';

/**
 * [Component] 가명정보 수집 및 이용 테이블
 */
export const FNITable: React.FC<any> = (): JSX.Element => {
  // 서버로부터 데이블 데이터 가져오기
  const { isLoading, data } = useQuery(API_DT_FNI, async () => await getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_FNI));
  // Get a state (for select options)
  const ref: any = useRecoilValue(GetPersonalInfoSelector);
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    basis: ['과학적 연구', '통계 작성', '공익적 기록 및 보존', '기타']
  };

  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_FNI, val.mode, val.data));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, API_DT_FNI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, API_DT_FNI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, API_DT_FNI, mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, API_DT_FNI, mutate, 'save', record);
      return true;
    }
  }

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} defaultSelectOptions={defaultSelectOptions} headers={fniTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='fni' />);
}
/**
 * [Component] 가명정보 수집 및 이용 테이블 Form
 */
export const FNITableForm: React.FC<any> = (): JSX.Element => {
  const tools: JSX.Element = (
    <Button type='default'>가명정보 입력 가이드</Button>
  );
  // 컴포넌트 반환
  return (
    <EditableTableForm description='통계작성, 과학적 연구, 공익적 기록보존을 위한 경우에는 사용자의 동의없이 가명정보를 처리할 수 있어요.\n보유중인 개인정보를 가명처리하여 이용하거나, 가명정보를 제공받아 사내에서 이용하고 있는 경우, 업무별로 나누어 가명정보 현황을 입력하세요.' style={{ marginBottom: '4.625rem' }} title='가명정보 수집・이용 현황' tools={tools}>
      <FNITable />
    </EditableTableForm>
  );
}
/**
 * [Component] 개인정보 수집 및 이용 테이블
 */
export const PITable: React.FC<any> = (): JSX.Element => {
  // 서버로부터 테이블 데이터 가져오기
  const { isLoading, data } = useQuery(API_DT_PI, () => getListForPIM('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PI));
  // 셀렉트 옵션 데이터 가져오기 (Using recoil)
  const ref: any = useRecoilValue(GetPersonalInfoSelectOptionsSelector);
  // 기본적인 셀렉트 옵션 데이터 (정적)
  const defaultSelectOptions: SelectOptionsByColumn = {
    subject: ['회원가입 및 관리', '고객 상담 및 문의', '재화 및 서비스 이용', '요금 결제 및 환불', '상품 배송', '신규 서비스 개발', '홍보 및 마케팅', '인터넷 서비스 이용 과정에서 자동으로 수집되는 정보'],
    period: ["회원 탈퇴", "파기 요청", "동의 철회", "정보 입력"]
  };

  const queryClient = useQueryClient();
  const { mutate } = useMutation((val: any) => processPIMData('b7dc6570-4be9-4710-85c1-4c3788fcbd12', API_DT_PI, val.mode, val.data));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setQueryData(queryClient, API_DT_PI, mutate, 'create', record);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (record: any): void => setQueryData(queryClient, API_DT_PI, mutate, 'delete', record);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    if (record.essentialItems.length === 0 && record.selectionItems.length === 0) {
      createSimpleWarningNotification('필수 항목과 선택 항목 중에서 하나의 항목을 필수로 입력해야 합니다.');
      return false;
    } else if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, API_DT_PI, mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, API_DT_PI, mutate, 'save', record);
      return true;
    }
  }

  // Return an element
  return (<EditableTable dataSource={isLoading ? [] : data ? data as any[] : []} defaultSelectOptions={defaultSelectOptions} headers={piTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName='pi' />);
}
/**
 * [Component] 개인정보 수집 및 이용 테이블 Form
 */
export const PITableForm: React.FC<any> = (): JSX.Element => {
  const tools: JSX.Element = (
    <Button type='default'>현황 정보 입력 가이드</Button>
  );
  // 컴포넌트 반환
  return (
    <EditableTableForm description='사용자로부터 직접 입력 받거나, 제3자로부터 제공받아 사내에서 이용하고 있는 개인정보 현황을 업무별로 나누어 입력하세요.' title='개인정보 수집・이용 현황' tools={tools}>
      <PITable />
    </EditableTableForm>
  );
}