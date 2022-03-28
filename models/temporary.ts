// 개인정보 수집 및 이용 현황 데이터
export const personalInfo = [{
  basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
  collectionMethod: ["정보주체의 동의", "고객 문의"],
  essentialItems: [{
    intrinsic: false,
    name: "이름",
  }, {
    intrinsic: false,
    name: "아이디",
  }, {
    intrinsic: false,
    name: "비밀번호",
  }, {
    intrinsic: false,
    name: "이메일주소",
  }, {
    intrinsic: false,
    name: "CI(연계정보)",
  }],
  isPseudonym: false,
  period: ["회원 탈퇴시까지", "재화 및 서비스 공급 완료시까지"],
  purpose: ["본인 식별 및 인증", "회원 자격 유지 및 관리"],
  retentionFormat: ["사내 DB"],
  selectionItems: [{
    intrinsic: false,
    name: "휴대전화번호",
  }, {
    intrinsic: false,
    name: "생년월일",
  }],
  subject: "회원가입 및 관리"
}, {
  basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
  collectionMethod: ["정보주체의 동의", "고객 문의"],
  essentialItems: [{
    intrinsic: false,
    name: "아이핀 번호",
  }, {
    intrinsic: true,
    name: "주민등록번호",
  }, {
    intrinsic: false,
    name: "신용카드정보",
  }, {
    intrinsic: false,
    name: "결제기록",
  }],
  isPseudonym: false,
  period: ["재화 및 서비스 공급 완료시까지", "요금결제 및 정산 완료시까지"],
  purpose: ["이용자 식별", "본인 여부 및 연령 확인", "콘텐츠 제공", "구매 및 요금결제"],
  retentionFormat: ["사내 DB"],
  selectionItems: [],
  subject: "재화 및 서비스 제공"
}, {
  basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
  collectionMethod: ["정보주체의 동의", "고객 문의"],
  essentialItems: [{
    intrinsic: false,
    name: "아이핀 번호",
  }, {
    intrinsic: true,
    name: "주민등록번호",
  }, {
    intrinsic: false,
    name: "신용카드정보",
  }, {
    intrinsic: false,
    name: "결제기록",
  }],
  isPseudonym: false,
  period: ["재화 및 서비스 공급 완료시까지", "요금결제 및 정산 완료시까지"],
  purpose: ["이용자 식별", "본인 여부 및 연령 확인", "콘텐츠 제공", "구매 및 요금결제"],
  retentionFormat: ["사내 DB"],
  selectionItems: [],
  subject: "재화 및 서비스 제공"
}, {
  basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
  collectionMethod: ["정보주체의 동의", "고객 문의"],
  essentialItems: [{
    intrinsic: false,
    name: "방문 일시",
  }, {
    intrinsic: false,
    name: "서비스 이용 기록",
  }, {
    intrinsic: false,
    name: "IP Address",
  }],
  isPseudonym: false,
  period: ["회원 탈퇴시까지"],
  purpose: ["서비스 연구", "서비스 웹/앱 버전 개발"],
  retentionFormat: ["사내 DB"],
  selectionItems: [],
  subject: "신규 서비스 개발"
}];
// 가명정보 수집 및 이용 현황 데이터
export const pseudonymInfo = [{
  basis: "과학적 연구",
  items: [{
    intrinsic: false,
    name: "생년월일",
  }, {
    intrinsic: false,
    name: "휴대전화번호",
  }],
  period: ["결합데이터 분석 완료 시까지"],
  purpose: "연령대별 선호 분석",
  subject: "회원가입 및 관리"
}];