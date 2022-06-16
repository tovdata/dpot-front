import type { NextPage } from 'next';
// Component
import { TOVPageLayout, TOVSession } from '@/components/common/Layout';
import { PIPPMain } from '@/components/PIPP';

const Page: NextPage = ({ expand, onExpand }: any) => {
  // 컴포넌트 반환
  return (
    <TOVSession type='service'>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/pipp'>
        <PIPPMain />
      </TOVPageLayout>
    </TOVSession>
  );
}

export default Page;