import type { NextPage } from 'next';
// Component
import { TOVLayoutPadding, TOVPageLayout } from '../../components/common/Layout';
import { TOVPageTitle } from '../../components/common/Header';
import { Col, Row, Tabs, Timeline } from 'antd';
// Module
import moment from 'moment';
import { useState } from 'react';

const data: any[] = [
  { date: 1654565301, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654568901, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654572501, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654648101, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654655301, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654658901, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654738101, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654748901, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654824501, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654900101, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654907301, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654914501, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654921701, user: '김토브', content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  
  { date: 1654565301, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654568901, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654572501, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654648101, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654655301, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654658901, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654738101, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654748901, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654824501, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654900101, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654907301, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654914501, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654921701, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },

  { date: 1654565301, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654568901, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654572501, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654648101, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654655301, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654658901, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654738101, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654748901, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654824501, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654900101, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654907301, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654914501, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' },
  { date: 1654921701, content: '김토브 님이 ‘수집・이용’ 탭의 ‘가명정보 수집・이용’ 표를 수정하였습니다.' }
];


const Page: NextPage = ({ expand, onExpand }: any) => {
  // 데이터 구분 및 정렬
  const sorted: any = sortByDatetime(data);
  // 탭 키 상태
  const [key, setKey] = useState<string>('total');

  // 컴포넌트 반환
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/log/history'>
      <TOVLayoutPadding style={{ paddingTop: 42 }}>
        <Tabs activeKey={key} onChange={(value: string) => setKey(value)}>
          <Tabs.TabPane tab='전체 활동내역' key='total'>
            <div style={{ marginTop: 64 }}>
              <TOVHistoryList data={sorted} />
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab='나의 활동내역' key='my'>
            <div style={{ marginTop: 64 }}>
              <TOVHistoryList data={sorted} />
            </div>
          </Tabs.TabPane>
        </Tabs>       
      </TOVLayoutPadding>
    </TOVPageLayout>
  )
}
/** [Internal Component] 활동 이력 목록 */
const TOVHistoryList: React.FC<any> = ({ data }): JSX.Element => {
  // 타임라인 아이템 생성
  const items: JSX.Element[] = Object.keys(data).map((date: string): JSX.Element => (
    <Timeline.Item key={date}>
      <p style={{ color: '#000000D9', fontSize: 16, fontWeight: '600', lineHeight: '22px', marginBottom: 4 }}>{date}</p>
      {data[date].map((item: any, index: number): JSX.Element => (
        <Row gutter={16} key={index} style={{ color: '#000000D9', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 4 }}>
          <Col style={{ color: '#003A8C' }}>{moment.unix(item.date).format('HH:mm')}</Col>
          <Col flex={1} style={{ fontWeight: '400' }}>{item.content}</Col>
        </Row>
      ))}
    </Timeline.Item>
  ));

  // 컴포넌트 반환
  return (
    <Timeline>
      {items}
    </Timeline>
  );
}
/** [Internal Function] 데이터를 날짜별로 구분하고, 시간별로 정렬하는 함수 */
const sortByDatetime = (source: any[]): any => {
  // 날짜에 따라 내림차순 정렬
  const sorted: any[] = source.sort((a: any, b: any): number => a.date < b.date ? 1 : a.date > b.date ? -1 : 0);
  // 데이터를 날짜별로 구분
  const categories: any = {};
  sorted.forEach((item: any): void => {
    // 날짜 추출
    const date: string = moment.unix(item.date).format('YYYY-MM-DD');
    // 키 존재 여부 확인 후, 날짜별로 저장
    (date in categories) ? categories[date].push({ date: item.date, content: item.content }) : categories[date] = [{ date: item.date, content: item.content }];
  });
  // 시간에 따라 오름차순 정렬
  Object.keys(categories).forEach((date: string): void => {
    categories[date] = categories[date].sort((a: any, b: any): number => a.date > b.date ? 1 : a.date < b.date ? -1 : 0);
  });
  // 반환
  return categories;
}

export default Page;