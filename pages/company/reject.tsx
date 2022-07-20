import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const PLIPApprovalPage = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIPApprovalPage));

/** [Component] 로그인 페이지 */
const Page: NextPage = () => {
  return (
    <PLIPApprovalPage />
  );
}

export default Page;
