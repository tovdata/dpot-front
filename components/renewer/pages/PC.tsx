import dynamic from 'next/dynamic';
import { ComponentType } from 'react';
import { useRecoilValue } from 'recoil';
// Component
import { Tabs } from 'antd';
import { CustomTabPane } from '@/components/styled/PC';
const CFNITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PC').then((mod: any): any => mod.CFNITableForm), { loading: () => (<></>) });
const CPITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PC').then((mod: any): any => mod.CPITableForm), { loading: () => (<></>) });
const PFNITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PC').then((mod: any): any => mod.PFNITableForm), { loading: () => (<></>) });
const PPITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PC').then((mod: any): any => mod.PPITableForm), { loading: () => (<></>) });
// State
import { accessTokenSelector, sessionSelector } from '@/models/session';

const PCMain: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰
  const accessToken: string = useRecoilValue(accessTokenSelector);
  // 세션 조회
  const session = useRecoilValue(sessionSelector);

  // 컴포넌트 반환
  return (
    <Tabs defaultActiveKey="1">
      <CustomTabPane tab="제공" key="1">
        <PPITableForm accessToken={accessToken} serviceId={session.serviceId} />
        <PFNITableForm accessToken={accessToken} serviceId={session.serviceId} />
      </CustomTabPane>
      <CustomTabPane tab="위탁" key="2">
        <CPITableForm accessToken={accessToken} serviceId={session.serviceId} />
        <CFNITableForm accessToken={accessToken} serviceId={session.serviceId} />
      </CustomTabPane>
    </Tabs>
  );
}

export default PCMain;