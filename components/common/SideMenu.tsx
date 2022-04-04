import { useState } from 'react';
import { useRouter } from 'next/router';
// Component
import { Divider, Menu } from 'antd';
// Icon
import { IoBusinessOutline } from 'react-icons/io5';
import { AiOutlineAudit, AiOutlineCheckCircle, AiOutlineDatabase, AiOutlineDashboard, AiOutlineFire, AiOutlineHistory, AiOutlinePaperClip, AiOutlinePartition, AiOutlineSolution, AiOutlineTool } from 'react-icons/ai';
import { AiOutlineApartment, AiOutlineTeam } from 'react-icons/ai';
// Link
import Link from 'next/link';

const SideMenu = (): JSX.Element => {
  // Get a router
  const router = useRouter();
  // Extract a submenu key, path
  const path = router.pathname;
  // Extract a submenu
  const split: string[] = router.pathname.split('/');
  const submenu: string[]|undefined = split.length > 1 ? [split[1]] : undefined;

  // Set a local state
  const [openKeys, setOpenKeys] = useState<string[]|undefined>(submenu);
  // Create an event handler (onChange)
  const onChange = (keys: string[]): void => {
    // Find a selected key
    const selected: string|undefined = keys.find((key: string): boolean => openKeys ? openKeys.indexOf(key) === -1 : false);
    // Set a state
    setOpenKeys(selected ? [selected] : []);
  }
  // Create an event handler (onClick)
  const onClick = (e: any): void => e.key === '/' ? setOpenKeys([]) : undefined;

  // Return an element
  return (
    <Menu defaultSelectedKeys={[path]} mode='inline' onClick={onClick} style={{ cursor: 'pointer', paddingTop: 32, userSelect: 'none', width: 256 }}>
      <Menu.Item icon={<IoBusinessOutline />}><small>주식회사</small> 토브데이터</Menu.Item>
      <Menu.Item icon={<AiOutlineDashboard />} key='/'><Link href='/'>대시보드</Link></Menu.Item>
      <Divider />
      <Menu.ItemGroup title='개인정보 관리'>
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
      <Menu.ItemGroup title=''>
        <Menu.Item key='/company/info' icon={<AiOutlineApartment />}>
          <Link href='/company/info'>회사 정보</Link>
        </Menu.Item>
        <Menu.Item key='/company/org' icon={<AiOutlineTeam />}>
          <Link href='/company/org'>개인정보 보호 조직</Link>
        </Menu.Item>
      </Menu.ItemGroup>
    </Menu>
  )
}

export default SideMenu;