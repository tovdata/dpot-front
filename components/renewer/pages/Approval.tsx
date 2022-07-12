import dynamic from 'next/dynamic';
// Component
import { Tabs } from 'antd';
const ApprovalResultTable = dynamic(() => import('@/components/renewer/Approval').then((mod: any): any => mod.ApprovalResultTable), { loading: () => (<></>) });
const ApprovalRequestTable = dynamic(() => import('@/components/renewer/Approval').then((mod: any): any => mod.ApprovalRequestTable), { loading: () => (<></>), ssr: false });

const ApprovalMain: React.FC<any> = (): JSX.Element => {
  return (
    <Tabs defaultActiveKey='request'>
      <Tabs.TabPane key='request' tab='가입승인 요청'>
        <ApprovalRequestTable />
      </Tabs.TabPane>
      <Tabs.TabPane key='result' tab='가입요청 결과'>
        <ApprovalResultTable />
      </Tabs.TabPane>
    </Tabs>
  );
}

export default ApprovalMain;