import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
import { useRecoilValueLoadable } from 'recoil';
// Component
import { PLIPPageLayout } from '@/components/renewer/Layout';
const PLIPDashboard = dynamic(() => import('@/components/renewer/Dashboard'), { ssr: false });
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PILPServiceSession), { ssr: false });
// State
import { accessTokenSelector } from '@/models/session';

const Page: NextPage = ({ expand, onExpand }: any) => {
  const accessToken = useRecoilValueLoadable(accessTokenSelector);
  console.log(accessToken);

  return (
    <PLIPSession>
      <PLIPPageLayout expand={expand} onExpand={onExpand} selectedKey='/'>
        <PLIPDashboard />
      </PLIPPageLayout>
      {/* </TOVPageLayout> */}
      {/* <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/'> */}
      {/* </TOVPageLayout> */}
    </PLIPSession>
  )
}
export default Page;
