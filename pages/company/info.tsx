import type { NextPage } from 'next';
// Component
import { Header } from '../../components/common/Header';
import { Management } from '../../components/Company';

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <div>
      <Header />
      <Management />
    </div>
  );
}

export default Company;