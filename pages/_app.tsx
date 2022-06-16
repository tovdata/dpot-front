import type { AppProps } from 'next/app'
import React, { useState } from 'react';
// Component
import { RecoilRoot } from 'recoil';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';
// Font
import '../public/fonts/pretendard.css';
// Style
import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Pretendard;
    box-size: border-box;
  }
  body * {
    font-family: Pretendard !important;
  }
  .ant-notification-notice-message {
    margin-bottom: 0 !important;
  }

  .ant-table-cell {
    user-select: none;
  }
  .ant-table-content > table > .ant-table-tbody > tr:last-child > td {
    border-bottom: none;
  }
  .ant-table-content > table > .ant-table-tbody > tr > td .ant-tag {
    cursor: pointer;
    margin: 0;
  }
  .ant-table > .ant-table-footer {
    background-color: #FFFFFF;
    border: 1px dashed #D9D9D9;
    padding-bottom: 8px;
    padding-top: 8px;
  }
  .ant-form-item-with-help .ant-form-item-explain {
    color: #8C8C8C;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 0;
    margin-top: 4px;
    min-height: auto;
  }
  .ant-form-item-extra {
    color: #8C8C8C;
    font-size: 12px;
    font-weight: 400;
    line-height: 20px;
    margin-bottom: 0;
    min-height: auto;
  }
`;

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
/** 공통으로 사용될 페이지 컴포넌트 */
function MyApp({ Component, pageProps }: AppProps) {
  // 사이드 메뉴 확장 상태 (Default: 확장)
  const [expand, setExpand] = useState<boolean>(true);
  /** [Event handler] 메뉴 확장/축소 이벤트 */
  const onExpand = (): void => setExpand(!expand);

  // 컴포넌트 반환
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <RecoilRoot>
          <GlobalStyle />
          <Component {...pageProps} expand={expand} onExpand={onExpand} />
        </RecoilRoot>
      </Hydrate>
    </QueryClientProvider>
  );
}

export default MyApp
