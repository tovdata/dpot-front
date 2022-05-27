import { Tabs } from "antd";
import styled from "styled-components";
import { CFNITableForm, CPITableForm, PFNITableForm, PPITableForm } from "../../components/PCTable";

const { TabPane } = Tabs;

const CustomTabPane = styled(TabPane)`
  margin-top: 2rem;
`;
const Page = () => {
  return (
    <div style={{ paddingBottom: 74, paddingTop: 36 }}>
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
    </div>
  )
}

export default Page;