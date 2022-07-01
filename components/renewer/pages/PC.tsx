// Component
import { Tabs } from 'antd';
import { CustomTabPane } from '@/components/styled/PC';
import { CFNITableForm, CPITableForm, PFNITableForm, PPITableForm } from "@/components/PCTable";

const PCMain: React.FC<any> = (): JSX.Element => {
  return (
    <Tabs defaultActiveKey="1">
      <CustomTabPane tab="제공" key="1">
        <PPITableForm />
        <PFNITableForm />
      </CustomTabPane>
      <CustomTabPane tab="위탁" key="2">
        <CPITableForm />
        <CFNITableForm />
      </CustomTabPane>
    </Tabs>
  );
}

export default PCMain;