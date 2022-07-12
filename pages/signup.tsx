import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { StyledSigninContainer } from '@/components/styled/Signin';
import { StyledSignupForm } from '@/components/styled/Signup';
const PLIPOtherSession = dynamic(() => import('@/components/renewer/Session').then((mod: any): any => mod.PLIPOtherSession), { loading: () => (<></>), ssr: false });
const SignupForm = dynamic(() => import('@/components/renewer/Signup').then((mod: any): any => mod.SignupForm), { ssr: false });
const SignupHeader = dynamic(() => import('@/components/renewer/Signup').then((mod: any): any => mod.SignupHeader));

/** [Component] 회원가입 페이지 */
const Signup: NextPage = () => {
  return (
    <PLIPOtherSession>
      <StyledSigninContainer>
        <StyledSignupForm>
          <SignupHeader />
          <SignupForm />
        </StyledSignupForm>
      </StyledSigninContainer>
    </PLIPOtherSession>
  );
}

export default Signup;
