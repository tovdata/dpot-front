import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVPageHeader } from '@/components/common/Layout';
import { Management } from '@/components/Company';
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <PILPSession>
      <TOVPageHeader />
      <Management />
    </PILPSession>
  );
}

export default Company;