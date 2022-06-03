import type { NextPage } from 'next'
import Layout from '../components/common/Layout'
// Component
import { TestSession } from '../components/TestSession'

const Home: NextPage = () => {
  return (
    <Layout>
      <div style={{ marginBottom: 74, marginTop: 74 }}>
        <TestSession />
      </div>
    </Layout>
  )
}

export default Home
