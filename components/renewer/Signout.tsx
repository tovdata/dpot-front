import Router from 'next/router';
import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
// Component
import { errorNotification, successNotification } from '../common/Notification';
// Query
import { signout } from '@/models/queries/apis/signin-up';
// State
import { accessTokenSelector, userIdSelector } from '@/models/session';

/** [Component] 로그아웃 */
const Signout: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰
  const setAccessToken = useSetRecoilState(accessTokenSelector); 
  // 사용자 ID
  const setUserId = useSetRecoilState(userIdSelector);
  
  // 로그아웃
  useEffect(() => {
    (async() => {
      if (await signout()) {
        // 액세스 토큰 초기화
        setAccessToken('');
        setUserId('');
        // 알림
        successNotification('로그아웃 되었습니다.');
        // 로그인 페이지로 이동
        Router.push('/signin');
      } else {
        // 오류 알림
        errorNotification('로그아웃에 실패하였습니다.');
        Router.push('/');
      }
    })();
  }, [setAccessToken, setUserId]);

  return (<></>);
}

export default Signout;