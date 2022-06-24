import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const PLIP404Page = dynamic(() => import('@/components/renewer/Page').then((module: any) => module.PLIP404Page));

/** [Component] 로그인 페이지 */
const Login: NextPage = () => {
  return (
    <PLIP404Page />
  );
}

export default Login;
