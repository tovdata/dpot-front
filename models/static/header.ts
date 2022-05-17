import { TableHeadersData } from '../type';

/** 개인정보 수집 및 이용 */
export const piTableHeader: TableHeadersData = {
  subject: {
    description: '업무명 설명',
    display: 'selectA',
    name: '구분(업무명)',
    required: true,
    width: '200px'
  },
  purpose: {
    description: '처리 목적 설명',
    display: 'list',
    name: '처리 목적',
    required: true,
    width: '350px'
  },
  essentialItems: {
    description: '필수항목 설명',
    display: 'itemA',
    name: '필수항목',
    required: true,
    width: '300px'
  },
  selectionItems: {
    description: '선택항목 설명',
    display: 'itemA',
    name: '선택항목',
    required: false,
    width: '300px'
  },
  period: {
    description: '보유 및 이용 기간 설명',
    display: 'period',
    name: '보유 및 이용 기간',
    required: true,
    width: '350px'
  }
};
/** 가명정보 수집 및 이용 */
export const fniTableHeader: TableHeadersData = {
  subject: {
    description: '업무명 설명',
    display: 'select',
    name: '구분(업무명)',
    required: true,
    width: '200px'
  },
  basis: {
    description: '처리 근거 설명',
    display: 'select',
    name: '처리 근거',
    required: true,
    width: '150px'
  },
  purpose: {
    description: '상세 목적 설명',
    display: 'string',
    name: '상세 목적',
    required: true,
    width: '400px'
  },
  items: {
    description: '처리항목 설명',
    display: 'item',
    name: '처리항목',
    required: true,
    width: '350px'
  },
  period: {
    description: '보유 및 이용 기간 설명',
    display: 'list',
    name: '보유 및 이용 기간',
    required: true,
    width: '350px'
  }
};
/** 개인정보 제공 */
export const ppiTableHeader: TableHeadersData = {
  recipient: {
    description: 'a',
    display: 'string',
    name: '제공받는 자',
    required: true,
    width: '200px'
  },
  purpose: {
    description: 'a',
    display: 'list',
    name: '제공받는자의 목적',
    required: true,
    width: '350px'
  },
  items: {
    description: 'a',
    display: 'item',
    name: '제공 항목',
    required: true,
    width: '300px'
  },
  period: {
    description: 'a',
    display: 'period',
    name: '보유 및 이용기간',
    required: true,
    width: '350px'
  },
  isForeign: {
    description: 'a',
    display: 'checkbox',
    name: '국외여부',
    required: true,
    width: '120px'
  }
}
/** 개인정보 국외 제공 */
export const eppiTableHeader: TableHeadersData = {
  country: {
    description: 'a',
    display: 'string',
    name: '국가',
    required: true,
    width: '150px'
  },
  location: {
    description: 'a',
    display: 'string',
    name: '위치(주소)',
    required: true,
    width: '350px'
  },
  method: {
    description: 'a',
    display: 'list',
    name: '일시 및 방법',
    required: true,
    width: '350px'
  },
  charger: {
    description: 'a',
    display: 'list',
    name: '담당자(연락처)',
    required: false,
    width: '350px'
  }
}
/** 개인정보 위탁 */
export const cpiTableHeader: TableHeadersData = {
  subject: {
    description: 'a',
    display: 'selectA',
    name: '구분',
    required: true,
    width: '300px'
  },
  company: {
    description: 'a',
    display: 'selectA',
    name: '위탁받는 자(수탁자)',
    required: true,
    width: '300px'
  },
  content: {
    description: 'a',
    display: 'itemA',
    name: '위탁 업무',
    required: true,
    width: '600px'
  },
  isForeign: {
    description: 'a',
    display: 'checkbox',
    name: '국외 여부',
    required: true,
    width: '120px'
  }
}
/** 개인정보 국외 위탁 */
export const ecpiTableHeader: TableHeadersData = {
  country: {
    description: 'a',
    display: 'string',
    name: '국가',
    required: true,
    width: '150px'
  },
  location: {
    description: 'a',
    display: 'string',
    name: '위치(주소)',
    required: true,
    width: '250px'
  },
  method: {
    description: 'a',
    display: 'list',
    name: '일시 및 방법',
    required: true,
    width: '250px'
  },
  items: {
    description: 'a',
    display: 'item',
    name: '위탁 항목',
    required: true,
    width: '250px'
  },
  period: {
    description: 'a',
    display: 'list',
    name: '보유 및 이용기간',
    required: true,
    width: '250px'
  },
  charger: {
    description: 'a',
    display: 'list',
    name: '담당자(연락처)',
    required: false,
    width: '250px'
  }
}
