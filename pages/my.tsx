import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVPageHeader } from '@/components/common/Layout';
import { UserInfoSection } from '@/components/User';
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <PILPSession>
      <TOVPageHeader />
      <UserInfoSection style={{ marginBottom: 64, marginTop: 84 }} />
    </PILPSession>
  );
}

export default Company;