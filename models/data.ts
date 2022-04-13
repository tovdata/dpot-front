// Type
import { TableHeadersData } from './type';

/** Table Header */
export const personalInfoTableHeader: TableHeadersData = {
  subject: {
    description: "a",
    display: "selectA",
    name: "업무명",
    required: true
  },
  purpose: {
    description: "b",
    display: "list",
    name: "목적",
    required: true
  },
  essentialItems: {
    description: "c",
    display: "itemA",
    name: "필수 항목",
    required: true
  },
  selectionItems: {
    description: "d",
    display: "itemA",
    name: "선택 항목",
    required: false
  },
  period: {
    description: "e",
    display: "period",
    name: "보유 기간",
    required: true
  }
};
export const falseNameInfoTableHeader: TableHeadersData = {
  subject: {
    description: "a",
    display: "select",
    name: "업무명",
    required: true
  },
  basis: {
    description: "b",
    display: "select",
    name: "가명처리 처리 근거",
    required: true
  },
  purpose: {
    description: "",
    display: "select",
    name: "상세 목적",
    required: true
  },
  items: {
    description: "d",
    display: "item",
    name: "처리 항목",
    required: true
  },
  period: {
    description: "",
    display: "period",
    name: "보유 및 이용 기간",
    required: true
  }
};
// provision of personal information
export const provisionTableHeader: TableHeadersData = {
  recipient: {
    description: "a",
    display: "string",
    name: "제공받는 자",
    required: true
  },
  purpose: {
    description: "a",
    display: "list",
    name: "제공 목적",
    required: true
  },
  items: {
    description: "a",
    display: "item",
    name: "제공 항목",
    required: true
  },
  period: {
    description: "a",
    display: "period",
    name: "보유 및 이용기간",
    required: true
  },
  charger: {
    description: "a",
    display: "string",
    name: "담당자(연락처)",
    required: false
  },
  isForeign: {
    description: "a",
    display: "checkbox",
    name: "국외여부",
    required: true
  }
}
// provision of personal additional information
export const expandProvisionTableHeader: TableHeadersData = {
  country: {
    description: "a",
    display: "string",
    name: "제공받는 업체의 국가",
    required: true
  },
  address: {
    description: "a",
    display: "list",
    name: "제공받는 업체의 위치(주소)",
    required: true
  },
  method: {
    description: "a",
    display: "string",
    name: "제공 일시 및 방법",
    required: true
  }
}
export const consignmentTableHeader: TableHeadersData = {
  company: {
    description: "a",
    display: "string",
    name: "업체명",
    required: true
  },
  subject: {
    description: "a",
    display: "list",
    name: "업무명",
    required: true
  },
  content: {
    description: "a",
    display: "item",
    name: "위탁 내용",
    required: true
  },
  charger: {
    description: "a",
    display: "string",
    name: "담당자(연락처)",
    required: false
  },
  isForeign: {
    description: "a",
    display: "checkbox",
    name: "국외 여부",
    required: true
  }
}
export const personalInfoProcessingPolicyTableHeader: TableHeadersData = {
  name: {
    display: "string",
    name: "문서 이름",
    required: true
  },
  status: {
    display: "status",
    name: "상태",
    required: true
  },
  createAt: {
    display: "datetime",
    name: "생성일",
    required: true
  },
  latestAt: {
    display: "datetime",
    name: "최종 편집일",
    required: true
  }
};