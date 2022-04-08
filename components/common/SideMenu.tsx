import { useRouter } from 'next/router';
import styled, { css } from 'styled-components'
// Component
import { Divider, Menu } from 'antd';
// Icon
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { IoBusinessOutline } from 'react-icons/io5';
import { AiOutlineAudit, AiOutlineCheckCircle, AiOutlineDatabase, AiOutlineDashboard, AiOutlineFire, AiOutlineHistory, AiOutlinePaperClip, AiOutlinePartition, AiOutlineSolution, AiOutlineTool } from 'react-icons/ai';
import { AiOutlineApartment, AiOutlineTeam } from 'react-icons/ai';
// Link
import Link from 'next/link';

// Styled component (sideMenu)
const StyledSideMenu = styled.div<MenuOpenStatus>`
  height: 100%;
  overflow-y: auto;
  position: relative;
  .ant-menu-item-group {
    margin-bottom: 1.875rem;
  }
  .ant-menu-item-group-title {
    font-size: 12px;
    overflow:hidden;
    white-space:nowrap;
  }
  ${(props: any) => !props.open && css`
    .ant-menu-item > svg {
      margin-left: 9px;
      margin-right: 48px;
      transition-delay: 0.08s;
    }
    .ant-menu-item-group-title {
      padding-left: 20px;
      padding-right: 12px;
      transition-delay: 0.12s;
    }
  `}
`;
// Styled component (sideMenuToggle)
const StyledSideMenuToggle = styled.div<MenuOpenStatus>`
  align-items: center;
  background-color: #ffffff;
  border: 1px solid #0050B3;
  border-radius: 0.25rem;
  color: #0050B3;
  cursor: pointer;
  display: flex;
  justify-content: center;
  height: 1.125rem;
  position: absolute;
  right: 1.25rem;
  transition: transform 0.42s, background-color 0.29s, color: 0.29s;;
  top: 11px;
  width: 1.125rem;
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
  margin: 4px 0 8px 0;
  overflow: hidden;
  padding-left: 17px;
  padding-right: 16px;
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
  transition: margin 0.4s, opacity 0.28s, padding 0.4s;
  user-select: none;
  ${(props: any) => !props.open && css`
    margin-left: 9px;
    margin-right: 48px;
    opacity: 0;
    transition-delay: 0.12s;
  `}
`;
// Styled component (sideMenuProfileContent)
const StyledSideMenuProfileContent = styled.div<MenuOpenStatus>`
  color: #002766;
  display: block;
  flex: 1;
  font-size: 12px;
  line-height: 1.5715;
  margin-left: 10px;
  overflow: hidden;
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
  open: boolean;
  onOpen: () => void;
}

/**
 * [Component] Side menu
 */
const SideMenu = ({open, onOpen}: SideMenuProps): JSX.Element => {
  // Get a router
  const router = useRouter();
  // Extract a submenu key, path
  const path = router.pathname;

  // Return an element
  return (
    <>
      <StyledSideMenu open={open}>
      <Menu defaultSelectedKeys={[path]} mode='inline' style={{ cursor: 'pointer', paddingTop: 24, userSelect: 'none', width: '100%' }}>
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
        <Divider />
        <Menu.ItemGroup title={open ? '개인정보 관리' : '정보관리'}>
          <Menu.Item key='/pim/cu' icon={<AiOutlineDatabase />}>
            <Link href='/pim/cu'>수집・이용</Link>
          </Menu.Item>
          <Menu.Item key='/pim/pc' icon={<AiOutlinePartition />}>
            <Link href='/pim/pc'>제공・위탁</Link>
          </Menu.Item>
          <Menu.Item key='/pim/dest' icon={<AiOutlineFire />}>
            <Link href='/pim/dest'>파기</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup title='문서관리'>
          <Menu.Item key='/doc/consent' icon={<AiOutlineCheckCircle />}>
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
        <Menu.ItemGroup title='회사관리'>
          <Menu.Item key='/company/info' icon={<AiOutlineApartment />}>
            <Link href='/company/info'>회사 정보</Link>
          </Menu.Item>
          <Menu.Item key='/company/org' icon={<AiOutlineTeam />}>
            <Link href='/company/org'>개인정보 보호 조직</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </StyledSideMenu>
    </>
  )
}

export default SideMenu;