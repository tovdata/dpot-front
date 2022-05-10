/** 기본적인 데이터 행(Row) 데이터 형태 */
export interface TableRowDF {
  id: string;
  data: any;
};
/** 개인정보 수집 및 이용에 대한 데이터 */
export interface PIDF {
  subject: string;
  purpose: string[];
  essentialItems: string[];
  selectionItems: string[];
  period: string[];
};
/** 가명정보 수집 및 이용에 대한 데이터 */
export interface FNIDF {
  subject: string;
  basis: string;
  purpose: string;
  items: string[];
  period: string[];
  charger?: string[];
};
/** 개인정보 제공에 대한 데이터 */
export interface PPIDF {
  recipient: string;
  purpose: string[];
  items: string[];
  period: string[];
  isForeign: boolean;
  country: string;
  location: string;
  method: string;
  charger?: string;
};
/** 개인정보 위탁에 대한 데이터 */
export interface CPIDF {
  subject: string;
  recipient: string;
  content: string[];
  isForeign: boolean;
  country: string;
  location: string;
  method: string[];
  items: string[];
  period: string[];
  charger?: string;
}