import { useState } from 'react';
// Component
import Layout from '../../components/common/Layout';
import { DPITableForm, InformationForm } from '../../components/DPI';
// Data
import { defaultDPIData } from '../../models/static/data';

const Page = () => {
  const [data, setData] = useState<any>({});

  /** [Event handler] 뒤로가기 이벤트 */
  const onBack = (): void => setData({});
  /** [Event handler] 추가 이벤트 */
  const onCreate = (): void => setData(defaultDPIData);
  /** [Event handler] 편집 이벤트 */
  const onEdit = (record: any): void => setData(record);

  // 컴포넌트 반환
  return (
    <Layout>
      <div style={{ marginBottom: 74, marginTop: 74 }}>
        {Object.keys(data).length !== 0 ? (
          <InformationForm data={data} onBack={onBack} />
        ) : (
          <DPITableForm onCreate={onCreate} onEdit={onEdit} />
        )}
      </div>
    </Layout>
  )
}

export default Page;