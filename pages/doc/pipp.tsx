import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVPageLayout } from '@/components/common/Layout';
import { PIPPMain } from '@/components/PIPP';
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  // 컴포넌트 반환
  return (
    <PILPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/pipp'>
        <PIPPMain />
      </TOVPageLayout>
    </PILPSession>
  );
}

export default Page;