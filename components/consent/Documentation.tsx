import { staticConsentData } from "@/models/static/data";
import { consentEPIHeader, consentPPIHeader, historyHeader } from '@/components/consent/Header';
import { ConfirmItemComponent } from "./Atom";
import { ConsentTable } from "./Table";
import { useCallback, useEffect, useMemo, useState } from "react";

export const ConfirmPage: React.FC<any> = ({ type, consentData, companyName }): JSX.Element => {
  // 키워드
  const keyword: string = useMemo(() => type === 4 ? '개인정보' : staticConsentData('')[type].word, [type]);
  // 제목
  const title: string = useMemo(() => type === 4 ? '개인정보 제공 내역' : `${keyword} 수집·이용 내역`, [type, keyword]);
  // 모드
  const mode: string = useMemo(() => type === 4 ? 'ppi' : 'pi', [type]);

  /** [Event handler] 고정 텍스트 */
  const fixedText = useCallback((text: string, important: boolean, index: number): JSX.Element => (<span key={index} style={important ? { fontWeight: 'bold', textDecoration: 'underline' } : {}}>{text}</span>), []);
  /** [Event handler] */
  const getHistoryHeader = useCallback(() => {
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
  }, [type]);
  /** [Event handler] */
  const otherNoticeHeader = useCallback(async () => {
    const header = consentEPIHeader;
    if (type !== 4) {
      header.purpose.name = `${keyword} 수집·이용 목적`;
      header.items.name = `${keyword} 항목`;
    }
    return header;
  }, [keyword]);

  // // const word = type === 4 ? '개인정보' : staticConsentData('')[type].word;
  // // const title = type === 4 ? '개인정보 제공 내역' : `${word} 수집·이용 내역`;
  // // const mode = type === 4 ? 'ppi' : 'pi';

  // // const fixedText = (text: string, important: boolean, index: number): JSX.Element => {
  // //   return 
  // // }
  // const getHistoryHeader = () => {
  //   let header = JSON.parse(JSON.stringify(historyHeader));
  //   switch (type) {
  //     case 1:
  //     case 2:
  //       header.items.display = "collectionB";
  //       break;
  //     case 3:
  //       header.purpose.display = "listB";
  //       break;
  //     case 4:
  //       header = consentPPIHeader;
  //       break;
  //     default:
  //       break;
  //   }
  //   return header;
  // }
  // const otherNoticeHeader = () => {
  //   const header = consentEPIHeader;
  //   if (type !== 4) {
  //     header.purpose.name = `${word} 수집·이용 목적`;
  //     header.items.name = `${word} 항목`;
  //   }
  //   return header;
  // }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }} id='report'>
      <h1 style={{ fontWeight: '700', fontSize: '24px', width: '100%', textAlign: 'center' }}>{consentData.title}</h1>
      <span style={{ display: 'flex', flexDirection: 'column', margin: '1rem' }}>{staticConsentData(companyName)[type].document?.fixedText.map((item: any, index: number) => fixedText(item.text, item.important, index))}</span>
      <ConfirmItemComponent title={title} footerText={consentData.disadvantage}>
        <ConsentTable data={consentData.pData} headers={getHistoryHeader()} mode={mode} />
      </ConfirmItemComponent>
      {consentData.epiData && (
        <ConfirmItemComponent title='기타 고지 사항' headerText={`개인정보 보호법 제15조 제1항 제2호에 따라 정보주체의 동의 없이 ${keyword}를 수집·이용합니다.`}>
          <ConsentTable data={consentData.epiData} headers={otherNoticeHeader()} />
        </ConfirmItemComponent>
      )}
      <span style={{ whiteSpace: 'pre-line', marginTop: '16px' }}>{`위와 같이 ${staticConsentData(companyName)[type].word}를 제공하는데 동의합니다.`}</span>
      <div style={{ fontWeight: '700', fontSize: '20px', marginTop: '32px', textAlign: 'center' }}>{`"${companyName}" 귀중`}</div>
    </div>
  );
}
