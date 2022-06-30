import Router from 'next/router';
// Component
import { Button, Spin } from 'antd';
import { StyledContainer, StyledFullScreen } from '../styled/Page';
// Icon
import { FrownTwoTone, LoadingOutlined, WarningTwoTone } from '@ant-design/icons';
import { useCallback } from 'react';

/** [Interface] Properties for PLIPPage */
interface PLIPPageProps {
  redirectPath?: string;
}
/** [Interface] Properties for PLIPContainerLayout */
interface PLIPContainerLayout {
  description?: React.ReactNode;
  icon: JSX.Element;
  isBack?: boolean;
  redirectPath?: string;
  title?: React.ReactNode;
}

/** [Component] 로딩 페이지 */
export const PLIPAwaitingApprovalPage: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout icon={AwaitingApprovalIcon} title={<>회사 관리자의 승인을 기다리고 있어요.<br/>승인이 완료되면 알려주신 이메일로 연락드릴게요 👍</>} />
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
/** [Component] 로딩 페이지 */
export const PLIPLoadingPage: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout description='페이지를 불러오는 중입니다. 잠시만 기다려주세요.' icon={LoadingIcon} title='Loading' />
  );
}
/** [Component] 유효하지 않은 인증 (HTTP code 401)  */
export const PLIP401Page: React.FC<PLIPPageProps> = ({ redirectPath }): JSX.Element => {
  return (
    <PLIPPageLayout description='올바르지 않은 접근입니다.' icon={FrownIcon} isBack redirectPath={ redirectPath ? redirectPath : '/signin'} title='Unauthorized' />
  );
}
/** [Component] 권한 없음 (HTTP code 403)  */
export const PLIP403Page: React.FC<PLIPPageProps> = ({ redirectPath }): JSX.Element => {
  return (
    <PLIPPageLayout description='해당 페이지에 대한 권한이 없습니다.' icon={FrownIcon} isBack redirectPath={ redirectPath ? redirectPath : '/company/services'} title='Forbidden' />
  );
}
/** [Component] 페이지 없음 (HTTP code 404) */
export const PLIP404Page: React.FC<PLIPPageProps> = (): JSX.Element => {
  return (
    <PLIPPageLayout description={<>주소가 잘못되었거나 더 이상 제공되지 않는 페이지 입니다.</>} icon={NotFoundIcon} isBack title={<>페이지를 찾을 수 없습니다</>} />
  );
}
/** [Component] 서비스 준비 중 */
export const PLIPPreparing: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPContainerLayout icon={PreparingIcon} title={<>서비스 준비중입니다.<br/>조금만 기다려주세요!</>} />
  );
}

/** [Internal Component] 컨테이너 레이아웃 */
const PLIPContainerLayout: React.FC<PLIPContainerLayout> = ({ description, icon, isBack, redirectPath, title }): JSX.Element => {
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
            <Button onClick={onRedirect} type='default'>메인 화면으로</Button>
          ) : (<></>)}
        </div>
      </div>
    </StyledContainer>
  )
}
/** [Internal Component] 페이지 레이아웃 */
const PLIPPageLayout: React.FC<PLIPContainerLayout> = ({ description, icon, isBack, redirectPath, title }): JSX.Element => {
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
              <Button onClick={onRedirect} type='default'>메인 화면으로</Button>
            ) : (<></>)}
          </div>
        ) : (<></>)}
      </div>
    </StyledFullScreen>
  )
}

/** [Internal Component] 로딩 아이콘 */
const AwaitingApprovalIcon: JSX.Element = (
  <img src='/images/email.svg' />
);
/** [Internal Component] 표정(우울) 아이콘 */
const FrownIcon: JSX.Element = (
  <FrownTwoTone style={{ fontSize: 68 }} twoToneColor='#FA8C16' />
);
/** [Internal Component] 404 아이콘 */
const NotFoundIcon: JSX.Element = (
  <img src='/images/notFound.svg' />
);
/** [Internal Component] 서비스 준비 중 아이콘 */
const PreparingIcon: JSX.Element = (
  <img src='/images/service_develop.svg' />
);
/** [Internal Component] 로딩 아이콘 */
const SimpleLoadingIcon: JSX.Element = (
  <Spin size='large' />
);
/** [Internal Component] 로딩 아이콘 */
const LoadingIcon: JSX.Element = (
  <Spin indicator={<LoadingOutlined style={{ fontSize: 52 }} spin />} />
);
/** [Internal Component] 경고 아이콘 */
const WarningIcon: JSX.Element = (
  <WarningTwoTone style={{ fontSize: 68 }} twoToneColor='#FA8C16' />
);