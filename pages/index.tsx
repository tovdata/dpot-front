import type { NextPage } from 'next'
// Component
import { TestSession } from '../components/TestSession'

const Home: NextPage = () => {
  return (
    <div style={{ marginBottom: 74, marginTop: 74 }}>
      <TestSession />
    </div>
  )
}

export default Home
