import type { AppProps } from 'next/app'
// Component
import Layout from '../components/common/Layout';
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
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp
