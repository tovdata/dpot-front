import type { NextPage } from 'next'
// Component
import { TOVPageLayout } from '@/components/common/Layout'
import { Dashboard } from '@/components/Dashboard'

const Home: NextPage = ({ expand, onExpand }: any) => {
  return (
    <TOVPageLayout expand={expand} onExpand={onExpand} selectedKey='/'>
      <Dashboard />
    </TOVPageLayout>
  )
}

export default Home
