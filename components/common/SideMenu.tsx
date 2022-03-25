import { useState } from 'react';
import { useRouter } from 'next/router';
// Component
import { Menu } from 'antd';
// Icon
import { IoBriefcase, IoDocument, IoHome, IoPersonSharp, IoReceipt } from 'react-icons/io5';
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
    <Menu defaultOpenKeys={submenu} defaultSelectedKeys={[path]} mode='inline' openKeys={openKeys} onOpenChange={onChange} onClick={onClick} style={{ cursor: 'pointer', paddingTop: 74, userSelect: 'none', width: 256 }}>
      <Menu.Item icon={<IoHome />} key='/'><Link href='/'>대시보드</Link></Menu.Item>
      <Menu.SubMenu icon={<IoPersonSharp />} key='pim' title='개인정보 관리'>
        <Menu.Item key='/pim/cu'>
          <Link href='/pim/cu'>수집・이용</Link>
        </Menu.Item>
        <Menu.Item key='/pim/pc'>
          <Link href='/pim/pc'>제공・위탁</Link>
        </Menu.Item>
        <Menu.Item key='/pim/dest'>
          <Link href='/pim/dest'>파기</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu icon={<IoDocument />} key='doc' title='문서 관리'>
        <Menu.Item key='/doc/consent'>
          <Link href='/doc/consent'>동의서</Link>
        </Menu.Item>
        <Menu.Item key='/doc/pipp'>
          <Link href='/doc/pipp'>개인정보처리방침</Link>
        </Menu.Item>
        <Menu.Item key='/doc/imp'>
          <Link href='/doc/imp'>내부관리계획</Link>
        </Menu.Item>
        <Menu.Item key='/doc/template'>
          <Link href='/doc/template'>템플릿</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu icon={<IoReceipt />} key='log' title='활동 이력 관리'>
        <Menu.Item key='/log/sa'>
          <Link href='/log/sa'>결재・승인</Link>
        </Menu.Item>
        <Menu.Item key='/log/history'>
          <Link href='/log/history'>활동 내역</Link>
        </Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu icon={<IoBriefcase />} key='company' title='회사 관리'>
        <Menu.Item key='/company/info'>
          <Link href='/company/info'>회사 정보</Link>
        </Menu.Item>
        <Menu.Item key='/company/org'>
          <Link href='/company/org'>개인정보 보호 조직</Link>
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default SideMenu;