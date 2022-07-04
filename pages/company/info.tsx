import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const PLIPManageCompany = dynamic(() => import('@/components/renewer/Company'), { ssr: false });
const PLIPPageHeader = dynamic(() => import('@/components/renewer/Layout').then((module: any): any => module.PLIPPageHeader), { ssr: false });
const PLIPSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPServiceSession), { ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <PLIPUserSession>
      <PLIPSession>
        <PLIPPageHeader />
        <PLIPManageCompany />
      </PLIPSession>
    </PLIPUserSession>
  );
}

export default Company;