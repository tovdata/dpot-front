import dynamic from 'next/dynamic';
import { ComponentType, useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { Modal } from 'antd';
const CreatePIPPForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PIPP').then((mod: any): any => mod.CreatePIPPForm), { loading: () => (<></>), ssr: false });
const PIPPList: ComponentType<any> = dynamic(() => import('@/components/renewer/PIPP').then((mod: any): any => mod.PIPPList), { loading: () => (<></>) });
const PLIPLayoutPadding = dynamic(() => import('@/components/styled/Layout').then((mod: any): any => mod.PLIPLayoutPadding), { loading: () => (<PLIPLoadingContainer />)});
const PLIPLoadingContainer = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIPLoadingContainer), { loading: () => (<></>)});
// State
import { accessTokenSelector, sessionSelector } from '@/models/session';
// Type
import { DocProgressStatus } from '@/models/type';
// Query
import { getPIDatas } from '@/models/queries/apis/manage';
import { getPIPPList, getPIPPStatus } from '@/models/queries/apis/pipp';
// Query key
import { SERVICE_PI, SERVICE_PIPP } from '@/models/queries/type';
import Router from 'next/router';
const PIPP_LIST: string = 'pipp-list';
const PIPP_STATUS: string = 'pipp-status';

const PIPPMain: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰
  const accessToken = useRecoilValue(accessTokenSelector);
  // 세션 조회
  const session= useRecoilValue(sessionSelector);
  // 개인정보 수집 및 이용 데이터 조회
  const { isLoading: isLoadingPI, data: pi } = useQuery([SERVICE_PI, session.serviceId], async () => await getPIDatas(session.serviceId));
  // 개인정보 처리방침 상태 조회
  const { isLoading: isLoadingForStatus, data: status } = useQuery([PIPP_STATUS, session.serviceId], async () => await getPIPPStatus(session.serviceId));
  // 생성된 개인정보 처리방침 목록 조회 API
  const { isLoading: isLoadingForList, data: list } = useQuery([PIPP_LIST, session.serviceId], async () => await getPIPPList(session.serviceId));

  // 현재 페이지 상태
  const [progress, setProgress] = useState<string>('none');
  // 처리방침 생성 상태에 대한 쿼리 관리 객체
  const queryClient = useQueryClient();
  // 개인정보 수집 및 이용 데이터가 없을 경우
  useEffect(() => {
    if (pi && pi.length === 0) {
      Modal.warning({
        centered: true,
        content: '개인정보 관리 탭에서 개인정보 처리에 관한 내용을 입력하셔야 문서를 만드실 수 있습니다.',
        onOk: () => Router.push('/pim/cu'),
        okText: '입력하러가기',
        title: '입력된 정보가 없습니다.'
      });
    }
  }, [isLoadingPI]);
  /** [Event handler] 처리방침 상태 및 목록 갱신 함수 */
  const onUpdateStatus = useCallback(() => {
    queryClient.invalidateQueries([PIPP_LIST, session.serviceId]);
    queryClient.invalidateQueries([PIPP_STATUS, session.serviceId]);
    queryClient.invalidateQueries([SERVICE_PIPP, session.serviceId]);
  }, [queryClient, session.serviceId]);
  /** [Event handler] 처리방침 생성 및 편집 */
  const onProcess = useCallback((process: DocProgressStatus) => {
    process ? setProgress(process) : setProgress('none');
  }, []);
  /** [Event handler] 처리방침 생성 취소 */
  const onBack = useCallback(() => {
    onUpdateStatus();
    setProgress('none');
  }, [onUpdateStatus]);

  // 컴포넌트 반환
  return (
    <>
      {isLoadingForStatus || isLoadingForList || isLoadingPI ? (
        <PLIPLoadingContainer />
      ) : (
        <PLIPLayoutPadding>
          {progress === 'none' ? (
            <PIPPList list={isLoadingForList ? [] : list ? list.sort((a: any, b: any): number => b.version - a.version) : []} onProcess={onProcess} status={status} />
          ) : (
            <CreatePIPPForm accessToken={accessToken} companyId={session.companyId} list={isLoadingForList ? [] : list ? list.sort((a: any, b: any): number => b.applyAt - a.applyAt) : []} onBack={onBack} onUpdateStatus={onUpdateStatus} progress={progress} serviceId={session.serviceId} status={status} />
          )}
        </PLIPLayoutPadding>
      )}
    </>
  );
}

export default PIPPMain;