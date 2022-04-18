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
    display: "itemA",
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
    display: "string",
    name: "일시 및 방법",
    required: true,
  },
  charger: {
    description: "a",
    display: "string",
    name: "담당자(연락처)",
    required: false,
  }
}
export const consignmentTableHeader: TableHeadersData = {
  subject: {
    description: "a",
    display: "string",
    name: "구분",
    required: true,
  },
  company: {
    description: "a",
    display: "string",
    name: "위탁받는 자(수탁자)",
    required: true,
  },
  content: {
    description: "a",
    display: "item",
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
    display: "string",
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
    display: "string",
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