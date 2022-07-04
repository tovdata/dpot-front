import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const JoinCompany = dynamic(() => import('@/components/renewer/JoinCompany'), { loading: () => (<></>), ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });

/** 회사 관리 페이지 */
const Page: NextPage = () => {
  return (
    <PLIPUserSession>
      <JoinCompany />
    </PLIPUserSession>
  );
}

export default Page;