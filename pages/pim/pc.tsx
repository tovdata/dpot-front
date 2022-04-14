import { Tabs } from "antd";
import styled from "styled-components";
import { ConsignmentTable, FalseNameProvisionTable, PersonalProvisionTable } from "../../components/PCTable";

const { TabPane } = Tabs;

const CustomTabPane = styled(TabPane)`
  margin-top: 2rem;
`;
const Page = () => {
  return (
    <>
      <Tabs defaultActiveKey="1">
        <CustomTabPane tab="제공" key="1">
          <PersonalProvisionTable />
          <FalseNameProvisionTable />
        </CustomTabPane>
        <CustomTabPane tab="위탁" key="2">
          <ConsignmentTable />
        </CustomTabPane>
      </Tabs>
    </>
  )
}

export default Page;