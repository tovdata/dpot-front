import { staticConsentData } from "@/models/static/data";
import { consentEPIHeader, consentPIHeader } from "@/models/static/header";
import styled from "styled-components";
import { ConsentTable } from "./Table";

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
  margin-top: 2rem;
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

export const ConfirmPage = ({ type, consentData }: any): JSX.Element => {
  const fixedText = (text: string, important: boolean, index: number): JSX.Element => {
    return <span key={index} className={"fixed-text" + (important ? ' important' : '')}>{text}</span>
  }
  const ConfirmItem = ({ title, children, headerText, footerText }: any): JSX.Element => {
    return (
      <StyleConfirmItem>
        {title && <h2 className="title"><span className="label">◾️</span><span>{title}</span></h2>}
        {headerText && <span className="header">{headerText}</span>}
        {children}
        {footerText && <span className="footer">{footerText}</span>}
      </StyleConfirmItem>
    )
  }
  return (
    <StyleConfirmContainer>
      <h1 className="title">{consentData.title}</h1>
      <span className="fixed-text-div">{staticConsentData[type].document?.fixedText.map((item: any, index: number) => fixedText(item.text, item.important, index))}</span>
      <ConfirmItem title='개인정보 수집·이용 내역' children={<ConsentTable data={consentData.pData} headers={consentPIHeader} mode='pi' />} footerText={consentData.disadvantage} />
      {consentData.epiData && <ConfirmItem title='기타 고지 사항' children={<ConsentTable data={consentData.epiData} headers={consentEPIHeader} />} headerText={'개인정보 보호법 제15조 제1항 제2호에 따라 정보주체의 동의 없이 개인정보를 수집·이용합니다.'} />}
      <ConfirmItem footerText={`위와 같이 ${staticConsentData[type].word}를 제공하는데 동의합니다.`} />
    </StyleConfirmContainer>)
}
