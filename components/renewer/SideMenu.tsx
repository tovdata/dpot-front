import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useCallback, useMemo } from 'react';
// Component
import { SideMenuLayout, StyledServiceName, StyledSideMenuProfile, StyledSideMenuProfileContent, StyledSideMenuProfileIcon, StyledSideMenuToggle } from '../styled/SideMenu';
import { Menu } from 'antd';
// Icon
const AiOutlineArrowLeft = dynamic(() => import('react-icons/ai').then((mod: any): any => mod.AiOutlineArrowLeft));
const IoBusinessOutline = dynamic(() => import('react-icons/io5').then((mod: any): any => mod.IoBusinessOutline));
const DashboardOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.DashboardOutlined));
const DatabaseOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.DatabaseOutlined));
const FireOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.FireOutlined));
const PartitionOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.PartitionOutlined));
const CheckCircleOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.CheckCircleOutlined));
const PaperClipOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.PaperClipOutlined));
const SolutionOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.SolutionOutlined));
const ToolOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.ToolOutlined));
const AuditOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.AuditOutlined));
const HistoryOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.HistoryOutlined));

/** [Component] 사이드 메뉴 */
const PLIPSideMenu: React.FC<any> = ({ expand, onExpand, selectedKey, serviceName }): JSX.Element => {
  // 사이드 메뉴 아이템
  const items: any[] = useMemo(() => [
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
  ], [expand]);
  /** [Event handler] 서비스 선택 */
  const goServices = useCallback(() => Router.push('/company/services'), []);
  /** [Event handler] 메뉴 선택 */
  const onSelect = useCallback((value: any): Promise<boolean> => Router.push(value.key), []);

  // 컴포넌트 반환
  return (
    <SideMenuLayout expand={expand}>
      <StyledSideMenuProfile>
        <StyledSideMenuProfileIcon open={expand}>
          <IoBusinessOutline />
        </StyledSideMenuProfileIcon>
        <StyledSideMenuProfileContent open={expand}>
          <StyledServiceName onClick={goServices}>{serviceName}</StyledServiceName>
        </StyledSideMenuProfileContent>
        <StyledSideMenuToggle onClick={onExpand} open={expand}>
          <AiOutlineArrowLeft />
        </StyledSideMenuToggle>
      </StyledSideMenuProfile>
      <Menu mode='inline' items={items} onClick={onSelect} selectedKeys={[selectedKey]} style={{ borderRight: 'none', paddingTop: 0 }} />
    </SideMenuLayout>
  );
}

export default PLIPSideMenu;