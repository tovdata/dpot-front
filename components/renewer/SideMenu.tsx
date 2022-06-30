import Router from 'next/router';
import { useCallback, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
// Component
import { SideMenuLayout, StyledServiceName, StyledSideMenuProfile, StyledSideMenuProfileContent, StyledSideMenuProfileIcon, StyledSideMenuToggle } from '../styled/SideMenu';
import { Dropdown, Menu } from 'antd';
// Icon
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoBusinessOutline } from 'react-icons/io5';
import { DashboardOutlined, DatabaseOutlined, FireOutlined, PartitionOutlined } from '@ant-design/icons';
import { CheckCircleOutlined, PaperClipOutlined, SolutionOutlined, ToolOutlined } from '@ant-design/icons';
import { AuditOutlined, HistoryOutlined } from '@ant-design/icons';
// State
import { Company, companySelector, Service, serviceSelector } from '@/models/session';
import { useQuery, useQueryClient } from 'react-query';
import { PLIPService, SERVICE_FNI, SERVICE_PI } from '@/models/queries/type';
import { getServiceList } from '@/models/queries/apis/company';
// Query key
import { KEY_DASHBOARD_CONSENT, KEY_DASHBOARD_CPI, KEY_DASHBOARD_ITEMS, KEY_DASHBOARD_PPI, KEY_SERVICES } from '@/models/queries/key';

/** [Component] 사이드 메뉴 */
const PLIPSideMenu: React.FC<any> = ({ expand, onExpand, selectedKey }): JSX.Element => {
  // 세션 내 회사 및 서비스 정보 조회
  const sessionCompany = useRecoilValue<Company>(companySelector);
  const [sessionService, setSessionService] = useRecoilState<Service>(serviceSelector);
  // 회사 내 서비스 목록 조회
  const { data: services } = useQuery([KEY_SERVICES, sessionCompany.id], async () => await getServiceList(sessionCompany.id));

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
  // 서비스 목록
  const serviceList: any[] = useMemo(() => services ? services.map((service: PLIPService): any => ({
    label: service.serviceName, key: `${service.serviceName}/${service.id}`
  })) : [{ label: sessionService.serviceName, key: `${sessionService.serviceName}/${sessionService.id}` }], [services]);
  // 쿼리 클라이언트
  const queryClient = useQueryClient();
  
  /** [Event handler] 서비스 변경 */
  const onChange = useCallback(({ key }) => {
    const [serviceName, id]: string[] = key.split('/');
    setSessionService({ id, serviceName });
    // 대시보드 초기화
    queryClient.invalidateQueries([KEY_DASHBOARD_ITEMS, id]);
    queryClient.invalidateQueries([KEY_DASHBOARD_CPI, id]);
    queryClient.invalidateQueries([KEY_DASHBOARD_PPI, id]);
    queryClient.invalidateQueries([KEY_DASHBOARD_CONSENT, id]);
    // 각종 테이블 초기화
    queryClient.invalidateQueries([SERVICE_PI, id]);
    queryClient.invalidateQueries([SERVICE_FNI, id]);
  }, []);
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
          <Dropdown overlay={<Menu items={serviceList} onClick={onChange} />} trigger={['click']}>
            <StyledServiceName>{sessionService.serviceName}</StyledServiceName>
          </Dropdown>
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