import { Input } from 'antd'
import type { NextPage } from 'next'
import { TOVInputGroup } from '../components/common/Input'
import { TOVPageLayout } from '../components/common/Layout'
// Component
import { TestSession } from '../components/TestSession'

const Home: NextPage = () => {
  return (
    <TOVPageLayout selected='/'>
      <div style={{ marginBottom: 74, marginTop: 74 }}>
        <TestSession />
        <TOVInputGroup label='테스트' required tooltip='asdfas'>
          <Input />
        </TOVInputGroup>
      </div>
    </TOVPageLayout>
  )
}

export default Home
