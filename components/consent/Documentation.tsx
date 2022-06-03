import { staticConsentData } from "@/models/static/data";
import { consentPIHeader } from "@/models/static/header";
import { TableHeaderData } from "@/models/type";
import { Table, TableColumnProps } from "antd";
import styled from "styled-components";
import { createTableColumnProps, TableContentForList } from "../common/Table";

// Styled component(Confirm container)
const StyleConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  .title{
    font-weight: 700;
    font-size: 24px;
    width: 100%;
    text-align: center;
  }
  .fixed-text-div{
    display: flex;
    flex-direction: column;
    margin:2rem 0;
    .fixed-text{
      &.important{
        font-weight: bold;
        text-decoration: underline;
      }
    }
  }
`;

const StyleConfirmItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  span{
    white-space: pre-line;
  }
  .title{
    display: flex;
    flex-direction: row;
    font-weight: 600;
    font-size: 16px;
    text-align: left;
    .label{
      margin-top: 0.1rem;
      margin-right: 0.5rem;
    }
  }
  .footer{
    margin-top: 16px;
  }
`;
const StyleConfirmCollection = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ConfirmPage = ({ type, consentData }: any): JSX.Element => {
  const fixedText = (text: string, important: boolean): JSX.Element => {
    return <span className={"fixed-text" + (important ? ' important' : '')}>{text}</span>
  }
  const ConfirmItem = ({ title, children, headerText, footerText }: any): JSX.Element => {
    return (
      <StyleConfirmItem>
        <h2 className="title"><span className="label">◾️</span><span>{title}</span></h2>
        {headerText && <span className="header">{headerText}</span>}
        {children}
        {footerText && <span className="footer">{footerText}</span>}
      </StyleConfirmItem>
    )
  }
  return (
    <StyleConfirmContainer>
      <h1 className="title">{consentData.title}</h1>
      <span className="fixed-text-div">{staticConsentData[type].document?.fixedText.map((item: any) => fixedText(item.text, item.important))}</span>
      <ConfirmItem title='개인정보 수집·이용 내역' children={<ConsentTable data={consentData.piData} headers={consentPIHeader} />} footerText={consentData.disadvantage} />
    </StyleConfirmContainer>)
}
const ConsentTable = ({ data, headers }: any) => {
  const convertData = data.map((item: any) => {
    const newItem = JSON.parse(JSON.stringify(item));
    const items: any = {};
    items.essentialItems = item.essentialItems;
    items.selectionItems = item.selectionItems;
    newItem.items = items;
    delete newItem.essentialItems;
    delete newItem.selectionItems;
    return newItem;
  })
  const ItemComponent = ({ name, items }: any) => {
    if (items.length === 0) return <></>;
    return (
      <span>{`${name} : ${items.join(', ')}`}</span>
    )
  }
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a header data
    const header: TableHeaderData = headers[key];
    // Create a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description, header.width);
    column.render = (item: any, record: any, index: number): JSX.Element => {
      switch (header.display) {
        case 'string':
          return <>{item}</>
        case 'list':
          return <TableContentForList items={item} key={index} />
        case 'collection':
          return (
            <StyleConfirmCollection>
              <ItemComponent name="필수" items={item.essentialItems} />
              <ItemComponent name="선택" items={item.selectionItems} />
            </StyleConfirmCollection>
          );
        default:
          return <>{item}</>
      }
    };
    return column;
  });
  return <Table columns={columns} dataSource={convertData} pagination={false} />
}
