import type { NextPage } from 'next';
import Router from 'next/router';
// Component
import { Button } from 'antd';

const Page: NextPage = () => {
  return (
    <>
      <h2>This is main page</h2>
      <Button onClick={() => Router.push('/signin')}>Start</Button>
    </>
  )
}
export default Page;
