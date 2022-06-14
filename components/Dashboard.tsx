// Chart
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// Component
import { Col, Row, Spin, Tag } from 'antd';
import { TOVLayoutPadding } from './common/Layout';
// Styled
import styled from 'styled-components';
import { useQuery } from 'react-query';
// Query
import { getCPIDatas, getPIItemsByType, getPPIDatas } from '@/models/queries/api';
import { useMemo } from 'react';
// Set chart
ChartJS.register(ArcElement, Tooltip);

const StyledDashboardItemCard = styled.div`
  background-color: #FFFFFF;
  border: 1px solid #F0F5FF;
  border-radius: 16px;
  height: 100%;
  position: relative;
  .ant-spin-container,
  .ant-spin-nested-loading {
    height: 100%;
  }
`;

/** [Component] 대시보드 */
export const Dashboard: React.FC<any> = (): JSX.Element => {
  return (
    <div style={{ backgroundColor: '#F0F5FF', height: '100%' }}>
      <TOVLayoutPadding>
        <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: 24, userSelect: 'none' }}>
          <h2 style={{ fontSize: 20, fontWeight: '500', lineHeight: '28px', margin: 0 }}>정재은 님 안녕하세요 😊</h2>
          <p style={{ fontSize: 14, fontWeight: '500', lineHeight: '22px', margin: 0 }}>주식회사 토브데이터</p>
        </div>
        <Row gutter={[24, 24]}>
          <Col span={14}>
            <ChargerForCompany />
          </Col>
          <Col span={10}>
            <LastInformation />
          </Col>
          <Col span={14}>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <PIItems />
              </Col>
              <Col span={8}>
                <NumberOfConsignmentCompanies />
              </Col>
              <Col span={8}>
                <NumberOfProvisionCompanies />
              </Col>
              <Col span={8}>
                <DashboardItemCard>
                  <PIPPInfomation />
                </DashboardItemCard>
              </Col>
              <Col span={16}>
                <DashboardItemCard>
                  <ConsentInformaiton />
                </DashboardItemCard>
              </Col>
            </Row>
          </Col>
          <Col span={10}>
            <DashboardItemCard>
              <MyActivieList />
            </DashboardItemCard>
          </Col>
          <Col span={24}>
            <DashboardItemCard>
              <PINews />
            </DashboardItemCard>
          </Col>
        </Row>
      </TOVLayoutPadding>
    </div>
  );
}

/** [Internal Component] 대시보드 아이템 카드  */
const DashboardItemCard: React.FC<any> = ({ children, loading, style }): JSX.Element => {
  return (
    <StyledDashboardItemCard>
      <Spin spinning={loading ? true : false} size='large'>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%', padding: '24px 32px', ...style }}>
          {children}
        </div>
      </Spin>
    </StyledDashboardItemCard>
  );
}
/** [Internal Component] 대시보드 아이템 헤더 */
const DashboardItemHeader: React.FC<any> = ({ extra, marginBottom, style, title }): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', marginBottom: marginBottom ? marginBottom : 16 }}>
      <h3 style={{ color: '#061178', fontSize: 14, fontWeight: '700', lineHeight: '22px', margin: 0, ...style }}>{title}</h3>
      {extra}
    </div>
  );
}

/** [Internal Component] 개인정보보호 책임자 */
const ChargerForCompany: React.FC<any> = (): JSX.Element => {
  return (
    <DashboardItemCard>
      <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center' }}>
        <div style={{ marginBottom: 21 }}>
          <h3 style={{ color: '#2F2E41', fontSize: 16, fontWeight: '700', lineHeight: '24px' }}>우리 회사의 개인정보보호 책임자<label style={{ marginLeft: 6 }}>👑</label></h3>
        </div>
        <Row gutter={16} style={{ marginBottom: 18 }}>
          <Col span={8}>
            <div style={{ alignItems: 'center', color: '#3F3D56', display: 'flex' }}>
              <span style={{ fontSize: 12, fontWeight: '400', lineHeight: '20px', width: 60 }}>이름</span>
              <span style={{ fontSize: 14, fontWeight: '500', lineHeight: '22px', flex: 1 }}>김토브</span>
            </div>
          </Col>
          <Col span={8}>
            <div style={{ alignItems: 'center', color: '#3F3D56', display: 'flex' }}>
              <span style={{ color: '#3F3D56', fontSize: 12, fontWeight: '400', lineHeight: '20px', marginRight: 8, width: 60 }}>직위/직책</span>
              <span style={{ fontSize: 14, fontWeight: '500', lineHeight: '22px', flex: 1 }}>대표이사</span>
            </div>
          </Col>
        </Row>
        <Row>
          <Col span={16}>
            <div style={{ alignItems: 'center', color: '#3F3D56', display: 'flex' }}>
              <span style={{ color: '#3F3D56', fontSize: 12, fontWeight: '400', lineHeight: '20px', width: 60 }}>이메일</span>
              <span style={{ fontSize: 14, fontWeight: '500', lineHeight: '22px', flex: 1 }}>privacy@tovdata.com</span>
            </div>
          </Col>
        </Row>
      </div>
    </DashboardItemCard>
  );
}
/** [Internal Component] 최근 정보 수정일 */
const LastInformation: React.FC<any> = (): JSX.Element => {
  return (
    <DashboardItemCard>
      <DashboardItemHeader title='최근 정보 수정일' />
      <div>
        <LastInformationRow date='2022-06-08' style={{ marginBottom: 4 }} subject='동의서' user='김토브' />
        <LastInformationRow date='2022-06-08' style={{ marginBottom: 4 }} subject='개인정보 처리방침' user='김토브' />
        <LastInformationRow date='2022-06-08' style={{ marginBottom: 4 }} subject='개인정보 수집・이용 현황' user='김토브' />
        <LastInformationRow date='2022-06-08' subject='개인정보 제공・위탁 현황' user='김토브' />
      </div>
    </DashboardItemCard>
  );
}
/** [Internal Component] 개인정보 수집 항목 차트 */
const PIItems: React.FC<any> = (): JSX.Element => {
  // 위탁 데이터 조회
  const { isLoading, data } = useQuery("dashboard-items", async () => await getPIItemsByType('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  // Chart data
  const chartData: any = useMemo(() => ({
    labels: ['필수항목', '선택항목'],
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
const NumberOfConsignmentCompanies: React.FC<any> = (): JSX.Element => {
  // 위탁 데이터 조회
  const { isLoading, data } = useQuery("dashboard-cpi", async () => await getCPIDatas('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  // Count 변수 설정
  const count: number = useMemo(() => data ? data.length : 0, [data]);

  // 컴포넌트 반환
  return (
    <DashboardItemCard loading={isLoading}>
      <DashboardItemHeader title={<>개인정보<br/>위탁 업체 수</>} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CountLabel count={count} />
      </div>
    </DashboardItemCard>
  );
}
/** [Internal Component] 개인정보 제공 업체 수 표시 */
const NumberOfProvisionCompanies: React.FC<any> = (): JSX.Element => {
  // 제공 데이터 조회
  const { isLoading, data } = useQuery("dashboard-ppi", async () => await getPPIDatas('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));
  // Count 변수 설정
  const count: number = useMemo(() => data ? data.length : 0, [data]);

  // 컴포넌트 반환
  return (
    <DashboardItemCard loading={isLoading}>
      <DashboardItemHeader title={<>개인정보<br/>제공 업체 수</>} />
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <CountLabel count={count} />
      </div>
    </DashboardItemCard>
  );
}
/** [Internal Component] 개인정보 처리방침 최종 게재일 표시 */
const PIPPInfomation: React.FC<any> = (): JSX.Element => {
  return (
    <>
      <DashboardItemHeader title='개인정보 처리방침' />
      <div>
        <h5 style={{ color: '#2F2E41', fontSize: 12, fontWeight: '400', lineHeight: '20px', margin: 0 }}>최종 게재일</h5>
        <p style={{ color: '#11142D', fontSize: 16, fontWeight: '600', lineHeight: '24px', margin: 0 }}>2022-01-01</p>
      </div>
    </>
  );
}
/** [Internal Component] 동의서 개수 표시 */
const ConsentInformaiton: React.FC<any> = (): JSX.Element => {
  return (
    <>
      <DashboardItemHeader title='동의서' />

    </>
  );
}
/** [Internal Component] 나의 활동 내역 */
const MyActivieList: React.FC<any> = (): JSX.Element => {
  return (
    <>
      <DashboardItemHeader extra={<ViewAll />} title='나의 활동 내역' />
      <div></div>
    </>
  );
}
/** [Internal Component] 최근 개인정보 뉴스 */
const PINews: React.FC<any> = (): JSX.Element => {
  return (
    <>
      <DashboardItemHeader extra={<ViewAll />} title='최근 개인정보 뉴스' />
      <NewItems />
    </>
  );
}

/** [Internal Component] 최근 정보 수정일 Row */
const LastInformationRow: React.FC<any> = ({ date, style, subject, user }): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between', ...style }}>
      <h5 style={{ color: '#11142D', fontSize: 14, fontWeight: '600', lineHeight: '22px', margin: 0 }}>{subject}</h5>
      <div style={{ color: '#2F2E41', fontSize: 12, fontWeight: '400', lineHeight: '20px' }}>
        {date ? (
          <div style={{  alignItems: 'center', display: 'flex', justifyContent: 'space-between', minWidth: 116 }}>
            <label>{date}</label>
            <label>{user}</label>
          </div>
        ) : (<></>)}
      </div>
    </div>
  );
}
/** [Internal Component] 개수 표시 컴포넌트 */
const CountLabel: React.FC<any> = ({ count }): JSX.Element => {
  return (
    <p style={{ color: '#11142D', fontSize: 24, fontWeight: '700', lineHeight: '32px', margin: 0 }}>
      {count}
      <small style={{ color: '#2F2E41', fontSize: 12, fontWeight: '400', lineHeight: '20px', marginLeft: 6 }}>개</small>
    </p>
  );
}
/** [Internal Component] 전체 보기 컴포넌트 (extra) */
const ViewAll: React.FC<any> = ({ href }): JSX.Element => {
  return (<a href={href} style={{ color: '#2F2E41', fontSize: 12, fontWeight: '400', lineHeight: '20px', textDecoration: 'underline' }}>전체보기</a>)
}
/** [Internal Component] 뉴스 목록 컴포넌트 */
const NewItems: React.FC<any> = (): JSX.Element => {
  return (
    <div>
      <NewsItem date='2022-05-29' sources='개인정보보호위원회' subject='2021년 법령해석 심의 의결 결정문 모음집' type='정부자료' />
      <NewsItem date='2022-05-29' sources='한겨례' subject='“쇼핑몰 장바구니 속 운동화, 페이스북이 어떻게 알았지?”' type='업계동향' />
      <NewsItem date='2022-05-29' sources='개인정보보호위원회' subject='2021년 법령해석 심의 의결 결정문 모음집' type='정부자료' />
      <NewsItem date='2022-05-29' sources='개인정보보호위원회' style={{ marginBottom: 0 }} subject='2021년 법령해석 심의 의결 결정문 모음집' type='정부자료' />
    </div>
  );
}
/** [Internal Component] 뉴스 Row 컴포넌트 */
const NewsItem: React.FC<any> = ({ date, sources, style, subject, type }): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', marginBottom: 10, ...style }}>
      <div style={{ alignItems: 'center', display: 'flex'}}>
        <Tag style={{ marginRight: 8, userSelect: 'none' }}>{type}</Tag>
        <span style={{ color: '#11142D', fontSize: 14, fontWeight: '600', lineHeight: '22px' }}>{subject}</span>
      </div>
      <div style={{  alignItems: 'center', display: 'flex', justifyContent: 'space-between', minWidth: 200 }}>
        <span style={{ color: '#8C8C8C', fontSize: 12, fontWeight: '400', lineHeight: '20px'  }}>{date}</span>
        <span style={{ color: '#2F2E41', fontSize: 12, fontWeight: '400', lineHeight: '20px' }}>{sources}</span>
      </div>
    </div>
  );
}