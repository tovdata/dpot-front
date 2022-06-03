import type { AppProps } from 'next/app'
// Component
import Layout from '../components/common/Layout';
// Font
import '../public/fonts/pretendard.css';
// Style
import { createGlobalStyle } from 'styled-components';
import 'antd/dist/antd.css';
import '../styles/globals.css'
import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

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
`;

// const queryClient = new QueryClient();
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <GlobalStyle />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
