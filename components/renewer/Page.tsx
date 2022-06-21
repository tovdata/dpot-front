import Router from 'next/router';
// Component
import { Button, Spin } from 'antd';
import { StyledFullScreen } from '../styled/Page';
// Icon
import { FrownTwoTone, LoadingOutlined, WarningTwoTone } from '@ant-design/icons';
import { useCallback } from 'react';

/** [Interface] Properties for PLIPPageLayout */
interface PLIPPageLayoutProps {
  description: string;
  icon: JSX.Element;
  isBack?: boolean;
  title: string;
}

/** [Component] 로딩 페이지 */
export const PLIPLoadingPage: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout description='페이지를 불러오는 중입니다. 잠시만 기다려주세요.' icon={LoadingIcon} title='Loading' />
  );
}
/** [Component] 유효하지 않은 인증 (HTTP code 401)  */
export const PLIP401Page: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout description='올바르지 않은 접근입니다.' icon={FrownIcon} isBack title='Unauthorized' />
  );
}
/** [Component] 권한 없음 (HTTP code 403)  */
export const PLIP403Page: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout description='해당 페이지에 대한 권한이 없습니다.' icon={FrownIcon} isBack title='Forbidden' />
  );
}
/** [Component] 페이지 없음 (HTTP code 404) () */
export const PLIP404Page: React.FC<any> = (): JSX.Element => {
  return (
    <PLIPPageLayout description='해당 페이지는 존재하지 않습니다.' icon={WarningIcon} title='Not Found' />
  );
}

/** [Internal Component] 페이지 레이아웃 */
const PLIPPageLayout: React.FC<PLIPPageLayoutProps> = ({ description, icon, isBack, title }): JSX.Element => {
  const goHome = useCallback(() => Router.push('/'), []);
  // 컴포넌트 반환
  return (
    <StyledFullScreen>
      <div className='section'>
        <div className='icon'>{icon}</div>
        <div className='content'>
          <h2>{title}</h2>
          <p>{description}</p>
          {isBack ? (
            <Button type='default'>Go Home</Button>
          ) : (<></>)}
        </div>
      </div>
    </StyledFullScreen>
  )
}
/** [Internal Component] 로딩 아이콘 */
const LoadingIcon: JSX.Element = (
  <Spin indicator={<LoadingOutlined style={{ fontSize: 52 }} spin />} />
);
/** [Internal Component] 경고 아이콘 */
const WarningIcon: JSX.Element = (
  <WarningTwoTone style={{ fontSize: 68 }} twoToneColor='#FA8C16' />
)
/** [Internal Component] 표정(우울) 아이콘 */
const FrownIcon: JSX.Element = (
  <FrownTwoTone style={{ fontSize: 68 }} twoToneColor='#FA8C16' />
)