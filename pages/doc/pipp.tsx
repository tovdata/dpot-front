import { useState } from 'react';
import { useQuery } from 'react-query';
// Component
import { CreatePIPPForm, PIPPMain } from '../../components/PIPP';
// Type
import { DocProgressStatus } from '../../models/type';
// Query
import { getStatusForPIPP } from '../../models/queryState';

const Page = () => {
  const { isLoading, data: status } = useQuery('pippStatus', async () => await getStatusForPIPP('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  const [progress, setProgress] = useState<string>('none');

  // Create a event handler (onSelectDoc / contain a create)
  const onProcess = (process: DocProgressStatus) => process ? setProgress(process) : setProgress('none');
  // Create a event handler (onBack)
  const onBack = () => setProgress('none');

  return (
    <>
      {progress === 'none' ? (
        <PIPPMain onProcess={onProcess} status={status} />
      ) : (
        <CreatePIPPForm onBack={onBack} progress={progress} />
      )}
    </>
  );
}

export default Page;