import React from 'react';
import styled from 'styled-components';
// Component
import { Divider } from 'antd';

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
interface DIRowHeaderProps extends DIRowSubjectProps {
  description?: string;
}
/** [Interface] Properties for DIRowSubject */
interface DIRowSubjectProps {
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

/** 
 * 입력 부분
 */
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Row */
export const DIRow = styled.div`
  .ant-collapse-content-box,
  .ant-collapse-header {
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
  return (
    <div style={{ marginBottom: 8, width: '100%', ...style }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#002766', fontSize: 14, fontWeight: 400, lineHeight: '22px', marginBottom: 0 }}>{title}</h2>
        <>{tools}</>
      </div>
      {description ? (
        <p style={{ color: 'rgba(0, 0, 0, 0.45)', fontSize: 12, fontWeight: 400, lineHeight: '20px', marginBottom: 0, marginTop: 8 }}>{description}</p>
      ) : (<></>)}
    </div>
  );
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Row subject */
export const DIRowSubject: React.FC<DIRowSubjectProps> = ({ style, title, tools }: DIRowSubjectProps): JSX.Element => {
  return (
    <div style={{ marginBottom: 8, width: '100%', ...style }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#000000', fontSize: 14, fontWeight: 400, lineHeight: '22px', marginBottom: 0 }}>{title}</h2>
        <>{tools}</>
      </div>
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