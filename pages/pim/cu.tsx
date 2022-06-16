import type { NextPage } from 'next';
// Component
import { TOVLayoutPadding, TOVPageLayout, TOVSession } from '@/components/common/Layout';
import { FNITableForm, PITableForm } from '@/components/PITable';

const Page: NextPage = ({ expand, onExpand }: any) => {
  // 컴포넌트 반환
  return (
    <TOVSession type='service'>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/cu'>
        <TOVLayoutPadding>
          <PITableForm />
          <FNITableForm />
        </TOVLayoutPadding>
      </TOVPageLayout>
    </TOVSession>
  )
}

export default Page;