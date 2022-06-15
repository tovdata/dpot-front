import type { NextPage } from 'next';
// Component
import { TOVPageLayout } from '@/components/common/Layout';
import { Preparing } from '@/components/common/ResponsePage';
// Session (testing)
import { setService } from '@/models/session';

const Page: NextPage = ({ expand, onExpand }: any) => {
  setService({ id: 'b7dc6570-4be9-4710-85c1-4c3788fcbd12', name: '플립' });

  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/log/sa'>
      <Preparing description='해당 서비스는 지원하고 있지 않습니다.' title='서비스 준비 중...' />
    </TOVPageLayout>
  )
}

export default Page;