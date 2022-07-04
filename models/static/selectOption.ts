/** 안정성 확보 추가 조치 - 개인정보보호 인증 (개인정보 처리방침 생성 2단계) */
export const certificationForPIPP: string[] = ['ISMS-P', 'ISO/IEC 27701', 'ISO/IEC 27017', 'ePRIVACY', 'ePRIVACY PLUS', 'PRIVACY'];
/** 개인정보 위탁 (개인정보 제공 및 위탁 페이지) */
export const infoFromSubjectInCPI = {
  "본인확인": {
    "나이스평가정보(주)": {
      content: ["본인 식별 및 인증", "성인인증"]
    },
    "에스씨아이평가정보(주)": {
      content: ["본인 식별 및 인증", "성인인증"]
    },
    "한국모바일인증(주)": {
      content: ["본인 식별 및 인증", "성인인증"]
    },
    "(주)드림시큐리티": {
      content: ["본인 식별 및 인증", "성인인증"]
    },
    "코리아크레딧뷰로(주)": {
      content: ["본인 식별 및 인증", "성인인증"]
    },
  },
  "안심번호 서비스": {
    "(주)LG유플러스": {
      content: ["안심번호 서비스 제공"]
    },
    "(주)케이티": {
      content: ["안심번호 서비스 제공"]
    },
    "SK텔레콤(주)": {
      content: ["안심번호 서비스 제공"]
    },
    "세종텔레콤(주)": {
      content: ["안심번호 서비스 제공"]
    }
  },
  "결제 및 요금정산": {
    "(주)케이지모빌리언스": {
      content: ["전자 결제 대행", "요금 정산", "간편결제 서비스 제공"]
    },
    "나이스페이먼츠(주)": {
      content: ["전자 결제 대행", "요금 정산", "간편결제 서비스 제공"]
    },
    "(주)다날": {
      content: ["전자 결제 대행", "요금 정산", "간편결제 서비스 제공"]
    },
    "(주)페이플": {
      content: ["전자 결제 대행", "요금 정산", "간편결제 서비스 제공"]
    },
    "(주)카카오페이": {
      content: ["전자 결제 대행", "요금 정산", "카카오페이를 통한 간편결제 서비스 제공"]
    },
    "토스페이먼츠(주)": {
      content: ["전자 결제 대행", "요금 정산", "계좌 유효성 체크", "토스(toss)를 통한 간편결제 서비스 제공"]
    },
    "네이버파이낸셜(주)": {
      content: ["전자 결제 대행", "요금 정산", "네이버페이를 통한 간편결제 서비스 제공"]
    },
    "엔에이치엔페이코(주)": {
      content: ["전자 결제 대행", "요금 정산", "페이코(payco)를 통한 간편결제 서비스 제공"]
    },
    "엔에이치엔한국사이버결제(주)": {
      content: ["전자 결제 대행", "요금 정산"]
    },
    "Google LLC": {
      content: ["구글 플레이 스토어(Google Play)를 통한 결제 및 청구서 발송"],
      isForeign: true,
      country: "USA",
      location: "1600 Amphitheatre Parkwa Mountain View, CA 94043, USA",
      method: ["서비스 이용 시점에 서버를 통해 전송"],
      period: ["법정 의무 보유기간 만료 시까지"],
      charger: ["googlekrsupport@google.com"]
    },
    "Apple Inc.": {
      content: ["애플 앱 스토어(App Store)를 통한 결제 및 청구서 발송"],
      isForeign: true,
      country: "USA",
      location: "One Apple Park Way Cupertino, CA 95014, USA",
      method: ["서비스 이용 시점에 서버를 통해 전송"],
      period: ["법정 의무 보유기간 만료 시까지"],
      charger: ["https://www.apple.com/legal/privacy/contact/"]
    }
  },
  "고객 상담 및 문의": {
    "(주)트랜스코스모스코리아": {
      content: ["고객 상담 및 문의 응대", "콜센터 업무의 일체", "고객 민원 처리"]
    },
    "효성아이티엑스(주)": {
      content: ["고객 상담 및 문의 응대", "콜센터 업무의 일체"]
    },
    "(주)메타엠": {
      content: ["고객 상담 및 문의 응대", "콜센터 업무의 일체"]
    },
    "(주)유베이스": {
      content: ["고객 상담 및 문의 응대", "콜센터 업무의 일체"]
    },
    "(주)채널코퍼레이션": {
      content: ["채널톡을 통한 고객 문의 접수 및 상담"]
    }
  },
  "상품 배송": {
    "씨제이대한통운(주)": {
      content: ["물품 배송 및 반품처리", "배송조회"]
    },
    "(주)굿스플로": {
      content: ["택배 업무 처리 자동화(배송정보 전달, 송장 등록)"]
    },
    "롯데글로벌로지스(주)": {
      content: ["물품 배송 및 반품처리", "배송조회"]
    },
    "(주)한진": {
      content: ["물품 배송 및 반품처리", "배송조회"]
    },
    "우정사업본부": {
      content: ["우체국 택배를 이용한 물품 배송 및 반품처리", "배송조회"]
    },
    "로젠(주)": {
      content: ["물품 배송 및 반품처리", "배송조회"]
    }
  },
  "클라우드 및 인프라": {
    "Amazon Web Services, Inc.": {
      content: ["AWS를 통한 서비스 운영 환경 제공", "데이터 보관"],
      isForeign: true,
      country: "USA",
      location: "us-west-2",
      method: ["서비스 이용 시점에 서버를 통해 전송"],
      period: ["위탁 계약 종료 시까지", "파기 요청 시까지", "회원 탈퇴 시까지"],
      charger: ["aws-korea-privacy@amazon.com"]
    },
    "Microsoft Corporation": {
      content: ["Azure를 통한 서비스 운영 환경 제공", "데이터 보관"],
      isForeign: true,
      country: "USA",
      location: "Central USA (Iowa)",
      method: ["서비스 이용 시점에 서버를 통해 전송"],
      period: ["위탁 계약 종료 시까지", "파기 요청 시까지", "회원 탈퇴 시까지"]
    },
    "Google LLC": {
      content: ["GCP(Google Cloud Platform)를 통한 서비스 운영 환경 제공", "데이터 보관"],
      isForeign: true,
      country: "USA",
      location: "1600 Amphitheatre Parkwa Mountain View, CA 94043, USA",
      method: ["서비스 이용 시점에 서버를 통해 전송"],
      period: ["위탁 계약 종료 시까지", "파기 요청 시까지", "회원 탈퇴 시까지"]
    },
    "네이버클라우드(주)": {
      content: ["클라우드 컴퓨팅을 통한 서비스 인프라 제공"]
    },
    "(주)케이티클라우드": {
      content: ["클라우드 컴퓨팅을 통한 서비스 인프라 제공"]
    },
    "(주)아임웹": {
      content: ["홈페이지 개발 및 운영"]
    }
  },
  "알림 발송": {
    "엔에이치엔㈜": {
      content: ["문자메세지 발송", "알림톡 전송", "이메일 전송"]
    },
    "㈜엘지씨엔에스": {
      content: ["문자메세지 발송", "알림톡 전송", "이메일 전송"]
    },
    "인포뱅크㈜": {
      content: ["문자메세지 발송", "알림톡 전송", "이메일 전송"]
    }
  },
  "홍보 및 마케팅": {
    "(주)트랜스코스모스코리아": {
      content: ["텔레마케팅"]
    },
    "(주)유베이스": {
      content: ["텔레마케팅"]
    },
    "(주)한국고용정보": {
      content: ["텔레마케팅"]
    }
  },
  "방문 트래픽·로그 분석": {
    "Google LLC": {
      content: ["Google Analytics를 통한 서비스 이용/방문 트래픽 통계 분석", "Firebase Analytics를 통한 서비스 이용 트래픽 통계 분석"],
      isForeign: true,
      country: "USA",
      location: "1601 Amphitheatre Parkwa Mountain View, CA 94043, USA",
      method: ["서비스 이용 시점에 서버를 통해 전송"],
      period: ["위탁 계약 종료 시까지", "파기 요청 시까지"],
      charger: ["googlekrsupport@google.com"]
    },
    "Roxr Software Ltd": {
      centent: ["Clicky를 통한 서비스 이용 트래픽 통계 분석"],
      isForeign: true,
      country: "USA",
      location: "10883 SE Main St #201 Milwaukie, OR, 97222, USA",
      method: ["서비스 이용 시점에 서버를 통해 전송"],
      period: ["위탁 계약 종료 시까지", "파기 요청 시까지"],
      charger: ["privacy@getclicky.com"]
    },
    "네이버(주)": {
      content: ["Naver Analytics를 통한 서비스 이용 트래픽 통계 분석"]
    },
    "Amplitude, Inc.": {
      content: ["Amplitude Analytics를 통한 서비스 이용 트래픽 통계 분석"],
      isForeign: true,
      country: "USA",
      location: "201 3rd Street, Suite 200 San Francisco, CA 94103, USA",
      method: ["서비스 이용 시점에 서버를 통해 전송"],
      period: ["위탁 계약 종료 시까지", "파기 요청 시까지"],
      charger: ["privacy@amplitude.com"]
    }
  }

  // "안심번호 서비스": {
  //   company: ["㈜케이티", "에스케이텔링크㈜", "세종텔레콤㈜", "㈜LG유플러스"]
  // }
};
/** 14세 미만 아동의 개인정보 처리 관련 법정대리인의 확인 방법 (개인정보 처리방침 생성 2단계) */
export const methodOfConfirmConsentOfLegalRepresentative: any = {
  '홈페이지에 법정대리인이 동의 여부를 표시한 뒤, 동의 사실을 법정대리인에게 문자로 안내': '동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 개인정보처리자가 그 동의 표시를 확인했음을 법정대리인의 휴대전화 문자 메시지로 알리는 방법',
  '홈페이지에 법정대리인이 동의 여부를 표시한 뒤, 카드정보로 본인 확인': '동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 신용카드∙직불카드 등의 카드정보를 제공받는 방법',
  '홈페이지에 법정대리인이 동의 여부를 표시한 뒤, 휴대전화로 본인 인증': '동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 휴대전화 본인인증 등을 통해 본인 여부를 확인하는 방법',
  '법정대리인의 서명이 날인된 서면 제출을 통해 동의 여부 확인': '동의 내용이 적힌 서면을 법정대리인에게 직접 발급하거나, 우편 또는 팩스를 통하여 전달하고 법정대리인이 동의 내용에 대하여 서명날인 후 제출하도록 하는 방법',
  '전자우편을 이용한 법정대리인의 동의 여부 확인': '동의 내용이 적힌 전자우편을 발송하여 법정대리인으로부터 동의 의사표시가 적힌 전자우편을 전송받는 방법',
  '법정대리인과의 전화 통화를 이용한 동의 여부 확인': '전화를 통하여 동의 내용을 법정대리인에게 알리고 동의를 얻거나 인터넷주소 등 동의 내용을 확인할 수 있는 방법을 안내하고 재차 전화 통화를 통하여 동의를 얻는 방법',
  '기타 그 외의 방법': '그 밖에 위와 준하는 방법으로 법정대리인에게 동의 내용을 알리고 동의의 의사표시를 확인하는 방법'
};
/** 관계 법령에 따른 개인정보의 보유 및 이용기간 (개인정보 처리방침 생성 2단계) */
export const periodOfRetentionAndUseOfPersonalInformation: any = {
  '국세청고시': ['전자세금계산서 발급에 관한 기록(3년)'],
  '법인세법': ['거래에 관한 장부 및 지출증명서류(5년) '],
  '부가가치세법': ['세금계산서, 영수증 등 거래내역 관련 정보(5년)', '부가가치세의 과세표준과 세액의 신고자료 등(5년)'],
  '신용정보법': ['신용정보의 수집·처리 및 이용 등에 관한 기록(3년)'],
  '위치정보법': ['개인위치정보에 관한 기록(6개월)'],
  '전자금융거래법': ['전자금융 거래에 관한 기록(5년)'],
  '전자상거래법': ['계약 또는 청약철회 등에 관한 기록(5년)', '대금결제 및 재화 등의 공급에 관한 기록(5년)', '소비자의 불만 또는 분쟁처리에 관한 기록(3년)', '표시∙광고에 관한 기록(6개월)'],
  '정보통신망법': ['본인확인에 관한 기록(6개월)'],
  '통신비밀보호법': ['웹사이트 방문 기록(3개월)']
};
/** 개인정보 수집 및 이용 (개인정보 수집 및 이용 페이지) */
export const personalInfoSelectOptions: any = {
  "회원가입 및 관리": {
    purpose: ["본인 식별·인증", "회원자격 유지·관리", "각종 고지·통지사항 전달", "서비스 부정가입 및 이용 방지", "성인 인증", "만 14세 미만 여부 확인", "법정대리인의 동의여부 확인"],
    items: ["이름", "생년월일", "연령대", "나이", "휴대전화번호", "이메일주소", "아이디", "비밀번호", "내외국인 구분", "소속(기관명)", "부서명", "직책(직위)", "CI(연계정보)", "DI(중복가입확인정보)", "닉네임", "프로필 사진", "법정대리인 이름", "법정대리인 관계", "법정대리인 연락처", "추천인"],
    period: ["회원 탈퇴", "회원 가입", "계약 해지", "파기 요청", "서비스 종료"]
  },
  "고객 상담 및 문의": {
    purpose: ["제품 및 서비스 상담", "고객 문의 접수 및 처리", "고객 불만 사항 처리", "문의 접수 및 처리 이력관리"],
    items: ["이름", "생년월일", "휴대전화번호", "이메일주소", "아이디", "문의 내용", "상담 내역", "서비스 이용 내역"],
    period: ["문의 접수", "처리 완료", "파기 요청"]
  },
  "제품 및 서비스 제공": {
    purpose: ["이용자 식별", "본인 여부 및 연령 확인", "제품 및 서비스 제공", "서비스 이용 내역 제공", "콘텐츠 제공", "계약의 체결·유지·이행·관리·개선", "서비스 환경의 유지·관리 및 개선", "품질 개선 및 고도화"],
    items: ["이름", "생년월일", "연령대", "나이", "휴대전화번호", "이메일주소", "아이디", "비밀번호", "소속(기관명)", "부서명", "직책(직위)", "CI(연계정보)", "DI(중복가입확인정보)", "닉네임", "프로필 사진", "서비스 이용 내역", "쿠키"],
    period: ["회원 탈퇴", "계약 해지", "제품·서비스 공급 완료", "서비스 종료", "파기 요청"]
  },
  "요금 결제 및 환불": {
    purpose: ["구매 및 요금결제·정산", "포인트 적립 및 사용", "계약서·청구서 발송", "채권추심", "현금영수증 발행", "결제내역 취소 및 환불처리", "제세공과금 대납", "부정거래 확인"],
    items: ["이름", "이메일주소", "휴대전화번호", "신용카드정보(카드사명, 카드 번호, 유효기간, CVC)", "입금자명", "은행명", "예금주", "계좌번호", "결제일시", "결제수단", "주문번호", "결제 금액", "물품명", "거래수량"],
    period: ["법정 의무 보유기간 만료"]
  },
  "상품 배송": {
    purpose: ["물품 배송", "배송지 관리", "주문 내역 및 구매 정보 확인", "배송 내역 확인"],
    items: ["결제일시", "결제수단", "주문번호", "결제 금액", "물폼명", "거래수량", "주문자 이름", "주문자 휴대전화번호", "주문자 이메일주소", "수취인 이름", "수취인 휴대전화번호", "수취인 주소"],
    period: ["법정 의무 보유기간 만료"]
  },
  "신규 서비스 개발": {
    purpose: ["서비스 기획 및 개발", "서비스 이용 통계 분석", "서비스 이용 환경 구축"],
    period: ["회원 탈퇴", "계약 해지", "서비스 종료", "파기 요청"]
  },
  "홍보 및 마케팅": {
    purpose: ["광고성 정보 전달", "행사 및 이벤트 안내", "상품 및 서비스 추천", "신규 상품 및 서비스 안내", "뉴스레터 발행"],
    items: ["이름", "생년월일", "휴대전화번호", "이메일주소", "관심분야", "알게된 경로", "성별", "연령대", "거주지역"],
    period: ["이벤트 종료", "동의 철회", "정보 입력", "파기 요청", "수신 거부"]
  },
  "자동으로 수집되는 정보": {
    purpose: ["웹/앱 방문에 관한 통계 및 분석"],
    items: ["IP 주소", "쿠키", "방문 일시", "서비스 이용기록", "접속 로그", "불량 이용 기록", "IMEI", "OS종류", "OS버전", "디바이스 종류", "광고식별자", "UUID", "위치정보", "이동통신사", "푸시 토큰"],
    period: ["회원 탈퇴", "파기 요청", "서비스 종료"]
  }
};
/** 개인정보 처리방침 생성 과정에서 추가적으로 입력받는 데이터들에 대한 예시 (개인정보 처리방침 1단계) */
export const additionalInfoOptions: any = {
  cookie: {
    purpose: ["이용자의 환경설정 유지", "서비스 편의 기능 제공", "이용자의 서비스 이용 통계 분석을 통한 서비스 개선", "맞춤형 서비스 제공", "관심 분야 분석을 통한 타겟 마케팅", "각종 이벤트 참여 정도 파악"],
    disadvantage: ["로그인이 필요한 일부 서비스 이용에 어려움이 있을 수 있습니다", "리워드 지급에 제한이 생길 수 있습니다", "맞춤형 서비스 이용에 어려움이 있을 수 있습니다"]
  },
  webLog: {
    purpose: ["이용자의 서비스 이용 통계 분석을 통한 서비스 개선", "맞춤형 서비스 및 혜택 제공", "맞춤형 광고 제공"],
    method: ["[Google Analytics] https://tools.google.com/dlpage/gaoptout", "[Firebase Analytics] https://tools.google.com/dlpage/gaoptout", "[Clicky] https://clicky.com/optout?optin=1", "[웹 브라우저] (거부 방법 자동입력)", "[Android] 브라우저 설정 → 인터넷 사용 기록/개인정보 및 보안 설정 → '쿠키의 허용' 끔, '타사 쿠키 차단'", "[iOS] 설정 → 개인정보보호 → 추적 → '앱이 추적을 요청하도록 허용' 끔"],
  },
  advertising: {
    items: ["이용자의 서비스 방문이력", "검색이력", "구매이력", "클릭내역", "광고식별자"],
  },
  thirdParty: {
    company: ["Facebook", "Google", "Adjust", "Braze", "AppsFlyer", "Unity", "Criteo", "Airbridge", "Vungle", "AppLovin", "IGAWorks", "TNK Factory", "Metapsplus", "Youappi", "Fyber", "AdColony"],
    items: ["이용자의 서비스 방문이력", "검색이력", "구매이력", "클릭내역", "광고식별자"]
  }
};