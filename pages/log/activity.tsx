import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVLayoutPadding, TOVPageLayout } from '@/components/common/Layout';
const PLIPActivity = dynamic(() => import('@/components/renewer/Activity'), { ssr: false });
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

/** [Component] 활동 내역 페이지 */
const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <PILPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/log/activity'>
        <TOVLayoutPadding style={{ paddingTop: 42 }}>
          <PLIPActivity />      
        </TOVLayoutPadding>
      </TOVPageLayout>
    </PILPSession>
  );
}

export default Page;