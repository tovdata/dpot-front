import { useEffect, useState } from 'react';
// Component
import { Button, Col, Divider, Drawer, Form, Input, Row, Table, Tabs } from 'antd';
import { TOVInputGroup } from './common/Input';
// Icon
import { EditOutlined } from '@ant-design/icons';
// Styled
import styled from 'styled-components';

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
      <Tabs centered defaultActiveKey='company' onChange={(key: string): void => setChange(!change)} style={{ marginTop: 64 }} tabBarStyle={{ borderWidth: 0 }}>
        <Tabs.TabPane key='company' tab='회사 정보'>
          <CommonSection>
            <CompanyInfoSection change={change} />
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
/** [Internal Component] 회사 정보 관리 Section */
const CompanyInfoSection: React.FC<any> = ({ change }): JSX.Element => {
  // Form 객체 생성
  const [form] = Form.useForm();
  // 탭 변경에 따라 Form 내에 필드 초기화
  useEffect(() => form.resetFields(), [change]);

  // 컴포넌트 반환
  return (
    <Form form={form} style={{ marginLeft: 'auto', marginRight: 'auto', width: 360 }}>
      <TOVInputGroup label='회사명' required>
        <Form.Item name='name' rules={[{ required: true, message: '회사명을 입력해주세요.' }]}>
          <Input />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='회사명(영문)' required>
        <Form.Item name='name' rules={[{ required: true, message: '회사명(영문)을 입력해주세요.' }, { pattern: new RegExp('^[a-zA-Z]*$'), message: '영문만 입력해주세요.' }]}>
          <Input />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='회사 홈페이지 URL'>
        <Form.Item name='url'>
          <Input />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='개인정보 보호책임자' required tooltip='개인정보 보호책임자 설명'>
        <Row gutter={[8, 8]}>
          <Col span={5} style={{ alignItems: 'start', display: 'flex', marginTop: 5 }}>직책/직위</Col>
          <Col span={19}>
            <Form.Item name='position' rules={[{ required: true, message: '직책 또는 직위를 입력해주세요.' }]} style={{ marginBottom: 0 }}>
              <Input placeholder='예) CPO, 대표이사 등' />
            </Form.Item>
          </Col>
          <Col span={5} style={{ alignItems: 'start', display: 'flex', marginTop: 5 }}>이름</Col>
          <Col span={19}>
            <Form.Item name='charger' rules={[{ required: true, message: '이름을 입력해주세요.' }]} style={{ marginBottom: 0 }}>
              <Input placeholder='김OO' />
            </Form.Item>
          </Col>
          <Col span={5} style={{ alignItems: 'start', display: 'flex', marginTop: 5 }}>이메일</Col>
          <Col span={19}>
            <Form.Item name='email' rules={[{ required: true, message: '이메일을 입력해주세요.' }, { type: 'email', message: '' }]} style={{ marginBottom: 0 }}>
              <Input placeholder='nickname@company.com' />
            </Form.Item>
          </Col>
        </Row>
      </TOVInputGroup>
      <Divider dashed />
      <Form.Item>
        <Button htmlType='submit' type='primary' style={{ width: '100%' }}>저장</Button>
      </Form.Item>
    </Form>
  );
}
/** [Internal Component] 조직 정보 관리 Section */
export const OrganizationSection: React.FC<any> = (): JSX.Element => {
  return (
    <div style={{ paddingLeft: 168, paddingRight: 168, width: '100%' }}>
      <Table columns={[
        { title: '이름', dataIndex: 'name', key: 'name' },
        { title: '부서', dataIndex: 'department', key: 'department' },
        { title: '직책', dataIndex: 'position', key: 'position' },
        { title: '이메일', dataIndex: 'email', key: 'email' },
        { title: '연락처', dataIndex: 'contact', key: 'contact' },
        { title: '가입일', dataIndex: 'joinAt', key: 'joinAt' },
        { title: '담당업무', dataIndex: 'task', key: 'task' },
        { title: '', dataIndex: 'edit', key: 'edit', render: (): JSX.Element => (<span style={{ cursor: 'pointer', userSelect: 'none' }}><EditOutlined /></span>) },
      ]} dataSource={[
        { name: '김토브', department: '정보보안팀', position: '대리', email: 'tov@tovdata.com', contact: '01022223333', joinAt: '2022-06-03', task: '' }
      ]} style={{ marginBottom: 48 }} />
      <div style={{ alignItems: 'center', border: '1px dashed #E5E5E5', display: 'flex', justifyContent: 'space-between', padding: '32px 40px', width: '100%' }}>
        <p style={{ fontSize: 14, fontWeight: '600', lineHeight: '22px', margin: 0 }}>아직 가입되어 있지 않은 담당자가 있다면?</p>
        <Button type='default'>초대하기</Button>
      </div>
      <Drawer title=''>
        <Form>
          <Form.Item></Form.Item>
        </Form>
      </Drawer>
    </div>
  );
}