import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
// Component
import { Button, Divider, Drawer, Form, Input, Table, Tabs } from 'antd';
import { StyledDrawerFooter, StyledPageLayout, StyledTabSection, StyledSaveButton, StyledDrawerExtra, StyledEditButton, StyledInviteForm, StyledTableForm } from '../styled/Company';
import { successNotification } from '../common/Notification';
import { PLIPInputGroup } from './Input';
// Icon
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
// Module
import moment from 'moment';
// State
import { companySelector } from '@/models/session';
import { useQuery, useQueryClient } from 'react-query';
import { getUserList } from '@/models/queries/apis/user';
// Query key
import { KEY_USERS } from '@/models/queries/key';

/** [Component] 회사 관리 페이지 */
const ManageCompany: React.FC<any> = (): JSX.Element => {
  // 회사 정보
  const [company, setCompany] = useRecoilState(companySelector);

  // 컴포넌트 반환
  return (
    <StyledPageLayout>
      <div className='container'>
        <Tabs centered defaultActiveKey='company'>
          <Tabs.TabPane key='company' tab='회사 정보'>
            <StyledTabSection>
              <CompanyInfoSection company={company} setCompany={setCompany} />
            </StyledTabSection>
          </Tabs.TabPane>
          <Tabs.TabPane key='organization' tab='개인정보 보호조직'>
            <StyledTabSection>
              <OrganizationInfoSection company={company} />
            </StyledTabSection>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </StyledPageLayout>
  );
}
/** [Internal Component] 회사 정보 관리 Section */
const CompanyInfoSection: React.FC<any> = ({ company, setCompany }): JSX.Element => {
  // Form 객체 생성
  const [form] = Form.useForm();
  // 탭 변경에 따라 Form 내에 필드 초기화
  useEffect(() => form.setFieldsValue({ name: company.companyName, url: company.url, position: company.manager.position, manager: company.manager.name, email: company.manager.email }), [company]);

  /** [Event handler] 변경한 회사 정보 저장 */
  const onSave = useCallback(() => {
    setCompany({ id: company.id, name: form.getFieldValue('name'), url: form.getFieldValue('url'), manager: { name: form.getFieldValue('manager'), position: form.getFieldValue('position'), email: form.getFieldValue('email') } });
    successNotification('변경사항이 저장되었습니다.');
  }, [form]);

  // 컴포넌트 반환
  return (
    <Form form={form} labelCol={{ span: 5 }} onFinish={onSave} style={{ marginLeft: 'auto', marginRight: 'auto', width: 360 }}>
      <PLIPInputGroup label='회사명'>
        <Form.Item name='name' rules={[{ required: true, message: '회사명을 입력해주세요.' }]}>
          <Input placeholder='회사명' disabled />
        </Form.Item>
      </PLIPInputGroup>
      {/* <PLIPInputGroup label='회사명(영문)' required>
        <Form.Item name='en' rules={[{ required: true, message: '회사명(영문)을 입력해주세요.' }, { pattern: new RegExp('^[a-zA-Z]*$'), message: '영문만 입력해주세요.' }]}>
          <Input onChange={(e: any): void => onChange('en', e.target.value)} />
        </Form.Item>
      </PLIPInputGroup> */}
      <PLIPInputGroup label='회사 홈페이지 URL'>
        <Form.Item name='url'>
          <Input />
        </Form.Item>
      </PLIPInputGroup>
      <PLIPInputGroup label='개인정보 보호책임자' required tooltip='개인정보 보호 업무를 총괄하거나 업무처리를 최종 결정하는 사람으로, 대표 혹은 임원이어야 합니다. '>
        <Form.Item colon={false} label='직책/직위' labelAlign='left' name='position' required={false} rules={[{ required: true, message: '직책 또는 직위를 입력해주세요.' }]} style={{ marginBottom: 8 }} >
          <Input />
        </Form.Item>
        <Form.Item colon={false} label='이름' labelAlign='left' name='manager' required={false} rules={[{ required: true, message: '이름을 입력해주세요.' }]} style={{ marginBottom: 8 }}>
          <Input />
        </Form.Item>
        <Form.Item colon={false} label='이메일' labelAlign='left' name='email' required={false} rules={[{ required: true, message: '이메일을 입력해주세요.' }, { type: 'email', message: '이메일 형식을 확인해주세요.' }]}>
          <Input />
        </Form.Item>
      </PLIPInputGroup>
      <Divider dashed />
      <Form.Item>
        <StyledSaveButton htmlType='submit' type='primary'>저장</StyledSaveButton>
      </Form.Item>
    </Form>
  );
}
/** [Internal Component] 조직 정보 관리 Section */
const OrganizationInfoSection: React.FC<any> = ({ company }): JSX.Element => {
  // 회사에 소속된 사용자 조회
  const { isLoading, data } = useQuery(KEY_USERS, async () => await getUserList(company.id));

  // 쿼리 클라이언트
  const queryClient = useQueryClient();
  // 폼 객체 생성
  const [form] = Form.useForm();
  // Drawer 열기/닫기 상태
  const [visible, setVisible] = useState<boolean>(false);

  /** [Event handler] Drawer 열기 */
  const onOpen = useCallback((record: any) => {
    // 폼 데이터 설정
    form.setFieldsValue({ ...record, createAt: moment.unix(record.createAt / 1000).format('YYYY-MM-DD') });
    // 모달 열기
    setVisible(true);
  }, []);
  /** [Event handler] Drawer 닫기 */
  const onClose = useCallback(() => setVisible(false), []);
  /** [Event handler] 테이블 데이터 변경 저장 */
  const onSetTable = (record: any) => {
    queryClient.invalidateQueries(KEY_USERS);
    successNotification('변경사항이 저장되었습니다.');
    onClose();
  }

  // 컴포넌트 반환
  return (
    <StyledTableForm>
      <Table columns={[
        { title: '이름', dataIndex: 'userName', key: 'userName' },
        { title: '부서', dataIndex: 'department', key: 'department' },
        { title: '직책', dataIndex: 'position', key: 'position' },
        { title: '이메일', dataIndex: 'email', key: 'email' },
        { title: '연락처', dataIndex: 'contact', key: 'contact' },
        { title: '가입일', dataIndex: 'createAt', key: 'createAt', render: (value: number): string => moment.unix(value / 1000).format('YYYY-MM-DD') },
        { title: '담당업무', dataIndex: 'task', key: 'task' },
        { title: '', dataIndex: 'edit', key: 'edit', render: (_: any, record: any): JSX.Element => (<EditButton onOpen={() => onOpen(record)} />) },
      ]} loading={isLoading} dataSource={isLoading ? [] : data ? data : []} style={{ marginBottom: 48 }} />
      <StyledInviteForm>
        <p className='content'>아직 가입되어 있지 않은 담당자가 있다면?</p>
        <Button type='default'>초대하기</Button>
      </StyledInviteForm>
      <EditableDrawer form={form} onClose={onClose} onSetTable={onSetTable} visible={visible} />
    </StyledTableForm>
  );
}
/** [Internal Component] 수정 버튼 */
const EditButton: React.FC<any> = ({ onOpen }): JSX.Element => {
  return (
    <StyledEditButton onClick={onOpen}>
      <EditOutlined />
    </StyledEditButton>
  );
}
/** [Internal Component] 조직 구성원 정보 수정을 위한 Drawer */
const EditableDrawer: React.FC<any> = ({ form, index, onClose, onSetTable, visible }): JSX.Element => { 
  /** [Event handler] 데이터 저장 */
  const onSave = useCallback(() => onSetTable(form.getFieldsValue()), [form]);

  // 컴포넌트 반환
  return (
    <Drawer closable={false} extra={<DrawerExtra onClick={onClose} />} footer={<DrawerFooter onSave={onSave} />} onClose={onClose} title='조직 구성원 정보 수정하기' visible={visible}>
      <Form form={form}>
        <PLIPInputGroup label='이름'>
          <Form.Item name='userName'>
            <Input disabled />
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='부서'>
          <Form.Item name='department'>
            <Input />
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='직책'>
          <Form.Item name='position'>
            <Input />
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='이메일'>
          <Form.Item name='email'>
            <Input disabled/>
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='연락처'>
          <Form.Item name='contact'>
            <Input disabled/>
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='가입일'>
          <Form.Item name='createAt'>
            <Input disabled/>
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='담당업무'>
          <Form.Item name='task'>
            <Input />
          </Form.Item>
        </PLIPInputGroup>
      </Form>
    </Drawer>
  );
}
// Drawer footer
const DrawerFooter: React.FC<any> = ({ onSave }): JSX.Element => {
  return (
    <StyledDrawerFooter>
      <Button onClick={onSave} type='primary'>저장</Button>
    </StyledDrawerFooter>
  );
};
/** [Internal Component] Drawer extra */
const DrawerExtra: React.FC<any> = ({ onClick }): JSX.Element => {
  return (
    <StyledDrawerExtra onClick={onClick}>
      <CloseOutlined />
    </StyledDrawerExtra>
  );
}

export default ManageCompany;