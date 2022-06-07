import type { NextPage } from 'next'
// Component
import Link from 'next/link';
import { Divider, Form, Input } from 'antd';
import { PageLayout, StyleButton, StyledDescription, Title } from '../components/Signin-up';
import { TOVInputGroup } from '../components/common/Input';

/** [Component] 로그인 페이지 */
const Login: NextPage = () => {
  const [form] = Form.useForm();
  // 컴포넌트 반환
  return (
    <PageLayout>
      <div style={{ width: 300 }}>
        <Title title='로그인' />
        <Form form={form}>
          <TOVInputGroup label='이메일'>
            <Form.Item name='email' rules={[{ required: true, message: '이메일을 입력해주세요.' }]}>
              <Input placeholder='nickname@company.com' />
            </Form.Item>
          </TOVInputGroup>
          <TOVInputGroup label='비밀번호'>
            <Form.Item name='password' rules={[{ required: true, message: '비밀번호을 입력해주세요.' }]}>
              <Input.Password />
            </Form.Item>
          </TOVInputGroup>
          <Divider dashed />
          <Form.Item>
            <StyleButton htmlType='submit' type='primary'>다음</StyleButton>
            <StyledDescription>
              <>아직 계정이 없으신가요?</>
              <Link href='/signup'>
                <label style={{ cursor: 'pointer', fontSize: 12, fontWeight: '400', lineHeight: '20px', marginBottom: 0, marginLeft: 6, textDecoration: 'underline' }}>로그인</label>
              </Link>
            </StyledDescription>
          </Form.Item>
        </Form>
      </div>
    </PageLayout>
  )
}

export default Login;
