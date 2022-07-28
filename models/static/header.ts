import { TableHeadersData } from '../type';

/** 개인정보 수집 및 이용 */
export const piTableHeader: TableHeadersData = {
  subject: {
    description: '개인정보를 처리하는 업무를 구분하기 위해 업무명 입력이 필요해요.',
    display: 'selectA',
    name: '구분(업무명)',
    required: true,
    width: '14%'
  },
  purpose: {
    description: '업무 안에서 개인정보를 처리하는 목적을 모두 입력해주세요. 예시에서 고르거나, 직접 추가할 수 있어요.',
    display: 'list',
    name: '처리 목적',
    placeholder: '선택 및 직접 입력',
    required: true,
    width: '23%'
  },
  essentialItems: {
    description: '업무 처리에 반드시 필요한 항목을 모두 입력해요.',
    display: 'itemA',
    name: '필수항목',
    placeholder: '선택 및 직접 입력',
    required: true,
    width: '18%'
  },
  selectionItems: {
    description: '반드시 필요하진 않지만, 사용자로부터 선택적으로 제공받는 항목을 모두 입력해요.',
    display: 'itemA',
    name: '선택항목',
    placeholder: '선택 및 직접 입력',
    required: false,
    width: '18%'
  },
  period: {
    description: '업무처리에 필요한 최소한의 기간을 구체적으로 정해주세요.',
    display: 'period',
    name: '보유 및 이용 기간',
    required: true,
    width: '23%'
  }
};
/** 가명정보 수집 및 이용 */
export const fniTableHeader: TableHeadersData = {
  subject: {
    description: '개인정보 수집・이용 현황 표에서 입력된 업무명만 선택할 수 있어요.',
    display: 'select',
    name: '구분(업무명)',
    placeholder: '선택',
    required: true,
    width: '17%'
  },
  basis: {
    description: '처리 근거 설명',
    display: 'select',
    name: '처리 근거',
    placeholder: '선택',
    required: true,
    width: '14%'
  },
  purpose: {
    description: '근거에 따라 가명정보를 처리하는 목적을 구체적으로 적어주세요.',
    display: 'string',
    name: '상세 목적',
    placeholder: '직접 입력',
    required: true,
    width: '26%'
  },
  items: {
    description: '개인정보 수집・이용 현황 표에 입력된 항목만 선택할 수 있어요.',
    display: 'item',
    name: '처리항목',
    placeholder: '예시에서 선택',
    required: true,
    width: '20%'
  },
  period: {
    description: '목적 달성을 위해 가명정보의 처리가 필요한 기간을 입력해요.',
    display: 'list',
    name: '보유 및 이용 기간',
    placeholder: '직접 입력',
    required: true,
    width: '23%'
  }
};
/** 개인정보 제공 */
export const ppiTableHeader: TableHeadersData = {
  recipient: {
    description: '제공받은 업체의 이름을 정확히 입력해주세요. ‘~등’ 또는 ‘A업체 등 0개사’로 축약하면 안돼요!',
    display: 'string',
    name: '제공받는 자',
    placeholder: '업체명 or 목록링크',
    required: true,
    width: '18%'
  },
  purpose: {
    description: '개인정보를 ‘제공받은 자의 목적’을 모두 입력해주세요.',
    display: 'list',
    name: '제공받는자의 목적',
    placeholder: '직접 입력',
    required: true,
    width: '24%'
  },
  items: {
    description: '개인정보 수집・이용 현황 표에 입력된 항목만 선택할 수 있어요. 제3자에게 제공하는 항목을 빠짐없이 선택해주세요!',
    display: 'item',
    name: '제공 항목',
    placeholder: '예시에서 선택',
    required: true,
    width: '20%'
  },
  period: {
    description: '개인정보를 제공받은 자가 보유하고 이용하는 기간을 입력해요.',
    display: 'period',
    name: '보유 및 이용기간',
    required: true,
    width: '25%'
  },
  isForeign: {
    description: '제공된 개인정보가 국외에서 처리된다면 체크해주세요.',
    display: 'checkbox',
    name: '국외여부',
    required: false,
    width: '9%'
  }
}
/** 개인정보 국외 제공 */
export const eppiTableHeader: TableHeadersData = {
  country: {
    description: '개인정보를 제공받은 자가 소속된 국가',
    display: 'string',
    name: '국가',
    required: true,
    width: '17%'
  },
  location: {
    description: '개인정보를 제공받은 자가 위치한 주소',
    display: 'string',
    name: '위치(주소)',
    required: true,
    width: '28%'
  },
  method: {
    description: '개인정보를 제공하는 시기(수시 혹은 정기 등)와 방법',
    display: 'list',
    name: '일시 및 방법',
    required: true,
    width: '28%'
  },
  charger: {
    description: '개인정보를 제공받은 자의 담당자/연락처(유선, 이메일 등)',
    display: 'list',
    name: '담당자(연락처)',
    placeholder: '예) contact@company.com',
    required: true,
    width: '27%'
  }
}
/** 가명정보 제공 */
export const pfniTableHeader: TableHeadersData = {
  recipient: {
    description: '제공받은 업체의 이름을 정확히 입력해주세요. ‘~등’ 또는 ‘A업체 등 0개사’로 축약하면 안돼요!',
    display: 'string',
    name: '제공받는 자',
    placeholder: '업체명 or 목록링크',
    required: true,
    width: '18%'
  },
  purpose: {
    description: '가명정보를 ‘제공받은 자의 목적’을 모두 입력해주세요.',
    display: 'list',
    name: '제공받는자의 목적',
    placeholder: '직접 입력',
    required: true,
    width: '24%'
  },
  items: {
    description: '가명정보 수집・이용 현황 표에 입력된 항목만 선택할 수 있어요. 제3자에게 제공하는 항목을 빠짐없이 선택해주세요!',
    display: 'item',
    name: '제공 항목',
    placeholder: '예시에서 선택',
    required: true,
    width: '20%'
  },
  period: {
    description: '가명정보를 제공받은 자가 보유하고 이용하는 기간을 입력해요.',
    display: 'period',
    name: '보유 및 이용기간',
    required: true,
    width: '25%'
  },
  isForeign: {
    description: '제공된 가명정보가 국외에서 처리된다면 체크해주세요.',
    display: 'checkbox',
    name: '국외여부',
    required: true,
    width: '9%'
  }
}
/** 가명정보 국외 제공 */
export const epfniTableHeader: TableHeadersData = {
  country: {
    description: '가명정보를 제공받은 자가 소속된 국가',
    display: 'string',
    name: '국가',
    placeholder: '직접 입력',
    required: true,
    width: '17%'
  },
  location: {
    description: '가명정보를 제공받은 자가 위치한 주소',
    display: 'string',
    name: '위치(주소)',
    placeholder: '직접 입력',
    required: true,
    width: '28%'
  },
  method: {
    description: '가명정보를 제공하는 시기(수시 혹은 정기 등)와 방법',
    display: 'list',
    name: '일시 및 방법',
    placeholder: '직접 입력',
    required: true,
    width: '28%'
  },
  charger: {
    description: '가명정보를 제공받은 자의 담당자/연락처(유선, 이메일 등)',
    display: 'list',
    name: '담당자(연락처)',
    placeholder: '예) contact@company.com',
    required: true,
    width: '27%'
  }
}
/** 개인정보 위탁 */
export const cpiTableHeader: TableHeadersData = {
  subject: {
    description: '편리한 입력을 위해 위탁업무를 구분했어요. 위탁업무의 종류를 선택하거나 입력하세요.',
    display: 'selectA',
    name: '구분',
    placeholder: '업체명 or 목록링크',
    required: true,
    width: '28%'
  },
  company: {
    description: '수탁 업체의 이름을 선택하거나 정확히 입력해주세요. ‘~등’ 또는 ‘A업체 등 0개사’로 축약하면 안돼요!',
    display: 'selectA',
    name: '위탁받는 자(수탁자)',
    placeholder: '업체명 or 목록링크',
    required: true,
    width: '28%'
  },
  content: {
    description: '개인정보 처리를 위탁하는 업무의 내용을 상세히 입력해주세요.',
    display: 'itemA',
    name: '위탁 업무',
    placeholder: '선택 및 직접 입력',
    required: true,
    width: '31%'
  },
  isForeign: {
    description: '위탁한 개인정보가 국외에서 처리된다면 체크해주세요.',
    display: 'checkbox',
    name: '국외여부',
    required: false,
    width: '9%'
  }
}
/** 개인정보 국외 위탁 */
export const ecpiTableHeader: TableHeadersData = {
  country: {
    description: '개인정보 수탁자가 소속된 국가',
    display: 'string',
    name: '국가',
    placeholder: '직접 입력',
    required: true,
    width: '13%'
  },
  location: {
    description: '개인정보 수탁자가 위치한 주소',
    display: 'string',
    name: '위치(주소)',
    placeholder: '직접 입력',
    required: true,
    width: '17%'
  },
  method: {
    description: '개인정보 위탁 시기(수시 혹은 정기 등)와 방법',
    display: 'list',
    name: '일시 및 방법',
    placeholder: '선택 및 직접 입력',
    required: true,
    width: '17%'
  },
  items: {
    description: '개인정보 수집・이용 현황 표에 입력된 항목만 선택할 수 있어요. 위탁하는 항목을 빠짐없이 선택해주세요!',
    display: 'item',
    name: '위탁 항목',
    placeholder: '예시에서 선택',
    required: true,
    width: '18%'
  },
  period: {
    description: '개인정보 처리를 위탁받은 자가 보유하고 이용하는 기간을 입력해요.',
    display: 'list',
    name: '보유 및 이용기간',
    placeholder: '선택 및 직접 입력',
    required: true,
    width: '18%'
  },
  charger: {
    description: '수탁 업체 담당자/연락처(유선, 이메일 등)',
    display: 'list',
    name: '담당자(연락처)',
    placeholder: '예) contact@company.com',
    required: true,
    width: '17%'
  }
}
/** 가명정보 위탁 */
export const cfniTableHeader: TableHeadersData = {
  subject: {
    description: '편리한 입력을 위해 위탁업무를 구분했어요. 위탁업무의 종류를 선택하거나 입력하세요.',
    display: 'string',
    name: '구분',
    placeholder: '직접 입력',
    required: true,
    width: '28%'
  },
  company: {
    description: '수탁 업체의 이름을 선택하거나 정확히 입력해주세요. ‘~등’ 또는 ‘A업체 등 0개사’로 축약하면 안돼요!',
    display: 'string',
    name: '위탁받는 자(수탁자)',
    placeholder: '직접 입력',
    required: true,
    width: '28%'
  },
  content: {
    description: '가명정보 처리를 위탁하는 업무의 내용을 상세히 입력해주세요.',
    display: 'list',
    name: '위탁 업무',
    placeholder: '직접 입력',
    required: true,
    width: '31%'
  },
  isForeign: {
    description: '위탁한 가명정보가 국외에서 처리된다면 체크해주세요.',
    display: 'checkbox',
    name: '국외여부',
    required: false,
    width: '9%'
  }
}
/** 가명정보 국외 위탁 */
export const ecfniTableHeader: TableHeadersData = {
  country: {
    description: '가명정보 수탁자가 소속된 국가',
    display: 'string',
    name: '국가',
    placeholder: '직접 입력',
    required: true,
    width: '13%'
  },
  location: {
    description: '가명정보 수탁자가 위치한 주소',
    display: 'string',
    name: '위치(주소)',
    placeholder: '직접 입력',
    required: true,
    width: '17%'
  },
  method: {
    description: '가명정보 위탁 시기(수시 혹은 정기 등)와 방법',
    display: 'list',
    name: '일시 및 방법',
    placeholder: '직접 입력',
    required: true,
    width: '17%'
  },
  items: {
    description: '가명정보 수집・이용 현황 표에 입력된 항목만 선택할 수 있어요. 위탁하는 항목을 빠짐없이 선택해주세요!',
    display: 'item',
    name: '위탁 항목',
    placeholder: '예시에서 선택',
    required: true,
    width: '18%'
  },
  period: {
    description: '가명정보 처리를 위탁받은 자가 보유하고 이용하는 기간을 입력해요.',
    display: 'list',
    name: '보유 및 이용기간',
    placeholder: '직접 입력',
    required: true,
    width: '18%'
  },
  charger: {
    description: '수탁 업체 담당자/연락처(유선, 이메일 등)',
    display: 'list',
    name: '담당자(연락처)',
    placeholder: '예) contact@company.com',
    required: true,
    width: '17%'
  }
}