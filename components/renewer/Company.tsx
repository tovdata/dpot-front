import { useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { Button, Divider, Drawer, Form, Input, Table, Tabs } from 'antd';
import { StyledDrawerFooter, StyledPageLayout, StyledTabSection, StyledSaveButton, StyledDrawerExtra, StyledEditButton, StyledInviteForm, StyledTableForm } from '../styled/Company';
import { errorNotification, successNotification, warningNotification } from '../common/Notification';
import { PLIPInputGroup } from './Input';
// Icon
import { CloseOutlined, EditOutlined } from '@ant-design/icons';
// Query
import { deregisterUser, getCompany, updateCompany } from '@/models/queries/apis/company';
import { getUsers, updateUser } from '@/models/queries/apis/user';
// Query key
import { KEY_COMPANY, KEY_USERS } from '@/models/queries/key';
import { PLIPSimpleLoadingContainer } from './Page';
// State
import { sessionSelector } from '@/models/session';
// Util
import { transformToDate, transformToUnix } from 'utils/utils';

/** [Component] 회사 관리 페이지 */
const ManageCompany: React.FC<any> = (): JSX.Element => {
  // 세션 조회
  const session = useRecoilValue(sessionSelector);

  // 컴포넌트 반환
  return (
    <StyledPageLayout>
      <div className='container'>
        <Tabs centered defaultActiveKey='company'>
          <Tabs.TabPane key='company' tab='회사 정보'>
            <StyledTabSection>
              <CompanyInfoSection companyId={session.companyId} />
            </StyledTabSection>
          </Tabs.TabPane>
          <Tabs.TabPane key='organization' tab='개인정보 보호조직'>
            <StyledTabSection>
              <OrganizationInfoSection companyId={session.companyId} />
            </StyledTabSection>
          </Tabs.TabPane>
        </Tabs>
      </div>
    </StyledPageLayout>
  );
}
/** [Internal Component] 회사 정보 관리 Section */
const CompanyInfoSection: React.FC<any> = ({ companyId }): JSX.Element => {
  // 회사 정보 조회
  const { isLoading, data: company } = useQuery([KEY_COMPANY, companyId], async () => await getCompany(companyId));

  // Form 객체 생성
  const [form] = Form.useForm();
  // Query client
  const queryClient = useQueryClient();

  // 탭 변경에 따라 Form 내에 필드 초기화
  useEffect(() => company ? form.setFieldsValue({ name: company.companyName, url: company.url, position: company.manager.position, manager: company.manager.name, email: company.manager.email }) : undefined, [company]);
  /** [Event handler] 변경한 회사 정보 저장 */
  const onSave = useCallback(async () => {
    // 변경된 데이터
    const updated: any = {
      url: form.getFieldValue('url'),
      manager: {
        name: form.getFieldValue('manager'),
        position: form.getFieldValue('position'),
        email: form.getFieldValue('email')
      }
    };
    // API 호출
    const response = await updateCompany(companyId, updated);
    // 결과 처리
    if (response.result) {
      queryClient.invalidateQueries([KEY_COMPANY, companyId]);
      successNotification('변경사항이 저장되었습니다.');
    } else {
      errorNotification('변경사항 저장에 실패하였습니다.');
    }
  }, [company, form, queryClient]);

  // 컴포넌트 반환
  return (
    <>{ isLoading ? (
      <PLIPSimpleLoadingContainer />
    ) : (
      <Form form={form} labelCol={{ span: 5 }} onFinish={onSave} style={{ marginLeft: 'auto', marginRight: 'auto', width: 360 }}>
        <PLIPInputGroup label='회사명'>
          <Form.Item name='name' rules={[{ required: true, message: '회사명을 입력해주세요.' }]}>
            <Input placeholder='회사명' disabled />
          </Form.Item>
        </PLIPInputGroup>
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
    )}
    </>
  );
}
/** [Internal Component] 조직 정보 관리 Section */
const OrganizationInfoSection: React.FC<any> = ({ companyId }): JSX.Element => {
  // 회사에 소속된 사용자 조회
  const { isLoading, data: users } = useQuery([KEY_USERS, companyId], async () => await getUsers(companyId));

  // 쿼리 클라이언트
  const queryClient = useQueryClient();
  // 폼 객체 생성
  const [form] = Form.useForm();
  // Drawer 열기/닫기 상태
  const [visible, setVisible] = useState<boolean>(false);
  // 데이터 동기
  const { mutate } = useMutation(async ({ data }: any) => {
    return await updateUser(data.id, data);
  });

  /** [Event handler] Drawer 열기 */
  const onOpen = useCallback((record: any) => {
    // 폼 데이터 설정
    form.setFieldsValue({ ...record, createAt: transformToDate(record.createAt) });
    // 모달 열기
    setVisible(true);
  }, []);
  /** [Event handler] Drawer 닫기 */
  const onClose = useCallback(() => setVisible(false), []);
  /** [Event handler] 테이블 데이터 변경 저장 */
  const onSetTable = (record: any) => {
    mutate({ data: record }, {
      onSuccess: async (response) => {
        if (response) {
          queryClient.setQueryData([KEY_USERS, companyId], (oldData: any) => {
            const index: number = oldData.findIndex((elem: any): boolean => elem.id === record.id);
            // 생성일 형식 변경
            record.createAt = transformToUnix(record.createAt);
            // 목록 업데이트
            return index === oldData.length - 1 ? [...oldData.splice(0, index), record] : [...oldData.splice(0, index), record, ...oldData.splice(index + 1)];
          });
          successNotification('변경사항이 저장되었습니다.');
        } else {
          errorNotification('변경사항이 실패하였습니다.');
        }
      },
      onError: () => {
        queryClient.invalidateQueries([KEY_USERS, companyId]);
      }
    });
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
        { title: '가입일', dataIndex: 'createAt', key: 'createAt', render: (value: number): string => transformToDate(value) },
        { title: '담당업무', dataIndex: 'task', key: 'task' },
        { title: '', dataIndex: 'id', key: 'id', render: (_: any, record: any): JSX.Element => (<EditButton onOpen={() => onOpen(record)} />) },
      ]} loading={isLoading} dataSource={isLoading ? [] : users ? users.map((elem: any): any => ({ ...elem, key: elem.id })) : []} style={{ marginBottom: 48 }} />
      <StyledInviteForm>
        <p className='content'>아직 가입되어 있지 않은 담당자가 있다면?</p>
        <Button type='default'>초대하기</Button>
      </StyledInviteForm>
      <EditableDrawer companyId={companyId} form={form} onClose={onClose} onSetTable={onSetTable} visible={visible} />
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
const EditableDrawer: React.FC<any> = ({ companyId, form, onClose, onSetTable, visible }): JSX.Element => {
  /** [Event handler] 데이터 삭제 */
  const onDelete = useCallback(async() => {
    const response = await deregisterUser(companyId, form.getFieldValue('id'));
    response ? successNotification('사용자가 회사에서 제외되었습니다.') : errorNotification('사용자를 제외하는 과정에서 오류가 발생하였습니다.');
  }, [companyId, form]);
  /** [Event handler] 데이터 저장 */
  const onSave = useCallback(() => onSetTable(form.getFieldsValue()), [form]);

  // 컴포넌트 반환
  return (
    <Drawer closable={false} extra={<DrawerExtra onClick={onClose} />} footer={<DrawerFooter onDelete={onDelete} onSave={onSave} />} onClose={onClose} title='조직 구성원 정보 수정하기' visible={visible}>
      <Form form={form}>
        <Form.Item name='id' hidden>
          <Input disabled />
        </Form.Item>
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
const DrawerFooter: React.FC<any> = ({ onDelete, onSave }): JSX.Element => {
  return (
    <StyledDrawerFooter>
      <Button danger onClick={onDelete}>삭제</Button>
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