import { useMemo } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
// Component
import { Col, Tabs, Timeline } from 'antd';
import { StyledDate, StyledDateForDashboard, StyledEmpty, StyledEmptyForDashboard, StyledList, StyledRow, StyledTabSection, StyledTimelineRow, StyledTimelineRowForDashboard } from '../styled/Activity';
// Module
import moment from 'moment';
// State
import { serviceSelector, userSelector } from '@/models/session_old';
// Query
import { getActivity } from '@/models/queries/apis/activity';
import { BasicPageLoading } from '../common/Loading';
// Query key
import { KEY_SERVICE_ACTIVITY, KEY_USER_ACTIVITY } from '@/models/queries/key';

/** [Component] 활동 내역 메인 컴포넌트 */
const ActivityMain: React.FC<any> = (): JSX.Element => {
  return (
    <Tabs defaultActiveKey='my'>
      <Tabs.TabPane key='my' tab='나의 활동 내역'>
        <StyledTabSection>
          <UserActivity />
        </StyledTabSection>
      </Tabs.TabPane>
      <Tabs.TabPane key='total' tab='전체 활동 내역'>
        <StyledTabSection>
          <ServiceActivity />
        </StyledTabSection>
      </Tabs.TabPane>
    </Tabs>
  );
}
/** [Internal Component] 서비스 활동 내역 */
const ServiceActivity: React.FC<any> = (): JSX.Element => {
  // 서비스 정보 조회
  const service = useRecoilValue(serviceSelector);
  // 서비스 활동 내역 조회
  const { isLoading, data } = useQuery([KEY_SERVICE_ACTIVITY, service.id], async () => await getActivity('service', service.id));
  // 데이터 구분 및 정렬
  const sorted: any = useMemo(() => !isLoading ? sortByDatetime(data) : {}, [data, isLoading]);

  // 컴포넌트 반환
  return (
    <>
      {isLoading ? (
        <BasicPageLoading />
      ) : (
        <PLIPActivityList data={sorted} />
      )}
    </>
  )
}
/** [Internal Component] 사용자 활동 내역 */
const UserActivity: React.FC<any> = (): JSX.Element => {
  // 사용자 정보 조회
  const user = useRecoilValue(userSelector);
  // 사용자 활동 내역 조회
  const { isLoading, data } = useQuery([KEY_USER_ACTIVITY, user.id], async () => await getActivity('user', user.id));
  // 데이터 구분 및 정렬
  const sorted: any = useMemo(() => !isLoading ? sortByDatetime(data) : {}, [data, isLoading]);

  // 컴포넌트 반환
  return (
    <>
      {isLoading ? (
        <BasicPageLoading />
      ) : (
        <PLIPActivityList data={sorted} />
      )}
    </>
  )
}
/** [Internal Component] 활동 내역 목록 */
const PLIPActivityList: React.FC<any> = ({ data }): JSX.Element => {
  // 타임라인 아이템 생성
  const items: JSX.Element[] = Object.keys(data).map((date: string): JSX.Element => (
    <Timeline.Item key={date}>
      <StyledDate>{date}</StyledDate>
      {data[date].map((item: any): JSX.Element => (
        <StyledTimelineRow key={item.date} gutter={20}>
          <Col className='time'>{moment.unix(item.date / 1000).format('HH:mm')}</Col>
          <Col className='content' flex={1}>{item.content}</Col>
        </StyledTimelineRow>
      ))}
    </Timeline.Item>
  ));

  // 컴포넌트 반환
  return (
    <>
      {items.length > 0 ? (
        <Timeline>{items}</Timeline>
      ) : (
        <StyledEmpty>활동 내역이 없습니다.</StyledEmpty>
      )}
    </>
  );
}
/** [Internal Component] 활동 내역 목록 (대시보드) */
export const PLIPActivityListForDashboard: React.FC<any> = ({ data }): JSX.Element => {
  // 타임라인 아이템 생성
  const items: JSX.Element[] = Object.keys(data).map((date: string): JSX.Element => (
    <StyledRow key={date}>
      <StyledDateForDashboard>{date}</StyledDateForDashboard>
      {data[date].map((item: any): JSX.Element => (
        <StyledTimelineRowForDashboard key={item.date} gutter={20}>
          <Col className='time'>{moment.unix(item.date / 1000).format('HH:mm')}</Col>
          <Col className='content' flex={1}>{item.content}</Col>
        </StyledTimelineRowForDashboard>
      ))}
    </StyledRow>
  ));

  // 컴포넌트 반환
  return (
    <>
      {items.length > 0 ? (
        <StyledList>{items}</StyledList>
      ) : (
        <StyledEmptyForDashboard>활동 내역이 없습니다.</StyledEmptyForDashboard>
      )}
    </>
  );
}

/** [Function] 데이터를 날짜별로 구분하고, 시간별로 정렬하는 함수 */
export const sortByDatetime = (source?: any[]): any => {
  if (source) {
    // 날짜에 따라 내림차순 정렬
    const sorted: any[] = source.sort((a: any, b: any): number => b.timestamp - a.timestamp);
    // 데이터를 날짜별로 구분
    const categories: any = {};
    sorted.forEach((item: any): void => {
      // 날짜 추출
      const date: string = moment.unix(item.timestamp / 1000).format('YYYY-MM-DD');
      // 키 존재 여부 확인 후, 날짜별로 저장
      (date in categories) ? categories[date].push({ date: item.timestamp, content: item.message }) : categories[date] = [{ date: item.timestamp, content: item.message }];
    });
    // 시간에 따라 오름차순 정렬
    Object.keys(categories).forEach((date: string): void => {
      categories[date] = categories[date].sort((a: any, b: any): number => a.timestamp < b.timestamp ? 1 : a.timestamp > b.timestamp ? -1 : 0);
    });
    // 반환
    return categories;
  } else {
    return {};
  }
}

export default ActivityMain;