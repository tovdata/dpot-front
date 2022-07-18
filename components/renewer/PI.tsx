import { useCallback, useMemo } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { Button } from 'antd';
import { warningNotification } from '@/components/common/Notification';
import { EditableTable, EditableTableForm } from '@/components/common/Table';
// Data
import { personalInfoSelectOptions } from '@/models/static/selectOption';
// Header
import { fniTableHeader, piTableHeader } from '@/models/static/header';
// State
import { GetPersonalInfoSelectOptionsSelector } from '@/models/state';
// Type
import { SelectOptionsByColumn } from '@/models/type';
import { SERVICE_FNI, SERVICE_PI } from '@/models/queries/type';
// Query
import { setQueryData } from '@/models/queryState';
import { getFNIDatas, getPIDatas, setDataByTableType } from '@/models/queries/apis/manage';
import { getUser } from '@/models/queries/apis/user';
import { getService } from '@/models/queries/apis/company';
// Query key
import { KEY_SERVICE, KEY_USER } from '@/models/queries/key';
// Util
import { decodeAccessToken } from 'utils/utils';

/** [Component] 가명정보 수집 및 이용 테이블 */
export const FNITable: React.FC<any> = ({ accessToken, serviceId }): JSX.Element => {
  // 사용자 ID 추출
  const userId: string = useMemo(() => decodeAccessToken(accessToken), [accessToken]);
  // 사용자 조회
  const { data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));
  // 서비스 조회
  const { data: service } = useQuery([KEY_SERVICE, serviceId], async () => await getService(serviceId));

  // API 호출 (가명정보)
  const { isLoading, data } = useQuery([SERVICE_FNI, serviceId], async () => await getFNIDatas(serviceId));
  // API 호출 (개인정보)
  const { isLoading: isLoadingForPI, data: PIData } = useQuery([SERVICE_PI, serviceId], async () => await getPIDatas(serviceId));

  // 셀렉트 옵션
  const defaultSelectOptions: SelectOptionsByColumn = useMemo(() => ({
    basis: ['과학적 연구', '통계 작성', '공익적 기록 및 보존', '기타']
  }), []);

  // 데이터 동기
  const queryClient = useQueryClient();
  const { mutate } = useMutation((value: any) => setDataByTableType({ id: userId, userName: user?.userName }, { id: serviceId, serviceName: service?.serviceName }, SERVICE_FNI, value.mode, value.data));

  /** [Event handler] 행 추가 */
  const onAdd = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_FNI, serviceId], mutate, 'create', record), [mutate, serviceId, queryClient]);
  /** [Event handler] 행 삭제 */ 
  const onDelete = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_FNI, serviceId], mutate, 'delete', record), [mutate, serviceId, queryClient]);
  /** [Event handler] 행 저장 */
  const onSave = useCallback((record: any): boolean => {
    if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, [SERVICE_FNI, serviceId], mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, [SERVICE_FNI, serviceId], mutate, 'save', record);
      return true;
    }
  }, [mutate, serviceId, queryClient]);

  // 컴포넌트 반환
  return (<EditableTable dataSource={data ? data : []} defaultSelectOptions={defaultSelectOptions} headers={fniTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={isLoadingForPI ? [] : PIData} tableName={SERVICE_FNI} />);
}
/** [Component] 가명정보 수집 및 이용 테이블 폼 */
export const FNITableForm: React.FC<any> = ({ accessToken, serviceId }): JSX.Element => {
  // Form tools 정의
  const tools: JSX.Element = useMemo(() => (<Button type='default'>가명정보 입력 가이드</Button>), []);
  // 컴포넌트 반환
  return (
    <EditableTableForm description='통계작성, 과학적 연구, 공익적 기록보존을 위한 경우에는 사용자의 동의없이 가명정보를 처리할 수 있어요.\n보유중인 개인정보를 가명처리하여 이용하거나, 가명정보를 제공받아 사내에서 이용하고 있는 경우, 업무별로 나누어 가명정보 현황을 입력하세요.' title='가명정보 수집・이용 현황' tools={tools}>
      <FNITable accessToken={accessToken} serviceId={serviceId} />
    </EditableTableForm>
  );
}
/** [Component] 개인정보 수집 및 이용 테이블 */
export const PITable: React.FC<any> = ({ accessToken, serviceId }): JSX.Element => {
  // 사용자 ID 추출
  const userId: string = useMemo(() => decodeAccessToken(accessToken), [accessToken]);
  // 사용자 정보 조회
  const { data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));
  // 서비스 조회
  const { data: service } = useQuery([KEY_SERVICE, serviceId], async () => await getService(serviceId));

  // API 호출 (개인정보)
  const { isLoading, data } = useQuery([SERVICE_PI, serviceId], async () => await getPIDatas(serviceId));
  // 셀렉트 옵션 데이터 가져오기 (Using recoil)
  const ref: any = useRecoilValue(GetPersonalInfoSelectOptionsSelector);
  // 셀렉트 옵션
  const defaultSelectOptions: SelectOptionsByColumn = useMemo(() => ({
    subject: Object.keys(personalInfoSelectOptions),
    period: ['회원 탈퇴', '파기 요청', '동의 철회', '정보 입력']
  }), []);

  // 데이터 동기
  const queryClient = useQueryClient();
  const { mutate } = useMutation((value: any) => setDataByTableType({ id: userId, userName: user?.userName }, { id: serviceId, serviceName: service?.serviceName }, SERVICE_PI, value.mode, value.data));

  /** [Event handler] 행 추가 */
  const onAdd = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_PI, serviceId], mutate, 'create', record), [mutate, queryClient, serviceId]);
  /** [Event handler] 행 삭제 */
  const onDelete = useCallback((record: any): void => setQueryData(queryClient, [SERVICE_PI, serviceId], mutate, 'delete', record), [mutate, queryClient, serviceId]);
  /** [Event handler] 행 저장 */
  const onSave = useCallback((record: any): boolean => {
    if (record.essentialItems.length === 0 && record.selectionItems.length === 0) {
      warningNotification('필수 항목과 선택 항목 중에서 하나의 항목을 필수로 입력해야 합니다.');
      return false;
    } else if (new RegExp('^npc_').test(record.id)) {
      setQueryData(queryClient, [SERVICE_PI, serviceId], mutate, 'add', record);
      return true;
    } else {
      setQueryData(queryClient, [SERVICE_PI, serviceId], mutate, 'save', record);
      return true;
    }
  }, [mutate, queryClient, serviceId]);

  // Return an element
  return (<EditableTable dataSource={data ? data : []} defaultSelectOptions={defaultSelectOptions} headers={piTableHeader} isLoading={isLoading} onAdd={onAdd} onDelete={onDelete} onSave={onSave} refData={ref} tableName={SERVICE_PI} />);
}
/** [Component] 개인정보 수집 및 이용 테이블 폼 */
export const PITableForm: React.FC<any> = ({ accessToken, serviceId }): JSX.Element => {
  // Form tools 정의
  const tools: JSX.Element = useMemo(() => (<Button type='default'>현황 정보 입력 가이드</Button>), []);
  // 컴포넌트 반환
  return (
    <EditableTableForm description='사용자로부터 직접 입력 받거나, 제3자로부터 제공받아 사내에서 이용하고 있는 개인정보 현황을 업무별로 나누어 입력하세요.' title='개인정보 수집・이용 현황' tools={tools}>
      <PITable accessToken={accessToken} serviceId={serviceId} />
    </EditableTableForm>
  );
}