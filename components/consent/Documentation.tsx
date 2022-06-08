import { staticConsentData } from "@/models/static/data";
import { consentEPIHeader, consentPPIHeader, historyHeader } from '@/components/consent/Header';
import styled from "styled-components";
import { ConfirmItemComponent } from "./Atom";
import { ConsentTable } from "./Table";

// Styled component(Confirm container)
const StyleConfirmContainer = styled.div`
  display: flex;
  flex-direction: column;
  &>.title{
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


export const ConfirmPage = ({ type, consentData }: any): JSX.Element => {
  const fixedText = (text: string, important: boolean, index: number): JSX.Element => {
    return <span key={index} className={"fixed-text" + (important ? ' important' : '')}>{text}</span>
  }
  const getHistoryHeader = () => {
    let header = JSON.parse(JSON.stringify(historyHeader));
    switch (type) {
      case 1:
      case 2:
        header.items.display = "collectionA";
        break;
      case 4:
        header = consentPPIHeader;
        break;
      default:
        break;

    }
    return header;
  }
  const title = type === 4 ? '개인정보 제공 내역' : '개인정보 수집·이용 내역';
  const mode = type === 4 ? 'ppi' : 'pi';
  return (
    <StyleConfirmContainer>
      <h1 className="title">{consentData.title}</h1>
      <span className="fixed-text-div">{staticConsentData[type].document?.fixedText.map((item: any, index: number) => fixedText(item.text, item.important, index))}</span>
      <ConfirmItemComponent title={title} children={<ConsentTable data={consentData.pData} headers={getHistoryHeader()} mode={mode} />} footerText={consentData.disadvantage} />
      {consentData.epiData && <ConfirmItemComponent title='기타 고지 사항' children={<ConsentTable data={consentData.epiData} headers={consentEPIHeader} />} headerText={'개인정보 보호법 제15조 제1항 제2호에 따라 정보주체의 동의 없이 개인정보를 수집·이용합니다.'} />}
      <ConfirmItemComponent footerText={`위와 같이 ${staticConsentData[type].word}를 제공하는데 동의합니다.`} />
    </StyleConfirmContainer>)
}
