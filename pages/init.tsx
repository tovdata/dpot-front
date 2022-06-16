import type { NextPage } from 'next';
// Component
import { TOVPageHeader } from '@/components/common/Layout';
import { UserInfoSection } from '@/components/User';
import { useRecoilState } from 'recoil';
import { companySelector } from '@/models/session';
import { useEffect } from 'react';

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  const [_, setCompany] = useRecoilState(companySelector);
  useEffect(() => setCompany({ id: '0', name: '토브데이터', en: 'TOVDATA', manager: { name: '박효진', position: 'CEO', email: 'contact@tovdata.com' } }), []);

  return (<></>);
}

export default Company;