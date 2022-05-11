import type { AppProps } from 'next/app'
// Component
import Layout from '../components/common/Layout';
// Font
import '../public/fonts/pretendard.css';
// Style
import 'antd/dist/antd.css';
import '../styles/globals.css'
import React from 'react';
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query';

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
        <div style={{ fontFamily: 'Pretendard' }}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </div>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
