import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
// Component
const PLIP401Page = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIP401Page));
const PLIP403Page = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIP403Page));
// State
import { accessTokenSelector, sessionSelector } from '@/models/session';
import { getUser } from '@/models/queries/apis/user';
import { decodeAccessToken } from 'utils/utils';
import { PLIPAwaitingApprovalPage } from '@/components/renewer/Page';
import { getServices } from '@/models/queries/apis/company';

/** [Component] 미사용자 확인 섹션 */
export const PLIPOtherSession: React.FC<any> = ({ children }): JSX.Element => {
  // access token 조회
  const { contents, state } = useRecoilValueLoadable(accessTokenSelector);

  // 자식 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<></>);
  // 사용자 여부 확인에 따른 처리
  useEffect(() => {
    if (state === 'hasValue') {
      if (contents === undefined || contents === '') {
        setComponent(children);
      } else {
        Router.push('/company/services');
      }
    } else {
      setComponent(<></>);
    }
  }, [children, contents, state]);

  // 컴포넌트 반환
  return (component);
}
/** [Component] 현재 회사 및 서비스 확인 섹션 */
export const PLIPServiceSession: React.FC<any> = ({ children }): JSX.Element => {
  // 액세스 토큰 조회
  const { contents: accessToken, state: stateForToken } = useRecoilValueLoadable(accessTokenSelector);
  // 세션 조회
  const [session, setSession] = useRecoilState(sessionSelector);
  // 자식 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<></>);
  // 사용자 여부 확인에 따른 처리
  useEffect(() => {
    (async () => {
      if (stateForToken === 'hasValue') {
        // 사용자 ID 조회
        const userId: string = decodeAccessToken(accessToken);

        // 사용자 정보 조회
        const user = await getUser(userId);
        if (user) {
          if (session.companyId === '' || session.serviceId === '') {
            setComponent(<PLIP403Page />);
          } else if (user.affiliations === undefined || user.affiliations.length === 0) {
            setComponent(<PLIP403Page />);
          } else {
            const index: number = user.affiliations.findIndex((item: any): boolean => item.id === session.companyId);
            if (index === -1) {
              setSession({ companyId: '', serviceId: '' });
              setComponent(<PLIP403Page />);
            } else if (user.affiliations[index].accessLevel === 0) {
              console.log(user.affiliations[index].id, userId);
              setComponent(<PLIPAwaitingApprovalPage companyId={user.affiliations[index].id} userId={userId} />);
            } else {
              const services = await getServices(session.companyId);
              if (services) {
                if (services.some((service: any): boolean => service.id === session.serviceId)) {
                  setComponent(children);
                } else {
                  setSession({ companyId: '', serviceId: '' });
                  setComponent(<PLIP403Page />);
                }
              } else {
                setComponent(<PLIP403Page />);
              }
            }
          }
        } else {
          setComponent(<PLIP401Page />);
        }
      } else {
        setComponent(<></>);
      }
    })();
  }, [accessToken, children, session, setSession]);

  // 컴포넌트 반환
  return (component);
}
/** [Component] 사용자 확인 섹션 */
export const PLIPUserSession: React.FC<any> = ({ children }): JSX.Element => {
  // access token 조회
  const { contents, state } = useRecoilValueLoadable(accessTokenSelector);
  // 자식 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<></>);
  // 사용자 여부 확인에 따른 처리
  useEffect(() => {
    if (state === 'hasValue') {
      if (contents !== undefined && contents !== '') {
        setComponent(children);
      } else {
        setComponent(<PLIP401Page />);
      }
    } else {
      setComponent(<></>);
    }
  }, [children, contents, state]);

  // 컴포넌트 반환
  return (component);
}