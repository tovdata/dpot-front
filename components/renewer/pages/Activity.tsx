import type { ComponentType } from 'react';
import { useRecoilValue } from 'recoil';
// Component
import { Tabs } from 'antd';
import { StyledTabSection } from '@/components/styled/Activity';
const ServiceActivity: ComponentType<any> = dynamic(() => import('@/components/renewer/Activity').then((mod: any): any => mod.ServiceActivity), { loading: () => (<></>) });
const UserActivity: ComponentType<any> = dynamic(() => import('@/components/renewer/Activity').then((mod: any): any => mod.UserActivity), { loading: () => (<></>) });
// State
import { accessTokenSelector, sessionSelector } from '@/models/session';
import dynamic from 'next/dynamic';

/** [Component] 활동 내역 메인 컴포넌트 */
const ActivityMain: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰 조회
  const accessToken: string = useRecoilValue(accessTokenSelector);
  // 세션 조회
  const session = useRecoilValue(sessionSelector);

  // 컴포넌트 반환
  return (
    <Tabs defaultActiveKey='my'>
      <Tabs.TabPane key='my' tab='나의 활동 내역'>
        <StyledTabSection>
          <UserActivity accessToken={accessToken} />
        </StyledTabSection>
      </Tabs.TabPane>
      <Tabs.TabPane key='total' tab='전체 활동 내역'>
        <StyledTabSection>
          <ServiceActivity accessToken={accessToken} serviceId={session.serviceId} />
        </StyledTabSection>
      </Tabs.TabPane>
    </Tabs>
  );
}

export default ActivityMain;