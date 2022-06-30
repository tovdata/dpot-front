import dynamic from 'next/dynamic';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { useRecoilValueLoadable } from 'recoil';
// Component
const PLIP401Page = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIP401Page));
const PLIP403Page = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIP403Page));
// State
import { accessTokenSelector, companySelector, serviceSelector } from '@/models/session';
import { decodeAccessToken } from 'utils/utils';

/** [Component] 미사용자 확인 섹션 */
export const PILPOtherSession: React.FC<any> = ({ children }): JSX.Element => {
  // access token 조회
  const accessToken = useRecoilValueLoadable(accessTokenSelector);
  // 자식 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<></>);
  // 사용자 여부 확인에 따른 처리
  useEffect(() => {
    if (accessToken.state === 'hasValue') {
      if (decodeAccessToken(accessToken.contents) === '') {
        setComponent(children);
      } else {
        Router.push('/company/services');
      }
    } else {
      setComponent(<></>);
    }
  }, [accessToken]);

  // 컴포넌트 반환
  return (component);
}
/** [Component] 현재 회사 및 서비스 확인 섹션 */
export const PLIPServiceSession: React.FC<any> = ({ children }): JSX.Element => {
  // 회사 및 서비스 정보 조회
  const sessionCompany = useRecoilValueLoadable(companySelector);
  const sessionService = useRecoilValueLoadable(serviceSelector);
  // 자식 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<></>);
  // 사용자 여부 확인에 따른 처리
  useEffect(() => {
    if (sessionCompany.state === 'hasValue' && sessionService.state === 'hasValue') {
      if (sessionCompany.contents.id === '' || sessionService.contents.id === '') {
        setComponent(<PLIP403Page />);
      } else {
        setComponent(children);
      }
    } else {
      setComponent(<></>);
    }
  }, [sessionCompany, sessionService]);

  // 컴포넌트 반환
  return (component);
}
/** [Component] 사용자 확인 섹션 */
export const PLIPUserSession: React.FC<any> = ({ children }): JSX.Element => {
  // access token 조회
  const accessToken = useRecoilValueLoadable(accessTokenSelector);
  // 자식 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<></>);
  // 사용자 여부 확인에 따른 처리
  useEffect(() => {
    console.log(accessToken);
    if (accessToken.state === 'hasValue') {
      if (decodeAccessToken(accessToken.contents) !== '') {
        setComponent(children);
      } else {
        setComponent(<PLIP401Page />);
      }
    } else {
      setComponent(<></>);
    }
  }, [accessToken]);

  // 컴포넌트 반환
  return (component);
}