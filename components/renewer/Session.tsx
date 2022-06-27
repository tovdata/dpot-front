import { useRecoilValueLoadable } from 'recoil';
// State
import { companySelector, serviceSelector, userSelector } from '@/models/session';
import { PLIP401Page, PLIP403Page } from './Page';

/** [Component] 현재 회사 및 서비스 확인 섹션 */
export const PILPServiceSession: React.FC<any> = ({ children }): JSX.Element => {
  // 회사 및 서비스 정보 조회
  const company = useRecoilValueLoadable(companySelector);
  const service = useRecoilValueLoadable(serviceSelector);

  // 컴포넌트 반환
  return (
    <>
      {company.state === 'hasValue' && service.state === 'hasValue' ? (
        <>
          {company.contents.id === '' || service.contents.id === '' ? (
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
  const user = useRecoilValueLoadable(userSelector);

  // 컴포넌트 반환
  return (
    <>
      {user.state === 'hasValue' ? (
        <>
          {user.contents.id === '' ? (
            <PLIP401Page />
          ) : (
            <>{children}</>
          )}
        </>
      ) : (<></>)}
    </>
  );
}