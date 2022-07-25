import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
// Chart
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// Component
import { Col, Row, Spin, Tag } from 'antd';
import { PLIPLayoutPadding } from '@/components/styled/Layout';
import { PLIPActivityListForDashboard, sortByDatetime } from '@/components/renewer/Activity';
// State
import { accessTokenSelector, sessionSelector } from '@/models/session';
// Styled
import { StyledCountLabel, StyledDashboardItemCard, StyledDashboardItemContent, StyledDashboardItemContentEnd, StyledDashboardItemHeader, StyledDashboardHeader, StyledDashboardItemContentForCPO, StyledNewsItem } from '@/components/styled/Dashboard';
import { StyledTag, StyledTagList } from '@/components/styled/Dashboard';
import { StyledLatestInfoRow } from '@/components/styled/Dashboard';
import { StyledDescriptionForm, StyledManagerSection, StyledManagerSectionHeader } from '@/components/styled/Dashboard';
// Query
import { getCPIDatas, getPIItemsByType, getPPIDatas } from '@/models/queries/apis/manage';
import { getUserActivityForWeek } from '@/models/queries/apis/activity';
import { getCompany, getService, getServiceModifiedTime } from '@/models/queries/apis/company';
import { getConsentList } from '@/models/queries/apis/consent';
import { getUser } from '@/models/queries/apis/user';
import { getPIPPPublishAt } from '@/models/queries/apis/pipp';
// Query key
import { KEY_COMPANY, KEY_DASHBOARD_ACTIVITY, KEY_DASHBOARD_CONSENT, KEY_DASHBOARD_ITEMS, KEY_DASHBOARD_LAST_MODIFY, KEY_DASHBOARD_NEWS, KEY_DASHBOARD_PIPP, KEY_SERVICE, KEY_USER } from '@/models/queries/key';
import { SERVICE_CPI, SERVICE_PPI } from '@/models/queries/type';
// Util
import { decodeAccessToken, transformToDate } from 'utils/utils';
import { getNews } from '@/models/queries/apis/etc';

// Set chart
ChartJS.register(ArcElement, Tooltip);

/** [Component] 대시보드 */
const Dashboard: React.FC<any> = (): JSX.Element => {
  // 액세스 토큰 조회
  const accessToken: string = useRecoilValue(accessTokenSelector);
  // 세션 조회
  const session = useRecoilValue(sessionSelector);
  // 사용자 ID 조회
  const userId: string = decodeAccessToken(accessToken);

  // 컴포넌트 반환
  return (
    <div style={{ backgroundColor: '#F0F5FF', height: '100%' }}>
      <PLIPLayoutPadding>
        <DashboardHeader serviceId={session.serviceId} userId={userId} />
        <Row gutter={[24, 24]}>
          <Col span={14}>
            <ChargerForCompany companyId={session.companyId} />
          </Col>
          <Col span={10}>
            <LastInformation serviceId={session.serviceId} />
          </Col>
          <Col span={14}>
            <Row gutter={[16, 16]} style={{ height: '100%' }}>
              <Col span={8}>
                <PIItems serviceId={session.serviceId} />
              </Col>
              <Col span={8}>
                <NumberOfConsignmentCompanies serviceId={session.serviceId} />
              </Col>
              <Col span={8}>
                <NumberOfProvisionCompanies serviceId={session.serviceId} />
              </Col>
              <Col span={8}>
                <PIPPInfomation serviceId={session.serviceId} />
              </Col>
              <Col span={16}>
                <ConsentInformaiton serviceId={session.serviceId} />
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <MyActivieList userId={userId} />
          </Col>
          <Col span={24}>
            <PINews />
          </Col>
        </Row>
      </PLIPLayoutPadding>
    </div>
  );
}

const DashboardHeader: React.FC<any> = ({ serviceId, userId }) => {
  // 사용자 정보 조회
  const { data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));

  return (
    <StyledDashboardHeader>
      <h2>{user ? `${user.userName} 님 안녕하세요 😊` : ''}</h2>
    </StyledDashboardHeader>
  );
}
/** [Internal Component] 대시보드 아이템 카드  */
const DashboardItemCard: React.FC<any> = ({ children, loading, style }): JSX.Element => {
  return (
    <StyledDashboardItemCard style={style}>
      <Spin spinning={loading ? true : false} size='large'>
        <StyledDashboardItemContent>
          {children}
        </StyledDashboardItemContent>
      </Spin>
    </StyledDashboardItemCard>
  );
}
/** [Internal Component] 대시보드 아이템 헤더 */
const DashboardItemHeader: React.FC<any> = ({ extra, title }): JSX.Element => {
  return (
    <StyledDashboardItemHeader>
      <h4>{title}</h4>
      <>{extra}</>
    </StyledDashboardItemHeader>
  );
}

/** [Internal Component] 개인정보 보호책임자 */
const ChargerForCompany: React.FC<any> = ({ companyId }): JSX.Element => {
  // 회사 정보 조회
  const { isLoading, data: company } = useQuery([KEY_COMPANY, companyId], async () => await getCompany(companyId));

  // 컴포넌트 반환
  return (
    <StyledDashboardItemCard>
      <Spin spinning={isLoading}>
        <StyledDashboardItemContentForCPO>
          <StyledManagerSection>
            <StyledManagerSectionHeader>
              <h4>우리 회사의 개인정보 보호책임자</h4>
              <span className='icon'>👑</span>
            </StyledManagerSectionHeader>
            <Row gutter={16} style={{ marginBottom: 18 }}>
              <Col span={8}>
                <StyledDescriptionForm>
                  <label className='subject'>이름</label>
                  <label className='content'>{company ? company.manager.name : ''}</label>
                </StyledDescriptionForm>
              </Col>
              <Col span={8}>
                <StyledDescriptionForm>
                  <label className='subject'>직위/직책</label>
                  <label className='content'>{company ? company.manager.position : ''}</label>
                </StyledDescriptionForm>
              </Col>
            </Row>
            <Row>
              <Col span={16}>
                <StyledDescriptionForm>
                  <label className='subject'>이메일</label>
                  <label className='content'>{company ? company.manager.email : ''}</label>
                </StyledDescriptionForm>
              </Col>
            </Row>
          </StyledManagerSection>
        </StyledDashboardItemContentForCPO>
      </Spin>
    </StyledDashboardItemCard>
  );
}
/** [Internal Component] 최근 정보 수정일 */
const LastInformation: React.FC<any> = ({ serviceId }): JSX.Element => {
  // 최종 수정일 조회
  const { isLoading, data } = useQuery([KEY_DASHBOARD_LAST_MODIFY, serviceId], async () => await getServiceModifiedTime(serviceId));
  // 동의서에 대한 최종 수정일
  const modifyDateForConsent = useMemo(() => data && data.consent.modifiedAt !== 0 ? transformToDate(data.consent.modifiedAt) : '', [data]);
  // 동의서에 대한 최종 수정자
  const userForContsent = useMemo(() => data ? data.consent.user : '', [data]);
  // 개인정보 처리방침에 대한 최종 수정일
  const modifyDateForPIPP = useMemo(() => data && data.pipp.modifiedAt !== 0 ? transformToDate(data.pipp.modifiedAt) : '', [data]);
  // 개인정보 처리방침에 대한 최종 수정자
  const userForPIPP = useMemo(() => data ? data.pipp.user : '', [data]);
  // 개인정보 수집 및 이용에 대한 최종 수정일
  const modifyDateForPI = useMemo(() => data && data.pi_fni.modifiedAt !== 0 ? transformToDate(data.pi_fni.modifiedAt) : '', [data]);
  // 개인정보 수집 및 이용에 대한 최종 수정자
  const userForPI = useMemo(() => data ? data.pi_fni.user : '', [data]);
  // 개인정보 제공 및 위탁에 대한 최종 수정일
  const modifyDateForPC = useMemo(() => data && data.ppi_cpi_pfni_cfni.modifiedAt !== 0 ? transformToDate(data.ppi_cpi_pfni_cfni.modifiedAt) : '', [data]);
  // 개인정보 수집 및 이용에 대한 최종 수정자
  const userForPC = useMemo(() => data ? data.ppi_cpi_pfni_cfni.user : '', [data]);

  return (
    <DashboardItemCard loading={isLoading}>
      <DashboardItemHeader title='최근 정보 수정일' />
      <div>
        <LastInformationRow date={modifyDateForConsent} subject='동의서' user={userForContsent} />
        <LastInformationRow date={modifyDateForPIPP} subject='개인정보 처리방침' user={userForPIPP} />
        <LastInformationRow date={modifyDateForPI} subject='개인정보 수집・이용 현황' user={userForPI} />
        <LastInformationRow date={modifyDateForPC} subject='개인정보 제공・위탁 현황' user={userForPC} />
      </div>
    </DashboardItemCard>
  );
}
/** [Internal Component] 개인정보 수집 항목 차트 */
const PIItems: React.FC<any> = ({ serviceId }): JSX.Element => {
  // 개인정보 수집 항목 조회
  const { isLoading, data } = useQuery([KEY_DASHBOARD_ITEMS, serviceId], async () => await getPIItemsByType(serviceId));
  // Chart data
  const chartData: any = useMemo(() => ({
    labels: ['필수', '선택'],
    datasets: [{
      data: [data && (data as any).essentialItemsOnly ? (data as any).essentialItemsOnly.length : 0, data && (data as any).selectionItemsOnly ? (data as any).selectionItemsOnly.length : 0],
      backgroundColor: ['#6C63FF', '#C4C1F2']
    }]
  }), [data]);
  // Count 변수 설정
  const count: number = useMemo(() => data && (data as any).allItems ? (data as any).allItems.length : 0, [data]);

  // 컴포넌트 반환
  return (
    <DashboardItemCard loading={isLoading}>
      <DashboardItemHeader title='개인정보 수집 항목' />
      <Row>
        <Col span={14}>
          <Doughnut data={chartData} />
        </Col>
        <Col span={10} style={{ alignItems: 'flex-end', justifyContent: 'flex-end', display: 'flex' }}>
          <CountLabel count={count} />
        </Col>
      </Row>
    </DashboardItemCard>
  );
}
/** [Internal Component] 개인정보 위탁 업체 수 표시 */
const NumberOfConsignmentCompanies: React.FC<any> = ({ serviceId }): JSX.Element => {
  // 위탁 데이터 조회
  const { isLoading, data } = useQuery([SERVICE_CPI, serviceId], async () => await getCPIDatas(serviceId));
  // Count 변수 설정
  const count: number = useMemo(() => data ? data.filter((row: any): boolean => !('url' in row)).length : 0, [data]);

  // 컴포넌트 반환
  return (
    <DashboardItemCard loading={isLoading}>
      <DashboardItemHeader title={<>개인정보<br/>위탁 업체 수</>} />
      <StyledDashboardItemContentEnd>
        <CountLabel count={count} />
      </StyledDashboardItemContentEnd>
    </DashboardItemCard>
  );
}
/** [Internal Component] 개인정보 제공 업체 수 표시 */
const NumberOfProvisionCompanies: React.FC<any> = ({ serviceId }): JSX.Element => {
  // 제공 데이터 조회
  const { isLoading, data } = useQuery([SERVICE_PPI, serviceId], async () => await getPPIDatas(serviceId));
  // Count 변수 설정
  const count: number = useMemo(() => data ? data.filter((row: any): boolean => !('url' in row)).length : 0, [data]);

  // 컴포넌트 반환
  return (
    <DashboardItemCard loading={isLoading}>
      <DashboardItemHeader title={<>개인정보<br/>제공 업체 수</>} />
      <StyledDashboardItemContentEnd>
        <CountLabel count={count} />
      </StyledDashboardItemContentEnd>
    </DashboardItemCard>
  );
}
/** [Internal Component] 개인정보 처리방침 최종 게재일 표시 */
const PIPPInfomation: React.FC<any> = ({ serviceId }): JSX.Element => {
  // 개인정보 처리방침 상태 조회
  const { isLoading, data } = useQuery([KEY_DASHBOARD_PIPP, serviceId], async () => await getPIPPPublishAt(serviceId));

  // 컴포넌트 반환
  return (
    <DashboardItemCard loading={isLoading}>
      <DashboardItemHeader title='개인정보 처리방침' />
      <div>
        <h5 style={{ color: '#2F2E41', fontSize: 12, fontWeight: '400', lineHeight: '20px', margin: 0 }}>최종 게재일</h5>
        <p style={{ color: '#11142D', fontSize: 16, fontWeight: '600', lineHeight: '24px', margin: 0 }}>{data && data > 0 ? transformToDate(data) : '-'}</p>
      </div>
    </DashboardItemCard>
  );
}
/** [Internal Component] 동의서 개수 표시 */
const ConsentInformaiton: React.FC<any> = ({ serviceId }): JSX.Element => {
  // 동의서 목록 조회
  const { isLoading, data } = useQuery([KEY_DASHBOARD_CONSENT, serviceId], async () => await getConsentList(serviceId));
  // Count 변수 설정
  const count: number = useMemo(() => data ? data.length : 0, [data]);
  // 동의서 유형
  const types: string[] = useMemo(() => data ? data.reduce((acc: string[], item: any): string[] => {
    // type에 따라 태그 변경
    let tagName: string = '';
    switch(item.data.type) {
      case 0:
        tagName = '개인정보';
        break;
      case 3:
        tagName = '민감정보';
        break;
      case 1:
        tagName = '고유식별정보';
        break;
      case 2:
        tagName = '마케팅';
        break;
      default:
        tagName = '제3자제공';
        break;
    }
    // 중복 확인
    if (!acc.includes(tagName)) acc.push(tagName);
    return acc;
  }, []) : [], [data]);

  return (
    <DashboardItemCard loading={isLoading}>
      <DashboardItemHeader title='동의서' />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledTagList>
          {types.map((item: string): JSX.Element => (<StyledTag key={item}>{item}</StyledTag>))}
        </StyledTagList>
        <StyledDashboardItemContentEnd style={{ width: 64 }}>
          <CountLabel count={count} />
        </StyledDashboardItemContentEnd>
      </div>
    </DashboardItemCard>
  );
}
/** [Internal Component] 나의 활동 내역 */
const MyActivieList: React.FC<any> = ({ userId }): JSX.Element => {
  // 사용자 활동 내역 조회
  const { isLoading, data } = useQuery([KEY_DASHBOARD_ACTIVITY, userId], async () => await getUserActivityForWeek(userId));
  // 데이터 구분 및 정렬
  const sorted: any = useMemo(() => data ? sortByDatetime(data) : {}, [data]);

  // 컴포넌트 반환
  return (
    <DashboardItemCard loading={isLoading}>
      <DashboardItemHeader extra={<ViewAll href='/log/activity/' />} title='나의 활동 내역' />
      <PLIPActivityListForDashboard data={sorted} />
    </DashboardItemCard>
  );
}
/** [Internal Component] 최근 개인정보 뉴스 */
const PINews: React.FC<any> = (): JSX.Element => {
  return (
    <>
      <DashboardItemHeader title='개인정보 템플릿' />
      <NewItems />
    </>
  );
}

/** [Internal Component] 최근 정보 수정일 Row */
const LastInformationRow: React.FC<any> = ({ date, subject, user }): JSX.Element => {
  return (
    <StyledLatestInfoRow>
      <h5>{subject}</h5>
      <div className='content'>
        {date ? (
          <>
            <label>{date}</label>
            <label>{user}</label>
          </>
        ) : (<></>)}
      </div>
    </StyledLatestInfoRow>
  );
}
/** [Internal Component] 개수 표시 컴포넌트 */
const CountLabel: React.FC<any> = ({ count }): JSX.Element => {
  return (
    <StyledCountLabel>
      <>{count}</>
      <small>개</small>
    </StyledCountLabel>
  );
}
/** [Internal Component] 전체 보기 컴포넌트 (extra) */
const ViewAll: React.FC<any> = ({ href }): JSX.Element => {
  return (<a href={href} style={{ color: '#2F2E41', fontSize: 12, fontWeight: '400', lineHeight: '20px', textDecoration: 'underline' }}>전체보기</a>)
}
/** [Internal Component] 뉴스 목록 컴포넌트 */
const NewItems: React.FC<any> = (): JSX.Element => {
  return (
    <DashboardItemCard style={{ height: 'auto' }}>
      <div>
        <NewsItem date='22-07-21' subject='개인정보 내부 관리계획' sources='TOVDATA' url='https://s3.ap-northeast-2.amazonaws.com/plip.kr/doc/static/templates/(%E1%84%90%E1%85%A9%E1%84%87%E1%85%B3%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5)_%E1%84%90%E1%85%A6%E1%86%B7%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA1_%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9+%E1%84%82%E1%85%A2%E1%84%87%E1%85%AE+%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5%E1%84%80%E1%85%A8%E1%84%92%E1%85%AC%E1%86%A8+%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5.docx' type='템플릿' />
        <NewsItem date='22-07-21' subject='개인정보 처리 위탁 계약서' sources='TOVDATA' url='https://s3.ap-northeast-2.amazonaws.com/plip.kr/doc/static/templates/(%E1%84%90%E1%85%A9%E1%84%87%E1%85%B3%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5)_%E1%84%90%E1%85%A6%E1%86%B7%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA2_%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%E1%84%8B%E1%85%B1%E1%84%90%E1%85%A1%E1%86%A8+%E1%84%80%E1%85%A8%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%89%E1%85%A5(%E1%84%8B%E1%85%A1%E1%86%AB).docx' type='템플릿' />
        <NewsItem date='22-07-21' subject='개인정보 보호교육 계획(안)' sources='TOVDATA' url='https://s3.ap-northeast-2.amazonaws.com/plip.kr/doc/static/templates/(%E1%84%90%E1%85%A9%E1%84%87%E1%85%B3%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5)_%E1%84%90%E1%85%A6%E1%86%B7%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA3_%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%87%E1%85%A9%E1%84%92%E1%85%A9+%E1%84%80%E1%85%AD%E1%84%8B%E1%85%B2%E1%86%A8%E1%84%80%E1%85%A8%E1%84%92%E1%85%AC%E1%86%A8(%E1%84%8B%E1%85%A1%E1%86%AB).docx' type='템플릿' />
        <NewsItem date='22-07-21' subject='영상정보처리기기(CCTV) 운영관리 방침' sources='TOVDATA' url='https://s3.ap-northeast-2.amazonaws.com/plip.kr/doc/static/templates/(%E1%84%90%E1%85%A9%E1%84%87%E1%85%B3%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5)_%E1%84%90%E1%85%A6%E1%86%B7%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA4_%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%E1%84%80%E1%85%B5%E1%84%80%E1%85%B5+%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%B5%E1%84%8E%E1%85%B5%E1%86%B7+%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5.docx' type='템플릿' />
      </div>
    </DashboardItemCard>
  );
}
/** [Internal Component] 뉴스 Row 컴포넌트 */
const NewsItem: React.FC<any> = ({ date, subject, sources, style, type, url }): JSX.Element => {
  return (
    <StyledNewsItem style={{ ...style }}>
      <div style={{ alignItems: 'center', display: 'flex'}}>
        <Tag style={{ marginRight: 8, userSelect: 'none' }}>{type}</Tag>
        <a style={{ color: '#11142D', cursor: 'pointer', fontSize: 14, fontWeight: '600', lineHeight: '22px' }} href={url} rel='noreferrer' target='_blank'>{subject}</a>
      </div>
      <div className='right'>
        <span style={{ color: '#8C8C8C', fontSize: 12, fontWeight: '400', lineHeight: '20px'  }}>{date}</span>
        <span style={{ color: '#2F2E41', fontSize: 12, fontWeight: '400', lineHeight: '20px' }}>{sources}</span>
      </div>
    </StyledNewsItem>
  );
}

export default Dashboard;