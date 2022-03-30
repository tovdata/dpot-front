import { Tabs } from "antd";
import styled from "styled-components";
import { ConsignmentTable, ProvisionTable } from "../../components/PCTable";

const { TabPane } = Tabs;

const CustomTabPane = styled(TabPane)`
  margin-top: 2rem;
`;
const Page = () => {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <CustomTabPane tab="개인정보 제공" key="1">
          <ProvisionTable />
        </CustomTabPane>
        <CustomTabPane tab="개인정보 위탁" key="2">
          <ConsignmentTable />
        </CustomTabPane>
      </Tabs>
    </>
  )
}

export default Page;