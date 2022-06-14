import type { NextPage } from 'next';
import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
// Component
import { TOVLayoutPadding, TOVPageLayout } from '@/components/common/Layout';
import { BasicPageLoading } from '@/components/common/Loading';
import { CreatePIPPForm, PIPPMain } from '@/components/PIPP';
// Type
import { DocProgressStatus } from '@/models/type';
import { SERVICE_PIPP } from '@/models/queries/type';
// Query
import { getPIPPList, getPIPPStatus } from '@/models/queries/api';
// Query key
const PIPP_LIST: string = 'pippList';
const PIPP_STATUS: string = 'pippStatus';

const Page: NextPage = ({ expand, onExpand }: any) => {
  // 개인정보 처리방침 상태 조회 API
  const { isLoading: isLoadingForStatus, data: status } = useQuery(PIPP_STATUS, async () => await getPIPPStatus('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  // 생성된 개인정보 처리방침 목록 조회 API
  const { isLoading: isLoadingForList, data: list } = useQuery(PIPP_LIST, async () => await getPIPPList('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));

  // 현재 페이지 상태
  const [progress, setProgress] = useState<string>('none');
  // 처리방침 생성 상태에 대한 쿼리 관리 객체
  const queryClient = useQueryClient();
  /** [Event handler] 처리방침 상태 및 목록 갱신 함수 */
  const onUpdateStatus = () => {
    queryClient.invalidateQueries(PIPP_LIST);
    queryClient.invalidateQueries(PIPP_STATUS);
    queryClient.invalidateQueries(SERVICE_PIPP);
  }
  /** [Event handler] 처리방침 생성 및 편집 */
  const onProcess = (process: DocProgressStatus) => {
    process ? setProgress(process) : setProgress('none');
  }
  /** [Event handler] 처리방침 생성 취소 */
  const onBack = () => {
    onUpdateStatus();
    setProgress('none');
  }

  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/pipp'>
      {isLoadingForStatus && isLoadingForList ? (
        <BasicPageLoading />
      ) : (
        <TOVLayoutPadding>
          {progress === 'none' ? (
            <PIPPMain list={isLoadingForList ? [] : list ? list.sort((a: any, b: any): number => b.version - a.version) : []} onProcess={onProcess} status={status} />
          ) : (
            <CreatePIPPForm list={isLoadingForList ? [] : list ? list.sort((a: any, b: any): number => b.applyAt - a.applyAt) : []} onBack={onBack} onUpdateStatus={onUpdateStatus} progress={progress} status={status} />
          )}
        </TOVLayoutPadding>
      )}
    </TOVPageLayout>
  );
}

export default Page;