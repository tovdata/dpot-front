import type { NextPage } from 'next';
// Component
import { TOVPageLayout } from '@/components/common/Layout';
import { Preparing } from '@/components/common/ResponsePage';


const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/template'>
      <Preparing description='해당 서비스는 지원하고 있지 않습니다.' title='서비스 준비 중...' />
    </TOVPageLayout>
  )
}

export default Page;