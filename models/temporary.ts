// Type
import { FalseNameInformationDF, PersonalInformationDF } from './type';

// 개인정보 수집 및 이용 현황 데이터
export const personalInfo: PersonalInformationDF[] = [{
  basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
  collectionMethod: ["정보주체의 동의", "고객 문의"],
  essentialItems: ["이름", "아이디", "비밀번호", "이메일주소", "CI(연계정보)"],
  isProcess: false,
  period: ["회원 탈퇴시까지", "재화 및 서비스 공급 완료시까지"],
  purpose: ["본인 식별 및 인증", "회원 자격 유지 및 관리"],
  retentionFormat: ["사내 DB"],
  selectionItems: ["휴대전화번호", "생년월일"],
  subject: "회원가입 및 관리",
  id: "1"
}, {
  basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
  collectionMethod: ["정보주체의 동의", "고객 문의"],
  essentialItems: ["아이핀 번호", "주민등록번호", "신용카드정보", "결제기록"],
  isProcess: false,
  period: ["재화 및 서비스 공급 완료시까지", "요금결제 및 정산 완료시까지"],
  purpose: ["이용자 식별", "본인 여부 및 연령 확인", "콘텐츠 제공", "구매 및 요금결제"],
  retentionFormat: ["사내 DB"],
  selectionItems: [],
  subject: "재화 및 서비스 제공",
  id: "2"
}, {
  basisOfCollection: ["통신비밀보호법", "전자금융거래법"],
  collectionMethod: ["정보주체의 동의", "고객 문의"],
  essentialItems: ["방문 일시", "서비스 이용 기록", "IP Address"],
  isProcess: false,
  period: ["회원 탈퇴시까지"],
  purpose: ["서비스 연구", "서비스 웹/앱 버전 개발"],
  retentionFormat: ["사내 DB"],
  selectionItems: [],
  subject: "신규 서비스 개발",
  id: "3"
}];
// 가명정보 수집 및 이용 현황 데이터
export const falseNameInfo: FalseNameInformationDF[] = [{
  basis: "과학적 연구",
  items: ["생년월일", "휴대전화번호"],
  period: ["결합데이터 분석 완료 시까지"],
  purpose: "연령대별 선호 분석",
  subject: "회원가입 및 관리",
  id: "1"
}];

// 개인정보 제공 테이블
export const provisionPersonalInfo = [{
  id: "1",
  recipient: "금융결제원",
  purpose: ["출금이체 서비스 제공", "출금 동의 확인"],
  items: ["이름", "휴대전화번호", "CI(연계정보)"],
  period: ["출금이체 서비스 제공시까지", "출금동의 확인 목적 달성시까지"],
  isForeign: true,
  country: "미국",
  address: "○시 ○구 ○동 건물명",
  method: ["전용네트워크를 이용한 원격지로 수시 전송"],
  charger: ["aws-korea-privacy@amazon.com"],
}, {
  id: "2",
  recipient: "한국SC은행",
  purpose: ["계좌 유효성 확인 및 송금"],
  items: ["아이핀 번호", "결제기록"],
  period: ["해당 송금 완료 시까지"],
  charger: "전수지(3667)",
  isForeign: false,
}];

export const consignmentPersonalInfo = [{
  id: "1",
  company: "나이스페이먼츠(주)",
  subject: "결제 및 요금 정산 처리",
  content: ["결제대행 서비스", "바로결제 서비스 정산"],
  charger: ["전수지(3667)"],
  isForeign: false,
  country: "미국",
  address: "○시 ○구 ○동 건물명",
  method: ["방법"],
  items: ["이름", "휴대전화번호"],
  period: ["해당 송금 완료 시까지"]
}]
export const personalInfoProcessingPolicy = [{
  createAt: "2022-03-23 14:03",
  latestAt: "2022-03-24 10:45",
  name: "토브데이터 개인정보 처리방침",
  status: "processing",
  id: 1
}, {
  createAt: "2022-03-24 09:12",
  latestAt: "2022-03-26 15:52",
  name: "토브데이터 개인정보 처리방침(2)",
  status: "complete",
  id: 2
}, {
  createAt: "2022-03-24 09:13",
  latestAt: "2022-03-25 15:52",
  name: "토브데이터 개인정보 처리방침(3)",
  status: "processing",
  id: 3
}, {
  createAt: "2022-03-25 09:12",
  latestAt: "2022-03-27 15:52",
  name: "토브데이터 개인정보 처리방침(4)",
  status: "complete",
  id: 4
}];