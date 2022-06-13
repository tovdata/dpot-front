import { useEffect, useState } from 'react';
// Component
import { Button, Col, Divider, Drawer, Form, Input, Modal, Row, Table, Tabs } from 'antd';
import { TOVInputGroup } from './common/Input';
// Icon
import { EditOutlined } from '@ant-design/icons';
// Styled
import styled from 'styled-components';
// Module
import moment from 'moment';
import { successNotification } from './common/Notification';

// 페이지 Layout
const Layout = styled.div`
  .ant-tabs-top > .ant-tabs-nav::before {
    border-bottom: none;
  }
`;
// 공용 Section
const CommonSection = styled.div`
  margin-top: 80px;
  width: 100%;
`;

/** [Component] 회사 관리 페이지 */
export const Management: React.FC<any> = (): JSX.Element => {
  // Tab 변경 이벤트 감지를 위한 상태
  const [change, setChange] = useState<boolean>(false);
  // 컴포넌트 반환
  return (
    <Layout>
      <Tabs centered defaultActiveKey='company' onChange={(): void => setChange(!change)} style={{ marginTop: 64 }} tabBarStyle={{ borderWidth: 0 }}>
        <Tabs.TabPane key='company' tab='회사 정보'>
          <CommonSection>
            <UserInfoSection change={change} />
          </CommonSection>
        </Tabs.TabPane>
        <Tabs.TabPane key='organization' tab='개인정보 보호조직'>
          <CommonSection>
            <OrganizationSection />
          </CommonSection>
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}
/** [Component] 내 정보 관리 Section */
export const UserInfoSection: React.FC<any> = ({ change, style }): JSX.Element => {
  // Form 객체 생성
  const [form] = Form.useForm();
  // 탭 변경에 따라 Form 내에 필드 초기화
  useEffect(() => form.resetFields(), [change, form]);

  // 모달 Open 상태
  const [visible, setVisible] = useState<boolean>(false);
  /** [Event handler] 모달 열기 */
  const onOpen = () => setVisible(true);
  /** [Event handler] 모달 닫기 */
  const onCancel = () => setVisible(false);
  // 비밀번호 확인 함수
  const confirmPassword = ({ getFieldValue }: any) => ({ validator(_: any, value: string) {
    return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
  } });

  // 컴포넌트 반환
  return (
    <Form form={form} style={{ marginLeft: 'auto', marginRight: 'auto', width: 360, ...style }}>
      <h2 style={{ fontSize: 24, fontWeight: '500', lineHeight: '32px', marginBottom: 64 }}>내 정보</h2>
      <TOVInputGroup label='회사명'>
        <Form.Item name='company'>
          <Input disabled />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='회사명(영문)'>
        <Form.Item name='en'>
          <Input disabled />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='이름' required>
        <Form.Item name='name'>
          <Input />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='휴대전화번호' required>
        <Form.Item name='phone'>
          <Input />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='비밀번호 변경'>
        <Button onClick={onOpen}>변경하기</Button>
      </TOVInputGroup>
      <Divider dashed />
      <Form.Item style={{ marginBottom: 16 }}>
        <Button htmlType='submit' type='primary' style={{ width: '100%' }}>저장</Button>
      </Form.Item>
      <div style={{ display: 'flex', justifyContent:'flex-end' }}>
        <a style={{ color: '#595959', fontSize: 12, fontWeight: '400', lineHeight: '20px' }}>회원 탈퇴하기</a>
      </div>
      <Modal footer={[(<Button key='ok' onClick={onCancel} type='primary'>변경하기</Button>)]} onCancel={onCancel} title='비밀번호 변경' visible={visible}>
        <TOVInputGroup label='기존 비밀번호' required>
          <Form.Item name='prev'>
            <Input />
          </Form.Item>
        </TOVInputGroup>
        <TOVInputGroup label='비밀번호' required>
          <Form.Item extra='영문, 숫자, 특수문자 조합 최소 8자리 이상' hasFeedback name='password' rules={[{ required: true, message: '비밀번호를 입력해주세요.' }, { pattern: new RegExp('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '비밀번호 형식이 올바르지 않습니다.' }]}>
            <Input.Password />
          </Form.Item>
        </TOVInputGroup>
        <TOVInputGroup label='비밀번호 확인' required>
          <Form.Item dependencies={['password']} hasFeedback name='confirmPassword' rules={[{ required: true, message: '비밀번호를 확인해주세요.' }, confirmPassword, { pattern: new RegExp('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '' }]}>
            <Input.Password />
          </Form.Item>
        </TOVInputGroup>
      </Modal>
    </Form>
  );
}
/** [Internal Component] 조직 정보 관리 Section */
const OrganizationSection: React.FC<any> = (): JSX.Element => {
  const [dataSource, setDataSource] = useState<any[]>([{ name: '김토브', department: '정보보안팀', position: '대리', email: 'tov@tovdata.com', contact: '01022223333', createAt: 1654642176, task: '' }]);

  // Drawer 열기/닫기 상태
  const [visible, setVisible] = useState<boolean>(false);
  // 선택된 Row
  const [data, setData] = useState<any>({
    index: 0,
    row: {
      name: '',
      department: '',
      posotion: '',
      email: '',
      contact: '',
      joinAt: '',
      task: ''
    }
  });

  /** [Event handler] Drawer 열기 */
  const onOpen = (index: number, record: any) => {
    setData({ index, row: record });
    setVisible(true);
  }
  /** [Event handler] 데이터 변경 */
  const onChange = (property: string, value: string): void => setData({ index: data.index, row: { ...data.row, [property]: value } });
  /** [Event handler] Drawer 닫기 */
  const onClose = () => setVisible(false);
  /** [Event handler] 저장 */
  const onSave = () => {
    data.index === dataSource.length - 1 ? setDataSource([...dataSource.slice(0, data.index), data.row]) : setDataSource([...dataSource.slice(0, data.index), data.row, ...dataSource.slice(data.index + 1)]);
    successNotification('저장되었습니다.');
    onClose();
  }

  // Drawer tools
  const extraElement: JSX.Element = (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>
      <Button onClick={onSave} type='primary'>저장</Button>
    </div>
  );

  // 컴포넌트 반환
  return (
    <div style={{ paddingLeft: 168, paddingRight: 168, width: '100%' }}>
      <Table columns={[
        { title: '이름', dataIndex: 'name', key: 'name' },
        { title: '부서', dataIndex: 'department', key: 'department' },
        { title: '직책', dataIndex: 'position', key: 'position' },
        { title: '이메일', dataIndex: 'email', key: 'email' },
        { title: '연락처', dataIndex: 'contact', key: 'contact' },
        { title: '가입일', dataIndex: 'createAt', key: 'createAt', render: (value: number): string => moment.unix(value).format('YYYY-MM-DD') },
        { title: '담당업무', dataIndex: 'task', key: 'task' },
        { title: '', dataIndex: 'edit', key: 'edit', render: (_: any, record: any, index: number): JSX.Element => (<span onClick={() => onOpen(index, record)} style={{ cursor: 'pointer', userSelect: 'none' }}><EditOutlined /></span>) },
      ]} dataSource={dataSource} style={{ marginBottom: 48 }} />
      <div style={{ alignItems: 'center', border: '1px dashed #E5E5E5', display: 'flex', justifyContent: 'space-between', padding: '32px 40px', width: '100%' }}>
        <p style={{ fontSize: 14, fontWeight: '600', lineHeight: '22px', margin: 0 }}>아직 가입되어 있지 않은 담당자가 있다면?</p>
        <Button type='default'>초대하기</Button>
      </div>
      <EditableDrawer extra={extraElement} onChange={onChange} onClose={onClose} row={data.row} visible={visible} />
    </div>
  );
}
/** [Internal Component] 조직 구성원 정보 수정을 위한 Drawer */
const EditableDrawer: React.FC<any> = ({ extra, onChange, onClose, row, visible }): JSX.Element => { 
  return (
    <Drawer footer={extra} onClose={onClose} title='조직 구성원 정보 수정하기' visible={visible}>
      <Form>
        <Form.Item style={{ marginBottom :0 }}>
          <TOVInputGroup label='이름' required>
            <Input disabled value={row.name} />
          </TOVInputGroup>
        </Form.Item>
        <Form.Item style={{ marginBottom :0 }}>
          <TOVInputGroup label='부서'>
            <Input onChange={(e: any): void => onChange('department', e.target.value)} value={row.department} />
          </TOVInputGroup>
        </Form.Item>
        <Form.Item style={{ marginBottom :0 }}>
          <TOVInputGroup label='직책'>
            <Input onChange={(e: any): void => onChange('position', e.target.value)} value={row.position} />
          </TOVInputGroup>
        </Form.Item>
        <Form.Item style={{ marginBottom :0 }}>
          <TOVInputGroup label='이메일'>
            <Input disabled value={row.email} />
          </TOVInputGroup>
        </Form.Item>
        <Form.Item style={{ marginBottom :0 }}>
          <TOVInputGroup label='연락처'>
            <Input disabled value={row.contact} />
          </TOVInputGroup>
        </Form.Item>
        <Form.Item style={{ marginBottom :0 }}>
          <TOVInputGroup label='가입일'>
            <Input disabled value={moment.unix(row.createAt).format('YYYY-MM-DD')} />
          </TOVInputGroup>
        </Form.Item>
        <Form.Item style={{ marginBottom :0 }}>
          <TOVInputGroup label='담당업무'>
            <Input onChange={(e: any): void => onChange('task', e.target.value)} value={row.task} />
          </TOVInputGroup>
        </Form.Item>
      </Form>
    </Drawer>
  );
}