import type { NextPage } from 'next';
// Component
import { TOVPageHeader } from '../../components/common/Layout';
import { Management } from '../../components/Company';

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <div>
      <TOVPageHeader />
      <Management />
    </div>
  );
}

export default Company;