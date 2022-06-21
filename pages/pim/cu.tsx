import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVLayoutPadding, TOVPageLayout } from '@/components/common/Layout';
import { FNITableForm, PITableForm } from '@/components/PITable';
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  // 컴포넌트 반환
  return (
    <PILPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/pim/cu'>
        <TOVLayoutPadding>
          <PITableForm />
          <FNITableForm />
        </TOVLayoutPadding>
      </TOVPageLayout>
    </PILPSession>
  )
}

export default Page;