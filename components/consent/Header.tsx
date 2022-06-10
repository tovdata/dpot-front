import { TableHeadersData } from "@/models/type"

// 동의서 Header
export const consentEditHeader: TableHeadersData = {
  subject: {
    display: 'string',
    name: '구분(업무명)',
    required: true,
    editable: false,
    width: '14%'
  },
  purpose: {
    display: 'item',
    name: '처리 목적',
    required: true,
    editable: true,
    width: '23%'
  },
  essentialItems: {
    display: 'item',
    name: '필수항목',
    required: true,
    editable: true,
    width: '18%'
  },
  selectionItems: {
    display: 'item',
    name: '선택항목',
    required: false,
    editable: true,
    width: '18%'
  },
  period: {
    display: 'list',
    name: '보유 및 이용 기간',
    required: true,
    editable: false,
    width: '23%'
  }
}

// 동의서 개인정보 수집 이용내역 Default Header
export const historyHeader: TableHeadersData = {
  subject: {
    display: 'string',
    name: '구분(업무명)',
    required: true,
    width: '14%'
  },
  purpose: {
    display: 'list',
    name: '처리 목적',
    required: true,
    width: '23%'
  },
  items: {
    display: 'collection',
    name: '수집 항목',
    required: false,
    width: '18%'
  },
  period: {
    display: 'listB',
    name: '보유 및 이용 기간',
    required: true,
    editable: false,
    width: '23%'
  }
}
// 동의서 법령에 근거해 동의없이 수집 및 이용되는 데이터 Header
export const consentEPIHeader: TableHeadersData = {
  purpose: {
    display: 'list',
    name: '개인정보 수집·이용 목적',
    required: true,
    width: '23%'
  },
  items: {
    display: 'item',
    name: '개인정보 항목',
    required: true,
    width: '20%'
  },
  statute: {
    display: 'list',
    name: '수집 근거 법령',
    required: false,
    width: '20%'
  }
}
// 동의서에서 사용하는 제공 테이블 헤더
export const consentPPIHeader: TableHeadersData = {
  recipient: {
    display: 'stringB',
    name: '제공받는 자',
    required: true,
    width: '18%'
  },
  purpose: {
    display: 'listB',
    name: '제공받는자의 목적',
    required: true,
    width: '24%'
  },
  items: {
    display: 'item',
    name: '제공 항목',
    required: true,
    width: '20%'
  },
  period: {
    display: 'listB',
    name: '보유 및 이용기간',
    required: true,
    width: '25%'
  }
}
// 동의서에서 사용하는 수정용 제공 테이블 헤더
export const consentPPIEditHeader: TableHeadersData = {
  isSelected: {
    name: '',
    display: 'checkbox',
    required: false,
    width: '9%'
  },
  recipient: {
    display: 'string',
    name: '제공받는 자',
    required: true,
    width: '18%'
  },
  purpose: {
    display: 'list',
    name: '제공받는자의 목적',
    required: true,
    width: '24%'
  },
  items: {
    display: 'item',
    name: '제공 항목',
    required: true,
    width: '20%'
  },
  period: {
    display: 'list',
    name: '보유 및 이용기간',
    required: true,
    width: '25%'
  }
}