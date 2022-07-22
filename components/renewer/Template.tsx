// Component
import { Col, Divider, Row, Table, Tag } from 'antd';
import { StyledDownloadButton, StyledDownloadIcon, StyledSection, StyledSectionHeader, StyledTabPane, StyledTabPaneHeader, StyledTabPaneTitle, StyledTemplateCard } from '@/components/styled/Template';
// Module
import moment from 'moment';

/** [Component] 기본 템플릿 섹션 */
export const DefaultTemplates: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSection>
      <StyledSectionHeader>
        <h2 className='title'>템플릿 다운로드</h2>
      </StyledSectionHeader>
      <Row gutter={16}>
        <Col span={6}>
          <TemplateCard text='개인정보 내부 관리계획' url='https://s3.ap-northeast-2.amazonaws.com/plip.kr/doc/static/templates/(%E1%84%90%E1%85%A9%E1%84%87%E1%85%B3%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5)_%E1%84%90%E1%85%A6%E1%86%B7%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA1_%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9+%E1%84%82%E1%85%A2%E1%84%87%E1%85%AE+%E1%84%80%E1%85%AA%E1%86%AB%E1%84%85%E1%85%B5%E1%84%80%E1%85%A8%E1%84%92%E1%85%AC%E1%86%A8+%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5.docx' />
        </Col>
        <Col span={6}>
          <TemplateCard text='개인정보 처리 위탁 계약서' url='https://s3.ap-northeast-2.amazonaws.com/plip.kr/doc/static/templates/(%E1%84%90%E1%85%A9%E1%84%87%E1%85%B3%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5)_%E1%84%90%E1%85%A6%E1%86%B7%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA2_%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%E1%84%8B%E1%85%B1%E1%84%90%E1%85%A1%E1%86%A8+%E1%84%80%E1%85%A8%E1%84%8B%E1%85%A3%E1%86%A8%E1%84%89%E1%85%A5(%E1%84%8B%E1%85%A1%E1%86%AB).docx' />
        </Col>
        <Col span={6}>
          <TemplateCard text='개인정보 보호교육 계획(안)' url='https://s3.ap-northeast-2.amazonaws.com/plip.kr/doc/static/templates/(%E1%84%90%E1%85%A9%E1%84%87%E1%85%B3%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5)_%E1%84%90%E1%85%A6%E1%86%B7%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA3_%E1%84%80%E1%85%A2%E1%84%8B%E1%85%B5%E1%86%AB%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%87%E1%85%A9%E1%84%92%E1%85%A9+%E1%84%80%E1%85%AD%E1%84%8B%E1%85%B2%E1%86%A8%E1%84%80%E1%85%A8%E1%84%92%E1%85%AC%E1%86%A8(%E1%84%8B%E1%85%A1%E1%86%AB).docx' />
        </Col>
        <Col span={6}>
          <TemplateCard text={<>영상정보처리기기(CCTV)<br/>운영관리 방침</>} url='https://s3.ap-northeast-2.amazonaws.com/plip.kr/doc/static/templates/(%E1%84%90%E1%85%A9%E1%84%87%E1%85%B3%E1%84%83%E1%85%A6%E1%84%8B%E1%85%B5%E1%84%90%E1%85%A5)_%E1%84%90%E1%85%A6%E1%86%B7%E1%84%91%E1%85%B3%E1%86%AF%E1%84%85%E1%85%B5%E1%86%BA4_%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%89%E1%85%A1%E1%86%BC%E1%84%8C%E1%85%A5%E1%86%BC%E1%84%87%E1%85%A9%E1%84%8E%E1%85%A5%E1%84%85%E1%85%B5%E1%84%80%E1%85%B5%E1%84%80%E1%85%B5+%E1%84%8B%E1%85%AE%E1%86%AB%E1%84%8B%E1%85%A7%E1%86%BC%E1%84%8C%E1%85%B5%E1%84%8E%E1%85%B5%E1%86%B7+%E1%84%8C%E1%85%A1%E1%86%A8%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%A8%E1%84%89%E1%85%B5.docx' />
        </Col>
      </Row>
    </StyledSection>
  );
}
/** [Component] 참고자료 섹션 */
export const References: React.FC<any> = (): JSX.Element => {
  return (
    <StyledSection>
      <StyledSectionHeader>
        <h2 className='title'>참고자료</h2>
      </StyledSectionHeader>
      <Table columns={[
        { title: '구분', dataIndex: 'category', key: 'category', render: (value: string): JSX.Element => value === 'template' ? <Tag color='geekblue'>템플릿</Tag> : <Tag color='geekblue'>가이드라인</Tag> },
        { title: '목록', dataIndex: 'title', key: 'title', sorter: (a: any, b: any): number => a.title > b.title ? 1 : a.title < b.title ? -1 : 0 },
        { title: '게시일', dataIndex: 'publishAt', key: 'publishAt', render: (value: number) => moment.unix(value / 1000).format('YYYY-MM-DD') },
        { title: '출처', dataIndex: 'sources', key: 'sources' },
        { title: '', dataIndex: 'url', key: 'url', render: (value: string) => (<DownloadButton />)}
      ]} dataSource={[
        { category: 'template', title: '알기 쉬운 개인정보 처리 동의 안내서', publishAt: '1655690032000', sources: '개인정보보호위원회', url: '' }
      ]} showSorterTooltip={false} />
    </StyledSection>
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