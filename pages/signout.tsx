import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
import { StyledSigninContainer } from '@/components/styled/Signin';
import { StyledSignupForm } from '@/components/styled/Signup';
const PLIPUserSession = dynamic(() => import('@/components/renewer/Session').then((mod: any): any => mod.PLIPUserSession), { loading: () => (<></>), ssr: false });
const Signout = dynamic(() => import('@/components/renewer/Signout'), { loading: () => (<></>), ssr: false });

/** [Component] 회원가입 페이지 */
const Signup: NextPage = () => {
  return (
    <PLIPUserSession>
      <StyledSigninContainer>
        <StyledSignupForm>
          <Signout />
        </StyledSignupForm>
      </StyledSigninContainer>
    </PLIPUserSession>
  );
}

export default Signup;
