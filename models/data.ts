// Type
import { TableHeadersData } from './type';

/** Table Header */
export const personalInfoTableHeader: TableHeadersData = {
  subject: {
    description: "a",
    display: "string",
    name: "업무명"
  },
  purpose: {
    description: "b",
    display: "list",
    name: "목적"
  },
  essentialItems: {
    description: "c",
    display: "item",
    name: "필수 항목"
  },
  selectionItems: {
    description: "d",
    display: "item",
    name: "선택 항목"
  },
  period: {
    description: "e",
    display: "period",
    name: "보유 기간"
  }
};
export const falseNameInfoTableHeader: TableHeadersData = {
  subject: {
    description: "a",
    display: "string",
    name: "업무명"
  },
  basis: {
    description: "b",
    display: "string",
    name: "가명처리 처리 근거"
  },
  purpose: {
    description: "",
    display: "string",
    name: "상세 목적"
  },
  items: {
    description: "d",
    display: "item",
    name: "처리 항목"
  },
  period: {
    description: "",
    display: "period",
    name: "보유 및 이용 기간"
  }
};
// provision of personal information
export const provisionTableHeader: TableHeadersData = {
  recipient: {
    description: "a",
    display: "string",
    name: "제공받는 자"
  },
  purpose: {
    description: "a",
    display: "list",
    name: "제공 목적"
  },
  items: {
    description: "a",
    display: "item",
    name: "제공 항목"
  },
  period: {
    description: "a",
    display: "period",
    name: "보유 및 이용기간"
  },
  charger: {
    description: "a",
    display: "string",
    name: "담당자(연락처)"
  },
  isForeign: {
    description: "a",
    display: "checkbox",
    name: "국외여부"
  }
}
// provision of personal additional information
export const expandProvisionTableHeader: TableHeadersData = {
  country: {
    description: "a",
    display: "string",
    name: "제공받는 업체의 국가"
  },
  address: {
    description: "a",
    display: "list",
    name: "제공받는 업체의 위치(주소)"
  },
  method: {
    description: "a",
    display: "string",
    name: "제공 일시 및 방법"
  }
}
export const consignmentTableHeader: TableHeadersData = {
  company: {
    description: "a",
    display: "string",
    name: "업체명"
  },
  subject: {
    description: "a",
    display: "list",
    name: "업무명"
  },
  content: {
    description: "a",
    display: "item",
    name: "위탁 내용"
  },
  charger: {
    description: "a",
    display: "string",
    name: "담당자(연락처)"
  },
  isForeign: {
    description: "a",
    display: "checkbox",
    name: "국외 여부"
  }
}