import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVPageLayout } from '@/components/common/Layout';
const PLIPPreparing = dynamic(() => import('@/components/renewer/Page').then((module: any) => module.PLIPPreparing));
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <PILPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/log/sa'>
        <PLIPPreparing />
      </TOVPageLayout>
    </PILPSession>
  )
}

export default Page;