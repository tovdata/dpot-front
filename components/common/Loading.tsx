import React from 'react';
// Component
import { Spin } from 'antd';

/** [Interface] Properties for BasicPageLoading */
interface BasicPageLoadingProps { 
  title?: string;
  description?: string;
}

/** [Component] 기본 페이지 로딩 컴포넌트 */
export const BasicPageLoading: React.FC<BasicPageLoadingProps> = ({ description = '페이지에 필요한 데이터를 불러오고 있습니다.', title = 'Loading' }: BasicPageLoadingProps): JSX.Element => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', userSelect: 'none' }}>
      <Spin size='large' />
      <div style={{ marginTop: 24, textAlign: 'center' }}>
        <h2 style={{ color: '#1890ff', fontSize: 28, fontWeight: '600', lineHeight: '22px', marginBottom: 12 }}>{title}</h2>
        <p style={{ color: '#ACACAC', fontSize: 14, fontWeight: '400', margin: 0 }}>{description}</p>
      </div>
    </div>
  );
}