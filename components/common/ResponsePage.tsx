import Router from 'next/router';
// Component
import { Button, Result } from 'antd';
// Icon
import { IoConstructOutline } from 'react-icons/io5';

/** [Component] 페이지 준비 중 */
export const Preparing: React.FC<any> = ({ description, title }): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center' }}>
      <Section description={description} icon={<IoConstructOutline color='#3f6600' size={56} />} title={title} />
    </div>
  );
}
/** [Component] 비회원 접근 제한 페이지 */
export const AccessDeniedPage: React.FC<any> = (): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100vw' }}>
      <Result extra={<Button onClick={() => Router.push('/login')}>로그인</Button>} status='403' subTitle='로그인 후, 진행해주세요.' title='Access Denied' />
    </div>
  );
}
/** [Component] 서비스 비선택 페이지 */
export const NotFoundCompanyPage: React.FC<any> = (): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100vw' }}>
      <Result extra={<Button onClick={() => Router.push('/')}>회사 선택</Button>} status='404' subTitle='회사 선택 후, 진행해주세요.' title='Not found' />
    </div>
  );
}
/** [Component] 서비스 비선택 페이지 */
export const NotFoundServicePage: React.FC<any> = (): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '100vh', justifyContent: 'center', width: '100vw' }}>
      <Result extra={<Button onClick={() => Router.push('/')}>서비스 선택</Button>} status='404' subTitle='서비스 선택 후, 진행해주세요.' title='Not found' />
    </div>
  );
}

/** [Internal Component] 커스텀 섹션 */
const Section: React.FC<any> = ({ description, icon, title }): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', height: '100%', justifyContent: 'center' }}>
      <div>
        {icon ? (
          <div style={{ marginBottom: 16, textAlign: 'center' }}>{icon}</div>
        ) : (<></>)}
        <div>
          <h2 style={{ color: '##000000D9', fontSize: 20, fontWeight: '600', lineHeight: '24px', margin: 8, textAlign: 'center' }}>{title}</h2>
          {description ? (
            <p style={{ color: '#00000073', margin: 0 }}>{description}</p>
          ) : <></>}
        </div>
      </div>
    </div>
  );
}