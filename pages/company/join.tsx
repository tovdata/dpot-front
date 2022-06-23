import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const JoinCompany = dynamic(() => import('@/components/renewer/JoinCompany'), { ssr: false });

/** 회사 관리 페이지 */
const Page: NextPage = () => {
  return (
    <JoinCompany />
  );
}

export default Page;