export const statementForPIPP = (company: string): any => {
  return {
    title: `${company} 개인정보 처리방침`,
    introduction: `${company}은(는) 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.`,
    pi: {
      title: '개인정보의 처리목적, 수집 항목, 보유 및 이용기간',
      content: {
        common: {
          1: [
            `① ${company}가 처리하고 있는 개인정보의 항목과 목적 및 보유기간은 아래와 같습니다.`
          ],
          2: [
            '② 처리하고 있는 개인정보는 상기의 목적 이외의 용도로는 이용되지 않으며, 처리 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.',
            `③ ${company}은(는) 법령에 따른 개인정보 보유∙이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유∙이용기간 내에서 개인정보를 처리∙보유합니다. 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지 처리∙보유합니다.`,
            '1) 관계 법령 위반에 따른 수사∙조사 등이 진행 중인 경우에는 해당 수사∙조사 종료 시까지',
            '2) 홈페이지 이용에 따른 채권∙채무관계 잔존시에는 해당 채권∙채무관계 정산 시까지',
            '3) 관련 법령에 따른 의무 보유기간에 해당 시에는 해당 기간 종료 시까지'
          ]
        }
      }
    },
    child: {
      title: '만 14세 미만 아동의 개인정보 처리에 관한 사항',
      content: {
        common: {
          1: [
            `① ${company}은(는) 만 14세 미만 아동에 대해 개인정보를 수집할 때 법정대리인의 동의를 얻어 해당 서비스 수행에 필요한 최소한의 개인정보를 수집합니다.`,
            '② 또한, 아동의 개인정보를 추가로 수집하거나 홍보 및 마케팅을 위하여 처리할 경우에는 법정대리인으로부터 별도의 동의를 얻습니다.',
            `③ ${company}은(는) 만 14세 미만 아동의 개인정보를 수집할 때에는 아동에게 법정대리인의 성명, 연락처와 같이 최소한의 정보를 요구할 수 있으며, 다음 중 하나의 방법으로 적법한 법정대리인이 동의하였는지를 확인합니다.`
          ]
        }
      }
    },
    ppi: {
      title: '개인정보의 제3자 제공',
      content: {
        common: {
          1: [
            `① ${company}은(는) 정보주체의 개인정보를 개인정보의 처리 목적에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공하고 그 이외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.`,
            `② ${company}은(는) 원활한 서비스 제공을 위해 다음의 경우 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다.`
          ],
          2: [
            `③ ${company}은(는) 근거법령에 의거하여 재난, 감염병, 급박한 생명·신체 위험을 초래하는 사건·사고, 급박한 재산 손실 등의 긴급상황이 발생하는 경우 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다. 이 경우 회사는 필요한 최소한의 개인정보만을 제공하며, 목적과 다르게 제공하지 않겠습니다.`
          ]
        },
        foreign: {
          1: [
            `${company}은(는) 회사는 아래와 같이 국외에 개인정보를 제공하고 있습니다.`
          ]
        }
      }
    },
    cpi: {
      title: '개인정보의 위탁',
      content: {
        common: {
          1: [
            `① ${company}은(는) 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다. 보기`
          ],
          2: [
            `② ${company}은(는) 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.`,
            '③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.'
          ]
        },
        foreign: {
          1: [
            `${company}은(는) 아래와 같이 국외에 개인정보를 제공하고 있습니다.`
          ]
        }
      }
    },
    dpi: {
      title: '개인정보의 파기 및 절차',
      content: {
        common: {
          1: [
            `① ${company}은(는) 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.`,
            '② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성 되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.',
            '③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.'
          ],
          2: [
            '파기절차 : 파기 사유가 발생한 개인정보를 선정하고 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.',
            '파기방법 : 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.'
          ]
        }
      }
    },
    dpiUnused: {
      title: '미이용자의 개인정보 파기 등에 관한 조치',
      content: {
        common: {
          1: [
            `① ${company}은(는) 1년간 서비스를 이용하지 않은 이용자의 정보를 파기하고 있습니다. 다만, 다른 법령에서 정한 보존기간이 경과할 때까지 다른 이용자의 개인정보와 분리하여 별도로 저장·관리할 수 있습니다.`,
            `② ${company}은(는) 개인정보의 파기 30일 전까지 개인정보가 파기되는 사실, 기간 만료일 및 파기되는 개인정보의 항목을 이메일, 문자 등 이용자에게 통지 가능한 방법으로 알리고 있습니다.`,
            '③ 개인정보의 파기를 원하지 않으시는 경우, 기간 만료 전 서비스 로그인을 하시면 됩니다'
          ]
        },
        separation: {
          1: [
            `① ${company}은(는) 1년간 서비스를 이용하지 않은 이용자는 휴면계정으로 전환하고, 개인정보를 별도로 분리하여 보관합니다. 분리 보관된 개인정보는 1년간 보관 후 지체없이 파기합니다.`,
            `② ${company}은(는) 휴면전환 30일 전까지 휴면예정 회원에게 별도 분리 보관되는 사실 및 휴면 예정일, 별도 분리 보관하는 개인정보 항목을 이메일, 문자 등 이용자에게 통지 가능한 방법으로 알리고 있습니다.`,
            '③ 휴면계정으로 전환을 원하지 않으시는 경우, 휴면계정 전환 전 서비스 로그인을 하시면 됩니다. 또한, 휴면계정으로 전환되었더라도 로그인을 하는 경우 이용자의 동의에 따라 휴면계정을 복원하여 정상적인 서비스를 이용할 수 있습니다.'
          ]
        }
      }
    },
    agent: {
      title: '정보주체와 법정대리인의 권리·의무 및 행사방법',
      content: {
        common: {
          1: [
            `① 정보주체는 ${company}에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.`,
            `② 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, ${company}은(는) 이에 대해 지체없이 조치하겠습니다.`,
            '③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.',
            '④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.',
            '⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.',
            `⑥ ${company}은(는) 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리 정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.`
          ]
        }
      }
    },
    safety: {
      title: '개인정보의 안전성 확보조치',
      content: {
        common: {
          1: [
            `${company}은(는) 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.`,
            '1) 관리적 조치 : 내부관리계획 수립·시행, 전담조직 운영, 정기적 직원 교육',
            '2) 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치 및 갱신'
          ],
          2: [
            `${company}은(는) 개인정보의 안전성을 확보하기 위하여 법령에서 규정하고 있는 사항 이외에도 다음과 같은 활동을 시행하고 있습니다.`
          ]
        },
        physical: {
          1: [
            '3) 물리적 조치 : 전산실, 자료보관실 등의 접근통제'
          ]
        }
      }
    },
    auto: {
      title: '개인정보의 자동 수집 장치의 설치·운영 및 거부에 관한 사항',
      content: {
        none: {
          1: [
            `${company}은(는) 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지 않습니다.`
          ]
        },
        common: {
          1: [
            `① ${company}은(는) 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지 않습니다.`
          ]
        },
        cookie: {
          1: [
            `① ${company}은(는) 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저 또는 모바일 어플리케이션에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 또는 모바일 기기내에 저장되기도 합니다.`
          ]
        },
        webLog: {
          1: [
            `② ${company}은(는) 이용자에게 더 나은 웹사이트 이용 경험을 제공하기 위하여, 홈페이지 접속 시 자동으로 방문기록과 접속 수단에 관한 정보를 수집하여 웹사이트 트래픽을 분석하는 ‘웹 로그 분석 도구’를 사용합니다. 경우에 따라, 회사는 웹 로그 분석 업무를 타사에 위탁하며 그 과정에서 수집된 정보가 국외로 이전될 수 있습니다.`
          ]
        },
        app: {
          1: [
            'Safari App을 사용하는 경우 쿠키 설정 방법  보기',
            'Chrome App을 사용하는 경우 쿠키 설정 방법  보기',
            'Naver App을 사용하는 경우 쿠키 설정 방법: 설정 > 인터넷 사용 기록 > 쿠키 삭제',
            'Android : 설정 > 애플리케이션 > 서비스 선택 > 저장공간 > 캐시 삭제',
            'iOS: 설정 > 개인 정보 보호 > 추적 > 서비스 앱 비활성화 선택'
          ]
        },
        web: {
          1: [
            'Internet Explorer를 사용하는 경우 쿠키 설정 방법  보기',
            'Safari를 사용하는 경우 쿠키 설정 방법  보기',
            'FireFox를 사용하는 경우 쿠키 설정 방법  보기',
            'Chrome 브라우저를 사용하는 경우 쿠키 설정 방법  보기'
          ]
        }
      }
    },
    shape: {
      title: '행태정보의 수집·이용 및 거부 등에 관한 사항',
      content: {
        none: {
          1: [
            `${company}은(는) 온라인 맞춤형 광고 등을 위한 행태정보를 수집∙이용∙제공하지 않습니다.`
          ]
        },
        common: {
          1: [
            `① ${company}은(는) 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 행태정보를 수집·이용하고 있습니다.`
          ],
          2: [
            `④ ${company}은(는) 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을 수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력, 기타 사회활동 경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는 민감한 행태정보를 수집하지 않습니다.`,
            `⑤ ${company}은(는) 만 14세 미만임을 알고 있는 아동이나 만14세 미만의 아동을 주 이용자로 하는 온라인 서비스로부터 맞춤형 광고 목적의 행태정보를 수집하지 않고, 만 14세 미만임을 알고 있는 아동에게는 맞춤형 광고를 제공하지 않습니다.`,
            '⑥ 정보주체는 아래와 같이 설정 변경을 통해 맞춤형 광고를 차단·허용할 수 있습니다.'
          ],
          3: [
            '⑦ 정보주체는 본 개인정보 처리방침에 안내된 회사의 개인정보보호책임자 및 개인정보 담당부서를 통하여 행태정보와 관련하여 궁금한 사항과 거부권 행사, 피해 신고 접수 등을 문의할 수 있습니다.'
          ]
        },
        advertising: {
          none: {
            1: [
              `② ${company}은(는) 온라인 맞춤형 광고를 위해 사용자의 행태정보를 수집∙처리 하고 있지 않습니다.`
            ]
          },
          common: {
            1: [
              `② ${company}은(는) 다음과 같이 행태정보를 수집합니다.`
            ]
          }
        },
        thirdParty: {
          none: {
            1: [
              `③ ${company}은(는) 온라인 맞춤형 광고 사업자가 행태정보를 수집∙처리하도록 허용하고 있지 않습니다.`
            ]
          },
          common: {
            1: [
              `③ ${company}은(는) 다음과 같이 온라인 맞춤형 광고 사업자가 행태정보를 수집∙처리하도록 허용하고 있습니다.`
            ]
          }
        },
        app: {
          1: [
            '스마트폰의 광고식별자 차단/허용',
            '- (안드로이드) ① 설정 → ② 개인정보보호 → ③ 광고 → ③ 광고 ID 재설정 또는 광고ID 삭제',
            '- (아이폰) ① 설정 → ② 개인정보보호 → ③ 추적 → ④ 앱이 추적을 요청하도록 허용 끔',
            '※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.'
          ]
        },
        web: {
          1: [
            '웹브라우저를 통한 맞춤형 광고 차단/허용',
            '-  인터넷 익스플로러(Windows 10용 Internet Explorer 11)',
            ' ◦ Internet Explorer에서 도구 버튼을 선택한 다음 인터넷 옵션을 선택',
            ' ◦ 개인정보 탭을 선택하고 설정에서 고급을 선택한 다음 쿠키의 차단 또는 허용을 선택',
            '-  Microsoft Edge',
            ' ◦ Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후, 설정을 클릭합니다.',
            ' ◦ 설정 페이지 좌측의 ‘개인정보, 검색 및 서비스’를 클릭 후 「추적방지」 섹션에서 ‘추적방지’ 여부 및 수준을 선택합니다.',
            ' ◦ ‘InPrivate를 검색할 때 항상 “엄격” 추적 방지 사용’ 여부를 선택합니다.',
            ' ◦ 아래 「개인정보」 섹션에서 ‘추적 안함 요청보내기’ 여부를 선택합니다.',
            '-  크롬 브라우저',
            ' ◦ Chrome에서 오른쪽 상단 ‘…’ 표시(chrome 맞춤설정 및 제어)를 클릭한 후, 설정 표시를 클릭합니다.',
            ' ◦ 설정 페이지 하단에 ‘고급 설정 표시’를 클릭하고 「개인정보」 섹션에서 콘텐츠 설정을 클릭합니다.',
            ' ◦ 쿠키 섹션에서 ‘타사 쿠키 및 사이트 데이터 차단’의 체크박스를 선택합니다.',
            '※ 다만, 쿠키 설정 변경은 웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수 있습니다.'
          ]
        }
      }
    },
    additional: {
      title: '추가적인 이용·제공 판단기준',
      content: {
        none: {
          1: [
            `${company}은(는) 추가적인 이용·제공하지 않습니다.`
          ]
        },
        common: {
          1: [
            `① ${company}은(는) 「개인정보 보호법」 제15조제3항 및 제17조제4항에 따라 「개인정보 보호법」 시행령 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.`
          ],
          2: [
            `② 이에 따라 ${company}은(는) 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.`
          ],
          3: [
            '개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부',
            '개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부',
            '개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부',
            '가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부'
          ]
        }
      }
    },
    fni: {
      title: '가명정보의 처리',
      content: {
        common: {
          1: [
            `${company}은(는) 통계작성, 과학적 연구, 공익적 기록보존 등을 위하여 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여 다음과 같이 처리하고 있습니다.`
          ],
          2: [
            '법 제28조의4(가명정보에 대한 안전조치 의무 등)에 따른 가면정보의 안전성 확보조치에 관한 사항',
            '- 관리적 조치 : 내부관리계획 수립·시행, 정기적 직원 교육 등',
            '- 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치',
          ],
          3: [
            '- 물리적 조치 : 전산실, 자료보관실 등의 접근통제'
          ]
        }
      }
    },
    charger: {
      title: '개인정보보호책임자 및 개인정보 열람청구',
      content: {
        common: {
          1: [
            `① ${company}은(는) 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.`,
            `② 정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람 청구를 아래의 연락처로 할 수 있습니다. ${company}은(는) 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.`
          ],
          2: [
            `③ 정보주체는 ${company}의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의할 수 있습니다. ${company}은(는) 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.`
          ]
        }
      }
    },
    help: {
      title: '권익침해 구제 방법',
      content: {
        common: {
          1: [
            `① ${company}은(는) 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이 필요한 경우 담당부서로 연락해 주시기 바랍니다.`,
            '② 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.'
          ],
          2: [
            '개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)',
            '개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)',
            '대검찰청 : (국번없이) 1301 (www.spo.go.kr)',
            '경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)'
          ],
          3: [
            '③ 「개인정보 보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.'
          ],
          4: [
            '중앙행정심판위원회 : (국번없이) 110 (www.simpan.go.kr)'
          ]
        }
      }
    }
  }
};

export const statementForPIPPs: any = {
  title: '개인정보 처리방침',
  introduction: '은(는) 정보주체의 자유와 권리 보호를 위해 「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게 개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보 보호법」 제30조에 따라 정보주체에게 개인정보 처리에 관한 절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.',
  pi: {
    title: '개인정보의 처리목적, 수집 항목, 보유 및 이용기간',
    content: {
      common: {
        1: [
          '① 회사가 처리하고 있는 개인정보의 항목과 목적 및 보유기간은 아래와 같습니다.  '
        ],
        2: [
          '② 처리하고 있는 개인정보는 상기의 목적 이외의 용도로는 이용되지 않으며, 처리 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.',
          '③ 회사는 법령에 따른 개인정보 보유∙이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의 받은 개인정보 보유∙이용기간 내에서 개인정보를 처리∙보유합니다. 다만, 다음의 사유에 해당하는 경우에는 해당 사유 종료시까지 처리∙보유합니다.',
          '1) 관계 법령 위반에 따른 수사∙조사 등이 진행 중인 경우에는 해당 수사∙조사 종료 시까지',
          '2) 홈페이지 이용에 따른 채권∙채무관계 잔존시에는 해당 채권∙채무관계 정산 시까지',
          '3) 관련 법령에 따른 의무 보유기간에 해당 시에는 해당 기간 종료 시까지'
        ]
      }
    }
  },
  child: {
    title: '만 14세 미만 아동의 개인정보 처리에 관한 사항',
    content: {
      common: {
        1: [
          '① 회사는 만 14세 미만 아동에 대해 개인정보를 수집할 때 법정대리인의 동의를 얻어 해당 서비스 수행에 필요한 최소한의 개인정보를 수집합니다.',
          '② 또한, 회사는 아동의 개인정보를 추가로 수집하거나 홍보 및 마케팅을 위하여 처리할 경우에는 법정대리인으로부터 별도의 동의를 얻습니다.',
          '③ 회사는 만 14세 미만 아동의 개인정보를 수집할 때에는 아동에게 법정대리인의 성명, 연락처와 같이 최소한의 정보를 요구할 수 있으며, 다음 중 하나의 방법으로 적법한 법정대리인이 동의하였는지를 확인합니다.'
        ]
      }
    }
  },
  ppi: {
    title: '개인정보의 제3자 제공',
    content: {
      common: {
        1: [
          '① 회사는 정보주체의 개인정보를 개인정보의 처리 목적에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 「개인정보 보호법」 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공하고 그 이외에는 정보주체의 개인정보를 제3자에게 제공하지 않습니다.',
          '② 회사는 원활한 서비스 제공을 위해 다음의 경우 정보주체의 동의를 얻어 필요 최소한의 범위로만 제공합니다.'
        ],
        2: [
          '③ 회사는 근거법령에 의거하여 재난, 감염병, 급박한 생명·신체 위험을 초래하는 사건·사고, 급박한 재산 손실 등의 긴급상황이 발생하는 경우 정보주체의 동의 없이 관계기관에 개인정보를 제공할 수 있습니다. 이 경우 회사는 필요한 최소한의 개인정보만을 제공하며, 목적과 다르게 제공하지 않겠습니다.'
        ]
      },
      foreign: {
        1: [
          '회사는 아래와 같이 국외에 개인정보를 제공하고 있습니다.'
        ]
      }
    }
  },
  cpi: {
    title: '개인정보의 위탁',
    content: {
      common: {
        1: [
          '① 회사는 원활한 개인정보 업무처리를 위하여 다음과 같이 개인정보 처리업무를 위탁하고 있습니다. 보기'
        ],
        2: [
          '② 회사는 위탁계약 체결 시 「개인정보 보호법」 제26조에 따라 위탁업무 수행목적 외 개인정보 처리금지, 기술적·관리적 보호조치, 재위탁 제한, 수탁자에 대한 관리·감독, 손해배상 등 책임에 관한 사항을 계약서 등 문서에 명시하고, 수탁자가 개인정보를 안전하게 처리하는지를 감독하고 있습니다.',
          '③ 위탁업무의 내용이나 수탁자가 변경될 경우에는 지체없이 본 개인정보 처리방침을 통하여 공개하도록 하겠습니다.'
        ]
      },
      foreign: {
        1: [
          '회사는 아래와 같이 국외에 개인정보를 제공하고 있습니다.'
        ]
      }
    }
  },
  dpi: {
    title: '개인정보의 파기 및 절차',
    content: {
      common: {
        1: [
          '① 회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.',
          '② 정보주체로부터 동의받은 개인정보 보유기간이 경과하거나 처리목적이 달성 되었음에도 불구하고 다른 법령에 따라 개인정보를 계속 보존하여야 하는 경우에는, 해당 개인정보를 별도의 데이터베이스(DB)로 옮기거나 보관장소를 달리하여 보존합니다.',
          '③ 개인정보 파기의 절차 및 방법은 다음과 같습니다.'
        ],
        2: [
          '파기절차 : 파기 사유가 발생한 개인정보를 선정하고 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.',
          '파기방법 : 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.'
        ]
      }
    }
  },
  dpiUnused: {
    title: '미이용자의 개인정보 파기 등에 관한 조치',
    content: {
      common: {
        1: [
          '① 회사는 1년간 서비스를 이용하지 않은 이용자의 정보를 파기하고 있습니다. 다만, 다른 법령에서 정한 보존기간이 경과할 때까지 다른 이용자의 개인정보와 분리하여 별도로 저장·관리할 수 있습니다.',
          '② 회사는 개인정보의 파기 30일 전까지 개인정보가 파기되는 사실, 기간 만료일 및 파기되는 개인정보의 항목을 이메일, 문자 등 이용자에게 통지 가능한 방법으로 알리고 있습니다.',
          '③ 개인정보의 파기를 원하지 않으시는 경우, 기간 만료 전 서비스 로그인을 하시면 됩니다'
        ]
      },
      separation: {
        1: [
          '① 회사는 1년간 서비스를 이용하지 않은 이용자는 휴면계정으로 전환하고, 개인정보를 별도로 분리하여 보관합니다. 분리 보관된 개인정보는 1년간 보관 후 지체없이 파기합니다.',
          '② 회사는 휴면전환 30일 전까지 휴면예정 회원에게 별도 분리 보관되는 사실 및 휴면 예정일, 별도 분리 보관하는 개인정보 항목을 이메일, 문자 등 이용자에게 통지 가능한 방법으로 알리고 있습니다.',
          '③ 휴면계정으로 전환을 원하지 않으시는 경우, 휴면계정 전환 전 서비스 로그인을 하시면 됩니다. 또한, 휴면계정으로 전환되었더라도 로그인을 하는 경우 이용자의 동의에 따라 휴면계정을 복원하여 정상적인 서비스를 이용할 수 있습니다.'
        ]
      }
    }
  },
  agent: {
    title: '정보주체와 법정대리인의 권리·의무 및 행사방법',
    content: {
      common: {
        1: [
          '① 정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.',
          '② 권리 행사는 회사에 대해 「개인정보 보호법」 시행령 제41조 제1항에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 회사는 이에 대해 지체없이 조치하겠습니다.',
          '③ 권리 행사는 정보주체의 법정대리인이나 위임을 받은 자 등 대리인을 통하여 하실 수도 있습니다. 이 경우 “개인정보 처리 방법에 관한 고시(제2020-7호)” 별지 제11호 서식에 따른 위임장을 제출하셔야 합니다.',
          '④ 개인정보 열람 및 처리정지 요구는 「개인정보 보호법」 제35조 제4항, 제37조 제2항에 의하여 정보주체의 권리가 제한 될 수 있습니다.',
          '⑤ 개인정보의 정정 및 삭제 요구는 다른 법령에서 그 개인정보가 수집 대상으로 명시되어 있는 경우에는 그 삭제를 요구할 수 없습니다.',
          '⑥ 회사는 정보주체 권리에 따른 열람의 요구, 정정·삭제의 요구, 처리 정지의 요구 시 열람 등 요구를 한 자가 본인이거나 정당한 대리인인지를 확인합니다.'
        ]
      }
    }
  },
  safety: {
    title: '개인정보의 안전성 확보조치',
    content: {
      common: {
        1: [
          '회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.',
          '1) 관리적 조치 : 내부관리계획 수립·시행, 전담조직 운영, 정기적 직원 교육',
          '2) 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 개인정보의 암호화, 보안프로그램 설치 및 갱신'
        ],
        2: [
          '회사는 개인정보의 안전성을 확보하기 위하여 법령에서 규정하고 있는 사항 이외에도 다음과 같은 활동을 시행하고 있습니다.'
        ]
      },
      physical: {
        1: [
          '3) 물리적 조치 : 전산실, 자료보관실 등의 접근통제'
        ]
      }
    }
  },
  auto: {
    title: '개인정보의 자동 수집 장치의 설치·운영 및 거부에 관한 사항',
    content: {
      none: {
        1: [
          '회사는 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지 않습니다.'
        ]
      },
      common: {
        1: [
          '① 회사는 정보주체의 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용하지 않습니다.'
        ]
      },
      cookie: {
        1: [
          '① 회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 ‘쿠키(cookie)’를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버(http)가 이용자의 컴퓨터 브라우저 또는 모바일 어플리케이션에게 보내는 소량의 정보이며 이용자들의 PC 컴퓨터내의 하드디스크에 또는 모바일 기기내에 저장되기도 합니다.'
        ]
      },
      webLog: {
        1: [
          '② 회사는 이용자에게 더 나은 웹사이트 이용 경험을 제공하기 위하여, 홈페이지 접속 시 자동으로 방문기록과 접속 수단에 관한 정보를 수집하여 웹사이트 트래픽을 분석하는 ‘웹 로그 분석 도구’를 사용합니다. 경우에 따라, 회사는 웹 로그 분석 업무를 타사에 위탁하며 그 과정에서 수집된 정보가 국외로 이전될 수 있습니다.'
        ]
      },
      app: {
        1: [
          'Safari App을 사용하는 경우 쿠키 설정 방법  보기',
          'Chrome App을 사용하는 경우 쿠키 설정 방법  보기',
          'Naver App을 사용하는 경우 쿠키 설정 방법: 설정 > 인터넷 사용 기록 > 쿠키 삭제',
          'Android : 설정 > 애플리케이션 > 서비스 선택 > 저장공간 > 캐시 삭제',
          'iOS: 설정 > 개인 정보 보호 > 추적 > 서비스 앱 비활성화 선택'
        ]
      },
      web: {
        1: [
          'Internet Explorer를 사용하는 경우 쿠키 설정 방법  보기',
          'Safari를 사용하는 경우 쿠키 설정 방법  보기',
          'FireFox를 사용하는 경우 쿠키 설정 방법  보기',
          'Chrome 브라우저를 사용하는 경우 쿠키 설정 방법  보기'
        ]
      }
    }
  },
  shape: {
    title: '행태정보의 수집·이용 및 거부 등에 관한 사항',
    content: {
      none: {
        1: [
          '회사는 온라인 맞춤형 광고 등을 위한 행태정보를 수집∙이용∙제공하지 않습니다.'
        ]
      },
      common: {
        1: [
          '① 회사는 서비스 이용과정에서 정보주체에게 최적화된 맞춤형 서비스 및 혜택, 온라인 맞춤형 광고 등을 제공하기 위하여 행태정보를 수집·이용하고 있습니다.'
        ],
        2: [
          '④ 회사는 온라인 맞춤형 광고 등에 필요한 최소한의 행태정보만을 수집하며, 사상, 신념, 가족 및 친인척관계, 학력·병력, 기타 사회활동 경력 등 개인의 권리·이익이나 사생활을 뚜렷하게 침해할 우려가 있는 민감한 행태정보를 수집하지 않습니다.',
          '⑤ 회사는 만 14세 미만임을 알고 있는 아동이나 만14세 미만의 아동을 주 이용자로 하는 온라인 서비스로부터 맞춤형 광고 목적의 행태정보를 수집하지 않고, 만 14세 미만임을 알고 있는 아동에게는 맞춤형 광고를 제공하지 않습니다.',
          '⑥ 정보주체는 아래와 같이 설정 변경을 통해 맞춤형 광고를 차단·허용할 수 있습니다.'
        ],
        3: [
          '⑦ 정보주체는 본 개인정보 처리방침에 안내된 회사의 개인정보보호책임자 및 개인정보 담당부서를 통하여 행태정보와 관련하여 궁금한 사항과 거부권 행사, 피해 신고 접수 등을 문의할 수 있습니다.'
        ]
      },
      advertising: {
        none: {
          1: [
            '② 회사는 온라인 맞춤형 광고를 위해 사용자의 행태정보를 수집∙처리 하고 있지 않습니다.'
          ]
        },
        common: {
          1: [
            '② 회사는 다음과 같이 행태정보를 수집합니다.'
          ]
        }
      },
      thirdParty: {
        none: {
          1: [
            '③ 회사는 온라인 맞춤형 광고 사업자가 행태정보를 수집∙처리하도록 허용하고 있지 않습니다.'
          ]
        },
        common: {
          1: [
            '③ 회사는 다음과 같이 온라인 맞춤형 광고 사업자가 행태정보를 수집∙처리하도록 허용하고 있습니다.'
          ]
        }
      },
      app: {
        1: [
          '스마트폰의 광고식별자 차단/허용',
          '- (안드로이드) ① 설정 → ② 개인정보보호 → ③ 광고 → ③ 광고 ID 재설정 또는 광고ID 삭제',
          '- (아이폰) ① 설정 → ② 개인정보보호 → ③ 추적 → ④ 앱이 추적을 요청하도록 허용 끔',
          '※ 모바일 OS 버전에 따라 메뉴 및 방법이 다소 상이할 수 있습니다.'
        ]
      },
      web: {
        1: [
          '웹브라우저를 통한 맞춤형 광고 차단/허용',
          '-  인터넷 익스플로러(Windows 10용 Internet Explorer 11)',
          ' ◦ Internet Explorer에서 도구 버튼을 선택한 다음 인터넷 옵션을 선택',
          ' ◦ 개인정보 탭을 선택하고 설정에서 고급을 선택한 다음 쿠키의 차단 또는 허용을 선택',
          '-  Microsoft Edge',
          ' ◦ Edge에서 오른쪽 상단 ‘…’ 표시를 클릭한 후, 설정을 클릭합니다.',
          ' ◦ 설정 페이지 좌측의 ‘개인정보, 검색 및 서비스’를 클릭 후 「추적방지」 섹션에서 ‘추적방지’ 여부 및 수준을 선택합니다.',
          ' ◦ ‘InPrivate를 검색할 때 항상 “엄격” 추적 방지 사용’ 여부를 선택합니다.',
          ' ◦ 아래 「개인정보」 섹션에서 ‘추적 안함 요청보내기’ 여부를 선택합니다.',
          '-  크롬 브라우저',
          ' ◦ Chrome에서 오른쪽 상단 ‘…’ 표시(chrome 맞춤설정 및 제어)를 클릭한 후, 설정 표시를 클릭합니다.',
          ' ◦ 설정 페이지 하단에 ‘고급 설정 표시’를 클릭하고 「개인정보」 섹션에서 콘텐츠 설정을 클릭합니다.',
          ' ◦ 쿠키 섹션에서 ‘타사 쿠키 및 사이트 데이터 차단’의 체크박스를 선택합니다.',
          '※ 다만, 쿠키 설정 변경은 웹사이트 자동로그인 등 일부 서비스의 이용에 영향을 미칠 수 있습니다.'
        ]
      }
    }
  },
  additional: {
    title: '추가적인 이용·제공 판단기준',
    content: {
      none: {
        1: [
          '회사는 추가적인 이용·제공하지 않습니다.'
        ]
      },
      common: {
        1: [
          '① 회사는 「개인정보 보호법」 제15조제3항 및 제17조제4항에 따라 「개인정보 보호법」 시행령 제14조의2에 따른 사항을 고려하여 정보주체의 동의 없이 개인정보를 추가적으로 이용·제공할 수 있습니다.'
        ],
        2: [
          '② 이에 따라 회사는 정보주체의 동의 없이 추가적인 이용·제공을 하기 위해서 다음과 같은 사항을 고려하였습니다.'
        ],
        3: [
          '개인정보를 추가적으로 이용·제공하려는 목적이 당초 수집 목적과 관련성이 있는지 여부',
          '개인정보를 수집한 정황 또는 처리 관행에 비추어 볼 때 추가적인 이용·제공에 대한 예측 가능성이 있는지 여부',
          '개인정보의 추가적인 이용·제공이 정보주체의 이익을 부당하게 침해하는지 여부',
          '가명처리 또는 암호화 등 안전성 확보에 필요한 조치를 하였는지 여부'
        ]
      }
    }
  },
  fni: {
    title: '가명정보의 처리',
    content: {
      common: {
        1: [
          '회사는 통계작성, 과학적 연구, 공익적 기록보존 등을 위하여 수집한 개인정보를 특정 개인을 알아볼 수 없도록 가명처리하여 다음과 같이 처리하고 있습니다.'
        ],
        2: [
          '법 제28조의4(가명정보에 대한 안전조치 의무 등)에 따른 가면정보의 안전성 확보조치에 관한 사항',
          '- 관리적 조치 : 내부관리계획 수립·시행, 정기적 직원 교육 등',
          '- 기술적 조치 : 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치',
        ],
        3: [
          '- 물리적 조치 : 전산실, 자료보관실 등의 접근통제'
        ]
      }
    }
  },
  charger: {
    title: '개인정보보호책임자 및 개인정보 열람청구',
    content: {
      common: {
        1: [
          '① 회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보보호책임자를 지정하고 있습니다.',
          '② 정보주체는 「개인정보 보호법」 제35조에 따른 개인정보의 열람 청구를 아래의 연락처로 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.'
        ],
        2: [
          '③ 정보주체는 회사의 서비스(또는 사업)을 이용하시면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보 보호책임자 및 담당부서로 문의할 수 있습니다. 회사는 정보주체의 문의에 대해 지체없이 답변 및 처리해드릴 것입니다.'
        ]
      }
    }
  },
  help: {
    title: '권익침해 구제 방법',
    content: {
      common: {
        1: [
          '① 회사는 정보주체의 개인정보자기결정권을 보장하고, 개인정보침해로 인한 상담 및 피해 구제를 위해 노력하고 있으며, 신고나 상담이 필요한 경우 담당부서로 연락해 주시기 바랍니다.',
          '② 정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.'
        ],
        2: [
          '개인정보분쟁조정위원회 : (국번없이) 1833-6972 (www.kopico.go.kr)',
          '개인정보침해신고센터 : (국번없이) 118 (privacy.kisa.or.kr)',
          '대검찰청 : (국번없이) 1301 (www.spo.go.kr)',
          '경찰청 : (국번없이) 182 (ecrm.cyber.go.kr)'
        ],
        3: [
          '③ 「개인정보 보호법」 제35조(개인정보의 열람), 제36조(개인정보의 정정·삭제), 제37조(개인정보의 처리정지 등)의 규정에 의한 요구에 대 하여 공공기관의 장이 행한 처분 또는 부작위로 인하여 권리 또는 이익의 침해를 받은 자는 행정심판법이 정하는 바에 따라 행정심판을 청구할 수 있습니다.'
        ],
        4: [
          '중앙행정심판위원회 : (국번없이) 110 (www.simpan.go.kr)'
        ]
      }
    }
  }
};