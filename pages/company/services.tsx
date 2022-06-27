import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const ChoiceService = dynamic(() => import('@/components/renewer/ChoiceService'), { ssr: false });

/** 회사 관리 페이지 */
const Company: NextPage = () => {
  return (
    <ChoiceService />
  );
}

export default Company;