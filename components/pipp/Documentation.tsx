import React from 'react';
import styled from 'styled-components';
// Component
import { Col, Divider, Row, Tooltip } from 'antd';
// Icon
import IconPIItem from '../../public/images/piItem.svg';
import IconPIPurpose from '../../public/images/piPurpose.svg';
import IconPIPeriod from '../../public/images/period.svg';
import IconProvision from '../../public/images/provision.svg';
import IconConsignment from '../../public/images/consignment.svg';
import IconComplaint from '../../public/images/complaint.svg';

/**
 * 컴포넌트들의 Props 형식
 */
/** [Interface] Properties for DIRowContent */
interface DIRowContentProps {
  children?: JSX.Element|JSX.Element[];
}
/** [Interface] Properties for DIRowDivider */
interface DIRowDividerProps {
  marginH?: number;
}
/** [Interface] Properties for DIRowHeader */
interface DIRowHeaderProps {
  description?: string;
  style?: React.CSSProperties,
  title: string,
  tools?: JSX.Element|JSX.Element[];
}
/** [Interface] Properties for DDRowContent */
interface DDRowContentProps {
  items?: string[];
  style?: React.CSSProperties;
}
/** [Interface] Properties for DDRowHeader */
interface DDRowHeaderProps {
  title: string;
}
/** [Interface] Properties for DDRowItemList */
interface DDRowItemListProps {
  items?: string[];
  level?: number;
  style?: React.CSSProperties;
}
/** [Interface] Properties for DRLabelingHeader */
interface DRLabelingHeaderProps {
  description?: string;
  title: string;
}
/** [Interface] Properties for DRLabelingItem */
interface DRLabelingItemProps {
  tooltip?: string;
  type: string;
}
/** [Interface] Properties for DTCForm */
interface DTCFormProps {
  children?: JSX.Element|JSX.Element[];
}
/** [Interface] Properties for DTCItem */
interface DTCItemProps {
  content?: string;
}

/** 
 * 입력 부분
 */
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Row */
export const DIRow = styled.div`
  .ant-collapse-content-box,
  .ant-collapse-header {
    cursor: default !important;
    padding: 0 !important;
  }
  .ant-collapse-header > div {
    margin-bottom: 0;
  }
`;
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Row content */
export const DIRowContent: React.FC<DIRowContentProps> = ({ children }: DIRowContentProps): JSX.Element => {
  return (
    <div style={{ position: 'relative' }}>{children}</div>
  );
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Row divider */
export const DIRowDivider: React.FC<DIRowDividerProps> = ({ marginH }: DIRowDividerProps): JSX.Element => {
  return (
    <Divider dashed style={{ marginBottom: marginH ? marginH : 30, marginTop: marginH ? marginH : 30 }} />
  );
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Row header */
export const DIRowHeader: React.FC<DIRowHeaderProps> = ({ description, style, title, tools }: DIRowHeaderProps): JSX.Element => {
  // Description style
  const dStyle: React.CSSProperties = { color: 'rgba(0, 0, 0, 0.45)', fontSize: 12, fontWeight: 400, lineHeight: '20px', marginBottom: 0 };
  // Return an element
  return (
    <div style={{ marginBottom: 8, width: '100%', ...style }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#002766', fontSize: 14, fontWeight: 400, lineHeight: '22px', marginBottom: 0 }}>{title}</h2>
        <>{tools}</>
      </div>
      {description ? description.split('\\n').map((elem: string, index: number): JSX.Element => index === 0 ? (
        <p style={{ ...dStyle, marginTop: 8 }}>{elem}</p>
      ) : (
        <p style={{ ...dStyle }}>{elem}</p>
      )) : (<></>)}
    </div>
  );
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Row subject */
export const DIRowSubject: React.FC<DIRowHeaderProps> = ({ description, style, title, tools }: DIRowHeaderProps): JSX.Element => {
  // Description style
  const dStyle: React.CSSProperties = { color: 'rgba(0, 0, 0, 0.45)', fontSize: 12, fontWeight: 400, lineHeight: '20px', marginBottom: 0 };
  // Return an element
  return (
    <div style={{ marginBottom: 8, width: '100%', ...style }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#000000', fontSize: 14, fontWeight: 400, lineHeight: '22px', marginBottom: 0 }}>{title}</h2>
        <>{tools}</>
      </div>
      {description ? description.split('\\n').map((elem: string, index: number): JSX.Element => index === 0 ? (
        <p style={{ ...dStyle, marginTop: 8 }}>{elem}</p>
      ) : (
        <p style={{ ...dStyle }}>{elem}</p>
      )) : (<></>)}
    </div>
  );
}

/** 
 * 미리보기 부분
 */
/** [Component] 개인정보 처리방침 문서 생성을 위한 미리보기 폼 Row */
export const DDRow = styled.div`
  font-size: 13px;
  font-weight: 400;
  line-height: 22px;
  margin-bottom: 40px;
`;
/** [Component] 개인정보 처리방침 문서 생성을 위한 미리보기 폼 Row content */
export const DDRowContent: React.FC<DDRowContentProps> = ({ items, style }: DDRowContentProps): JSX.Element => {
  return items ? (
    <div style={{ marginBottom: 8, ...style }}>
      {items.map((item: string, index: number): JSX.Element => (<p key={index} style={{ margin: 0 }}>{item}</p>))}
    </div>
  ) : (<></>);
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 미리보기 폼 Row header */
export const DDRowHeader: React.FC<DDRowHeaderProps> = ({ title }: DDRowHeaderProps): JSX.Element => {
  return (
    <h2 style={{ color: '#000000', fontSize: 14, fontWeight: '600', lineHeight: '22px', marginBottom: 8 }}>
      ◾️ {title}
    </h2>
  );
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 미리보기 폼 Row item list */
export const DDRowItemList: React.FC<DDRowItemListProps> = ({ items, level, style }: DDRowItemListProps): JSX.Element => {
  // 목록 레벨에 따른 스타일 정의
  let styleByType: React.CSSProperties;
  switch(level) {
    case 1:
      styleByType = { marginBottom: 0, paddingLeft: 19 };
      break;
    default:
      styleByType = { marginBottom: 0, paddingLeft: 19 };
      break;
  }
  // Return an element
  return items ? (
    <ul style={{ ...styleByType, ...style }}>
      {items.map((item: string, index: number): JSX.Element => (<li key={index}>{item}</li>))}
    </ul>
  ) : (<></>);
}
export const DDRowTableForm = styled.div`
  margin-bottom: 8px;
  table .ant-table-thead > tr > th {
    font-size: 12px;
    font-weight: 400;
    line-height: 22px;
    text-align: center;
  }
  table .ant-table-tbody > tr > td {
    font-size: 11px;
    font-weight: 400;
    line-heignt: 20px;
  }
  table .ant-table-tbody > tr > td > ul {
    margin: 0;
    padding: 0;
  }
`;

/** 
 * 검토 부분
 */
/** [Component] 개인정보 처리방침 최종 검토 폼 Labeling header */
export const DRLabelingHeader: React.FC<DRLabelingHeaderProps> = ({ description, title }: DRLabelingHeaderProps): JSX.Element => {
  return (
    <div style={{ marginBottom: 16, textAlign: 'center' }}>
      <h3 style={{ color: '#0044CC', fontSize: 16, fontWeight: '700', lineHeight: '24px', marginBottom: description ? 6 : 0 }}>{title}</h3>
      {description ? (
        <p style={{ color: '#00000073', fontSize: 13, fontWeight: '400', lineHeight: '22px', marginBottom: 0 }}>{description}</p>
      ) : (<></>)}
    </div>
  );
}
export const DRLabelingContent = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 56px;
`;
/** [Component] 개인정보 처리방침 최종 검토 폼 Labeling item */
export const DRLabelingItem: React.FC<DRLabelingItemProps> = ({ tooltip, type }: DRLabelingItemProps): JSX.Element => {
  const size: number = 96;
  // 유형에 따라 아이콘 정의
  const labeling: any = { icon: undefined, label: '' };
  switch (type) {
    case 'item':
      labeling.icon = (<IconPIItem height='100%' width='100%' />);
      labeling.label = '일반 개인정보 수집';
      break;
    case 'purpose':
      labeling.icon = (<IconPIPurpose height='100%' width='100%' />);
      labeling.label = '개인정보 처리목적';
      break;
    case 'period':
      labeling.icon = (<IconPIPeriod height='100%' width='100%' />);
      labeling.label = '개인정보 보유기간';
      break;
    case 'provision':
      labeling.icon = (<IconProvision height='100%' width='100%' />);
      labeling.label = '개인정보의 제공';
      break;
    case 'consignment':
      labeling.icon = (<IconConsignment height='100%' width='100%' />);
      labeling.label = '처리 위탁';
      break;
    case 'complaint':
      labeling.icon = (<IconComplaint height='100%' width='100%' />);
      labeling.label = '고충처리부서';
      break;
    default:
      break;
  }
  // Return an element
  return (
    <span style={{ cursor: 'pointer', marginLeft: 20, marginRight: 20, position: 'relative', userSelect: 'none' }}>
      {tooltip ? (
        <>
          {labeling.icon ? (
          <Tooltip placement='bottom' title={tooltip ? tooltip : ''}>
            <span style={{ alignItems: 'center', display: 'flex', height: size, justifyContent: 'center', width: size }}>
              {labeling.icon}
            </span>
          </Tooltip>
        ) : (<></>)}
        </>
      ) : (
        <>
          {labeling.icon ? (
          <span style={{ alignItems: 'center', display: 'flex', height: size, justifyContent: 'center', width: size }}>
            {labeling.icon}
          </span>
        ) : (<></>)}
        </>
      )}
      {labeling.label ? (
        <p style={{ color: '#000000', fontSize: 13, fontWeight: '400', lineHeight: '22px', marginBottom: 0, textAlign: 'center' }}>{labeling.label}</p>
      ) : (<></>)}
    </span>
  );
}
/** [Component] 개인정보 처리방침 최종 검토 문서에 대한 목차 */
export const DTCForm: React.FC<DTCFormProps> = ({ children }: DTCFormProps): JSX.Element => {
  return (
    <div style={{ border: '1px solid #D9D9D9', marginBottom: 56, padding: '32px 16px' }}>
      <h4 style={{ color: '#262626', fontSize: 16, fontWeight: '600', lineHeight: '24px', marginBottom: 24, textAlign: 'center' }}>목차</h4>
      <Row gutter={[8, 8]}>
        {children}
      </Row>
    </div>
  );
}
/** [Component] 개인정보 처리방침 최종 검토 문서에 대한 목차 Item */
export const DTCItem: React.FC<DTCItemProps> = ({ content }: DTCItemProps): JSX.Element => {
  return (
    <>
      {content ? (
        <Col span={12}>
          <p style={{ fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 0, paddingLeft: 32, paddingRight: 32 }}>◾️ {content}</p>
        </Col>
      ) : (<></>)}
    </>
  );
}