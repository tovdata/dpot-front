import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
// Component
import { Col, Timeline } from 'antd';
import { StyledDate, StyledDateForDashboard, StyledEmpty, StyledEmptyForDashboard, StyledList, StyledRow, StyledTimelineRow, StyledTimelineRowForDashboard } from '@/components/styled/Activity';
const PLIPLoadingContainer = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIPLoadingContainer));
// Query
import { getActivity } from '@/models/queries/apis/activity';
// Query key
import { KEY_SERVICE_ACTIVITY, KEY_USER_ACTIVITY } from '@/models/queries/key';
// Util
import moment from 'moment';
import { decodeAccessToken } from 'utils/utils';

/** [Component] 서비스 활동 내역 */
export const ServiceActivity: React.FC<any> = ({ accessToken, serviceId }): JSX.Element => {
  // 서비스 활동 내역 조회
  const { isLoading, data } = useQuery([KEY_SERVICE_ACTIVITY, serviceId], async () => await getActivity(accessToken, 'service', serviceId));
  // 데이터 구분 및 정렬
  const sorted: any = useMemo(() => data ? sortByDatetime(data) : {}, [data]);

  // 컴포넌트 반환
  return (
    <>
      {isLoading ? (
        <PLIPLoadingContainer />
      ) : (
        <PLIPActivityList data={sorted} />
      )}
    </>
  )
}
/** [Component] 사용자 활동 내역 */
export const UserActivity: React.FC<any> = ({ accessToken }): JSX.Element => {
  // 사용자 ID 추출
  const userId: string = decodeAccessToken(accessToken);
  // 사용자 활동 내역 조회
  const { isLoading, data } = useQuery([KEY_USER_ACTIVITY, userId], async () => await getActivity(accessToken, 'user', userId));
  // 데이터 구분 및 정렬
  const sorted: any = useMemo(() => data ? sortByDatetime(data) : {}, [data]);

  // 컴포넌트 반환
  return (
    <>
      {isLoading ? (
        <PLIPLoadingContainer />
      ) : (
        <PLIPActivityList data={sorted} />
      )}
    </>
  )
}
/** [Component] 활동 내역 목록 (대시보드) */
export const PLIPActivityListForDashboard: React.FC<any> = ({ data }): JSX.Element => {
  // 타임라인 아이템 생성
  const items: JSX.Element[] = useMemo(() => Object.keys(data).map((date: string): JSX.Element => (
    <StyledRow key={date}>
      <StyledDateForDashboard>{date}</StyledDateForDashboard>
      {data[date].map((item: any): JSX.Element => (
        <StyledTimelineRowForDashboard key={item.date} gutter={20}>
          <Col className='time'>{moment.unix(item.date / 1000).format('HH:mm')}</Col>
          <Col className='content' flex={1}>{item.content}</Col>
        </StyledTimelineRowForDashboard>
      ))}
    </StyledRow>
  )), [data]);

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

/** [Internal Component] 활동 내역 목록 */
const PLIPActivityList: React.FC<any> = ({ data }): JSX.Element => {
  // 타임라인 아이템 생성
  const items: JSX.Element[] = useMemo(() => Object.keys(data).map((date: string): JSX.Element => (
    <Timeline.Item key={date}>
      <StyledDate>{date}</StyledDate>
      {data[date].map((item: any): JSX.Element => (
        <StyledTimelineRow key={item.date} gutter={20}>
          <Col className='time'>{moment.unix(item.date / 1000).format('HH:mm')}</Col>
          <Col className='content' flex={1}>{item.content}</Col>
        </StyledTimelineRow>
      ))}
    </Timeline.Item>
  )), [data]);

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