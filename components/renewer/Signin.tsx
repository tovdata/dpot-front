import { useSetRecoilState } from 'recoil';
import { decode } from 'jsonwebtoken';
import Link from 'next/link';
// Component
import { Divider, Form, Input } from 'antd';
import { errorNotification } from '../common/Notification';
import { StyledFinishButton, StyledSigninContainer, StyledSigninFooter, StyledSigninForm, StyledSigninHeader } from '../styled/Signin';
import { PLIPInputGroup } from './Input';
// State
import { accessTokenSelector, userSelector } from '@/models/session';
// Query
import { signInProcess } from '@/models/queries/api';

/** [Component] 로그인 컴포넌트 */
const PLIPSignin: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSigninContainer>
      <StyledSigninForm>
        <SigninHeader />
        <SigninForm />
      </StyledSigninForm>
    </StyledSigninContainer>
  );
}

/** [Internal Component] 로그인 헤더 */
const SigninHeader: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSigninHeader>
      <h2>로그인</h2>
    </StyledSigninHeader>
  );
}
/** [Internal Component] 로그인 폼 하단 */
const SigninFooter: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSigninFooter>
      <p className='description'>아직 계정이 없으신가요?</p>
      <Link href='/signup'>
        <label className='link'>회원가입</label>
      </Link>
    </StyledSigninFooter>
  );
}
/** [Internal Component] 로그인 폼 */
const SigninForm: React.FC<any> = (): JSX.Element => {
  // Form 객체
  const [form] = Form.useForm();
  // 사용자 및 토큰 갱신을 위한 Setter
  const setUser = useSetRecoilState(userSelector);
  const setAccessToken = useSetRecoilState(accessTokenSelector);

  /** [Event handler] 로그인 */
  const onSignin = async () => {
    // API 호출
    const response = await signInProcess(form.getFieldValue('email'), form.getFieldValue('password'));
    // 결과에 따른 처리
    if (response.result) {
      // 토큰에서 사용자 정보 추출
      const info: any = decode(response.data.IdToken);
      // 로컬 저장소에 사용자 설정
      setUser({ id: info.sub, name: info.name });
      // 액세스 토큰 저장
      setAccessToken(response.data.AccessToken);
    } else {
      errorNotification('아이디 혹은 비밀번호가 올바르지 않습니다.');
    }
  }

  // 컴포넌트 반환
  return (
    <Form form={form} onFinish={onSignin}>
      <PLIPInputGroup label='이메일'>
        <Form.Item name='email' rules={[{ required: true, message: '이메일을 입력해주세요.' }]}>
          <Input placeholder='nickname@company.com' />
        </Form.Item>
      </PLIPInputGroup>
      <PLIPInputGroup label='비밀번호'>
        <Form.Item name='password' rules={[{ required: true, message: '비밀번호을 입력해주세요.' }]}>
          <Input.Password />
        </Form.Item>
      </PLIPInputGroup>
      <Divider dashed />
      <StyledFinishButton htmlType='submit' type='primary'>로그인</StyledFinishButton>
      <SigninFooter />
    </Form>
  );
}

export default PLIPSignin;