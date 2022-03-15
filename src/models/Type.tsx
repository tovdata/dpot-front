export interface ContainerProps {
  children?: JSX.Element[];
}
export interface TableFormHeaderProps {
  options?: any;
  title: string;
}
export interface TableHeaderProps {
  header: TableHeaderData[];
}
/* Element (for dark mode and size) */
export interface BasicElement {
  mode?: boolean;
  size?: string;
}
/* Table */
export interface TableData {
  content: any[];
  header: TableHeaderData[];
  title: string;
}
export interface TableHeaderData extends BasicItem {
  visible: boolean;
}
export interface TableDataProps {
  table: TableData;
}
export interface BasicItem {
  id: number;
  name: string;
  tag?: string;
}
/* PII */
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