import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const PLIPLogin = dynamic(() => import('@/components/renewer/Signin'), {
  loading: () => (<></>),
  ssr: false
});

/** [Component] 로그인 페이지 */
const Login: NextPage = () => {
  return (
    <PLIPLogin />
  );
}

export default Login;
