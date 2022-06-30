
import dynamic from 'next/dynamic';
import { ComponentType, useCallback, useState } from 'react';
// Component
import { DPITableForm, InformationForm } from '../../components/DPI';
// const DPIMain: ComponentType<{}> = dynamic(() => import('@/components/renewer/pages/DPI'), { ssr: false });
const PLIPPageLayout: ComponentType<{expand: boolean, onExpand: any, selectedKey: string}> = dynamic(() => import('@/components/renewer/Layout').then((module: any): any => module.PLIPPageLayout), { ssr: false });
const PLIPPagePadding: ComponentType<{}> = dynamic(() => import('@/components/styled/Layout').then((module: any): any => module.PLIPLayoutPadding));
const PLIPSession: ComponentType<{}> = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PILPServiceSession), { ssr: false });
// Data
import { defaultDPIData } from '../../models/static/data';

const Page = ({ expand, onExpand }: any) => {
  // 파기 데이터 상태
  const [data, setData] = useState<any>({});

  /** [Event handler] 뒤로가기 이벤트 */
  const onBack = useCallback((): void => setData({}), []);
  /** [Event handler] 추가 이벤트 */
  const onCreate = useCallback((): void => setData(defaultDPIData), []);
  /** [Event handler] 편집 이벤트 */
  const onEdit = useCallback((record: any): void => setData(record), []);

  // 컴포넌트 반환
  return (
    <PLIPSession>
      <PLIPPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/dest'>
        <PLIPPagePadding>
          {Object.keys(data).length !== 0 ? (
            <InformationForm data={data} onBack={onBack} />
          ) : (
            <DPITableForm onCreate={onCreate} onEdit={onEdit} />
          )}
        </PLIPPagePadding>
      </PLIPPageLayout>
    </PLIPSession>
  )
}

export default Page;