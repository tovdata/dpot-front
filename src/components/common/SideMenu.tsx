// Component
import { Menu } from 'antd';
// Icon
import { IoBriefcase, IoDocument, IoHome, IoPersonSharp, IoReceipt } from 'react-icons/io5';

const SideMenu = (): JSX.Element => {
  return (
    <Menu defaultOpenKeys={['sub1']} defaultSelectedKeys={['1']} mode='inline' style={{ cursor: 'pointer', paddingTop: 74, userSelect: 'none', width: 256 }}>
      <Menu.Item icon={<IoHome />} key='1'>대시보드</Menu.Item>
      <Menu.SubMenu icon={<IoPersonSharp />} key='pim' title='개인정보 관리'>
        <Menu.Item key='2'>수집・이용</Menu.Item>
        <Menu.Item key='3'>제공・위탁</Menu.Item>
        <Menu.Item key='4'>파기</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu icon={<IoDocument />} key='document' title='문서 관리'>
        <Menu.Item key='5'>동의서</Menu.Item>
        <Menu.Item key='6'>개인정보처리방침</Menu.Item>
        <Menu.Item key='7'>내부관리계획</Menu.Item>
        <Menu.Item key='8'>템플릿</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu icon={<IoReceipt />} key='log' title='활동 이력 관리'>
        <Menu.Item key='9'>결재・승인</Menu.Item>
        <Menu.Item key='10'>활동 내역</Menu.Item>
      </Menu.SubMenu>
      <Menu.SubMenu icon={<IoBriefcase />} key='company' title='회사 관리'>
        <Menu.Item key='11'>회사 정보</Menu.Item>
        <Menu.Item key='12'>개인정보 보호 조직</Menu.Item>
      </Menu.SubMenu>
    </Menu>
  )
}

export default SideMenu;