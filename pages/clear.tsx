import type { NextPage } from 'next';
// Component
import { TOVPageHeader } from '@/components/common/Layout';
import { UserInfoSection } from '@/components/User';
import { useRecoilState } from 'recoil';
import { serviceSelector } from '@/models/session';
import { useEffect } from 'react';

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  const [_, setService] = useRecoilState(serviceSelector);

  useEffect(() => setService({ id: '', name: '' }), []);

  return (<></>);
}

export default Company;