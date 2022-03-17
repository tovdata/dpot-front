/* Element (for dark mode and size) */
export interface BasicElement {
  mode?: boolean;
  size?: string;
}
/* 정리 중 */
export const PI_TABLE_FIELDS = ['items', 'purpose', 'period', 'subject'];
/* For Table (PI page) */
export interface InfoItemData {
  essential: boolean;
  name: string;
  selection: boolean;
  sensitive: boolean;
}
export interface TableData {
  content: any[];
  header?: TableHeaderData[];
  title: string;
}
export interface TableHeaderData {
  index?: number;
  key: string;
  name: string;
  visible: boolean;
}
export interface TableHeaderDataKV {
  [key: string]: TableHeaderData;
}
export interface TableContentData {
  [id: string]: any;
  items: InfoItemData[];
}
export interface TableFieldVisible {
  [id: string]: boolean;
}
/** Props */
export interface CommonProps {
  children?: JSX.Element|JSX.Element[];
}
export interface SwitchProps {
  id: string;
  onChange: (e: any) => void;
  status: boolean;
}
export interface TableDataProps {
  table: TableData;
}
export interface TableContentDataProps {
  content: TableContentData[];
}
export interface TableFormHeaderProps {
  title: string;
  type: string;           // ['PI'|'AI'] (개인정보 or 가명정보)
}
export interface TableHeaderDataProps {
  header: TableHeaderData[];
}
export interface TableViewMenuProps {
  visible: boolean;
}