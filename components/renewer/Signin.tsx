import Link from 'next/link';
import Router from 'next/router';
import { useCallback, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// Component
import { Divider, Form, Input, Modal } from 'antd';
import { errorNotification, successNotification, warningNotification } from '../common/Notification';
import { StyledFinishButton, StyledResendMailModalContent, StyledSigninFooter, StyledSigninHeader } from '../styled/Signin';
import { PLIPInputGroup } from './Input';
// State
import { accessTokenSelector, sessionSelector, userIdSelector } from '@/models/session';
// Query
import { getUser } from '@/models/queries/apis/user';
import { resendAuthMail, signin } from '@/models/queries/apis/signin-up';
import { getCompany } from '@/models/queries/apis/company';

/** [Component] 로그인 헤더 */
export const SigninHeader: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSigninHeader>
      <h2>로그인</h2>
    </StyledSigninHeader>
  );
}
/** [Component] 로그인 폼 */
export const SigninForm: React.FC<any> = (): JSX.Element => {
  // Form 객체
  const [form] = Form.useForm();
  // 세션, 사용자 ID Seletor
  const setSession = useSetRecoilState(sessionSelector);
  const setUser = useSetRecoilState(userIdSelector);
  // 토큰 갱신을 위한 Setter
  const setAccessToken = useSetRecoilState(accessTokenSelector);

  /** [Event handler] 로그인 */
  const onSignin = useCallback(async () => {
    // API 호출
    const response = await signin(form.getFieldValue('email'), form.getFieldValue('password'));
    // 결과에 따른 처리
    if (response.result) {
      // 로컬 저장소에 사용자 설정
      const userId: string = response.data.userId;
      setUser(userId);
      // 액세스 토큰 저장
      const accessToken: string = response.data.accessToken;
      setAccessToken(accessToken);

      // 회사 등록 여부 확인 및 라우팅
      let user = await getUser(userId);
      if (user && user.affiliations && user.affiliations.length > 0) {
        // 회사 정보 조회 및 저장
        const company: any = await getCompany(user.affiliations[0].id);
        // 결과에 따른 처리
        if (company) {
          setSession({ companyId: company.id, serviceId: '' });
          Router.push('/company/services');
        } else {
          errorNotification('로그인 과정에서 문제가 발생하였습니다.');
        }
      } else {
        Router.push('/company/join');
      }
    } else if (response.data && response.data.noConfirm) {
      Modal.warning({
        centered: true,
        content: (<ResendMailModalContent email={form.getFieldValue('email')} />),
        okText: '닫기',
        title: '이메일 인증이 완료되지 않았습니다.'
      });
    } else {
      errorNotification('아이디 혹은 비밀번호가 올바르지 않습니다.');
    }
  }, [form, setAccessToken, setSession, setUser]);

  // 로그인 페이지 렌더링 시점
  useEffect(() => {
    setAccessToken('');
    setUser('');
  }, []);

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
/** [Internal Component] 메일 재전송 모달 내용 */
const ResendMailModalContent: React.FC<any> = ({ email }): JSX.Element => {
  /** [Event handler] 메일 전송 */
  const onSendEmail = useCallback(async() => {
    const result = await resendAuthMail(email);
    if (result) {
      successNotification('이메일이 재전송되었습니다.');
    } else {
      warningNotification('이메일 전송에 실패하였습니다.');
    }
  }, [email]);
  // 컴포넌트 반환
  return (
    <StyledResendMailModalContent>
      <p>이메일 인증 후 서비스 이용이 가능합니다. 가입 시 입력했던 이메일의 받은 편지함을 확인해주세요!</p>
      <a onClick={onSendEmail}>인증 메일 재전송</a>
    </StyledResendMailModalContent>
  );
}

// export default PLIPSignin;