import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const ChoiceService = dynamic(() => import('@/components/renewer/ChoiceService'), { loading: () => (<></>), ssr: false });
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((module: any): any => module.PLIPUserSession), { loading: () => (<></>), ssr: false });

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <PLIPUserSession>
      <ChoiceService />
    </PLIPUserSession>
  );
}

export default Company;