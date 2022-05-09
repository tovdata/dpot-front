// Type
import { TableHeadersData } from './type';

/** [Table Header] Personal Information */
export const personalInfoTableHeader: TableHeadersData = {
  subject: {
    description: "업무명 설명",
    display: "selectA",
    name: "구분(업무명)",
    required: true,
  },
  purpose: {
    description: "처리 목적 설명",
    display: "list",
    name: "처리 목적",
    required: true,
  },
  essentialItems: {
    description: "필수항목 설명",
    display: "itemA",
    name: "필수항목",
    required: true,
  },
  selectionItems: {
    description: "선택항목 설명",
    display: "itemA",
    name: "선택항목",
    required: false,
  },
  period: {
    description: "보유 및 이용 기간 설명",
    display: "period",
    name: "보유 및 이용 기간",
    required: true,
  }
};
/** [Table Header] False name information */
export const falseNameInfoTableHeader: TableHeadersData = {
  subject: {
    description: "업무명 설명",
    display: "select",
    name: "구분(업무명)",
    required: true,
  },
  basis: {
    description: "처리 근거 설명",
    display: "select",
    name: "처리 근거",
    required: true,
  },
  purpose: {
    description: "상세 목적 설명",
    display: "string",
    name: "상세 목적",
    required: true,
  },
  items: {
    description: "처리항목 설명",
    display: "item",
    name: "처리항목",
    required: true,
  },
  period: {
    description: "보유 및 이용 기간 설명",
    display: "list",
    name: "보유 및 이용 기간",
    required: true,
  }
};
// provision of personal information
export const provisionTableHeader: TableHeadersData = {
  recipient: {
    description: "a",
    display: "string",
    name: "제공받는 자",
    required: true,
  },
  purpose: {
    description: "a",
    display: "list",
    name: "제공 목적",
    required: true,
  },
  items: {
    description: "a",
    display: "item",
    name: "제공 항목",
    required: true,
  },
  period: {
    description: "a",
    display: "period",
    name: "보유 및 이용기간",
    required: true,
  },
  isForeign: {
    description: "a",
    display: "checkbox",
    name: "국외여부",
    required: true,
  }
}
// provision of personal additional information
export const expandProvisionTableHeader: TableHeadersData = {
  country: {
    description: "a",
    display: "string",
    name: "국가",
    required: true,
  },
  address: {
    description: "a",
    display: "string",
    name: "위치(주소)",
    required: true,
  },
  method: {
    description: "a",
    display: "list",
    name: "일시 및 방법",
    required: true,
  },
  charger: {
    description: "a",
    display: "list",
    name: "담당자(연락처)",
    required: false,
  }
}
export const consignmentTableHeader: TableHeadersData = {
  subject: {
    description: "a",
    display: "selectA",
    name: "구분",
    required: true,
  },
  company: {
    description: "a",
    display: "selectA",
    name: "위탁받는 자(수탁자)",
    required: true,
  },
  content: {
    description: "a",
    display: "itemA",
    name: "위탁 업무",
    required: true,
  },
  isForeign: {
    description: "a",
    display: "checkbox",
    name: "국외 여부",
    required: true,
  }
}
export const expandConsignmentTableHeader: TableHeadersData = {
  country: {
    description: "a",
    display: "selectA",
    name: "국가",
    required: true,
  },
  address: {
    description: "a",
    display: "selectA",
    name: "위치(주소)",
    required: true,
  },
  method: {
    description: "a",
    display: "list",
    name: "일시 및 방법",
    required: true,
  },
  items: {
    description: "a",
    display: "item",
    name: "위탁 항목",
    required: true
  },
  period: {
    description: "a",
    display: "list",
    name: "보유 및 이용기간",
    required: true,
  },
  charger: {
    description: "a",
    display: "list",
    name: "담당자(연락처)",
    required: false,
  }
}
export const personalInfoProcessingPolicyTableHeader: TableHeadersData = {
  name: {
    display: "string",
    name: "문서 이름",
    required: true,
  },
  status: {
    display: "status",
    name: "상태",
    required: true,
  },
  createAt: {
    display: "datetime",
    name: "생성일",
    required: true,
  },
  latestAt: {
    display: "datetime",
    name: "최종 편집일",
    required: true,
  }
};

/** [Select options] Personal information */
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
  "재화 및 서비스 이용": {
    purpose: ["이용자 식별", "본인 여부 및 연령 확인", "재화 및 서비스 제공", "서비스 이용 내역 제공", "콘텐츠 제공", "계약의 체결·유지·이행·관리·개선", "서비스 환경의 유지·관리 및 개선", "품질 개선 및 고도화"],
    items: ["이름", "생년월일", "연령대", "나이", "휴대전화번호", "이메일주소", "아이디", "비밀번호", "소속(기관명)", "부서명", "직책(직위)", "CI(연계정보)", "DI(중복가입확인정보)", "닉네임", "프로필 사진", "서비스 이용 내역", "쿠키"],
    period: ["회원 탈퇴", "계약 해지", "재화·서비스 공급 완료", "서비스 종료", "파기 요청"]
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
  "인터넷 서비스 이용 과정에서 자동으로 수집되는 정보": {
    purpose: ["웹/앱 방문에 관한 통계 및 분석"],
    items: ["IP 주소", "쿠키", "방문 일시", "서비스 이용기록", "접속 로그", "불량 이용 기록", "IMEI", "OS종류", "OS버전", "디바이스 종류", "광고식별자", "UUID", "위치정보", "이동통신사", "푸시 토큰"],
    period: ["회원 탈퇴", "파기 요청", "서비스 종료"]
  }
}

/** 개인정보 위탁 테이블에서 업무명에 따른 예시   */
export const CompanyFromSubjectInCPI = {
  "이벤트 경품 물류 업무": {
    "갤럭시아머니트리㈜": {
      content: ["서비스 물품 및 이벤트 경품 배송 등의 물류 업무 (경품 종류: 모바일 쿠폰)", "휴대폰 소액 결제"],
      country: "Korea1",
      address: "address",
      charger: ["1", "2", "3"]
    }
  },
  "알림발송": {
    "엔에이치엔㈜": {
      content: ["SMS 및 메시지 발송", "(문자, 이메일, 알림톡)발송 서비스", "대량 메일 발송", "SMS", "LMS", "알림톡 발송", "SMS", "알림톡 등 메시지 발송 서비스 제공"],
      country: "Korea2",
      address: "address2",
      charger: ["1", "2", "3"]
    },
    "㈜엘지씨엔에스": {
      content: ["SMS 및 메시지 발송", "카카오톡 알림정보 전송. (문자, 이메일, 알림톡)발송 서비스"],
      country: "Korea3",
      address: "address3",
      charger: ["1", "2", "3"]
    },
    "인포뱅크㈜": {
      content: ["문자서비스 전송 시스템 운영", "문자메세지발송", "문자 수신(MO) 서비스", "SMS", "LMS 알림톡 발송"],
      country: "Korea4",
      address: "address4",
      charger: ["1", "2", "3"]
    },
    "슈어엠㈜": {
      content: ["문자메세지발송", "SMS", "LMS", "알림톡 발송"],
      country: "Korea5",
      address: "address5",
      charger: ["1", "2"]
    }
  },
  // "안심번호 서비스": {
  //   company: ["㈜케이티", "에스케이텔링크㈜", "세종텔레콤㈜", "㈜LG유플러스"]
  // }
}

/** 
 * 개인정보 처리방침에서 사용되는 정적 데이터들
 */
/** 관계 법령에 따른 개인정보의 보유 및 이용기간 (개인정보 처리방침 Step2) */
export const periodOfRetentionAndUseOfPersonalInformation: any = {
  '전자상거래법': ['계약 또는 청약철회 등에 관한 기록(5년)', '대금결제 및 재화 등의 공급에 관한 기록(5년)', '소비자의 불만 또는 분쟁처리에 관한 기록(3년)', '표시∙광고에 관한 기록(6개월)'],
  '정보통신망법': ['본인확인에 관한 기록(6개월)'],
  '전자금융거래법': ['전자금융 거래에 관한 기록(5년)'],
  '통신비밀보호법': ['웹사이트 방문 기록(3개월)'],
  '위치정보법': ['개인위치정보에 관한 기록(6개월)'],
  '신용정보법': ['신용정보의 수집·처리 및 이용 등에 관한 기록(3년)'],
  '국세청고시': ['전자세금계산서 발급에 관한 기록(3년)'],
  '법인세법': ['거래에 관한 장부 및 지출증명서류(5년) '],
  '부가가치세법': ['세금계산서, 영수증 등 거래내역 관련 정보(5년)', '부가가치세의 과세표준과 세액의 신고자료 등(5년)']
}
/** 14세 미만 아동의 개인정보 처리 관련 법정대리인의 확인 방법 (개인정보 처리방침 Step2) */
export const methodOfConfirmConsentOfLegalRepresentative: string[] = [
  '동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 개인정보처리자가 그 동의 표시를 확인했음을 법정대리인의 휴대전화 문자메시지로 알리는 방법',
  '동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 신용카드·직불카드 등의 카드정보를 제공받는 방법',
  '동의 내용을 게재한 인터넷 사이트에 법정대리인이 동의 여부를 표시하도록 하고 법정대리인의 휴대전화 본인인증 등을 통해 본인 여부를 확인하는 방법',
  '동의 내용이 적힌 서면을 법정대리인에게 직접 발급하거나, 우편 또는 팩스를 통하여 전달하고 법정대리인이 동의 내용에 대하여 서명날인 후 제출하도록 하는 방법',
  '동의 내용이 적힌 전자우편을 발송하여 법정대리인으로부터 동의의 의사표시가 적힌 전자우편을 전송받는 방법',
  '전화를 통하여 동의 내용을 법정대리인에게 알리고 동의를 얻거나 인터넷주소 등 동의 내용을 확인할 수 있는 방법을 안내하고 재차 전화 통화를 통하여 동의를 얻는 방법',
  '그 밖에 위와 준하는 방법으로 법정대리인에게 동의 내용을 알리고 동의의 의사표시를 확인하는 방법'
];
/** 안정성 확보 추가 조치 - 개인정보보호 인증 (개인정보 처리방침 Step2) */
export const certificationForPIP: string[] = [
  'ISMS-P',
  'ISO/IEC 27701',
  'ISO/IEC 27001',
  'ISO/IEC 27017',
  'ISO/IEC 27018',
  'ISMS-정보보호관리우수등급',
  'ISMS-정보보호관리최우수등급',
  'CSAP'
]