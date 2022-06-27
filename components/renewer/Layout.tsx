import Router from 'next/router';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
// Component
import Link from 'next/link';
import { StyledPageContent, StyledPageHeader, StyledPageHeaderMenuItem, StyledPageHeaderNav, StyledPageSider, StyledPageSiderFooter } from '../styled/Layout';
// State
import { companySelector, serviceSelector } from '@/models/session';
import { Dropdown, Layout, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { TOVSideMenu } from '../common/SideMenu';
import { expandSiderSelector } from '@/models/state';

/** [Component] 페이지 레이아웃 (헤더) */
export const PLIPPageHeader: React.FC<any> = (): JSX.Element => {
  // 헤더 메뉴 아이템
  const items: any[] = useMemo(() => [
    { label: (<Link href='/my'>내 정보</Link>), key: 'info' },
    { label: (<Link href='/signin'>로그아웃</Link>), key: 'signin' }
  ], []);

  /** [Event handler] 회사 관리로 이동 */
  const goManagement = useCallback(() => Router.push('/company/info'), []);

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
export const PLIPPageLayout: React.FC<any> = ({ children, expand, onExpand, selectedKey }): JSX.Element => {
  // 스크롤 상태
  const [scroll, setScroll] = useState<number>(0);

  // 스크롤 값 저장을 위한 Hook
  const onScroll = useCallback(() => setScroll(window.scrollY), [window]);
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
        <StyledPageContent expand={expand} scroll={scroll}>{children}</StyledPageContent>
      </Layout>
    </Layout>
  );
}
/** [Component] 페이지 레이아웃 (사이드) */
export const PLIPPageSider: React.FC<any> = ({ expand, onExpand, scroll, selectedKey }): JSX.Element => {
  return (
    <StyledPageSider collapsed={!expand} collapsedWidth={88} scroll={scroll} width={246}>
      <div className='container'>
        <TOVSideMenu expand={expand} onExpand={onExpand} selectedKey={selectedKey} />
        <StyledPageSiderFooter expand={expand}>
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