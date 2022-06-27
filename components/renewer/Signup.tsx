import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';
// Component
import { Checkbox, Divider, Form, Input, Modal } from 'antd';
import Link from 'next/link';
import { StyledFinishButton, StyledSigninContainer, StyledSigninFooter } from '../styled/Signin';
import { StyledAgreementForm, StyledAgreementItem, StyledSignupForm, StyledSignupHeader } from '../styled/Signup';
import { PLIPInputGroup } from './Input';
import { warningNotification } from '../common/Notification';
// Query
import { addUser, checkDuplicate, signup, SignupProps } from '@/models/queries/apis/signin-up';

/** [Interface] 약관 동의 항목에 대한 속성 */
interface AgreementItemProps {
  content: string;
  linkText?: string;
  name: string;
}

/** [Component] 회원가입 컴포넌트 */
const PLIPSignup: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSigninContainer>
      <StyledSignupForm>
        <SignupHeader />
        <SignupForm />
      </StyledSignupForm>
    </StyledSigninContainer>
  );
}

/** [Internal Component] 회원가입 헤더 */
const SignupHeader: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSignupHeader>
      <h2>회원가입</h2>
    </StyledSignupHeader>
  );
}
/** [Internal Component] 회원가입 폼 하단 */
const SignupFooter: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSigninFooter>
      <p className='description'>이미 회원이신가요?</p>
      <Link href='/signin'>
        <label className='link'>로그인</label>
      </Link>
    </StyledSigninFooter>
  );
}
/** [Internal Component] 회원가입 폼 */
const SignupForm: React.FC<any> = (): JSX.Element => {
  // 회원가입 폼 객체 정의
  const [form] = Form.useForm();
  // 중복 확인 로딩
  const [loading, setLoading] = useState<boolean>(false);
  // 이메일 중복 상태
  const [validate, setValidate] = useState<any>({ email: '', message: '', status: undefined });

  // 비밀번호 확인 함수
  const confirmPassword = ({ getFieldValue }: any) => ({ validator(_: any, value: string) {
    return !value || getFieldValue('password') === value ? Promise.resolve() : Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
  } });
  /** [Event handler] 이메일 형식 확인 */
  const onValidate = useCallback(() => {
    const value: string|undefined = form.getFieldValue('email');
    // 값이 있을 경우 형식 확인
    if (value) {
      // 공백 및 이메일 정규식
      const blankPattern: RegExp = /^\s+|\s+$/g;
      const emailPattern: RegExp = /^([0-9a-zA-Z_\.-]+)@([0-9a-zA-Z_-]+)(\.[0-9a-zA-Z_-]+){1,2}$/;
      // 공백 및 이메일 형식 확인
      if (value.replace(blankPattern, '') === '') {
        setValidate({ email: '', message: '이메일을 확인해주세요.', status: 'error' });
        setLoading(false);
        return false;
      } else if (!emailPattern.test(value)) {
        setValidate({ email: '', message: '이메일 형식을 확인해주세요.', status: 'error' });
        setLoading(false);
        return false;
      } else {
        return true;
      }
    } else {
      setValidate({ email: '', message: '이메일을 확인해주세요.', status: 'error' });
      setLoading(false);
      return false;
    }
  }, [form, loading, validate]);
  /** [Event handler] 이메일 중복 확인 */
  const onDuplicate = useCallback((value: string): void => {
    // 로딩 상태 설정
    setLoading(true);
    // 이메일 형식 검증 및 중복 확인
    const pass: boolean = onValidate();
    if (pass) {
      // 이메일 중복 함수
      setTimeout(async () => {
        // 이메일 중복 확인 API 호출
        const result = await checkDuplicate(value);
        // 결과 처리
        result ? setValidate({ email: value, message: '가입 가능한 이메일입니다.', status: 'success' }) : setValidate({ email: '', message: '이미 사용 중인 이메일입니다.', status: 'error' });
        setLoading(false);
      }, 600);
    }
  }, []);
  /** [Event handler] 회원가입 */
  const onSignup = useCallback(async () => {
    if (validate.status === 'success') {
      // 폼 데이터 가져오기
      const formData: any = form.getFieldsValue();
      // 이메일 사용 가능 여부 재확인
      if (validate.email !== formData.email) {
        setValidate({ email: '', message: '이메일에 대한 중복 확인을 해주세요.', status: 'warning' });
      } else if (formData.esa1 === undefined || formData.esa1 === false) {
        warningNotification('서비스 이용 약관에 동의해주세요.');
      } else if (formData.esa2 === undefined || formData.esa2 === false) {
        warningNotification('개인정보 수집 및 이용에 대해 동의해주세요.');
      } else {
        // 요청 데이터 정의
        const data: SignupProps = {
          email: formData.email,
          password: formData.password,
          name: formData.name,
          phone_number: `+82${formData.phone.replace(/-/g, '').substring(1)}`
        }
        // API 호출
        const response = await signup(data);
        // 결과 처리
        if (response.result) {
          // 사용자 약관 동의 내역 저장
          const result = await addUser(response.data.UserSub, formData.name, { esa1: formData.esa1, esa2: formData.esa2, ssa1: formData.ssa1 });
          if (result) {
            createSuccessModal();
          } else {
            createErrorModal();
          }
        } else {
          createErrorModal();
        }
      }
    } else {
      setValidate({ email: '', message: '이메일에 대한 중복 확인을 해주세요.', status: 'warning' });
    }
  }, [form, validate]);

  // 컴포넌트 반환
  return (
    <Form form={form} onFinish={onSignup} onFinishFailed={onValidate}>
      <PLIPInputGroup label='이메일'>
        <Form.Item hasFeedback help={validate.message} name='email' rules={[{ required: true, message: '이메일을 입력해주세요.' }, { type: 'email', message: '이메일 형식을 확인해주세요.' }]} validateStatus={validate.status}>
          <Input.Search enterButton='중복 확인' loading={loading} onSearch={onDuplicate} placeholder='nickname@company.com' />
        </Form.Item>
      </PLIPInputGroup>
      <PLIPInputGroup label='비밀번호' required>
        <Form.Item extra='영문(대소문자), 숫자, 특수문자 조합 최소 8자리 이상' hasFeedback name='password' rules={[{ required: true, message: '비밀번호를 입력해주세요.' }, { pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '비밀번호 형식이 올바르지 않습니다.' }]}>
          <Input.Password />
        </Form.Item>
      </PLIPInputGroup>
      <PLIPInputGroup label='비밀번호 확인' required>
        <Form.Item dependencies={['password']} hasFeedback name='confirmPassword' rules={[{ required: true, message: '비밀번호를 확인해주세요.' }, confirmPassword, { pattern: new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$'), message: '' }]}>
          <Input.Password />
        </Form.Item>
      </PLIPInputGroup>
      <PLIPInputGroup label='이름' required>
        <Form.Item name='name' rules={[{ required: true, message: '이름을 입력해주세요.' }]}>
          <Input placeholder='김OO' />
        </Form.Item>
      </PLIPInputGroup>
      <PLIPInputGroup label='휴대전화번호' required>
        <Form.Item name='phone' rules={[{ required: true, message: '휴대전화번호를 입력해주세요.' }, { pattern: new RegExp('^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$'), message: '휴대전화번호 형식이 올바르지 않습니다.' }]}>
          <Input placeholder='01000000000' />
        </Form.Item>
      </PLIPInputGroup>
      <Divider dashed />
      <Agreement />
      <StyledFinishButton htmlType='submit' type='primary'>회원가입</StyledFinishButton>
      <SignupFooter />
    </Form>
  );
}
/** [Internal Component] 약관 동의 폼 */
const Agreement: React.FC<any> = (): JSX.Element => {
  return (
    <StyledAgreementForm>
      <AgreementItem content='(필수) 서비스 이용약관 동의' name='esa1' />
      <AgreementItem content='(필수) 개인정보 수집 및 이용 동의' linkText='동의서 보기' name='esa2' />
      <AgreementItem content='(선택) 마케팅 및 광고성 정보 수신 동의' linkText='동의서 보기' name='ssa1' />
    </StyledAgreementForm>
  );
}
/** [Internal Component] 약관 동의 항목 */
const AgreementItem: React.FC<AgreementItemProps> = ({ content, linkText, name }): JSX.Element => {
  return (
    <StyledAgreementItem>
      <Form.Item name={name} style={{ margin: 0 }} valuePropName='checked'>
        <Checkbox>{content}</Checkbox>
      </Form.Item>
      <a className='link'>{linkText ? linkText : '약관 보기'}</a>
    </StyledAgreementItem>
  );
}

/** [Internal Function] 에러 모달 생성 */
const createErrorModal: any = () => Modal.error({
  centered: true,
  content: '회사 생성 과정에서 오류가 발생하였습니다.\n플립(Plip)으로 문의해주세요 :(',
  okText: '확인',
  title: '회원가입 오류'
});
/** [Internal Function] 성공 모달 생성 */
const createSuccessModal: any = () => Modal.success({
  centered: true,
  content: '서비스를 이용하시려면 이메일로 전송된 인증링크를 클릭하여 이메일 인증을 완료해주세요.',
  okText: '확인',
  title: '인증 이메일이 발송되었습니다.',
  onOk: () => Router.push('/signin')
});

export default PLIPSignup;