export interface CommonElementProps {
  children?: JSX.Element | JSX.Element[];
}
export interface CommonTableProps {
  title: string;
  table?: JSX.Element | JSX.Element[];
}
export interface TableProcessItemProps {
  intrinsic: boolean;
  name: string;
}
/** Data */
export interface PersonalInfoStructure {
  basisOfCollection: string[],
  collectionMethod: string[],
  essentialItems: TableProcessItemProps[],
  isPseudonym: boolean;
  period: string[],
  retentionFormat: string[],
  selectionItems: TableProcessItemProps[],
  subject: string
}
export interface PseudonymInfoStructure {
  basis: string,
  items: TableProcessItemProps[],
  period: string[],
  purpose: string,
  subject: string
}