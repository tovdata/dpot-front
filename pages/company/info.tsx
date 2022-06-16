import type { NextPage } from 'next';
// Component
import { TOVPageHeader, TOVSession } from '../../components/common/Layout';
import { Management } from '../../components/Company';

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <TOVSession type='company'>
      <TOVPageHeader />
      <Management />
    </TOVSession>
  );
}

export default Company;