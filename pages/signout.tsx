import type { NextPage } from 'next';
import Router from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// State
import { accessTokenSelector } from '@/models/session';
// Query
import { signout } from '@/models/queries/apis/signin-up';

/** [Component] 로그인 페이지 */
const Signout: NextPage = () => {
  // 로컬 스토리지에 저장된 모든 정보
  const setAccessToken = useSetRecoilState(accessTokenSelector);

  /** [Event handler] 로그아웃 */
  useEffect(() => {
    (async () => {
      const response = await signout();
      if (response) {
        // Local storage 초기화
        setAccessToken('');
        // 로그인 페이지로 이동
        Router.push('/signin');
      }
    })();
  }, []);

  return (
    <></>
  );
}

export default Signout;
