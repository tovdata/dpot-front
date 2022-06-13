import { staticConsentData } from "@/models/static/data";
import { consentEPIHeader, consentPPIHeader, historyHeader } from '@/components/consent/Header';
import { ConfirmItemComponent } from "./Atom";
import { ConsentTable } from "./Table";

export const ConfirmPage = ({ type, consentData }: any): JSX.Element => {
  const word = type === 4 ? '개인정보' : staticConsentData[type].word;
  const fixedText = (text: string, important: boolean, index: number): JSX.Element => {
    return <span key={index} style={important ? { fontWeight: 'bold', textDecoration: 'underline' } : {}}>{text}</span>
  }
  const getHistoryHeader = () => {
    let header = JSON.parse(JSON.stringify(historyHeader));
    switch (type) {
      case 1:
      case 2:
        header.items.display = "collectionB";
        break;
      case 3:
        header.purpose.display = "listB";
        break;
      case 4:
        header = consentPPIHeader;
        break;
      default:
        break;
    }
    return header;
  }
  const otherNoticeHeader = () => {
    const header = consentEPIHeader;
    if (type !== 4) {
      header.purpose.name = `${word} 수집·이용 목적`;
      header.items.name = `${word} 항목`;
    }
    return header;
  }
  const title = type === 4 ? '개인정보 제공 내역' : `${word} 수집·이용 내역`;
  const mode = type === 4 ? 'ppi' : 'pi';
  const companyName = "회사명";
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} id='report'>
      <h1 style={{ fontWeight: '700', fontSize: '24px', width: '100%', textAlign: 'center' }}>{consentData.title}</h1>
      <span style={{ display: 'flex', flexDirection: 'column', margin: '1rem' }}>{staticConsentData[type].document?.fixedText.map((item: any, index: number) => fixedText(item.text, item.important, index))}</span>
      <ConfirmItemComponent title={title} footerText={consentData.disadvantage}>
        <ConsentTable data={consentData.pData} headers={getHistoryHeader()} mode={mode} />
      </ConfirmItemComponent>
      {consentData.epiData && (
        <ConfirmItemComponent title='기타 고지 사항' headerText={`개인정보 보호법 제15조 제1항 제2호에 따라 정보주체의 동의 없이 ${word}를 수집·이용합니다.`}>
          <ConsentTable data={consentData.epiData} headers={otherNoticeHeader()} />
        </ConfirmItemComponent>
      )}
      <span style={{ whiteSpace: 'pre-line', marginTop: '16px' }}>{`위와 같이 ${staticConsentData[type].word}를 제공하는데 동의합니다.`} </span>
      <div style={{ fontWeight: '700', fontSize: '20px', marginTop: '32px', textAlign: 'center' }}>{`"${companyName}" 귀중`}</div>
    </div>)
}
