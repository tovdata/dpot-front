// Component
import { successNotification } from "@/components/common/Notification";
// Moduel
import moment from "moment";
import { decode } from "jsonwebtoken";
// Type
import { SERVICE_CFNI, SERVICE_CPI, SERVICE_DPI, SERVICE_FNI, SERVICE_PFNI, SERVICE_PI, SERVICE_PIPP, SERVICE_PPI } from "@/models/queries/type";
// Query
import { setActivity } from "@/models/queries/apis/activity";

export const blankCheck = (value: string): boolean => {
  const blankPattern: RegExp = /^\s+|\s+$/g;
  return value.trim().replace(blankPattern, '') === '';
}

export const unixTimeToTimeStamp = (unixTime: number) => {
  return moment.unix(unixTime / 1000).format('YYYY-MM-DD HH:mm');
}
export const copyTextToClipboard = (url: string) => {
  try {
    var textField = document.createElement('textarea');
    textField.innerText = url;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();

    successNotification('복사 완료');
  } catch (e) {
    console.log(e)
  }
}

/**
 * [Function] 액세스 토큰 복호화
 * @param token 토큰 값
 * @returns 사용자 ID
 */
 export const decodeAccessToken = (token: string): string => {
  // 토큰이 없을 경우, 
  if (token === undefined || token === null || token === '') return '';
  // 복호화
  const decoded: any = decode(token);
  // 추출된 데이터 처리
  if (decoded !== undefined && decoded !== null && 'sub' in decoded) {
    return decoded.sub;
  } else {
    return '';
  }
}
/**
 * [Function] 활동 로그 기록
 * @param mode 로그 유형 [add | delete | update]
 * @param path 활동 위치 (path)
 * @param id 대상 ID
 * @param user 사용자 이름
 */
export const writeActivityLog = (mode: string, path: string, id: string, user?: string) => {
  if (typeof window !== 'undefined') {
    // 로그 대상 정의
    const target: string = user ? 'service' : 'user';
    // 활동 위치 추출
    const pathStr: string = getTableLocation(path);
    // 메시지 생성 및 로그 기록
    if (pathStr !== '') {
      switch (mode) {
        case 'add':
          setActivity(target, id, user ? `${user} 님이 ${pathStr}를 추가하였습니다.` : `${pathStr}를 추가하였습니다.`);
          break;
        case 'delete':
          setActivity(target, id, user ? `${user} 님이 ${pathStr}를 삭제하였습니다.` : `${pathStr}를 삭제하였습니다.`);
          break;
        case 'save':
        case 'update':
          setActivity(target, id, user ? `${user} 님이 ${pathStr}를 수정하였습니다.` : `${pathStr}를 수정하였습니다.`);
          break;
      }
    }
  }
}
/**
 * [Function] 날짜 변환
 * @param timestamp unix timestamp
 * @returns 변환된 날짜 (YYYY-MM-DD)
 */
export const transformToDate = (timestamp: number): string => {
  if (Math.floor(timestamp / 1000000000000) > 0) {
    return moment.unix(timestamp / 1000).format('YYYY-MM-DD');
  } else {
    return moment.unix(timestamp).format('YYYY-MM-DD');
  }
}
/**
 * [Function] 날짜 변환
 * @param timestamp unix timestamp
 * @returns 변환된 날짜 (YYYY-MM-DD HH:mm)
 */
export const transformToDatetime = (timestamp: number): string => {
  if (Math.floor(timestamp / 1000000000000) > 0) {
    return moment.unix(timestamp / 1000).format('YYYY-MM-DD HH:mm');
  } else {
    return moment.unix(timestamp).format('YYYY-MM-DD HH:mm');
  }
}
/**
 * [Function]
 * @param date 날짜 형식 문자열 (YYYY-MM-DD)
 * @returns unix timestamp
 */
export const transformToUnix = (date: string): number => {
  try {
    return moment(date, 'YYYY-MM-DD').unix();
  } catch (err) {
    console.error('[I_FUNC ERROR] 형식 변경 에러 (날짜형식이 맞지 않습니다.)');
    return 0;
  }
}
/**
 * [Internal Function] 활동 내역을 위한 UI상 위치 반환
 * @param path 활동 내역 기준 (표, 서비스 등)
 * @returns UI상 위치 데이터
 */
const getTableLocation = (path: string): string => {
  switch (path) {
    case SERVICE_PI:
      return '"수집・이용" 탭의 "개인정보 수집・이용" 표';
    case SERVICE_FNI:
      return '"수집・이용" 탭의 "가명정보 수집・이용" 표';
    case SERVICE_PPI:
      return '"제공・위탁" 탭의 "개인정보 제3자 제공" 표';
    case SERVICE_CPI:
      return '"제공・위탁" 탭의 "개인정보 위탁" 표';
    case SERVICE_PFNI:
      return '"제공・위탁" 탭의 "가명정보 제3자 제공" 표';
    case SERVICE_CFNI:
      return '"제공・위탁" 탭의 "가명정보 위탁" 표';
    case SERVICE_DPI:
      return '"파기" 탭의 "개인정보 파기 관리대장" 표';
    case 'consent':  
      return '동의서';
    case SERVICE_PIPP:
      return '개인정보 처리방침';
    default:
      return '';
  }
}