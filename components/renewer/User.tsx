import { useCallback, useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
// Component
import { Button, Divider, Form, Input, Modal } from 'antd';
import { errorNotification, successNotification } from '../common/Notification';
import { StyledUserForm, StyledUserFormHeader, StyledWithdrawal } from '../styled/User';
import { PLIPSimpleLoadingContainer } from './Page';
// State
import { companySelector, userSelector } from '@/models/session_old';
// Query
import { getUser, updateUser } from '@/models/queries/apis/user';
import { PLIPInputGroup } from './Input';
// Query key
const KEY_USER = 'plip-user';

/** [Component] 내 정보 관리 */
const ManageUser: React.FC<any> = (): JSX.Element => {
  return (
    <StyledUserForm>
      <UserInfoSection />
    </StyledUserForm>
  );
}

/** [Internal Component] 내 정보 관리 Section */
const UserInfoSection: React.FC<any> = (): JSX.Element => {
  // 회사 정보 조회
  const sessionCompany = useRecoilValue(companySelector);
  // 사용자 정보 상태
  const [user, setUser] = useRecoilState(userSelector);
  // 사용자 조회
  const { isLoading, data } = useQuery([KEY_USER, user.id], async () => await getUser(user.id));

  // 모달 Open 상태
  const [visible, setVisible] = useState<boolean>(false);
  // Form 객체 생성
  const [form] = Form.useForm();
  // 회사명 설정
  useEffect(() => form.setFieldsValue({ ...form, company: sessionCompany.companyName }), [form, sessionCompany]);
  // 사용자 정보 설정
  useEffect(() => form.setFieldsValue({ name: data ? data.userName : '', contact: data ? data.contact : '' }), [data, form]);

  /** [Event handler] 모달 열기 */
  const onOpen = useCallback(() => setVisible(true), []);
  /** [Event handler] 모달 닫기 */
  const onCancel = useCallback(() => setVisible(false), []);
  /** [Event handler] 변경한 회사 정보 저장 */
  const onSave = useCallback(async () => {
    const response = await updateUser(user.id, { ...data, userName: form.getFieldValue('name'), contact: form.getFieldValue('contact') });
    if (response) {
      setUser({ id: user.id, userName: form.getFieldValue('name') });
      successNotification('변경된 사용자 정보가 저장되었습니다.');
    } else {
      errorNotification('사용자 정보 저장에 실패하였습니다.');
    }
  }, [data, form, setUser, user]);
  // 비밀번호 확인 함수
  const confirmPassword = ({ getFieldValue }: any) => ({ validator(_: any, value: string) {
    return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
  } });

  // 컴포넌트 반환
  return (
    <>
      {isLoading ? (
        <PLIPSimpleLoadingContainer />
      ) : (
        <Form form={form} onFinish={onSave}>
          <StyledUserFormHeader>내 정보</StyledUserFormHeader>
          <PLIPInputGroup label='회사명'>
            <Form.Item name='company'>
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
            <a className='content'>회원 탈퇴하기</a>
          </StyledWithdrawal>
          <Modal footer={[(<Button key='ok' onClick={onCancel} type='primary'>변경하기</Button>)]} onCancel={onCancel} title='비밀번호 변경' visible={visible}>
            <PLIPInputGroup label='기존 비밀번호' required>
              <Form.Item name='prev'>
                <Input />
              </Form.Item>
            </PLIPInputGroup>
            <PLIPInputGroup label='비밀번호' required>
              <Form.Item extra='영문, 숫자, 특수문자 조합 최소 8자리 이상' hasFeedback name='password' rules={[{ required: true, message: '비밀번호를 입력해주세요.' }, { pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '비밀번호 형식이 올바르지 않습니다.' }]}>
                <Input.Password />
              </Form.Item>
            </PLIPInputGroup>
            <PLIPInputGroup label='비밀번호 확인' required>
              <Form.Item dependencies={['password']} hasFeedback name='confirmPassword' rules={[{ required: true, message: '비밀번호를 확인해주세요.' }, confirmPassword, { pattern: new RegExp('^(?=.*[a-z)(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '' }]}>
                <Input.Password />
              </Form.Item>
            </PLIPInputGroup>
          </Modal>
        </Form>
      )}
    </>
  );
}

export default ManageUser;