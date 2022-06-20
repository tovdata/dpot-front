import type { NextPage } from 'next';
// Component
import { TOVPageHeader, TOVSession } from '@/components/common/Layout';
import { UserInfoSection } from '@/components/User';

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <TOVSession>
      <TOVPageHeader />
      <UserInfoSection style={{ marginBottom: 64, marginTop: 84 }} />
    </TOVSession>
  );
}

export default Company;