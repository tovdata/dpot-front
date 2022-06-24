import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVPageHeader } from '@/components/common/Layout';
const PILPManageCompany = dynamic(() => import('@/components/renewer/Company'), { ssr: false });
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <PILPSession>
      <TOVPageHeader />
      <PILPManageCompany />
    </PILPSession>
  );
}

export default Company;