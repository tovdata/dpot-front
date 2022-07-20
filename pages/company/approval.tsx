import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const ApprovalMain = dynamic(() => import('@/components/renewer/pages/Approval'), { loading: () => (<></>), ssr: false });

/** [Component] 로그인 페이지 */
const Page: NextPage = () => {
  return (
    <ApprovalMain />
  );
}

export default Page;
