import dynamic from 'next/dynamic';
import { ComponentType, useCallback, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
const CreatePIPPForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PIPP').then((mod: any): any => mod.CreatePIPPForm), { loading: () => (<></>), ssr: false });
const PIPPList: ComponentType<any> = dynamic(() => import('@/components/renewer/PIPP').then((mod: any): any => mod.PIPPList), { loading: () => (<></>) });
const PLIPLayoutPadding = dynamic(() => import('@/components/styled/Layout').then((mod: any): any => mod.PLIPLayoutPadding), { loading: () => (<PLIPLoadingContainer />)});
const PLIPLoadingContainer = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIPLoadingContainer), { loading: () => (<></>)});
// State
import { companySelector, serviceSelector } from '@/models/session';
// Type
import { DocProgressStatus } from '@/models/type';
// Query
import { getPIPPList, getPIPPStatus } from '@/models/queries/apis/pipp';
// Query key
import { SERVICE_PIPP } from '@/models/queries/type';
const PIPP_LIST: string = 'pippList';
const PIPP_STATUS: string = 'pippStatus';

const PIPPMain: React.FC<any> = (): JSX.Element => {
  // 로컬 스토리지 내 회사 및 서비스 정보 조회
  const sessionCompany = useRecoilValue(companySelector);
  const sessionService = useRecoilValue(serviceSelector);
  // 개인정보 처리방침 상태 조회
  const { isLoading: isLoadingForStatus, data: status } = useQuery([PIPP_STATUS, sessionService.id], async () => await getPIPPStatus(sessionService.id));
  // 생성된 개인정보 처리방침 목록 조회 API
  const { isLoading: isLoadingForList, data: list } = useQuery([PIPP_LIST, sessionService.id], async () => await getPIPPList(sessionService.id));

  // 현재 페이지 상태
  const [progress, setProgress] = useState<string>('none');
  // 처리방침 생성 상태에 대한 쿼리 관리 객체
  const queryClient = useQueryClient();
  /** [Event handler] 처리방침 상태 및 목록 갱신 함수 */
  const onUpdateStatus = useCallback(() => {
    queryClient.invalidateQueries([PIPP_LIST, sessionService.id]);
    queryClient.invalidateQueries([PIPP_STATUS, sessionService.id]);
    queryClient.invalidateQueries([SERVICE_PIPP, sessionService.id]);
  }, [queryClient, sessionService.id]);
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
      {isLoadingForStatus || isLoadingForList ? (
        <PLIPLoadingContainer />
      ) : (
        <PLIPLayoutPadding>
          {progress === 'none' ? (
            <PIPPList list={isLoadingForList ? [] : list ? list.sort((a: any, b: any): number => b.version - a.version) : []} onProcess={onProcess} status={status} />
          ) : (
            <CreatePIPPForm companId={sessionCompany.id} list={isLoadingForList ? [] : list ? list.sort((a: any, b: any): number => b.applyAt - a.applyAt) : []} onBack={onBack} onUpdateStatus={onUpdateStatus} progress={progress} serviceId={sessionService.id} status={status} />
          )}
        </PLIPLayoutPadding>
      )}
    </>
  );
}

export default PIPPMain;