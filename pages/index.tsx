import type { NextPage } from 'next';
import dynamic from 'next/dynamic';
// Component
const Main = dynamic(() => import('@/components/renewer/pages/Main'), { loading: () => (<></>), ssr: false });

const Page: NextPage = () => {
  return (
    <>
      <Main />
    </>
  )
}

export default Page;
