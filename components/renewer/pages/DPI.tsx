import dynamic from 'next/dynamic';
import { ComponentType, useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
// Component
const DPITableForm: ComponentType<DPITableFormProps> = dynamic(() => import('@/components/renewer/DPI').then((mod: any): any => mod.DPITableForm));
// import { DPITableForm } from '@/components/renewer/DPI';
const InformationForm: ComponentType<InformationFormProps> = dynamic(() => import('@/components/renewer/DPI').then((mod: any): any => mod.InformationForm));
// Type
import { DPITableFormProps, InformationFormProps } from '@/components/renewer/DPI';
// State
import { accessTokenSelector, sessionSelector } from '@/models/session';

/** [Component] 파기 메인 */
const DPIMain: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰
  const accessToken = useRecoilValue(accessTokenSelector);
  // 세션 조회
  const session = useRecoilValue(sessionSelector);
  // 파기 데이터 상태
  const [data, setData] = useState<any>({});

  /** [Event handler] 뒤로가기 이벤트 */
  const onBack = useCallback((): void => setData({}), []);
  /** [Event handler] 추가 이벤트 */
  const onCreate = useCallback(async(): Promise<void> => {
    setData((await import('@/models/static/data')).defaultDPIData);
  }, []);
  /** [Event handler] 편집 이벤트 */
  const onEdit = useCallback((record: any): void => setData(record), []);

  // 컴포넌트 반환
  return (
    <>
      {Object.keys(data).length !== 0 ? (
        <InformationForm accessToken={accessToken} companyId={session.companyId} data={data} onBack={onBack} serviceId={session.serviceId} />
      ) : (
        <DPITableForm accessToken={accessToken} onCreate={onCreate} onEdit={onEdit} serviceId={session.serviceId} />
      )}
    </>
  );
}

export default DPIMain;