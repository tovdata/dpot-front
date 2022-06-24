import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { TOVPageHeader } from '@/components/common/Layout';
// import { UserInfoSection } from '@/components/User';
const PLIPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });
const PLIPUser = dynamic(() => import('@/components/renewer/User'), { ssr: false });

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <PLIPSession>
      <TOVPageHeader />
      <PLIPUser style={{ marginBottom: 64, marginTop: 84 }} />
    </PLIPSession>
  );
}

export default Company;