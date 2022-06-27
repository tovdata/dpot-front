import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const PILPManageCompany = dynamic(() => import('@/components/renewer/Company'), { ssr: false });
const PLIPPageHeader = dynamic(() => import('@/components/renewer/Layout').then((module: any): any => module.PLIPPageHeader), { ssr: false });
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <PILPSession>
      <PLIPPageHeader />
      <PILPManageCompany />
    </PILPSession>
  );
}

export default Company;