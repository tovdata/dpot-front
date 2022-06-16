import Router from 'next/router';
import styled, { css } from 'styled-components'
// Component
import { Menu } from 'antd';
// Icon
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoBusinessOutline } from 'react-icons/io5';
import { DashboardOutlined, DatabaseOutlined, FireOutlined, PartitionOutlined } from '@ant-design/icons';
import { CheckCircleOutlined, PaperClipOutlined, SolutionOutlined, ToolOutlined } from '@ant-design/icons';
import { AuditOutlined, HistoryOutlined } from '@ant-design/icons';

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
    right: 34px;
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
  height: 40px;
  margin-bottom: 4px;
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
/** [Interface] Properties for SideMenuLayout */
interface SideMenuLayoutProps {
  expand: boolean;
}
/** [Interface] Properties for TOVSideMenu */
interface TOVSideMenuProps extends SideMenuLayoutProps {
  onExpand: () => void;
  selectedKey: string;
}

/** [Component] 사이드 레이아웃 */
const SideMenuLayout = styled.div<SideMenuLayoutProps>`
  background-color: #FFFFFF;
  position: relative;
  width: 100%;
  .ant-menu .ant-menu-item {
    margin-bottom: 2px;
    margin-top: 2px;
    padding-left: ${(props: any) => props.expand ? '40px !important' : '35px !important'};
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
    padding-left: ${(props: any) => props.expand ? '40px !important' : '23px'};
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
/** [Component] 사이드 메뉴 */
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
      { label: '활동 내역', key: '/log/activity', icon: (<HistoryOutlined />) }
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