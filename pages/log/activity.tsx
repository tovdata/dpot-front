import type { NextPage } from 'next';
import { useMemo, useState } from 'react';
import { useQuery } from 'react-query';
import { useRecoilValue } from 'recoil';
import dynamic from 'next/dynamic';
// Component
import { TOVLayoutPadding, TOVPageLayout } from '@/components/common/Layout';
import { Col, Row, Tabs, Timeline } from 'antd';
const PILPSession = dynamic(() => import('@/components/renewer/ServiceSession'), { ssr: false });
// Module
import moment from 'moment';
// State
import { serviceSelector, userSelector } from '@/models/session';
// Query
import { getActivity } from '@/models/queries/api';
import { BasicPageLoading } from '@/components/common/Loading';

const Page: NextPage = ({ expand, onExpand }: any) => {
  // 탭 키 상태
  const [key, setKey] = useState<string>('my');

  // 컴포넌트 반환
  return (
    <PILPSession>
      <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/log/activity'>
        <TOVLayoutPadding style={{ paddingTop: 42 }}>
          <Tabs activeKey={key} onChange={(value: string) => setKey(value)}>
            <Tabs.TabPane tab='나의 활동내역' key='my'>
              <div style={{ marginTop: 48 }}>
                <UserActivity />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='전체 활동내역' key='total'>
              <div style={{ marginTop: 48 }}>
                <ServiceActivity />
              </div>
            </Tabs.TabPane>
          </Tabs>       
        </TOVLayoutPadding>
      </TOVPageLayout>
    </PILPSession>
  );
}

/** [Internal Component] 서비스 대상 활동 내역 */
const ServiceActivity: React.FC<any> = (): JSX.Element => {
   // 서비스 정보 조회
   const service = useRecoilValue(serviceSelector);
   // 활동 내역 조회
   const { isLoading, data } = useQuery('serviceAct', async () => await getActivity('service', service.id));
   // 데이터 구분 및 정렬
   const sorted: any = useMemo(() => !isLoading ? sortByDatetime(data) : {}, [data]);
   console.log('service', sorted)

   // 컴포넌트 반환
   return (
    <>
      {isLoading ? (
        <BasicPageLoading />
      ) : (
        <PLIPActivityList data={sorted} />
      )}
    </>
   );
}
/** [Internal Component] 사용자 대상 활동 내역 */
const UserActivity: React.FC<any> = (): JSX.Element => {
  // 서비스 정보 조회
  const user = useRecoilValue(userSelector);
  // 활동 내역 조회
  const { isLoading, data } = useQuery('userAct', async () => await getActivity('user', user.id));
  // 데이터 구분 및 정렬
  const sorted: any = useMemo(() => !isLoading ? sortByDatetime(data) : {}, [data]);
  console.log('user', sorted)

  // 컴포넌트 반환
  return (
   <>
     {isLoading ? (
       <BasicPageLoading />
     ) : (
       <PLIPActivityList data={sorted} />
     )}
   </>
  );
}
/** [Internal Component] 활동 내역 목록 */
const PLIPActivityList: React.FC<any> = ({ data }): JSX.Element => {
  // 타임라인 아이템 생성
  const items: JSX.Element[] = Object.keys(data).map((date: string): JSX.Element => (
    <Timeline.Item key={date}>
      <p style={{ color: '#000000D9', fontSize: 16, fontWeight: '600', lineHeight: '22px', marginBottom: 4 }}>{date}</p>
      {data[date].map((item: any, index: number): JSX.Element => (
        <Row gutter={16} key={index} style={{ color: '#000000D9', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 4 }}>
          <Col style={{ color: '#003A8C' }}>{moment.unix(item.date / 1000).format('HH:mm')}</Col>
          <Col flex={1} style={{ fontWeight: '400' }}>{item.content}</Col>
        </Row>
      ))}
    </Timeline.Item>
  ));

  // 컴포넌트 반환
  return (
    <>
      {items.length > 0 ? (
        <Timeline>{items}</Timeline>
      ) : (
        <div style={{ color: '#8C8C8C', display: 'flex', justifyContent: 'center' }}>
          활동 내역이 없습니다.
        </div>
      )}
    </>
  );
}

/** [Internal Function] 데이터를 날짜별로 구분하고, 시간별로 정렬하는 함수 */
const sortByDatetime = (source?: any[]): any => {
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

export default Page;