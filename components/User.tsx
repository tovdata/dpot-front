import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilState, useRecoilValue } from 'recoil';
// Component
import { Button, Divider, Form, Input, Modal } from 'antd';
import { TOVInputGroup } from './common/Input';
// State
import { companySelector, userSelector } from '@/models/session';
// Query
import { getUser, updateUser } from '@/models/queries/api';
import { errorNotification, successNotification } from './common/Notification';
// Query key
const KEY_USER = 'user';

/** [Component] 내 정보 관리 Section */
export const UserInfoSection: React.FC<any> = ({ style }): JSX.Element => {
  // 회사 정보 상태
  const company = useRecoilValue(companySelector);
  // 사용자 정보 상태
  const [user, setUser] = useRecoilState(userSelector);
  // 사용자 조회
  const { isLoading, data } = useQuery(KEY_USER, async () => await getUser(user.id));

  // Form 객체 생성
  const [form] = Form.useForm();
  // 탭 변경에 따라 Form 내에 필드 초기화
  useEffect(() => form.setFieldsValue({ name: data ? data.name : '', contact: data ? data.contact : '' }), [isLoading]);

  // 모달 Open 상태
  const [visible, setVisible] = useState<boolean>(false);
  /** [Event handler] 모달 열기 */
  const onOpen = () => setVisible(true);
  /** [Event handler] 모달 닫기 */
  const onCancel = () => setVisible(false);
  /** [Event handler] 변경한 회사 정보 저장 */
  const onSave = async () => {
    const response = await updateUser({ ...data, name: form.getFieldValue('name'), contact: form.getFieldValue('contact') });
    if (response) {
      setUser({ id: user.id, name: form.getFieldValue('name') });
      successNotification('변경된 사용자 정보가 저장되었습니다.');
    } else {
      errorNotification('사용자 정보 저장에 실패하였습니다.');
    }
  }
  // 비밀번호 확인 함수
  const confirmPassword = ({ getFieldValue }: any) => ({ validator(_: any, value: string) {
    return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
  } });

  // 컴포넌트 반환
  return (
    <Form form={form} onFinish={onSave} style={{ marginLeft: 'auto', marginRight: 'auto', paddingBottom: 60, width: 360, ...style }}>
      <h2 style={{ fontSize: 24, fontWeight: '500', lineHeight: '32px', marginBottom: 64 }}>내 정보</h2>
      <TOVInputGroup label='회사명'>
        <Form.Item initialValue={company.name} name='company'>
          <Input disabled />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='회사명(영문)'>
        <Form.Item initialValue={company.en} name='en'>
          <Input disabled />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='이름' required>
        <Form.Item initialValue={data ? data.name : ''} name='name'>
          <Input />
        </Form.Item>
      </TOVInputGroup>
      <TOVInputGroup label='휴대전화번호' required>
        <Form.Item initialValue={data ? data.contact : ''} name='contact'>
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