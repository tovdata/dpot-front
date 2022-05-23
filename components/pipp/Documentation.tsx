import React from 'react';
import styled, { css } from 'styled-components';
// Component
import { Col, Divider, Modal, Row, Tooltip } from 'antd';
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
interface ViewProps {
  preview?: boolean;
  self?: any;
  style?: React.CSSProperties;
}
/** [Interface] Properties for DDRow or DIRow */
interface RowProps {
  children?: JSX.Element|JSX.Element[];
  self?: any;
  style?: React.CSSProperties;
}
/** [Interface] Properties for DIInputGroup */
interface DIInputGroupProps {
  children?: JSX.Element|JSX.Element[];
  label?: string;
  style?: React.CSSProperties;
}
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
  required?: boolean;
  style?: React.CSSProperties,
  title: string,
  tools?: JSX.Element|JSX.Element[];
}
/** [Interface] Properties for DDRowContent */
interface DDRowContentProps extends ViewProps {
  items?: string[];
  links?: string[];
}
/** [Interface] Properties for DDRowHeader */
interface DDRowHeaderProps extends ViewProps {
  title: string;
}
/** [Interface] Properties for DDRowItemList */
interface DDRowItemListProps extends ViewProps {
  items?: string[];
  level?: number;
  links?: string[];
}
/** [Interface] Properties for DRLabelingHeader */
interface DRLabelingHeaderProps extends ViewProps {
  description?: string;
  title: string;
}
/** [Interface] Properties for DRLabelingItem */
interface DRLabelingItemProps extends ViewProps {
  tooltip?: string;
  type: string;
}
/** [Interface] Properties for DTCForm */
interface DTCFormProps extends ViewProps {
  children?: JSX.Element|JSX.Element[];
}
/** [Interface] Properties for DTCItem */
interface DTCItemProps extends ViewProps {
  content?: string;
}

/** 
 * 입력 부분
 */
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Input group */
export const DIInputGroup: React.FC<DIInputGroupProps> = ({ children, label, style }: DIInputGroupProps): JSX.Element => {
  return (
    <div style={{ position: 'relative', ...style }}>
      {label ? (
        <label style={{ color: '#00000073', display: 'block', fontSize: 12, fontWeight: '500', lineHeight: '22px', marginBottom: 2 }}>{label}</label>
      ) : (<></>)}
      {children}
    </div>
  );
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Row */
const StyledDIRow = styled.div`
  .ant-collapse-content-box {
    padding: 8px 0 0 0 !important;;
  }
  .ant-collapse-header {
    cursor: default !important;
    padding: 0 !important;
  }
  .ant-collapse-header > div {
    margin-bottom: 0;
  }
`;
export const DIRow: React.FC<RowProps> = ({ children, self, style }: RowProps): JSX.Element => {
  return (
    <StyledDIRow ref={self} style={style}>
      {children}
    </StyledDIRow>
  )
}

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
export const DIRowHeader: React.FC<DIRowHeaderProps> = ({ description, required, style, title, tools }: DIRowHeaderProps): JSX.Element => {
  // Description style
  const dStyle: React.CSSProperties = { color: 'rgba(0, 0, 0, 0.45)', fontSize: 12, fontWeight: 400, lineHeight: '20px', marginBottom: 0 };
  // Return an element
  return (
    <div style={{ marginBottom: 8, width: '100%', ...style }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#002766', fontSize: 15, fontWeight: 600, lineHeight: '22px', marginBottom: 0 }}>
          {title}
          {required ? (
            <span style={{ color: '#FF4D4F', marginLeft: 6 }}>*</span>
          ) : (<></>)}
        </h2>
        <>{tools}</>
      </div>
      {description ? description.split('\\n').map((elem: string, index: number): JSX.Element => index === 0 ? (
        <p key={index} style={{ ...dStyle, marginTop: 8 }}>{elem}</p>
      ) : (
        <p key={index} style={{ ...dStyle }}>{elem}</p>
      )) : (<></>)}
    </div>
  );
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 입력 폼 Row subject */
export const DIRowSubject: React.FC<DIRowHeaderProps> = ({ description, required, style, title, tools }: DIRowHeaderProps): JSX.Element => {
  // Description style
  const dStyle: React.CSSProperties = { color: 'rgba(0, 0, 0, 0.45)', fontSize: 12, fontWeight: 400, lineHeight: '20px', marginBottom: 0 };
  // Return an element
  return (
    <div style={{ marginBottom: 8, width: '100%', ...style }}>
      <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ color: '#000000', fontSize: 14, fontWeight: 400, lineHeight: '22px', marginBottom: 0 }}>
          {title}
          {required ? (
            <span style={{ color: '#FF4D4F', marginLeft: 6 }}>*</span>
          ) : (<></>)}
        </h2>
        <>{tools}</>
      </div>
      {description ? description.split('\\n').map((elem: string, index: number): JSX.Element => index === 0 ? (
        <p key={index} style={{ ...dStyle, marginTop: 8 }}>{elem}</p>
      ) : (
        <p key={index} style={{ ...dStyle }}>{elem}</p>
      )) : (<></>)}
    </div>
  );
}

/** 
 * 미리보기 부분
 */
/** [Component] 개인정보 처리방침 문서 생성을 위한 미리보기 폼 Row */
export const DDRow: React.FC<RowProps> = ({ children, self }: RowProps): JSX.Element => {
  return (
    <div ref={self} style={{ fontSize: 13, fontWeight: '400', lineHeight: '22px', marginBottom: 40 }}>
      {children}
    </div>
  );
}

/** [Component] 개인정보 처리방침 문서 생성을 위한 미리보기 폼 Row content */
export const DDRowContent: React.FC<DDRowContentProps> = ({ items, links, preview, style }: DDRowContentProps): JSX.Element => {
  return items ? (
    <div style={{ marginBottom: 8, ...style }}>
      {items.map((item: string|JSX.Element, index: number): JSX.Element => (<p key={index} style={{ fontSize: 14, margin: 0 }}>
        {item}
        {links && links[index] ? (
          <a target='_blank' href={links[index]} style={{ marginLeft: 6, textDecoration: 'underline' }} rel='noreferrer'>보기</a>
        ) : (<></>)}
      </p>))}
    </div>
  ) : (<></>);
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 미리보기 폼 Row header */
export const DDRowHeader: React.FC<DDRowHeaderProps> = ({ preview, self, title }: DDRowHeaderProps): JSX.Element => {
  return (
    <h2 ref={self} style={{ color: '#000000', fontSize: preview ? 14 : 16, fontWeight: '600', lineHeight: '22px', marginBottom: 8 }}>
      ◾️ {title}
    </h2>
  );
}
/** [Component] 개인정보 처리방침 문서 생성을 위한 미리보기 폼 Row item list */
export const DDRowItemList: React.FC<DDRowItemListProps> = ({ items, level, links, preview, style }: DDRowItemListProps): JSX.Element => {
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
      {items.map((item: string, index: number): JSX.Element => (
        <li key={index} style={{ fontSize: 14 }}>
          {item}
          {links && links[index] ? (
            <a target='_blank' href={links[index]} style={{ marginLeft: 6, textDecoration: 'underline' }} rel='noreferrer'>보기</a>
          ) : (<></>)}
        </li>
      ))}
    </ul>
  ) : (<></>);
}
export const DDRowTableForm = styled.div`
  margin-bottom: 8px;
  table .ant-table-thead > tr > th {
    font-size: 13px;
    font-weight: 400;
    line-height: 22px;
    text-align: center;
  }
  table .ant-table-tbody > tr > td {
    font-size: 13px;
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
export const DRModal = styled(Modal)`
  .ant-modal-body {
    padding: 7rem;
  }
`;
/** [Component] 개인정보 처리방침 최종 검토 폼 Labeling header */
export const DRLabelingHeader: React.FC<DRLabelingHeaderProps> = ({ description, preview, title }: DRLabelingHeaderProps): JSX.Element => {
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