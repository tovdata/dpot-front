/** Props */
export interface CommonElementProps {
  children?: JSX.Element | JSX.Element[];
}
/** [Interface] Table header */
export interface TableHeaderData {
  width?: string;
  description?: string;
  display: string;
  name: string;
  required: boolean;
}
/** [Interface] Table headers */
export interface TableHeadersData {
  [key: string]: TableHeaderData;
}
/** [Interface] Select options */
export interface SelectOptionsByColumn {
  [key: string]: string[];
}

/**
 * Data format
 */
/** [Interface] Personal information (collection and usage) (abbreviation: PI) */
export interface PersonalInformationDF {
  uuid: string;
  subject: string;
  purpose: string[];
  essentialItems: string[];
  selectionItems: string[];
  period: string[];
  basisOfCollection?: string[];
  collectionMethod?: string[];
  isProcess?: boolean;
  retentionFormat?: string[];
  charger?: string[];
}
/** [Interface] False name information (abbreviation: FNI) */
export interface FalseNameInformationDF {
  uuid: string;
  subject: string;
  basis: string;
  purpose: string;
  items: string[];
  period: string[];
  charger?: string[];
}
/** [Interface] Provision of personal information (abbreviation: PPI) */
export interface PersonalInformationProvisonDF {
  uuid: string;
  recipient: string;
  purpose: string[];
  items: string[];
  period: string[];
  isForeign: boolean;
  isUrl: string;
  charger?: string[];
  country?: string;
  location?: string;
  method?: string[];
}
/** [Interface] Consignment of personal information (abbreviation: CPI) */
export interface PersonalInformationConsignmentDF {
  uuid: string;
  subject: string;
  consignor: string;
  content: string[];
  isForeign: boolean;
  period: string[];
  items: string;
  charger?: string[];
  country?: string;
  location?: string;
  method?: string[];
}