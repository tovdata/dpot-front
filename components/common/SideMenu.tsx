import Router from 'next/router';
import { useRouter } from 'next/router';
import styled, { css } from 'styled-components'
// Component
import { Button, Menu } from 'antd';
// Icon
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoBusinessOutline } from 'react-icons/io5';
import { AiOutlineAudit, AiOutlineCheckCircle, AiOutlineDatabase, AiOutlineDashboard, AiOutlineFire, AiOutlineHistory, AiOutlinePaperClip, AiOutlinePartition, AiOutlineSolution, AiOutlineTool } from 'react-icons/ai';
import { AiOutlineApartment, AiOutlineTeam } from 'react-icons/ai';

import { ArrowLeftOutlined, DashboardOutlined, DatabaseOutlined, FireOutlined, PartitionOutlined } from '@ant-design/icons';
import { CheckCircleOutlined, PaperClipOutlined, SolutionOutlined, ToolOutlined } from '@ant-design/icons';
import { AuditOutlined, HistoryOutlined } from '@ant-design/icons';

// Link
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MenuItem from 'antd/lib/menu/MenuItem';

// Set a side width
const CLOSE_SIDE_WIDTH: number = 88;
const OPEN_SIDE_WIDTH: number = 256;

// Styled component (sideMenu)
const StyledSideMenu = styled.div<SideMenuProps>`
  height: 100%;
  overflow-y: auto;
  position: relative;
  width: ${OPEN_SIDE_WIDTH}px;
  transition: all 0.42s;
  &::-webkit-scrollbar {
  /* 스크롤바 너비 조절하는 부분 */
    width: 8px; 
  }
  &::-webkit-scrollbar,
  &::-webkit-scrollbar-thumb {
    overflow:visible;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0,0,0,.2); 
  }

  .ant-menu-item {
    padding-left: 2.125rem !important;
  }
  .ant-menu-item > .ant-menu-title-content {
    margin-left: 1.375rem;
  }
  .ant-menu-item > svg {
    height: 1.25rem;
    width: 1.25rem;
  }
  .ant-menu-item-group {
    margin-bottom: 1.875rem;
  }
  .ant-menu-item-group-title {
    font-size: 12px;
    padding-left: 1.875rem;
    overflow:hidden;
    white-space:nowrap;
  }
  ${(props: any) => !props.open && css`
    width: ${CLOSE_SIDE_WIDTH}px;
    .ant-menu-item > svg {
      margin-right: 3rem;
    }
    .ant-menu-item-group-title {
      padding-left: 1.5rem;
      padding-right: 0.75rem;
    }
  `}
  ${(props: any) => props.isFixed && css`
    position: fixed;
    top: 0;
  `}
`;
// Styled component (sideMenuToggle)
const StyledSideMenuToggle = styled.div<MenuOpenStatus>`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #0050B3;
  border-radius: 4px;
  color: #0050B3;
  cursor: pointer;
  display: flex;
  font-size: 12px;
  justify-content: center;
  height: 18px;
  position: absolute;
  right: 18px;
  transition: transform 0.42s, background-color 0.29s, color: 0.29s;;
  top: 11px;
  width: 18px;
  z-index: 11;
  ${(props: any) => !props.open && css`
    background-color: #0050B3;
    color: #ffffff;
    right: 30px;
    svg {
      transform: rotate(180deg);
    }
  `}
`;
// Styled component (sideMenuProfile)
const StyledSideMenuProfile = styled.li`
  align-items: center;
  cursor: default;
  display: flex;
  height: 2.5rem;
  margin-bottom: 4px;
  margin-top: 32px;
  overflow: hidden;
  padding-left: 33px;
  padding-right: 0;
  position: relative;
  width: 100%;
`;
// Styled component (sideMenuProfileIcon)
const StyledSideMenuProfileIcon = styled.span<MenuOpenStatus>`
  align-items: center;
  background-color: #f0f5ff;
  border-radius: 0.25rem;
  display: flex;
  height: 1.75rem;
  justify-content: center;
  padding: 7px;
  transition: opacity 0.26s;
  user-select: none;
  ${(props: any) => !props.open && css`
    opacity: 0;
    transition-delay: 0.12s;
  `}
`;
// Styled component (sideMenuProfileContent)
const StyledSideMenuProfileContent = styled.div<MenuOpenStatus>`
  color: #002766;
  display: block;
  flex: 1;
  font-size: 13px;
  line-height: 1.5715;
  margin-left: 12px;
  overflow: hidden;
  padding-right: 46px;
  text-overflow: ellipsis;
  transition: opacity 0.19s;
  white-space:nowrap;
  ${(props: any) => !props.open && css`
    opacity: 0;
  `}
`;

/** [Interface] Menu open status */
interface MenuOpenStatus {
  open: boolean;
}
/** [Interface] Properties for side menu */
interface SideMenuProps {
  isFixed: boolean;
  open: boolean;
  onOpen?: () => void;
}

/**
 * [Component] Side menu
 */
const SideMenu = ({ isFixed, open, onOpen }: SideMenuProps): JSX.Element => {
  // Get a router
  const router = useRouter();
  // Extract a submenu key, path
  const path = router.pathname;

  // Return an element
  return (
    <>
      <StyledSideMenu isFixed={isFixed} open={open}>
        <Menu defaultSelectedKeys={[path]} mode='inline' style={{ cursor: 'pointer', paddingTop: 22, userSelect: 'none', width: '100%' }}>
          <StyledSideMenuProfile>
            <StyledSideMenuProfileIcon open={open}>
              <IoBusinessOutline />
            </StyledSideMenuProfileIcon>
            <StyledSideMenuProfileContent open={open}>{'주식회사 토브데이터'}</StyledSideMenuProfileContent>
            <StyledSideMenuToggle onClick={onOpen} open={open}>
              <AiOutlineArrowLeft />
            </StyledSideMenuToggle>
          </StyledSideMenuProfile>
          <Menu.Item icon={<AiOutlineDashboard />} key='/'><Link href='/'>대시보드</Link></Menu.Item>
          <Menu.Divider style={{ margin: '1.625rem' }} />
          <Menu.ItemGroup title={open ? '개인정보 관리' : '정보관리'}>
            <Menu.Item key='/pim/cu' icon={<AiOutlineDatabase size={20} />}>
              <Link href='/pim/cu'>수집・이용</Link>
            </Menu.Item>
            <Menu.Item key='/pim/pc' icon={<AiOutlinePartition size={20} />}>
              <Link href='/pim/pc'>제공・위탁</Link>
            </Menu.Item>
            <Menu.Item key='/pim/dest' icon={<AiOutlineFire size={20} />}>
              <Link href='/pim/dest'>파기</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title='문서관리'>
            <Menu.Item key='/doc/consent' icon={<AiOutlineCheckCircle size={20} />}>
              <Link href='/doc/consent'>동의서</Link>
            </Menu.Item>
            <Menu.Item key='/doc/pipp' icon={<AiOutlineSolution />}>
              <Link href='/doc/pipp'>개인정보처리방침</Link>
            </Menu.Item>
            <Menu.Item key='/doc/imp' icon={<AiOutlineTool />}>
              <Link href='/doc/imp'>내부관리계획</Link>
            </Menu.Item>
            <Menu.Item key='/doc/template' icon={<AiOutlinePaperClip />}>
              <Link href='/doc/template'>템플릿</Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title='활동이력'>
            <Menu.Item key='/log/sa' icon={<AiOutlineAudit />}>
              <Link href='/log/sa'>결재・승인</Link>
            </Menu.Item>
            <Menu.Item key='/log/history' icon={<AiOutlineHistory />}>
              <Link href='/log/history'>활동 내역</Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </Menu>
      </StyledSideMenu>
    </>
  )
}

/** [Interface] Properties for SideMenuLayout */
interface SideMenuLayoutProps {
  expand: boolean;
}
/** [Interface] Properties for TOVSideMenu */
interface TOVSideMenuProps extends SideMenuLayoutProps {
  onExpand: () => void;
  selectedKey: string;
}

const SideMenuLayout = styled.div<SideMenuLayoutProps>`
  background-color: #FFFFFF;
  position: relative;
  width: 100%;
  .ant-menu .ant-menu-item {
    padding-left: ${(props: any) => props.expand ? '40px !important' : '31.5px !important'};
  }
  .ant-menu .ant-menu-item-divider {
    margin: ${(props: any) => props.expand ? '16px 20px 8px 20px' : '16px 16px 8px 16px'};
  }
  .ant-menu .ant-menu-item-group {
    margin-bottom: 32px;
  }
  .ant-menu .ant-menu-item-group-title {
    color: #595959;
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    padding-left: ${(props: any) => props.expand ? '40px !important' : '19px'};
    text-overflow: ellipsis;
    white-space: nowrap;
    ${(props: any) => props.expand && css`
      padding-right: 0 !important;
    `}
  }  
  .ant-menu-title-content {
    margin-left: 16px !important;
  }
`;

export const TOVSideMenu: React.FC<TOVSideMenuProps> = ({ expand, onExpand, selectedKey }): JSX.Element => {
  // 메뉴 아이템 정의
  const items: any[] = [
    { label: '대시보드', key: '/', icon: (<DashboardOutlined />) },
    { type: 'divider' },
    { label: expand ? '개인정보 관리' : '정보관리', key: 'group1', type: 'group', children: [
      { label: '수집・이용', key: '/pim/cu', icon: (<DatabaseOutlined />) },
      { label: '제공・위탁', key: '/pim/pc', icon: (<PartitionOutlined />) },
      { label: '파기', key: '/pim/dest', icon: (<FireOutlined />) }
    ] },
    { label: '문서관리', key: 'group2', type: 'group', children: [
      { label: '동의서', key: '/doc/consent', icon: (<CheckCircleOutlined />) },
      { label: '개인정보처리방침', key: '/doc/pipp', icon: (<SolutionOutlined />) },
      { label: '내부관리계획', key: '/doc/imp', icon: (<ToolOutlined />) },
      { label: '템플릿', key: '/doc/template', icon: (<PaperClipOutlined />) }
    ] },
    { label: '활동이력', key: 'group3', type: 'group', children: [
      { label: '결재・승인', key: '/log/sa', icon: (<AuditOutlined />) },
      { label: '활동 내역', key: '/log/history', icon: (<HistoryOutlined />) }
    ] }
  ]

  // 컴포넌트 반환
  return (
    <SideMenuLayout expand={expand}>
      <StyledSideMenuProfile>
        <StyledSideMenuProfileIcon open={expand}>
          <IoBusinessOutline />
        </StyledSideMenuProfileIcon>
        <StyledSideMenuProfileContent open={expand}>{'주식회사 토브데이터'}</StyledSideMenuProfileContent>
        <StyledSideMenuToggle onClick={onExpand} open={expand}>
          <AiOutlineArrowLeft />
        </StyledSideMenuToggle>
      </StyledSideMenuProfile>
      <Menu mode='inline' items={items} onClick={(value: any): Promise<boolean> => Router.push(value.key)} selectedKeys={[selectedKey]} style={{ borderRight: 'none', paddingTop: 0 }} />
    </SideMenuLayout>
  );
}

const ProfileIcon: React.FC<any> = (): JSX.Element => {
  return (
    <span style={{ alignItems: 'center', backgroundColor: '#F0F5FF', borderRadius: 4, display: 'flex', height: 28, justifyContent: 'center', padding: 7, userSelect: 'none' }}>
      <IoBusinessOutline />
    </span>
  );
}

export default SideMenu;