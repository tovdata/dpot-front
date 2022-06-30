import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVPageLayout } from '@/components/common/Layout';
const PLIPPreparing = dynamic(() => import('@/components/renewer/Page').then((module: any) => module.PLIPPreparing));
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PILPServiceSession), { ssr: false });

const Page: NextPage = ({ expand, onExpand }: any) => {
  return (
    <PLIPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/doc/imp'>
        <PLIPPreparing />
      </TOVPageLayout>
    </PLIPSession>
  )
}

export default Page;