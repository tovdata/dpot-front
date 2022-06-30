import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVLayoutPadding } from '@/components/common/Layout';
import { PLIPPageLayout } from '@/components/renewer/Layout';
const PLIPActivity = dynamic(() => import('@/components/renewer/Activity'), { ssr: false });
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PILPServiceSession), { ssr: false });

/** [Component] 활동 내역 페이지 */
const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <PLIPSession>
      <PLIPPageLayout expand={expand} onExpand={onExpand} selectedKey='/log/activity'>
        <TOVLayoutPadding style={{ paddingTop: 42 }}>
          <PLIPActivity />      
        </TOVLayoutPadding>
      </PLIPPageLayout>
    </PLIPSession>
  );
}

export default Page;