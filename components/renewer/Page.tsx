import dynamic from 'next/dynamic';
import Router from 'next/router';
import { ComponentType, useCallback } from 'react';
// Component
import { Button, Spin } from 'antd';
import Image from 'next/image';
import { StyledContainer, StyledFullScreen } from '@/components/styled/Page';
import { errorNotification, successNotification } from '@/components/common/Notification';
// Icon
const LoadingOutlined: ComponentType<{spin: boolean, style: React.CSSProperties}> = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.LoadingOutlined));
// Images
import Image401 from '@/public/images/401.png';
import Image403 from '@/public/images/403.png';
import Image404 from '@/public/images/404.png';
import ImageApproval from '@/public/images/approval.png';
import ImageEmail from '@/public/images/email.png';
import ImageReject from '@/public/images/reject.png';
import ImageServiceDev from '@/public/images/service_develop.png';
// Query
import { registerUser } from '@/models/queries/apis/company';

/** [Interface] Properties for PLIPPage */
interface PLIPPageProps {
  redirectPath?: string;
}
/** [Interface] Properties for PLIPContainerLayout */
interface PLIPContainerLayout {
  buttonText?: string;
  description?: React.ReactNode;
  icon: JSX.Element;
  isBack?: boolean;
  redirectPath?: string;
  title?: React.ReactNode;
}

/** [Component] 가입 승인 완료 페이지 */
export const PLIPApprovalPage: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout icon={ApprovalIcon} isBack redirectPath='/' title={<>회사 가입 승인이 완료되었습니다 👍</>} />
  );
}
/** [Component] 가입 승인 거절/만료 페이지 */
export const PLIPApprovalRejectPage: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout icon={RejectIcon} isBack redirectPath='/' title={<>이미 승인이 완료되었거나,<br/>요청 시간이 초과되었습니다</>} />
  );
}
/** [Component] 가입 대기 페이지 */
export const PLIPAwaitingApprovalPage: React.FC<any> = ({ companyId, userId }): JSX.Element => {
  /** [Event handler] 경로 이동 */
  const onRedirect = useCallback(() => Router.push('/signout'), []);
  /** [Event handler] 승인 재요청 */
  const onResend = useCallback(async () => {
    if (await registerUser(companyId, userId, 0)) {
      successNotification('가입 승인이 재요청되었습니다.');
    } else {
      errorNotification('가입 승인 재요청에 실패하였습니다.');
    }
  }, [companyId, userId]);

  // 컴포넌트 반환
  return (
    <StyledFullScreen>
      <div className='section'>
        <div className='icon'>{AwaitingApprovalIcon}</div>
        <div className='content'>
          <h2>회사 관리자의 승인을 기다리고 있어요<br/>조금만 기다려주세요 👍</h2>
          <Button onClick={onRedirect} style={{ width: '100%' }} type='default'>로그아웃</Button>
          <div className='footer'>
            <a className='underline' onClick={onResend}>가입 승인 재요청</a>
            <a>회원 탈퇴</a>
          </div>
        </div>
      </div>
    </StyledFullScreen>
  );
}
/** [Component] 심플 로딩 컨테이너 */
export const PLIPSimpleLoadingContainer: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPContainerLayout icon={SimpleLoadingIcon} />
  );
}
/** [Component] 심플 로딩 페이지 */
export const PLIPSimpleLoadingPage: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout icon={SimpleLoadingIcon} />
  );
}
/** [Component] 로딩 컨테이너 */
export const PLIPLoadingContainer: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPContainerLayout description='페이지를 불러오는 중입니다. 잠시만 기다려주세요.' icon={LoadingIcon} title='Loading' />
  );
}
/** [Component] 커스텀 로딩 페이지 */
export const PLIPCustomLoadingPage: React.FC<any> = ({ description, title }): JSX.Element => {
  return (
    <PLIPPageLayout description={description} icon={LoadingIcon} title={title} />
  );
}
/** [Component] 로딩 페이지 */
export const PLIPLoadingPage: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout description='페이지를 불러오는 중입니다. 잠시만 기다려주세요.' icon={LoadingIcon} title='Loading' />
  );
}
/** [Component] 유효하지 않은 인증 (HTTP code 401)  */
export const PLIP401Page: React.FC<PLIPPageProps> = ({ redirectPath }): JSX.Element => {
  return (
    <PLIPPageLayout description='로그인 후 다시 접속해 주세요.' icon={Icon401} isBack redirectPath={ redirectPath ? redirectPath : '/signin'} title='로그인이 필요한 페이지입니다' />
  );
}
/** [Component] 권한 없음 (HTTP code 403)  */
export const PLIP403Page: React.FC<PLIPPageProps> = ({ redirectPath }): JSX.Element => {
  return (
    <PLIPPageLayout description='요청한 페이지에 접근할 수 있는 권한이 없습니다.' icon={Icon403} isBack redirectPath={ redirectPath ? redirectPath : '/company/services'} title='페이지 접근이 거부되었습니다' />
  );
}
/** [Component] 페이지 없음 (HTTP code 404) */
export const PLIP404Page: React.FC<PLIPPageProps> = (): JSX.Element => {
  return (
    <PLIPPageLayout description={<>주소가 잘못되었거나 더 이상 제공되지 않는 페이지 입니다.</>} icon={Icon404} isBack title={<>페이지를 찾을 수 없습니다</>} />
  );
}
/** [Component] 서비스 준비 중 */
export const PLIPPreparing: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPContainerLayout icon={PreparingIcon} title={<>서비스 준비중입니다.<br/>조금만 기다려주세요!</>} />
  );
}

/** [Internal Component] 컨테이너 레이아웃 */
const PLIPContainerLayout: React.FC<PLIPContainerLayout> = ({ buttonText, description, icon, isBack, redirectPath, title }): JSX.Element => {
  const onRedirect = useCallback(() => Router.push(redirectPath ? redirectPath : '/'), [redirectPath]);
  // 컴포넌트 반환
  return (
    <StyledContainer>
      <div className='section'>
        <div className='icon'>{icon}</div>
        <div className='content'>
          <h2>{title}</h2>
          {description ? (
            <p>{description}</p>
          ) : (<></>)}
          {isBack ? (
            <Button onClick={onRedirect} type='default'>{buttonText ? buttonText : '메인 화면으로'}</Button>
          ) : (<></>)}
        </div>
      </div>
    </StyledContainer>
  )
}
/** [Internal Component] 페이지 레이아웃 */
const PLIPPageLayout: React.FC<PLIPContainerLayout> = ({ buttonText, description, icon, isBack, redirectPath, title }): JSX.Element => {
  /** [Event handler] 경로 이동 */
  const onRedirect = useCallback(() => Router.push(redirectPath ? redirectPath : '/'), [redirectPath]);

  // 컴포넌트 반환
  return (
    <StyledFullScreen>
      <div className='section'>
        <div className='icon'>{icon}</div>
        {title || description ? (
          <div className='content'>
            <h2>{title}</h2>
            {description ? (
              <p>{description}</p>
            ) : (<></>)}
            {isBack ? (
              <Button onClick={onRedirect} type='default'>{buttonText ? buttonText : '메인 화면으로'}</Button>
            ) : (<></>)}
          </div>
        ) : (<></>)}
      </div>
    </StyledFullScreen>
  );
}

/** [Internal Component] 로딩 아이콘 */
const ApprovalIcon: JSX.Element = (
  <Image src={ImageApproval} alt='Approval' priority />
);
/** [Internal Component] 로딩 아이콘 */
const AwaitingApprovalIcon: JSX.Element = (
  <Image src={ImageEmail} alt='Waiting' priority />
);
/** [Internal Component] 401 아이콘 */
const Icon401: JSX.Element = (
  <Image src={Image401} alt='Unauthorization' priority />
);
/** [Internal Component] 403 아이콘 */
const Icon403: JSX.Element = (
  <Image src={Image403} alt='Forbidden' priority />
);
/** [Internal Component] 404 아이콘 */
const Icon404: JSX.Element = (
  <Image src={Image404} alt='Not found' priority />
);
/** [Internal Component] 서비스 준비 중 아이콘 */
const PreparingIcon: JSX.Element = (
  <Image src={ImageServiceDev} alt='Implementing' priority />
);
/** [Internal Component] 로딩 아이콘 */
const RejectIcon: JSX.Element = (
  <Image src={ImageReject} alt='Reject' priority />
);
/** [Internal Component] 로딩 아이콘 */
const SimpleLoadingIcon: JSX.Element = (
  <Spin size='large' />
);
/** [Internal Component] 로딩 아이콘 */
const LoadingIcon: JSX.Element = (
  <Spin indicator={<LoadingOutlined style={{ fontSize: 52 }} spin />} />
);