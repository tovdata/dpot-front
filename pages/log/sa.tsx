import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVPageLayout } from '@/components/common/Layout';
import { Preparing } from '@/components/common/ResponsePage';
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <PILPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/log/sa'>
        <Preparing description='해당 서비스는 지원하고 있지 않습니다.' title='서비스 준비 중...' />
      </TOVPageLayout>
    </PILPSession>
  )
}

export default Page;