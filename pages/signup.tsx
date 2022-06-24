import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
// Component
// import PLIPSignup from '@/components/renewer/Signup';
const PLIPSignup = dynamic(() => import('@/components/renewer/Signup'), {
  loading: () => (<></>),
  ssr: false
});

/** [Component] 회원가입 페이지 */
const Signup: NextPage = () => {
  return (
    <PLIPSignup />
  );
}

export default Signup;
