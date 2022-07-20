import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// Component
const PLIP404Page = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIP404Page));
const PLIPApprovalPage = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIPApprovalPage));
const PLIPApprovalRejectPage = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIPApprovalRejectPage));
// const PLIPCustomLoadingPage: ComponentType<any> = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIPCustomLoadingPage));
// Query
import { approval } from '@/models/queries/apis/company';
// Type
// import type { ComponentType } from 'react';

/** [Component] 회사 가입 승인 메인 컴포넌트 */
const ApprovalMain: React.FC<any> = (): JSX.Element => {
  // 라우터
  const router = useRouter();
  // 페이지 구성 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<></>);
  // 페이지 로딩 시에 API 호출
  useEffect(() => {
    (async () => {
      // 파라미터 불러오기
      const query = router.query;
      // API ghcnf
      if (query.code && query.code !== '') {
        const response = await approval(query.code as string);
        if (response.result) {
          setComponent(<PLIPApprovalPage />);
        } else if (response.data.status && response.data.status === 'expires') {
          setComponent(<PLIPApprovalRejectPage />);
        } else {
          setComponent(<PLIP404Page />);
        }
      } else {
        setComponent(<PLIP404Page />);
      }
    })();
  }, [router.query]);

  // 컴포넌트 반환
  return (
    <>{component}</>
  );
}

export default ApprovalMain;