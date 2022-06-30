import { useRecoilValueLoadable } from 'recoil';
// State
import { companySelector, serviceSelector, userSelector } from '@/models/session';
import { PLIP401Page, PLIP403Page } from './Page';
import { useEffect, useState } from 'react';
import { getUser } from '@/models/queries/apis/user';

/** [Component] 현재 회사 및 서비스 확인 섹션 */
export const PILPServiceSession: React.FC<any> = ({ children }): JSX.Element => {
  // 회사 및 서비스 정보 조회
  const sessionCompany = useRecoilValueLoadable(companySelector);
  const sessionService = useRecoilValueLoadable(serviceSelector);

  // 컴포넌트 반환
  return (
    <>
      {sessionCompany.state === 'hasValue' && sessionService.state === 'hasValue' ? (
        <>
          {sessionCompany.contents.id === '' || sessionService.contents.id === '' ? (
            <PLIP403Page />
          ) : (
            <>{children}</>
          )}
        </>
      ) : (<></>)}
    </>
  );
}
/** [Component] 사용자 확인 섹션 */
export const PILPUserSession: React.FC<any> = ({ children }): JSX.Element => {
  // 사용자 정보 조회
  const sessionUser = useRecoilValueLoadable(userSelector);
  // 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<></>);

  useEffect(() => {
    (async function check() {
      if (sessionUser.state === 'loading') {
        setComponent(<></>)
      } else if (sessionUser.state === 'hasValue' && sessionUser.contents.id !== '') {
        const user = await getUser(sessionUser.contents.id);
        if (user) {
          setComponent(children);
        } else {
          setComponent(<PLIP401Page />);
        }
      } else {
        setComponent(<PLIP401Page />);
      }
    })();
  }, [sessionUser]);

  // 컴포넌트 반환
  return (component);
}