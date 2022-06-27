import { useRecoilValueLoadable } from 'recoil';
// State
import { companySelector, serviceSelector } from '@/models/session';
import { PLIP403Page } from './Page';

/** [Component] 현재 회사 및 서비스 확인 섹션 */
const PILPServiceSession: React.FC<any> = ({ children }): JSX.Element => {
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

export default PILPServiceSession;