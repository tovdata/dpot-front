import { consignmentTableHeader, expandProvisionTableHeader, provisionTableHeader } from "../models/data";
import { consignmentPersonalInfo, provisionPersonalInfo } from "../models/temporary";
import { EditableExpandTable, EditableTable } from "./common/Table";

// 개인정보 제공 테이블
export function ProvisionTable() {
  // return (<EditableTableForm dataSource={provisionPersonalInfo} headers={provisionTableHeader} title='개인정보 제공' expandKey="isForeign" innerHeaders={expandProvisionTableHeader} />);
  return (<EditableExpandTable dataSource={provisionPersonalInfo} headers={provisionTableHeader} title='개인정보 제공' expandKey="isForeign" innerHeaders={expandProvisionTableHeader} />);

};

export function ConsignmentTable() {
  return (<EditableTable dataSource={consignmentPersonalInfo} headers={consignmentTableHeader} title='개인정보 위탁' />)
}