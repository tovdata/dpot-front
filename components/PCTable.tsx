import { consignmentTableHeader, expandConsignmentTableHeader, expandProvisionTableHeader, provisionTableHeader } from "../models/data";
import { consignmentPersonalInfo, provisionPersonalInfo } from "../models/temporary";
import { EditableExpandTable, EditableTable } from "./common/TestTable";

// 개인정보 제공 테이블
export function ProvisionTable() {
  const historyColumnInfos = {
    items: ['이름', '아이디', '비밀번호', '이메일주소', '실주소', 'aa', 'bb'],
  }
  return (<EditableExpandTable dataSource={provisionPersonalInfo} headers={provisionTableHeader} title='개인정보 제공' expandKey="isForeign"
    innerHeaders={expandProvisionTableHeader} historyColumnInfos={historyColumnInfos} />);

};

export function ConsignmentTable() {
  return (<EditableExpandTable dataSource={consignmentPersonalInfo} headers={consignmentTableHeader} title='개인정보 위탁' expandKey="isForeign"
    innerHeaders={expandConsignmentTableHeader} />)
}