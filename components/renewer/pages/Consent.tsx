import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { ComponentType } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { Modal } from 'antd';
import { errorNotification } from '@/components/common/Notification';
import { ConfirmPage } from '@/components/consent/Documentation';
const ConsentHome: ComponentType<any> = dynamic(() => import('@/components/renewer/Consent').then((mod: any): any => mod.ConsentHome), { loading: () => (<></>) });
const EnterInformationPage: ComponentType<any> = dynamic(() => import('@/components/renewer/Consent').then((mod: any): any => mod.EnterInformationPage), { loading: () => (<></>) });
const InputInformationPage: ComponentType<any> = dynamic(() => import('@/components/renewer/Consent').then((mod: any): any => mod.InputInformationPage), { loading: () => (<></>) });
const JobSelectionPage: ComponentType<any> = dynamic(() => import('@/components/renewer/Consent').then((mod: any): any => mod.JobSelectionPage), { loading: () => (<></>) });
const StepInfoHeader: ComponentType<any> = dynamic(() => import('@/components/renewer/Consent').then((mod: any): any => mod.StepInfoHeader), { loading: () => (<></>) });
// Data
import { defaultConsentData } from '@/models/static/data';
// Icon
const ExclamationCircleOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.ExclamationCircleOutlined));
// Query
import { getUser } from '@/models/queries/apis/user';
import { getCompany } from '@/models/queries/apis/company';
import { deleteConsent, getConsentList, setConsent } from '@/models/queries/apis/consent';
import { getPIDatas, getPPIDatas } from '@/models/queries/apis/manage';
// Query key
import { KEY_COMPANY, KEY_USER } from '@/models/queries/key';
import { SERVICE_CONSENT, SERVICE_PI, SERVICE_PPI } from '@/models/queries/type';
// State
import { accessTokenSelector, sessionSelector } from '@/models/session';
// Util
import { decodeAccessToken } from 'utils/utils';
import { filteredNotUniqueData, hasURL, nullCheckForNextStep } from 'utils/consent';

const ConsentMain: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰 조회
  const accessToken = useRecoilValue(accessTokenSelector);
  // 세션 조회
  const session = useRecoilValue(sessionSelector);

  /**
   * [동의서 유형]
   * 0, pi : 개인정보 수집 및 이용 동의서
   * 1, si : 민감정보 수집 및 이용 동의서
   * 2, uii : 고유식별정보 수집 및 이용 동의서
   * 3, mai : 마케팅 및 광고성 정보 수신 동의서
   * 4 : 제 3자 제공 동의서
   */
  const DOC_TYPE: string[] = useMemo(() => ['pi', 'si', 'uii', 'mai', 'tpp'], []);
  // 메인 컴포넌트
  const [component, setComponent] = useState<any>(<></>); 
  // 유형 상태
  const [type, setType] = useState<number>(0);
  // 단계 상태
  const [stepIndex, setStepIndex] = useState<number>(-1);
  // 단계 제목
  const steps: string[] = useMemo(() => type === 4 ? ['정보 입력', '최종 확인'] : ['업무 선택', '정보 입력', '최종 확인'], [type]);
  // 데이터
  const [data, setData] = useState<any>(defaultConsentData);
  // 데이터 동기를 위한 객체 생성
  const queryClient = useQueryClient();

  // 사용자 ID 추출
  const userId: string = useMemo(() => decodeAccessToken(accessToken), [accessToken]);
  // 사용자 조회
  const { data: user } = useQuery([KEY_USER, userId], async () => await getUser(accessToken, userId));
  // 사용자 조회
  const { data: company } = useQuery([KEY_COMPANY, session.companyId], async () => await getCompany(accessToken, session.companyId));
  // 동의서 목록 조회
  const { data: consentList } = useQuery([SERVICE_CONSENT, session.serviceId], async () => await getConsentList(accessToken, session.serviceId));
  // 개인정보 수집 및 이용, 제공 데이터 조회
  const { data: pi } = useQuery([SERVICE_PI, session.serviceId], async () => await getPIDatas(accessToken, session.serviceId));
  const { data: ppi } = useQuery([SERVICE_PPI, session.serviceId], async () => await getPPIDatas(accessToken, session.serviceId));

  /** [Event handler] 동의서 유형 변경 */
  const onChangeType = useCallback((type: number) => setType(type), []);
  /** [Event handler] 데이터 저장 */
  const onSave = useCallback((value: any) => setData({ ...data, ...value }), [data]);
  /** [Event handler] 단계 이동 */
  const onMoveStep = useCallback((index: number) => {
    if (nullCheckForNextStep(type, data, index)) return;
    // 제일 첫 페이지로 돌아올 경우 작성하던 데이터 리셋
    if (index === -1) setData(defaultConsentData);
    setStepIndex(index);
  }, [data, type]);
  /** [Event handler] 동의서 저장 */
  const onFinish = useCallback(async (setUrl: any, setSuccessModal: any) => {
    try {
      const copy: any = JSON.parse(JSON.stringify(data));
      // 유형과 작성자 기록
      copy.type = DOC_TYPE[data.type];
      copy.creater = user?.userName;
      // 동의서 저장 API 호출
      const response = await setConsent(accessToken, session.serviceId, copy, document.getElementById('report')?.outerHTML);
      // 응답 처리
      if (response.result) {
        queryClient.invalidateQueries([SERVICE_CONSENT, session.serviceId]);
        setUrl(response.data.url);
        setSuccessModal(true);
      } else {
        errorNotification('동의서 저장에 실패하였습니다.');
      }
    } catch (err) {
      console.error(`[HANDLER ERROR] ${err}`);
    }
  }, [accessToken, data, session.serviceId, queryClient]);
  /** [Event handler] 동의서 삭제 */
  const onRemove = useCallback(async (consentId: string) => Modal.confirm({
    title: '해당 동의서를 삭제하시겠습니까?',
    icon: <ExclamationCircleOutlined />,
    content: '삭제 후에는 복구하실 수 없습니다.',
    okText: '삭제',
    cancelText:'취소',
    onOk: async () => {
      try {
        await deleteConsent(accessToken, session.serviceId, consentId);
        queryClient.invalidateQueries([SERVICE_CONSENT, session.serviceId]);
      } catch (err) {
        console.log(`[HANDLER ERROR] ${err}`);
      }
    }
  }), [accessToken, session.serviceId, queryClient]);
  /** [Event handler] 사전에 있어야할 정보가 있는지 체크 */
  const onEmptyCheck = useCallback((type: number): boolean => {
    // 개인정보 수집 및 이용 동의서, 
    // 민감정보 수집 및 이용 동의서, 
    // 마케팅 및 광고성 정보 수신 동의서 
    // > 개인정보 수집 이용 표 정보의 유무 확인
    if ([0, 1, 3].includes(type) && pi && pi.length === 0) return true;
    // 고유식별정보 수집 및 이용 동의서 > 개인정보 수집 이용 표 내 고유식별정보의 유무
    const filtered = filteredNotUniqueData(pi);
    if (type === 2 && filtered?.length === 0) return true;
    // 제3자 제공 동의서 > 개인정보 제공 표 정보의 유무
    if (type === 4 && (ppi?.length === 0 || hasURL(ppi))) return true;
    return false;
  }, [pi, ppi]);
  
  // 단계에 따라 자식 컴포넌트 정의
  useEffect(() => {
    switch (stepIndex) {
      case -1:
        setComponent(<ConsentHome data={consentList ? consentList : []} onChangeType={onChangeType} onEmptyCheck={onEmptyCheck} onMoveStep={onMoveStep} onRemove={onRemove} />);
        break;
      case 0:
        type === 4 ? setComponent(<InputInformationPage accessToken={accessToken} data={data} onSave={onSave} ppi={ppi} serviceId={session.serviceId} type={type} />) : setComponent( <JobSelectionPage type={type} data={data} onSave={onSave} pi={pi} />);
        break;
      case 1:
        // 제3자 제공 동의서 여부에 따라
        type === 4 ? setComponent(<ConfirmPage type={type} consentData={data} companyName={company ? company.companyName : ''} />) : setComponent(<EnterInformationPage accessToken={accessToken} consentData={data} ids={data.subjects} onSave={onSave} pi={pi} serviceId={session.serviceId} type={type}/>);
        break;
      case 2:
        setComponent(<ConfirmPage type={type} consentData={data} companyName={company ? company.companyName : ''} />);
        break;
    }
  }, [stepIndex]);

  return (
    <>
      <StepInfoHeader steps={steps} type={type} stepIndex={stepIndex} onMoveStep={onMoveStep} onFinish={onFinish} />
      {component}
    </>
  )
}

export default ConsentMain;