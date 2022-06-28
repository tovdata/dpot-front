import Router from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
// Component
import { Dropdown, Layout, Menu } from 'antd';
import Link from 'next/link';
import { TOVSideMenu } from './SideMenu';
// Icon
import { UserOutlined } from '@ant-design/icons';
// State
import { companySelector, serviceSelector } from '@/models/session';
// Style
import styled from 'styled-components';
import { BasicPageLoading } from './Loading';
import { PLIP403Page } from '../renewer/Page';

/** [Interface] Properties for Sider */
interface SiderProps {
  scroll: number;
}
/** [Interface] Properties for TOVSession */
interface TOVSessionProps {
  children?: JSX.Element | JSX.Element[];
  type?: string;
}
/** [Interface] Properties for TOVPageLayout */
interface TOVPageLayoutProps {
  children?: JSX.Element | JSX.Element[];
  expand: boolean;
  onExpand: () => void;
  selectedKey: string;
}
/** [Interface] Properties for TOVPageSide */
interface TOVPageSideProps {
  expand: boolean;
  onExpand: () => void;
  scroll: number;
  selectedKey: string;
}

/** [Styled Component] 페이지 사이드 */
const Sider = styled(Layout.Sider)<SiderProps>`
  background-color: #FFFFFF;
  border-right: 1px solid #F0F0F0;
  height: ${(props: any) => props.scroll < 64 ? `calc(100vh - 64px + ${props.scroll}px)` : '100vh'};
  overflow-x: hidden;
  overflow-y: overlay;
  position: ${(props: any) => props.scroll >= 64 ? 'fixed' : 'relative'};
  top: 0;
  // 스크롤 보이기
  &:hover {
    &::-webkit-scrollbar-thumb { background-color: rgba(12, 12, 12, 0.24); }
  }
  // 스크롤 스타일
  &::-webkit-scrollbar { background-color: transparent; width: 6px; }
  &::-webkit-scrollbar-thumb { background-color: transparent; border-radius: 8px; }
`;
/** [Styled Component] 페이지 헤더 */
const Header = styled(Layout.Header)`
  background-color: #FFFFFF;
  box-shadow: inset 0px -1px 0px #F0F0F0;
  display: flex;
  font-size: 18px;
  font-weight: 600;
  justify-content: space-between;
  padding-left: 40px;
  padding-right: 40px;
  text-decoration: none;
`;
/** [Styled Component] 페이지 헤더 메뉴 */
const HeaderNav = styled.div`
  user-select: none;
`;
/** [Styled Component] 페이지 헤더 메뉴 아이템 */
const HeaderMenuItem = styled.span`
  border-left: 1px solid #F0F0F0;
  cursor: pointer;
  font-size: 12px;
  font-weight: 600;
  line-height: 20px;
  padding-left: 24px;
  padding-right: 24px;
  &:first-child {
    border-left: none;
  }
`;
/** [Styled Component] 페이지 컨텐츠 기본 패딩 */
export const TOVLayoutPadding = styled.div`
  padding: 74px;
  position: relative;
`;
/** [Styled Component] 페이지 컨텐츠 가로 기본 패딩 */
export const TOVLayoutHorizontalPadding = styled.div`
  padding-left: 74px;
  padding-right: 74px;
  position: relative;
`;
/** [Styled Component] 페이지 컨텐츠 세로 기본 패딩 */
export const TOVLayoutVerticalPadding = styled.div`
  padding-bottom: 74px;
  padding-top: 74px;
  position: relative;
`;

/** [Component] 현재 회사 및 서비스 확인 섹션 */
export const TOVSession: React.FC<any> = ({ children, type }): JSX.Element => {
  const company = useRecoilValueLoadable(companySelector);
  const service = useRecoilValueLoadable(serviceSelector);
  // 컴포넌트 렌더링 상태
  // const [mounted, setMounted] = useState(false);
  // useEffect(() => setMounted(true), []);

  console.log('company', company);
  console.log('service', service);

  // 컴포넌트 반환
  return (
    <>
      {company.state === 'hasValue' && service.state === 'hasValue' ? (
        <>
          {company.contents.id === '' ? (
            <PLIP403Page />
          ) : type === 'service' && service.contents.id === '' ? (
            <PLIP403Page />
          ) : (
            <>{children}</>
          )}
        </>
      ) : (<></>)}
    </>
  );
}
/** [Component] 페이지 레이아웃 */
export const TOVPageLayout: React.FC<TOVPageLayoutProps> = ({ children, expand, onExpand, selectedKey }): JSX.Element => {
  // 스크롤 상태
  const [scroll, setScroll] = useState<number>(0);

  // 스크롤 값 저장을 위한 Hook
  const onScroll = () => setScroll(window.scrollY);
  // 스크롤 이벤트 등록 (최초 1회)
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => removeEventListener('scroll', onScroll);
  }, []);

  // 컴포넌트 반환
  return (
    <Layout>
      <TOVPageHeader />
      <Layout hasSider style={{ backgroundColor: '#FFFFFF' }}>
        <TOVPageSide expand={expand} selectedKey={selectedKey} onExpand={onExpand} scroll={scroll} />
        <Layout.Content style={{ backgroundColor: '#FFFFFF', marginLeft: scroll >= 64 ? expand ? 246 : 80 : undefined, minHeight: 'calc(100vh - 64px)' }}>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
/** [Component] 페이지 레이아웃 (헤더) */
export const TOVPageHeader: React.FC<any> = (): JSX.Element => {
  // 헤더 메뉴 아이템
  const items = useMemo(() => [
    { label: (<Link href='/my'>내 정보</Link>), key: 'info' },
    { label: (<Link href='/signin'>로그아웃</Link>), key: 'sign'}
  ], []);

  // 컴포넌트 반환
  return (
    <Header>
      <div>
        <Link href='/'>
          <label style={{ color: '#000000', cursor: 'pointer', margin: 0 }}>PLIP</label>
        </Link>
      </div>
      <HeaderNav>
        <HeaderMenuItem>사용가이드</HeaderMenuItem>
        <HeaderMenuItem onClick={() => Router.push('/company/info')}>회사 관리</HeaderMenuItem>
        <Dropdown overlay={<Menu items={items} />} trigger={['click']}>
          <UserOutlined style={{ fontSize: 14 }} />
        </Dropdown>
      </HeaderNav>
    </Header>
  );
}

/** [Interneal Component] 페이지 레이아웃 (사이드) */
const TOVPageSide: React.FC<TOVPageSideProps> = ({ expand, onExpand, scroll, selectedKey }): JSX.Element => {
  return (
    <Sider collapsed={!expand} collapsedWidth={88} scroll={scroll} width={246}>
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '100%', paddingTop: 32, width: '100%' }}>
        <TOVSideMenu expand={expand} onExpand={onExpand} selectedKey={selectedKey} />
        <div style={{ alignItems: 'center', display: expand ? 'flex' : 'none', flexDirection: 'column', justifyContent: 'space-between', padding: 24 }}>
          <div style={{ cursor: 'pointer', fontSize: 11, lineHeight: '20px', marginBottom: 8 }}>
            <a style={{ borderRight: '1px solid #8C8C8C', color: '#8C8C8C', fontWeight: '700', paddingLeft: 10, paddingRight: 10 }}>개인정보처리방침</a>
            <a style={{ color: '#8C8C8C', fontWeight: '400', paddingLeft: 10, paddingRight: 10 }}>이용약관</a>
          </div>
          <p style={{ color: '#8C8C8C', fontSize: 11, fontWeight: '400', lineHeight: '16px', marginBottom: 0, textAlign: 'center' }}>©2022. TOVDATA Inc.</p>
        </div>
      </div>
    </Sider>
  );
}

export default TOVSession;