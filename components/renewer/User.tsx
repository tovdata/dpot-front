import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { Button, Divider, Form, Input, Modal } from 'antd';
import { errorNotification, successNotification } from '@/components/common/Notification';
import { StyledUserForm, StyledUserFormHeader, StyledWithdrawal } from '@/components/styled/User';
import { PLIPSimpleLoadingContainer } from '@/components/renewer/Page';
import { PLIPInputGroup } from '@/components/renewer/Input';
// Query
import { getCompany } from '@/models/queries/apis/company';
import { getUser, updatePassword, updateUser } from '@/models/queries/apis/user';
// Query key
import { KEY_COMPANY, KEY_USER } from '@/models/queries/key';
// State
import { accessTokenSelector, sessionSelector } from '@/models/session';
// Util
import { decodeAccessToken } from 'utils/utils';


/** [Component] 내 정보 관리 */
const ManageUser: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰 조회
  const accessToken: string = useRecoilValue(accessTokenSelector);
  // 세션 조회
  const session = useRecoilValue(sessionSelector);

  return (
    <StyledUserForm>
      <UserInfoSection accessToken={accessToken} companyId={session.companyId} />
    </StyledUserForm>
  );
}

/** [Internal Component] 내 정보 관리 Section */
const UserInfoSection: React.FC<any> = ({ accessToken, companyId }): JSX.Element => {
  // 사용자 ID 추출
  const userId: string = decodeAccessToken(accessToken);
  // 사용자 조회
  const { isLoading, data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));
  // 회사 정보 조회
  const { data: company } = useQuery([KEY_COMPANY, companyId], async () => await getCompany(companyId));

  // 모달 Open 상태
  const [visible, setVisible] = useState<boolean>(false);
  // Form 객체 생성
  const [form] = Form.useForm();
  const [modalForm] = Form.useForm();
  // 회사명 설정
  useEffect(() => form.setFieldsValue({ ...form, company: company ? company.companyName : '' }), [form, company]);
  // 사용자 정보 설정
  useEffect(() => form.setFieldsValue({ name: user ? user.userName : '', email: user ? user.email : '', contact: user ? user.contact : '' }), [user, form]);

  /** [Event handler] 모달 열기 */
  const onOpen = useCallback(() => setVisible(true), []);
  /** [Event handler] 모달 닫기 */
  const onCancel = useCallback(() => {
    setVisible(false);
    modalForm.resetFields();
  }, [modalForm]);
  /** [Event handler] 비밀번호 변경 */
  const onChangePwd = useCallback(async () => {
    modalForm.validateFields().then(async (values: any) => {
      if (user && user.email) {
        const response = await updatePassword(user.email, values.prevPasswowrd, values.newPassword);
        response ? successNotification('비밀번호를 변경하였습니다.') : errorNotification('비밀번호 변경에 실패하였습니다.');
        onCancel();
      }
    });
  }, [user, modalForm, onCancel]);
  /** [Event handler] 변경한 회사 정보 저장 */
  const onSave = useCallback(async () => {
    const response = await updateUser(userId, { userName: form.getFieldValue('name'), contact: form.getFieldValue('contact') });
    if (response) {
      successNotification('변경된 사용자 정보가 저장되었습니다.');
    } else {
      errorNotification('사용자 정보 저장에 실패하였습니다.');
    }
  }, [user, form, userId]);
  // 비밀번호 확인 함수
  const confirmPassword = ({ getFieldValue }: any) => ({ validator(_: any, value: string) {
    return !value || getFieldValue('newPassword') === value ? Promise.resolve() : Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
  } });
  /** [Event handler] 회원 탈퇴에 대한 알림 */
  const onNoti = useCallback(() => {
    Modal.warning({
      centered: true,
      content: 'plip@tovdata.com으로 이메일을 보내주시면 탈퇴에 대한 안내와 더불어 즉시 처리해드릴게요 !',
      okText: '닫기',
      title: '현재 베타서비스 중입니다.',
    });
  }, []);

  // 컴포넌트 반환
  return (
    <>
      {isLoading ? (
        <PLIPSimpleLoadingContainer />
      ) : (
        <>
          <Form form={form} onFinish={onSave}>
            <StyledUserFormHeader>내 정보</StyledUserFormHeader>
            <PLIPInputGroup label='회사명'>
              <Form.Item name='company'>
                <Input disabled />
              </Form.Item>
            </PLIPInputGroup>
            <PLIPInputGroup label='이메일' required>
              <Form.Item name='email'>
                <Input disabled />
              </Form.Item>
            </PLIPInputGroup>
            <PLIPInputGroup label='이름' required>
              <Form.Item name='name'>
                <Input />
              </Form.Item>
            </PLIPInputGroup>
            <PLIPInputGroup label='휴대전화번호' required>
              <Form.Item name='contact'>
                <Input />
              </Form.Item>
            </PLIPInputGroup>
            <PLIPInputGroup label='비밀번호 변경'>
              <Button onClick={onOpen}>변경하기</Button>
            </PLIPInputGroup>
            <Divider dashed />
            <Form.Item style={{ marginBottom: 16 }}>
              <Button htmlType='submit' type='primary' style={{ width: '100%' }}>저장</Button>
            </Form.Item>
            <StyledWithdrawal>
              <a className='content' onClick={onNoti}>회원 탈퇴하기</a>
            </StyledWithdrawal>
          </Form>
          <Modal footer={[(<Button key='ok' onClick={onChangePwd} type='primary'>변경하기</Button>)]} onCancel={onCancel} title='비밀번호 변경' visible={visible}>
            <Form form={modalForm}>
              <PLIPInputGroup label='기존 비밀번호' required>
                <Form.Item name='prevPasswowrd' rules={[{ required: true, message: '기존 비밀번호를 입력해주세요.' }]}>
                  <Input.Password />
                </Form.Item>
              </PLIPInputGroup>
              <PLIPInputGroup label='비밀번호' required>
                <Form.Item extra='영문, 숫자, 특수문자 조합 최소 8자리 이상' hasFeedback name='newPassword' rules={[{ required: true, message: '새로운 비밀번호를 입력해주세요.' }, { pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '새로운 비밀번호 형식이 올바르지 않습니다.' }]}>
                  <Input.Password />
                </Form.Item>
              </PLIPInputGroup>
              <PLIPInputGroup label='비밀번호 확인' required>
                <Form.Item dependencies={['password']} hasFeedback name='confirmPassword' rules={[{ required: true, message: '새로운 비밀번호를 확인해주세요.' }, confirmPassword, { pattern: new RegExp('^(?=.*[a-z)(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '' }]}>
                  <Input.Password />
                </Form.Item>
              </PLIPInputGroup>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
}

export default ManageUser;