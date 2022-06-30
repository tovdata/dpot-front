import Router from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue, useRecoilValueLoadable, useResetRecoilState, useSetRecoilState } from 'recoil';
// Component
import Link from 'next/link';
import { StyledPageContent, StyledPageHeader, StyledPageHeaderMenuItem, StyledPageHeaderNav, StyledPageSider, StyledPageSiderFooter } from '../styled/Layout';
// State
import { accessTokenSelector, companySelector, defaultCompany, defaultService, defaultUser, expandSideSelector, serviceSelector, userSelector } from '@/models/session';
import { Dropdown, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { TOVSideMenu } from '../common/SideMenu';
import { expandSiderSelector } from '@/models/state';
import PLIPSideMenu from './SideMenu';
import { signout } from '@/models/queries/apis/signin-up';
import { errorNotification, successNotification } from '../common/Notification';

export interface PLIPPageLayoutProps {
  children?: JSX.Element | JSX.Element[];
  selectedKey: string;
}

/** [Component] 페이지 레이아웃 (헤더) */
export const PLIPPageHeader: React.FC<any> = (): JSX.Element => {
  // 로컬 스토리지에 저장된 모든 정보
  const setAccessToken = useSetRecoilState(accessTokenSelector);

  /** [Event handler] 회사 관리로 이동 */
  const goManagement = useCallback(() => Router.push('/company/info'), []);
  /** [Event handler] 로그아웃 */
  const onSignout = useCallback(async () => {
    const response = await signout();
    if (response) {
      // Local storage 초기화
      setAccessToken('');
      // 알림
      successNotification('로그아웃 되었습니다.');
      // 로그인 페이지로 이동
      Router.push('/signin');
    } else {
      errorNotification('로그아웃에 실패하였습니다.');
    }
  }, []);

  // 헤더 메뉴 아이템
  const items: any[] = useMemo(() => [
    { label: (<Link href='/my'>내 정보</Link>), key: 'info' },
    { label: (<a onClick={onSignout}>로그아웃</a>), key: 'signin' }
  ], []);

  // 컴포넌트 반환
  return (
    <StyledPageHeader>
      <div className='logo'>
        <Link href='/'>PLIP</Link>
      </div>
      <StyledPageHeaderNav>
        <StyledPageHeaderMenuItem>사용자 가이드</StyledPageHeaderMenuItem>
        <StyledPageHeaderMenuItem onClick={goManagement}>회사 관리</StyledPageHeaderMenuItem>
        <Dropdown overlay={<Menu items={items} />} trigger={['click']}>
          <span className='icon'>
            <UserOutlined />
          </span>
        </Dropdown>
      </StyledPageHeaderNav>
    </StyledPageHeader>
  );
}
/** [Component] 페이지 레이아웃 */
export const PLIPPageLayout: React.FC<any> = ({ children, selectedKey }): JSX.Element => {
  // 스크롤 상태
  const [scroll, setScroll] = useState<number>(0);
  // 메뉴 확장 여부
  const [expand, setExpand] = useRecoilState(expandSideSelector);
  
  // 스크롤 값 저장을 위한 Hook
  const onScroll = useCallback(() => setScroll(window.scrollY), [window]);
  /** [Event handler] 메뉴 확장 여부 */
  const onExpand = useCallback(() => setExpand(!expand), [expand]);
  // 스크롤 이벤트 등록 (최초 1회)
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, []);

  // 컴포넌트 반환
  return (
    <Layout>
      <PLIPPageHeader />
      <Layout hasSider>
        <PLIPPageSider expand={expand} onExpand={onExpand} scroll={scroll} selectedKey={selectedKey} />
        <StyledPageContent expand={expand.toString()} scroll={scroll}>{children}</StyledPageContent>
      </Layout>
    </Layout>
  );
}
/** [Component] 페이지 레이아웃 (사이드) */
export const PLIPPageSider: React.FC<any> = ({ expand, onExpand, scroll, selectedKey }): JSX.Element => {
  // 로컬 스토리지 내 서비스 정보 및 메뉴 확장 여부 조회
  const sessionService = useRecoilValue(serviceSelector);

  // 컴포넌트 반환
  return (
    <StyledPageSider collapsed={!expand} collapsedWidth={88} scroll={scroll} width={246}>
      <div className='container'>
        <PLIPSideMenu expand={expand} onExpand={onExpand} selectedKey={selectedKey} serviceName={sessionService.serviceName} />
        <StyledPageSiderFooter expand={expand.toString()}>
          <div className='menu'>
            <a className='pipp'>개인정보처리방침</a>
            <a className='terms'>이용약관</a>
          </div>
          <p className='copyright'>©2022. TOVDATA Inc.</p>
        </StyledPageSiderFooter>
      </div>
    </StyledPageSider>
  );
}