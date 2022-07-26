import Router from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// Component
import Link from 'next/link';
import { StyledPageContent, StyledPageHeader, StyledPageHeaderMenuItem, StyledPageHeaderNav, StyledPageSider, StyledPageSiderFooter } from '../styled/Layout';
// State
import { accessTokenSelector, expandSideSelector, sessionSelector } from '@/models/session';
import { Dropdown, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import PLIPSideMenu from './SideMenu';
import { signout } from '@/models/queries/apis/signin-up';
import { errorNotification, successNotification } from '../common/Notification';
import { useQuery } from 'react-query';
import { KEY_SERVICE } from '@/models/queries/key';
import { getService } from '@/models/queries/apis/company';

export interface PLIPPageLayoutProps {
  children?: JSX.Element | JSX.Element[];
  selectedKey: string;
}

/** [Component] 페이지 레이아웃 (헤더) */
export const PLIPPageHeader: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰
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
  }, [setAccessToken]);

  // 헤더 메뉴 아이템
  const items: any[] = useMemo(() => [
    { label: (<Link href='/my'>내 정보</Link>), key: 'info' },
    { label: (<a onClick={onSignout}>로그아웃</a>), key: 'signin' }
  ], [onSignout]);

  // 컴포넌트 반환
  return (
    <StyledPageHeader>
      <div className='logo'>
        <Link href='/home' passHref>
          <svg width="60" height="26" viewBox="0 0 171 65" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M32.18 0C14.41 0 0 14.41 0 32.18V64.36H9.19V32.48C9.19 19.83 19.29 9.33 31.95 9.2C44.73 9.08 55.16 19.43 55.16 32.18C55.16 44.87 44.87 55.16 32.18 55.16C29.64 55.16 27.58 53.1 27.58 50.56V32.17C27.58 29.15 30.48 26.82 33.65 27.8C35.54 28.39 36.77 30.19 36.77 32.17V45.17C42.12 43.27 45.96 38.16 45.96 32.17C45.96 24.65 39.9 18.51 32.41 18.38C24.69 18.25 18.38 24.7 18.38 32.41V64.34H32.17C49.94 64.34 64.35 49.93 64.35 32.16C64.35 14.39 49.95 0 32.18 0Z" fill="#4380F9"/>
            <path d="M118.1 5.47998C116.2 5.47998 114.67 7.01998 114.67 8.90998V47.16H121.53V8.91998C121.53 7.01998 119.99 5.48998 118.1 5.48998V5.47998Z" fill="#4380F9"/>
            <path d="M130.12 15.78C128.22 15.78 126.69 17.32 126.69 19.21V47.16H133.55V19.21C133.55 17.31 132.01 15.78 130.12 15.78V15.78Z" fill="#4380F9"/>
            <path d="M130.77 4.13999C128.26 4.14999 126.27 6.23999 126.2 8.73999V13.34H130.66C133.21 13.34 135.38 11.32 135.39 8.75999C135.4 6.19999 133.33 4.12999 130.77 4.13999V4.13999Z" fill="#4380F9"/>
            <path d="M94.08 15.78C85.43 15.64 78.34 22.77 78.15 31.38V57.45H85.02V47.15H93.85C102.4 46.99 109.59 39.96 109.54 31.37C109.49 22.84 102.61 15.9 94.1 15.77L94.08 15.78ZM93.83 40.29H85V31.56C85.05 26.8 88.79 22.78 93.56 22.64C98.55 22.49 102.65 26.51 102.65 31.46C102.65 36.41 98.69 40.29 93.82 40.29H93.83Z" fill="#4380F9"/>
            <path d="M154.64 15.78C145.99 15.64 138.9 22.77 138.71 31.38V57.45H145.58V47.15H154.41C162.96 46.99 170.15 39.96 170.1 31.37C170.05 22.84 163.17 15.9 154.66 15.77L154.64 15.78ZM154.39 40.29H145.56V31.56C145.61 26.8 149.35 22.78 154.12 22.64C159.11 22.49 163.21 26.51 163.21 31.46C163.21 36.41 159.25 40.29 154.38 40.29H154.39Z" fill="#4380F9"/>
          </svg>
      </Link>
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
  // 세션 조회
  const session = useRecoilValue(sessionSelector);
  // 스크롤 상태
  const [scroll, setScroll] = useState<number>(0);
  // 메뉴 확장 여부
  const [expand, setExpand] = useRecoilState(expandSideSelector);
  // 서비스 조회
  const { isLoading, data: service } = useQuery([KEY_SERVICE, session.serviceId], async () => await getService(session.serviceId));
  
  // 스크롤 값 저장을 위한 Hook
  const onScroll = useCallback(() => setScroll(window.scrollY), []);
  /** [Event handler] 메뉴 확장 여부 */
  const onExpand = useCallback(() => setExpand(!expand), [expand, setExpand]);
  // 스크롤 이벤트 등록 (최초 1회)
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, [onScroll]);

  // 컴포넌트 반환
  return (
    <>{isLoading ? (<></>) : (
      <Layout>
        <PLIPPageHeader />
        <Layout hasSider>
          <PLIPPageSider expand={expand} onExpand={onExpand} scroll={scroll} selectedKey={selectedKey} service={service} />
          <StyledPageContent expand={expand.toString()} scroll={scroll}>{children}</StyledPageContent>
        </Layout>
      </Layout>
    )}</>
  );
}
/** [Component] 페이지 레이아웃 (사이드) */
export const PLIPPageSider: React.FC<any> = ({ expand, onExpand, scroll, selectedKey, service }): JSX.Element => {
  return (
    <StyledPageSider collapsed={!expand} collapsedWidth={88} scroll={scroll} width={246}>
      <div className='container'>
        <PLIPSideMenu expand={expand} onExpand={onExpand} selectedKey={selectedKey} service={service} />
        <StyledPageSiderFooter expand={expand.toString()}>
          <div className='menu'>
            <a className='pipp'>개인정보처리방침</a>
            <a className='terms' href='https://tovdata.notion.site/4ba3e66ff6b84db78dcabae071eeca3c' rel="noopener noreferrer" target='_blank'>이용약관</a>
          </div>
          <p className='copyright'>©2022. TOVDATA Inc.</p>
        </StyledPageSiderFooter>
      </div>
    </StyledPageSider>
  );
}