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

  useEffect(() => setService({ id: 'b7dc6570-4be9-4710-85c1-4c3788fcbd12', name: '플립' }), []);

  return (<></>);
}

export default Company;