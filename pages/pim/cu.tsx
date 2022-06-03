// Component
import Layout from '../../components/common/Layout';
import { FNITableForm, PITableForm } from '../../components/PITable';

const Page = () => {
  return (
    <Layout>
      <div style={{ paddingBottom: 74, paddingTop: 74 }}>
        <PITableForm />
        <FNITableForm />
      </div>
    </Layout>
  )
}

export default Page;