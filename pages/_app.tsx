import type { AppProps } from 'next/app'
// Component
import Layout from '../components/common/Layout';
// Style
import 'antd/dist/antd.css';
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
