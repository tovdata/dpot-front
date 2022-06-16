
import { useCallback, useState } from 'react';
// Component
import { TOVLayoutPadding, TOVPageLayout, TOVSession } from '../../components/common/Layout';
import { DPITableForm, InformationForm } from '../../components/DPI';
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
    <TOVSession type='service'>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/dest'>
        <TOVLayoutPadding>
          {Object.keys(data).length !== 0 ? (
            <InformationForm data={data} onBack={onBack} />
          ) : (
            <DPITableForm onCreate={onCreate} onEdit={onEdit} />
          )}
        </TOVLayoutPadding>
      </TOVPageLayout>
    </TOVSession>
  )
}

export default Page;