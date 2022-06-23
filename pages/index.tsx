import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRecoilValueLoadable } from 'recoil';
// Component
import { TOVPageLayout } from '@/components/common/Layout'
import Dashboard from '@/components/renewer/Dashboard'
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });
// State
import { accessTokenSelector } from '@/models/session';

const Page: NextPage = ({ expand, onExpand }: any) => {
  const accessToken = useRecoilValueLoadable(accessTokenSelector);
  console.log(accessToken);

  return (
    <PILPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/'>
        <Dashboard />
      </TOVPageLayout>
    </PILPSession>
  )
}
export default Page;
