// Component
import { Col, Divider, Row, Table } from 'antd';
import { StyledDownloadButton, StyledDownloadIcon, StyledTabPane, StyledTabPaneHeader, StyledTabPaneTitle, StyledTemplateCard } from '@/components/styled/Template';
// Module
import moment from 'moment';

/** [Component] 템플릿 목록 페이지 */
export const TemplateList: React.FC<any> = (): JSX.Element => {
  return (
    <StyledTabPane>
      <StyledTabPaneHeader>
        <StyledTabPaneTitle>템플릿 다운로드</StyledTabPaneTitle>
      </StyledTabPaneHeader>
      <Row gutter={16}>
        <Col span={6}>
          <TemplateCard text='영상정보처리기기(CCTV) 운영관리 방침' url='/doc/template/imp.docx' />
        </Col>
        <Col span={6}>
          <TemplateCard text='개인정보 처리위탁 계약서' url='/doc/template/임시문서.docx' />
        </Col>
        <Col span={6}>
          <TemplateCard text='개인정보 보호교육 계획(안)' url='/doc/template/임시문서.docx' />
        </Col>
        <Col span={6}>
          <TemplateCard text='개인정보처리시스템 접근권한 관리대장' url='/doc/template/임시문서.docx' />
        </Col>
      </Row>
      <Divider dashed style={{ marginBottom: 30, marginTop: 30 }} />
      <Table columns={[
        { title: '목록', dataIndex: 'title', key: 'title', sorter: (a: any, b: any): number => a.title > b.title ? 1 : a.title < b.title ? -1 : 0 },
        { title: '게시일', dataIndex: 'publishAt', key: 'publishAt', render: (value: number) => moment.unix(value / 1000).format('YYYY-MM-DD') },
        { title: '출처', dataIndex: 'sources', key: 'sources' },
        { title: '', dataIndex: 'url', key: 'url', render: (value: string) => (<DownloadButton />)}
      ]} dataSource={[
        { title: '알기 쉬운 개인정보 처리 동의 안내서', publishAt: '1655690032000', sources: '개인정보보호위원회', url: '' }
      ]} showSorterTooltip={false} />
    </StyledTabPane>
  );
}
/** [Component] 가이드라인 페이지 */
export const GuideLine: React.FC<any> = (): JSX.Element => {
  return (
    <StyledTabPane>
      <StyledTabPaneHeader>
        <StyledTabPaneTitle>참고자료</StyledTabPaneTitle>
      </StyledTabPaneHeader>
      <Table columns={[
        { title: '목록', dataIndex: 'title', key: 'title', sorter: (a: any, b: any): number => a.title > b.title ? 1 : a.title < b.title ? -1 : 0 },
        { title: '게시일', dataIndex: 'publishAt', key: 'publishAt', render: (value: number) => moment.unix(value / 1000).format('YYYY-MM-DD') },
        { title: '출처', dataIndex: 'sources', key: 'sources' },
        { title: '', dataIndex: 'url', key: 'url', render: (value: string) => (<DownloadButton />)}
      ]} dataSource={[
        { title: '알기 쉬운 개인정보 처리 동의 안내서', publishAt: '1655690032000', sources: '개인정보보호위원회', url: '' }
      ]} showSorterTooltip={false} />
    </StyledTabPane>
  );
}

/** [Internal Component] 테이블 내 Link */
const DownloadButton: React.FC<any> = ({}): JSX.Element => {
  return (
    <StyledDownloadButton>
      <StyledDownloadIcon />
    </StyledDownloadButton>
  );
}
/** [Internal Component] 템플릿 다운로드 카드 */
const TemplateCard: React.FC<any> = ({ text, url }): JSX.Element => {
  return (
    <StyledTemplateCard download href={url}>{text}</StyledTemplateCard>
  );
}