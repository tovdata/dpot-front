export type ContainerProps = {
  children?: JSX.Element;
}

export type BasicElement = {
  mode?: boolean;
  size?: string;
}

export type TableData = {
  title: string;
  header: string[];
}

export type TableHeaderData = {
  key: string;
  name: string;
}

export type TableDataProps = {
  table: TableData;
}