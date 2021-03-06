import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const PLIPPageHeader = dynamic(() => import('@/components/renewer/Layout').then((module: any): any => module.PLIPPageHeader), { ssr: false });
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPServiceSession), { loading: () => (<></>), ssr: false });
const PLIPUser = dynamic(() => import('@/components/renewer/User'), { loading: () => (<></>), ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <PLIPUserSession>
      <PLIPSession>
        <PLIPPageHeader />
        <PLIPUser style={{ marginBottom: 64, marginTop: 84 }} />
      </PLIPSession>
    </PLIPUserSession>
  );
}

export default Company;