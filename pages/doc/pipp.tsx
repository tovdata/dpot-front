import { useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
// Component
import { TOVPageLayout } from '../../components/common/Layout';
import { BasicPageLoading } from '../../components/common/Loading';
import { CreatePIPPForm, PIPPMain } from '../../components/PIPP';
// Type
import { DocProgressStatus } from '../../models/type';
import { SERVICE_PIPP } from '../../models/queries/type';
// Query
import { getStatusForPIPP } from '../../models/queryState';

const queryKeyForStatus: string = 'pippStatus';

const Page = () => {
  const { isLoading, data: status } = useQuery(queryKeyForStatus, async () => await getStatusForPIPP('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  const [progress, setProgress] = useState<string>('none');
  // 처리방침 생성 상태에 대한 쿼리 관리 객체
  const queryClient = useQueryClient();
  // [Event handler] 처리방침 상태 갱신 함수
  const onUpdateStatus = () => {
    queryClient.invalidateQueries(queryKeyForStatus);
    queryClient.invalidateQueries(SERVICE_PIPP);
  }
  // Create a event handler (onSelectDoc / contain a create)
  const onProcess = (process: DocProgressStatus) => {
    process ? setProgress(process) : setProgress('none');
  }
  // Create a event handler (onBack)
  const onBack = () => {
    onUpdateStatus();
    setProgress('none');
  }

  return (
    <TOVPageLayout selected='/doc/pipp'>
      {isLoading ? (
        <BasicPageLoading />
      ) : (
        <div style={{ height: '100%', paddingBottom: 74, paddingTop: 74 }}>
          {progress === 'none' ? (
            <PIPPMain onProcess={onProcess} status={status} />
          ) : (
            <CreatePIPPForm onBack={onBack} onUpdateStatus={onUpdateStatus} progress={progress} status={status} />
          )}
        </div>
      )}
    </TOVPageLayout>
  );
}

export default Page;