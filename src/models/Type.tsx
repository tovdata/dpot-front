export interface ContainerProps {
  children?: JSX.Element[];
}

export interface SwitchProps {
  id: string;
  onChange: (e: any) => void;
  status: boolean;
}
export interface ViewSwitchProps {
  id: string;
  name: string;
}
/* Element (for dark mode and size) */
export interface BasicElement {
  mode?: boolean;
  size?: string;
}
/* Table */
export interface BasicItem {
  id: number;
  name: string;
  tag?: string;
}
/* PI */
export interface PIIItem extends BasicItem {
  sensitive: boolean;
}
export interface PIIContentData {
  essentialItems: PIIItem[];
  period: string;
  purpose: BasicItem[];
  selectionItems: PIIItem[];
  subject: string;
}
export interface PIContentVisible {
  [id: string]: boolean;
  essentialItems: boolean;
  purpose: boolean;
  period: boolean;
  selectionItems: boolean;
  subject: boolean;
}
/* AI */
export interface AIItem extends BasicItem {
  tag: string;
}
export interface AIContentData {
  charger: string;
  department: string;
  items: PIIItem[];
  period: string;
  purpose: BasicItem;
  subject: string;
}
export interface AIContentVisible {
  charger: boolean;
  department: boolean;
  items: boolean;
  period: boolean;
  purpose: boolean;
  subject: boolean;
}
/* 정리 중 */
export const PI_TABLE_FIELDS = ['items', 'purpose', 'period', 'subject'];

export interface InfoItemData {
  essential: boolean;
  name: string;
  selection: boolean;
  sensitive: boolean;
}
export interface TableData {
  content: any[];
  header: TableHeaderData[];
  title: string;
}
export interface TableHeaderData {
  id: number;
  key: string;
  name: string;
  visible?: boolean;
}
export interface PITableContentData {
  [id: string]: any;
  items: InfoItemData[];
  period: string;
  purpose: string;
  subject: string;
}
export interface PITableFieldVisible {
  [id: string]: boolean;
  items: boolean;
  period: boolean;
  purpose: boolean;
  subject: boolean;
}
/** Props */
export interface CommonProps {
  children?: JSX.Element|JSX.Element[];
}
export interface TableDataProps {
  table: TableData;
}
export interface TableFormHeaderProps {
  title: string;
}
export interface TableHeaderDataProps {
  header: TableHeaderData[];
}