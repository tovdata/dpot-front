import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { StyledSigninContainer, StyledSigninForm } from '@/components/styled/Signin';
const PILPOtherSession = dynamic(() => import('@/components/renewer/Session').then((mod: any): any => mod.PILPOtherSession), { loading: () => (<></>), ssr: false });
const SigninForm = dynamic(() => import('@/components/renewer/Signin').then((mod: any): any => mod.SigninForm), { ssr: false });
const SigninHeader = dynamic(() => import('@/components/renewer/Signin').then((mod: any): any => mod.SigninHeader));// Component

/** [Component] 로그인 페이지 */
const Login: NextPage = () => {
  return (
    <PILPOtherSession>
      <StyledSigninContainer>
        <StyledSigninForm>
          <SigninHeader />
          <SigninForm />
        </StyledSigninForm>
      </StyledSigninContainer>
    </PILPOtherSession>
  );
}

export default Login;
