export const defaultPIPPData: any = {
  aInfo: {
    cookie: {
      purpose: [],
      disadvantage: [],
      usage: undefined
    },
    webLog: {
      purpose: [],
      method: [],
      disadvantage: '서비스 이용에 불이익은 없습니다. 다만, 서비스 개선을 위한 통계 분석에 영향을 미칠 수 있습니다.',
      usage: undefined
    },
    advertising: {
      items: [],
      method: '이용자가 서비스 방문 및 실행 시 자동 수집',
      purpose: '이용자의 관심, 성향에 기반한 개인 맞춤형 상품추천 서비스(광고 포함)를 제공',
      period: '',
      usage: undefined
    },
    thirdParty: {
      company: [],
      items: [],
      method: '이용자가 당사 웹 사이트를 방문하거나 앱을 실행할 때, 자동 수집 및 전송',
      period: '',
      usage: undefined
    },
    additional: {
      items: [],
      purpose: [],
      period: '',
      usage: undefined
    }
  },
  dInfo: {
    name: '',
    period: ['통신비밀보호법 : 웹사이트 방문 기록(3개월)'],
    child: {
      method: [],
      usage: undefined
    },
    // ppi: {
    //   usage: undefined
    // },
    // cpi: {
    //   usage: undefined
    // },
    destructionUnused: {
      type: undefined
    },
    safety: {
      physical: undefined,
      activity: '',
      certification: [],
      usage: undefined
    },
    // fni: {
    //   usage: undefined
    // },
    manager: {
      charger: {
        name: '',
        position: '',
        contact: ''
      },
      department: {
        name: '',
        contact: ''
      },
      request: {
        department: '',
        charger: '',
        contact: ''
      }
    }
  },
  cInfo: {
    applyAt: undefined,
    previous: {
      url: '',
      usage: undefined
    }
  }
}
// 동의서 리스트
export const staticConsentTexts = [
  {
    key: 0,
    name: '개인정보 수집 및 이용 동의서',
    emptyTitle: '입력된 정보가 없습니다.',
    emptyMessage: '‘개인정보 관리 메뉴’에서 개인정보 처리에 관한 내용을 입력하셔야 동의서를 만들 수 있어요!',
    description: '서비스 제공에 필요한 필수 항목과 선택 동의 항목으로 구분하여 동의를 받아야만 해요!',
    goto: '/pim/cu'
  },
  {
    key: 1,
    name: '민감정보 수집 및 이용 동의서',
    emptyTitle: '입력된 정보가 없습니다.',
    emptyMessage: '‘개인정보 관리 메뉴’에서 개인정보 처리에 관한 내용을 입력하셔야 동의서를 만들 수 있어요!',
    description: '민감정보를 수집하고 이용하기 위해서는 별도의 동의를 받아야만 해요!',
    goto: '/pim/cu'
  }, {
    key: 2,
    name: '고유식별정보 수집 및 이용 동의서',
    emptyTitle: '입력된 고유식별정보가 없습니다.',
    emptyMessage: '‘개인정보 관리 메뉴’에서 고유식별정보 처리에 관한 내용을 입력하셔야 동의서를 만들 수 있어요!',
    description: '고유식별정보를 수집하고 이용하기 위해서는 별도의 동의를 받아야만 해요!',
    goto: '/pim/cu'
  }, {
    key: 3,
    name: '마케팅 및 광고성 정보 수신 동의서',
    emptyTitle: '입력된 정보가 없습니다.',
    emptyMessage: '‘개인정보 관리 메뉴’에서 개인정보 처리에 관한 내용을 입력하셔야 동의서를 만들 수 있어요!',
    description: '상품 혹은 서비스 홍보 및 판매를 위한 동의를 받는 경우, 이를 명확하게 인지할 수 있도록 알리고 동의를 받아야 해요.',
    goto: '/pim/cu'
  }, {
    key: 4,
    name: '제3자 제공 동의서',
    emptyTitle: '입력된 정보가 없습니다.',
    emptyMessage: '‘개인정보 관리 메뉴’에서 개인정보 제3자 제공에 관한 내용을 입력하셔야 동의서를 만들 수 있어요!',
    description: '제3자 제공에 대한 동의를 받는 경우, 서비스 제공에 필요한 동의와 구분하여 이를 명확하게 인지할 수 있도록 알리고 각각 동의를 받아야 해요.',
    goto: '/pim/pc'
  }
];
export const defaultConsentData: any = {
  type: undefined,
  title: undefined,
  subjects: undefined,
  disadvantage: undefined,
  pData: undefined,
  epiData: undefined,
  checkList: false
}

export const staticConsentData =(companyName:string)=> [
  {
    name: '개인정보 수집 및 이용',
    information: undefined,
    isEvidence: true,
    word: '개인정보',
    titlePlaceHolder: '예 : OOO 서비스를 위한 개인정보 수집 및 이용 동의서',
    disadvantage: {
      description: '동의를 거부할 권리가 있다는 사실 및 동의 거부에 따른 불이익을 아래 예시를 참조하여 구체적으로 작성해주세요.\n만약 "정보통신서비스 제공자등"에 해당된다면 이 부분은 기재하지 않아도 됩니다. 이 경우, 아래의 예시는 삭제해주세요.\n정보통신서비스 제공자등에 해당여부가 확실치 않다면 기재하시는 것을 추천드립니다.',
      example: '정보주체는 위와 같이 개인정보를 처리하는 것에 대한 동의를 거부할 권리가 있습니다.\n그러나 동의를 거부할 경우 "로그인이 필요한 서비스 이용"이 제한될 수 있습니다'
    },
    pData: {
      description: '각 업무에서 이용자의 동의를 받으려는 처리 목적과 필수 및 선택 항목을 확인합니다.\\n아래의 처리 목적과 개인정보 항목 중에서, 현재 만들려는 동의서와 관련이 없거나 별도로 동의를 받아야하는 민감정보나 고유식별정보가 있다면 삭제해주세요.\\n필요 시, ‘개인정보 관리-수집·이용’ 메뉴에서 표의 내용을 추가 및 수정할 수 있습니다.'
    },
    checkList: [
      {
        title: '선택한 개인정보 항목에 민감정보는 포함되어 있지 않습니다.',
        description: '민감정보 항목은 별도의 동의서를 만들어 동의받아야 합니다.'
      },
      {
        title: '선택한 개인정보 항목에 고유식별정보가 없습니다.',
        description: '고유식별정보(주민등록번호, 운전면허번호, 외국인등록번호, 여권번호)는 별도의 동의서를 만들어 동의받아야 합니다.',
      },
      {
        title: '동의를 받으려는 개인정보 항목을 필수 항목과 선택 항목으로 잘 구분하였습니다.',
        description: '필수항목: 해당 서비스 제공을 위해 반드시 필요한 개인정보\n선택항목: 해당 서비스의 추가적 기능 또는 사업자의 필요에 의해 이용자에게 요청하는 개인정보'
      }
    ],
    document: {
      fixedText: [
        { text: `"${companyName}"은(는) "개인정보 보호법"에 따라 아래와 같이 수집하는 개인정보의 항목, 수집 및 이용 목적, 보유 및 이용 기간을 안내드리고 동의를 받고자 합니다.`, important: false }
      ]
    }
  },
  {
    name: '민감정보 수집 및 이용',
    information: '민감정보란, 사상·신념, 노동조합·정당의 가입탈퇴, 정치적 견해, 건강, 성생활 등에 관한 정보, 유전정보, 범죄경력자료, 개인의 신체·생리·행동적 특징에 관한 정보로서 특정 개인을 알아볼 목적으로 일정한 기술적 수단을 통해 생성한 정보, 인종이나 민족에 관한 정보입니다.',
    isEvidence: true,
    word: '민감정보',
    titlePlaceHolder: '예 : OOO 서비스를 위한 민감정보 수집 및 이용 동의서',
    pData: {
      description: '각 업무에서 민감정보를 처리하는 목적과 필수 및 선택 항목을 확인합니다.\\n현재 만들려는 민감정보의 수집·이용 동의서와 관련이 없는 내용은 삭제해주세요.\\n필요 시, ‘개인정보 관리-수집·이용’ 메뉴에서 내용을 추가 및 수정할 수 있습니다.'
    },
    disadvantage: {
      description: '동의를 거부할 권리가 있다는 사실과 동의 거부에 따른 불이익에 대한 구체적인 내용이 반드시 포함되어야 합니다.',
      example: '정보주체는 위와 같이 민감정보를 처리하는 것에 대한 동의를 거부할 권리가 있습니다. \n그러나 동의를 거부할 경우 "맞춤형 서비스 제공/건강정보 분석 서비스 이용"이 제한될 수 있습니다.'
    },
    checkList: [
      {
        title: '선택한 항목은 모두 민감정보입니다.',
        description: '민감정보가 아닌 항목들은 별도의 동의서를 통해 동의받아야 합니다.'
      },
      {
        title: '선택한 항목에 고유식별정보가 없습니다.',
        description: '고유식별정보(주민등록번호, 운전면허번호, 외국인등록번호, 여권번호)는 별도의 동의서를 만들어 동의받아야 합니다.'
      },
      {
        title: '동의를 받으려는 민감정보를 필수 항목과 선택 항목으로 잘 구분하였습니다.',
        description: '필수항목: 해당 서비스 제공을 위해 반드시 필요한 개인정보\n선택항목: 해당 서비스의 추가적 기능 또는 사업자의 필요에 의해 이용자에게 요청하는 개인정보'
      },
      {
        title: '민감정보 제공 거부 시 불이익이 구체적으로 작성되어 있습니다.',
      }
    ],
    document: {
      title: 'OOO 서비스를 위한 민감정보 수집 및 이용 동의서',
      fixedText: [
        { text: `"${companyName}"은(는) 아래와 같이 민감정보 수집 및 이용에 관한 사항을 안내드리고 동의를 받고자 합니다.`, important: false }
      ]
    }
  },
  {
    name: '고유식별정보 수집 및 이용',
    information: '고유식별정보는 주민등록번호, 운전면허번호, 외국인등록번호, 여권번호를 말합니다. 고유식별정보가 아닌 항목들은 별도의 동의서를 통해 동의받아야 합니다. \n단, 주민등록번호는 법령에 근거한게 아니라면, 동의를 받더라도 사용할 수 없습니다.',
    isEvidence: true,
    word: '고유식별정보',
    titlePlaceHolder: '예 : OOO 서비스를 위한 고유식별정보 수집 및 이용 동의서',
    pData: {
      description: '각 업무에서 고유식별정보를 처리하는 목적과 필수 및 선택 항목을 확인합니다.\n현재 만들려는 고유식별정보의 수집·이용 동의서와 관련이 없는 내용은 삭제해주세요.\n필요 시, ‘개인정보 관리-수집·이용’ 메뉴에서 내용을 추가 및 수정할 수 있습니다.'
    },
    disadvantage: {
      description: '동의를 거부할 권리가 있다는 사실과 동의 거부에 따른 불이익에 대한 구체적인 내용이 반드시 포함되어야 합니다.',
      example: '정보주체는 위와 같이 고유식별정보를 처리하는 것에 대한 동의를 거부할 권리가 있습니다.\\n그러나 동의를 거부할 경우 "회원가입/환불처리/본인확인"이 제한될 수 있습니다.'
    },
    checkList: [
      {
        title: '동의를 받으려는 고유식별정보를 필수 항목과 선택 항목으로 잘 구분하였습니다.',
        description: '필수항목: 해당 서비스 제공을 위해 반드시 필요한 개인정보\n선택항목: 해당 서비스의 추가적 기능 또는 사업자의 필요에 의해 이용자에게 요청하는 개인정보'
      },
      {
        title: '고유식별정보 제공 거부 시 불이익이 구체적으로 작성되어 있습니다.'
      }
    ],
    document: {
      fixedText: [
        { text: `"${companyName}"은(는) 아래와 같이 고유식별정보 수집 및 이용에 관한 사항을 안내드리고 동의를 받고자 합니다.`, important: false }
      ]
    }
  },
  {
    name: '마케팅 및 광고성 정보 수신',
    information: undefined,
    isEvidence: false,
    word: '마케팅 및 광고성 정보',
    titlePlaceHolder: '예 : OOO 서비스를 위한 마케팅 및 광고성 정보 수신 동의서',
    pData: {
      description: '각 업무에서 홍보 및 마케팅과 관련한 목적과 이를 위한 필수 및 선택 항목을 확인합니다.\\n현재 만들려는 마케팅 및 광고성 정보 수신 동의서와 관련이 없는 내용은 삭제해주세요.\\n필요 시, ‘개인정보 관리-수집·이용’ 메뉴에서 내용을 추가 및 수정할 수 있습니다.'
    },
    disadvantage: {
      description: '동의를 거부할 권리가 있다는 사실과 동의 거부에 따른 불이익에 대한 구체적인 내용이 반드시 포함되어야 합니다.',
      example: '정보주체는 위와 같이 선택목적을 위해 개인정보를 처리하는 것에 대한 동의를 거부할 권리가 있습니다. \n그러나 동의를 거부할 경우 "이벤트 및 신규 혜택 알림"이 제한될 수 있습니다.'
    },
    checkList: [
      {
        title: '선택한 업무는 모두 이용자에게 제품 또는 서비스를 홍보하거나 판매를 권유하기 위한 업무입니다.',
      },
      {
        title: '선택한 개인정보 항목에 고유식별정보가 없습니다.',
        description: '고유식별정보(주민등록번호, 운전면허번호, 외국인등록번호, 여권번호)는 별도의 동의서를 만들어 동의받아야 합니다.'
      },
      {
        title: '동의를 받으려는 개인정보 항목을 필수 항목과 선택 항목으로 잘 구분하였습니다.',
        description: '필수항목: 해당 서비스 제공을 위해 반드시 필요한 개인정보\n선택항목: 해당 서비스의 추가적 기능 또는 사업자의 필요에 의해 이용자에게 요청하는 개인정보'
      },
      {
        title: '선택한 목적에 대한 개인정보 제공 거부 시 불이익이 구체적으로 작성되어 있습니다.'
      }
    ],
    document: {
      fixedText: [
        { text: `"${companyName}"은(는) 아래와 같이 마케팅 및 광고성 정보 수신을 위해 개인정보 수집 및 이용에 관한 사항을 안내드리고 동의를 받고자 합니다.`, important: false },
        { text: `"${companyName}"은(는) 상품이나 서비스의 홍보 또는 판매 권유 등을 위하여 해당 개인정보를 이용하여 정보주체에게 연락할 수 있습니다.`, important: true }
      ]
    }
  },
  {
    name: '개인정보 제3자 제공',
    information: undefined,
    isEvidence: true,
    word: '제 3자에게 개인정보',
    titlePlaceHolder: '예 : OOO 서비스를 위한 제3자 제공 동의서',
    pData: {
      description: '아래 목록에서 이용자의 동의를 받고자 하는 제3자 제공 건들을 모두 선택해주세요.\n개인정보 제3자 제공 내용을 수정하려면, ‘개인정보 관리-제공·위탁’ 메뉴에서 해당 내용을 입력해주세요.'
    },
    disadvantage: {
      description: '동의를 거부할 권리가 있다는 사실과 동의 거부에 따른 불이익에 대한 구체적인 내용이 반드시 포함되어야 합니다.',
      example: '정보주체는 위와 같이 개인정보를 제3자에게 제공하는 것에 대한 동의를 거부할 권리가 있습니다.\n그러나 동의를 거부할 경우 원활한 "심사를 할 수 없어 평가 확인에 제한"을 받을 수 있습니다.'
    },
    checkList: [
      {
        title: '제공에 대한 필수 안내사항(제공받는 자, 항목, 목적, 보유기간)이 잘 작성되어 있습니다.'
      },
      {
        title: '개인정보 제3자 제공 거부 시 불이익이 구체적으로 작성되어 있습니다.'
      }
    ],
    document: {
      fixedText: [
        { text: `"${companyName}"은(는) 아래와 같이 개인정보를 제3자에게 제공하는 사항을 안내드리고 동의를 받고자 합니다.`, bold: false }
      ]
    }
  },
];
// 파기
export const defaultDPIData: any = {
  subject: '',
  date: '',
  reason: [],
  items: [],
  charger: '',
  quantity: undefined,
  method: undefined,
  location: undefined,
  period: []
};