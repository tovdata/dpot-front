import dynamic from 'next/dynamic';
import type { ComponentType } from 'react';
import { useRecoilValue } from 'recoil';
// Component
const FNITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PI').then((module: any): any => module.FNITableForm));
const PITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PI').then((module: any): any => module.PITableForm));
// State
import { accessTokenSelector, sessionSelector } from '@/models/session';

const PIMain: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰 조회
  const accessToken: string = useRecoilValue(accessTokenSelector);
  // 세션 조회
  const session = useRecoilValue(sessionSelector);
  
  // 컴포넌트 반환
  return (
    <>
      <PITableForm accessToken={accessToken} serviceId={session.serviceId} />
      <FNITableForm accessToken={accessToken} serviceId={session.serviceId} />
    </>
  );
}

export default PIMain;