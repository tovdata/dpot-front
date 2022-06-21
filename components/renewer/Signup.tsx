// Component
import Link from 'next/link';
import { StyledSigninFooter, StyledSigninHeader } from '../styled/Signin';

/** [Internal Component] 회원가입 헤더 */
const SignupHeader: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSigninHeader>
      <h2>회원가입</h2>
    </StyledSigninHeader>
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