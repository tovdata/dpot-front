import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVPageLayout } from '@/components/common/Layout';
import { PIPPMain } from '@/components/PIPP';
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PILPServiceSession), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  // 컴포넌트 반환
  return (
    <PLIPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/pipp'>
        <PIPPMain />
      </TOVPageLayout>
    </PLIPSession>
  );
}

export default Page;