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
    period: [],
    child: {
      method: [],
      usage: undefined
    },
    ppi: {
      usage: undefined
    },
    cpi: {
      usage: undefined
    },
    destructionUnused: {
      type: undefined
    },
    safety: {
      physical: undefined,
      activity: '',
      certification: [],
      usage: undefined
    },
    fni: {
      usage: undefined
    },
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
    applyAt: '',
    previous: {
      url: '',
      usage: undefined
    }
  }
};
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