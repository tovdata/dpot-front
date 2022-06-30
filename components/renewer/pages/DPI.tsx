import { defaultDPIData } from '@/models/static/data';
import dynamic from 'next/dynamic';
import { ComponentType, useCallback, useState } from 'react';
import { useRecoilValue } from 'recoil';
// Component
const DPITableForm: ComponentType<DPITableFormProps> = dynamic(() => import('@/components/renewer/DPI').then((mod: any): any => mod.DPITableForm), { ssr: false });
const InformationForm: ComponentType<InformationFormProps> = dynamic(() => import('@/components/renewer/DPI').then((mod: any): any => mod.InformationForm), { ssr: false });
// Type
import { DPITableFormProps, InformationFormProps } from '@/components/renewer/DPI';
// State
import { companySelector, serviceSelector, userSelector } from '@/models/session';

/** [Component] 파기 메인 */
const DPIMain: React.FC<any> = (): JSX.Element => {
  // 로컬 스토리지 내 데이터 조회
  const sessionCompany = useRecoilValue(companySelector);
  const sessionService = useRecoilValue(serviceSelector);
  const sessionUser = useRecoilValue(userSelector);
  // 파기 데이터 상태
  const [data, setData] = useState<any>({});

  /** [Event handler] 뒤로가기 이벤트 */
  const onBack = useCallback((): void => setData({}), []);
  /** [Event handler] 추가 이벤트 */
  const onCreate = useCallback((): void => setData(defaultDPIData), []);
  /** [Event handler] 편집 이벤트 */
  const onEdit = useCallback((record: any): void => setData(record), []);

  return (
    <>
      {Object.keys(data).length !== 0 ? (
        <InformationForm company={sessionCompany} data={data} onBack={onBack} serviceId={sessionService.id} user={sessionUser} />
      ) : (
        <DPITableForm onCreate={onCreate} onEdit={onEdit} serviceId={sessionService.id} />
      )}
    </>
  );
}

export default DPIMain;