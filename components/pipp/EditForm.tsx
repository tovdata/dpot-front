import { useEffect, useMemo, useState } from 'react';
// Component
import { Col, Button, Collapse, Input, Radio, Row, Space, TreeSelect, Table } from 'antd';
import { DIInputGroup, DIRow, DIRowContent, DIRowDivider, DIRowHeader, DIRowSubject } from './Documentation';
import { DDRow, DDRowContent, DDRowHeader, DDRowItemList, DDRowTableForm, DRLabelingHeader, DRLabelingItem, DTCForm, DTCItem } from './Documentation';
import { AddableTagSelect } from '../common/Select';
import { YesOrNoRadioButton } from '../common/Radio';
// Util
import moment from 'moment';
import { blankCheck } from 'utils/utils';

/** [Interface] Properties for InputSection */
interface InputSectionProps {
  data: any;
  onChange: (step: string, value: any, category: string, property?: string, subProperty?: string) => void;
  onFocus: (type: string, index: number, pos?: string) => void;
  onOpenModal: (type: string) => void;
  refElements?: any;
  refTables: any;
  rels: any;
  sectionType: string;
}
/** [Interface] Properties for PreviewSection */
interface PreviewSectionProps {
  data: any;
  preview?: boolean;
  prevList?: any[];
  refElements?: any;
  refTables: any;
  rels: any;
  serviceTypes: string[];
  stmt: any;
}
/** [Interface] Properties for ReadableTable */
interface ReadableTableProps {
  columns: any[],
  dataSource: any[],
  preview?: boolean;
  style?: React.CSSProperties;
}

/** [Component] 개인정보 처리방침 편집을 위한 Input section */
export const InputSection: React.FC<InputSectionProps> = ({ data, onChange, onFocus, onOpenModal, refElements, refTables, rels, sectionType }: InputSectionProps): JSX.Element => {
  // 예시 데이터 (관계 법령에 따른 개인정보 보유 및 이용기간)
  const [examForPeriod, setExamForPeriod] = useState<string[]>([]);
  // 예시 데이터 (법정대리인의 동의 확인 방법)
  const [examForMethod, setExamForMethod] = useState<any[]>([]);
  // 예시 데이터 (개인정보의 안정성 확보조치)
  const [examForCert, setExamForCert] = useState<string[]>([]);

  // 예시 데이터 가공
  useEffect(() => {
    (async () => {
      const rawExamForPeriod = (await import('@/models/static/selectOption')).periodOfRetentionAndUseOfPersonalInformation;
      const rawExamForMethod = (await import('@/models/static/selectOption')).methodOfConfirmConsentOfLegalRepresentative;
      const rawExamForCert = (await import('@/models/static/selectOption')).certificationForPIPP;
      // 데이터 가공 및 설정 (관계 법령에 따른 개인정보 보유 및 이용기간)
      setExamForPeriod(Object.keys(rawExamForPeriod).reduce((arr: any, law: string) => { arr.push(...rawExamForPeriod[law].map((item: string): string => `${law} : ${item}`)); return arr }, []));
      // 데이터 가공 및 설정 (법정대리인의 동의 확인 방법)
      setExamForMethod(Object.keys(rawExamForMethod).map((key: string): any => ({ title: key, value: rawExamForMethod[key] })));
      // 데이터 가공 및 설정  (개인정보의 안정성 확보조치)
      setExamForCert(rawExamForCert);
    })();
  }, []);

  /** [Event handler] 변경 */
  
  // 컴포넌트 반환
  return (
    <>
      <DIRow self={refElements ? (el: any) => (refElements.current[0] = el) : undefined}>
        <DIRowHeader description='개인정보 처리방침에 기재될 개인정보처리자명 또는 서비스명을 입력해주세요.\n작성된 명칭은 제목 및 본문에 기재되어 본 개인정보 처리방침의 적용 범위를 알려줍니다.' required title='개인정보 처리자명 또는 서비스명' />
        <DIRowContent>
          <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'name')} onClick={() => onFocus('preview', 0)} placeholder='개인정보 처리자명 또는 서비스명' value={data.name} />
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[1] = el) : undefined}>
        <DIRowHeader description='이 부분은 개인정보 처리방침에서 가장 중요한 내용입니다.\n각 업무 안에서 처리하는 목적을 모두 나열하고, 필수항목과 선택항목을 나누어 기재해야 합니다. 보유 및 이용기간은 업무별로 필요한 기간을 정하여 작성해주시면 됩니다.(항목들을 이용하는 기간 뿐만 아니라 저장·보관하는 기간이 모두 포함됩니다.)' required title='개인정보의 처리목적, 수집 항목, 보유 및 이용기간' tools={<Button onClick={(): void => { onOpenModal('pi'); onFocus('preview', 1); }} size='small' style={{ fontSize: 12, padding: '0 12px' }} type='default'>수정하기</Button>} />
        <DIRowContent>
          <DIRowSubject description='위에서 정한 기간과 별도로, 관련 법령에 따라 개인정보를 보유해야 하는 경우에는 해당되는 법령을 모두 기재해야 합니다. 아래 보기에서 선택하거나 형식에 맞춰 입력해주세요.' required title='관계 법령에 따른 개인정보의 보유 및 이용기간' />
          <AddableTagSelect onChange={(value: string|string[]): void => onChange(sectionType, value, 'period')} onClick={() => onFocus('preview', 1, 'end')} options={examForPeriod} placeholder='법령명 : 조항(기간) 입력' value={data.period} />
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[2] = el) : undefined}>
        <Collapse activeKey={data.child.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='만 14세 미만 아동의 개인정보를 처리하고 있다면 그에 관한 안내를 기재할 것을 권고하고 있습니다. 현재 법정대리인의 동의를 확인하기 위해 사용하는 방법을 아래에서 선택하면, 개인정보보호위원회에서 권장하는 안내 사항과 함께 입력됩니다.' required style={{ marginBottom: 0 }} title='만 14세 미만 아동의 개인정보를 처리하나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => { onChange(sectionType, e.target.value, 'child', 'usage'); e.target.value ? onFocus('preview', 2) : undefined }} size='small' value={data.child.usage} />} />} key='1' showArrow={false}>
            <DIRowSubject required title='법정대리인의 동의 확인 방법' />
            <TreeSelect showArrow={false} treeData={examForMethod} treeCheckable={true} onChange={(value: string[]): void => onChange(sectionType, value, 'child', 'method')} onClick={() => onFocus('preview', 2)} placeholder='예시에서 선택' style={{ width: '100%' }} value={data.child.method} />
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[3] = el) : undefined}>
        <Collapse activeKey={rels.ppi.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='제3자의 목적을 위해 개인정보를 제공하면 그에 관한 사항을 반드시 안내해야 합니다. \n개인정보를 제공한 건 중 아직 ‘제공받은 자의 보유 및 이용 기간’이 남아있는 건은 해당 내용을 모두 기재해야 합니다. 만약 제공된 개인정보가 국외에서 처리되고 있다면, 그에 관한 내용도 추가로 작성되어야 합니다.\n※ 제공받는 자에 관한 내용은 별도의 페이지로 만들어 링크를 통해 확인하게 할 수도 있습니다.' required style={{ marginBottom: 0 }} title='개인정보를 제3자에게 제공하나요?' tools={<YesOrNoRadioButton disabled={refTables.ppi.length > 0 || rels.ppi.url} onChange={(e: any): void => { onFocus('preview', 3); onChange(sectionType, e.target.value, 'ppi', 'usage') }} size='small' value={rels.ppi.usage} />} />} key='1' showArrow={false}>
            <Button onClick={(): void => { onOpenModal('ppi'); onFocus('preview', 3); }} size='small' style={{ fontSize: 12, padding: '0 12px' }} type='default'>수정하기</Button>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[4] = el) : undefined}>
        <Collapse activeKey={rels.cpi.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='개인정보 처리를 위탁하고 있다면, 그에 관한 사항을 반드시 안내해야 합니다(예: AWS, 채널톡, Google Analytics 등). 만약 위탁한 개인정보가 국외에서 처리되고 있다면, 그에 관한 내용도 추가로 작성되어야 합니다.\n개인정보 처리 업무를 위해 이용하고 있는 업체명과 위탁 업무 내용이 모두 기재되어있는지 확인해주세요.' required style={{ marginBottom: 0 }} title='위탁하는 개인정보가 있나요?' tools={<YesOrNoRadioButton disabled={refTables.cpi.length > 0} onChange={(e: any): void => { onFocus('preview', 4); onChange(sectionType, e.target.value, 'cpi', 'usage') }} size='small' value={rels.cpi.usage} />} />} key='1' showArrow={false} >
            <Button onClick={(): void => { onOpenModal('cpi'); onFocus('preview', 4); }} size='small' style={{ fontSize: 12, padding: '0 12px' }} type='default'>수정하기</Button>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='보유 및 이용기간이 끝난 개인정보의 파기에 관한 안내는 필수 기재사항입니다. 이에 관하여 ‘개인정보 보호법령에서 권장하는 파기방법과 절차를 준수하고 있다’는 내용을 자동으로 입력해드립니다.' style={{ marginBottom: 0 }} title='개인정보의 파기' />
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[5] = el) : undefined}>
        <DIRowHeader description='개인정보 보호법에 따라, 서비스를 1년간 이용하지 않은 이용자의 정보는 파기하거나 분리보관해야 합니다. 개인정보보호위원회에서는 이에 대한 조치 사항을 기재할 것을 권고하고 있으며, 필수 기재항목은 아닙니다.\n현재 1년간 이용하지 않은 이용자의 정보에 대해 어떤 조치를 취하고 계신지 아래에서 선택하시면, 그에 맞는 내용이 삽입되거나 삭제됩니다.' required title='미이용자의 개인정보 파기 등에 관한 조치' />
        <Radio.Group onChange={(e: any): void => { onFocus('preview', 5); onChange(sectionType, e.target.value, 'destructionUnused', 'type') }} value={data.destructionUnused.type}>
          <Space direction='vertical'>
            <Radio key='1' value='destruction'>장기 미접속자의 개인정보를 파기합니다.</Radio>
            <Radio key='2' value='separation'>장기 미접속자의 개인정보를 분리보관합니다.</Radio>
            <Radio key='3' value='none'>기재안함</Radio>
          </Space>
        </Radio.Group>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='이용자들이 본인의 개인정보를 열람·수정·파기 등을 요청할 수 있는 권리를 보장하는 방법에 관한 안내는 필수 기재사항입니다. 이에 관하여 ‘개인정보 보호법령에서 권장하는 방법을 준수하고 있다’는 내용을 자동으로 입력해드립니다.' title='정보주체와 법정대리인의 권리·의무 및 행사방법' />
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[6] = el) : undefined}>
        <DIRowHeader description='회사가 개인정보의 안전을 위해 취하고 있는 조치는 필수 기재사항입니다. \n개인정보가 보관되는 물리적 공간(개인정보 처리시스템이 있는 전산실 또는 하드카피가 보관된 캐비넷 등)이 있는 경우, ‘예’를 선택하시면 이에 관한 내용도 입력됩니다. 추가로, 개인정보 보호에 관한 활동이나 인증을 받은 내용이 있다면 함께 기재해주세요.' title='개인정보의 안전성 확보조치' />
        <DIRowContent>
          <DIRowSubject title='개인정보를 저장하는 물리적인 공간(전산실, 자료보관실 등)이 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => { onChange(sectionType, e.target.value, 'safety', 'physical'); e.target.value ? onFocus('preview', 6) : undefined }} size='small' value={data.safety.physical} />} />
        </DIRowContent>
        <DIRowContent>
          <Collapse activeKey={data.safety.usage ? ['1'] : []} ghost>
            <Collapse.Panel header={<DIRowSubject style={{ marginBottom: 0 }} title='개인정보보호 활동을 하거나 국내외 개인정보보호 인증을 보유하고 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void =>  { onChange(sectionType, e.target.value, 'safety', 'usage'); e.target.value ? onFocus('preview', 6) : undefined }} size='small' value={data.safety.usage} />} />} key='1' showArrow={false}>
              <DIInputGroup label='개인정보보호 활동' style={{ marginBottom: 8 }}>
                <Input onChange={(e: any): void => onChange(sectionType, e.target.value, 'safety', 'activity')} placeholder='개인정보보호 관련 SNS 운영, 투명성 보고서 발간, 자율규제단체 활동 등' value={data.safety.activity} />
              </DIInputGroup>
              <DIInputGroup label='국내외 개인정보보호 인증 획득'>
                <AddableTagSelect onChange={(value: string|string[]): void => onChange(sectionType, value, 'safety', 'certification')} options={examForCert} placeholder='선택 및 직접입력' value={data.safety.certification} />
              </DIInputGroup>
            </Collapse.Panel>
          </Collapse>
        </DIRowContent> 
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='쿠키(cookie)나 트래픽 분석도구(e.g., Google Analytics, Naver Analytics) 등과 같이 개인정보를 자동으로 수집하는 장치를 사용하는 경우, 설치·운영 및 그 거부에 관한 사항을 기재해야 합니다.\n수정이 필요한 경우, 이전 단계로 이동하여 내용을 변경하시면 자동으로 반영됩니다.' style={{ marginBottom: 0 }} title='개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항' />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='이용자의 온라인 행태정보를 처리하고 이를 기반으로 ‘온라인 맞춤형 광고’ 등을 제공하는 경우, 그에 관한 사항을 기재하여야 합니다. 수정이 필요한 경우, 이전 단계로 이동하여 내용을 변경하시면 자동으로 반영됩니다.' style={{ marginBottom: 0 }} title='행태정보의 수집·이용 및 거부 등에 관한 사항' />
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='정보주체의 동의 없이 개인정보를 추가적으로 이용·제공하는 경우, 개인정보 보호법령에 명시된 고려사항에 대해 이용이 가능하다고 판단한 기준을 기재해야 합니다.\n수정이 필요한 경우, 이전 단계로 이동하여 내용을 변경하시면 자동으로 반영됩니다.' style={{ marginBottom: 0 }} title='추가적인 이용·제공 판단기준' />
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[7] = el) : undefined}>
        <Collapse activeKey={rels.fni.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='개인정보처리자는 개인정보 보호법 제28조의2에 따라 개인정보를 가명처리 하거나 가명처리된 정보를 처리하는 경우, 이에 관한 내용을 개인정보 처리방침에 기재해야 합니다.\n‘수정하기’ 버튼을 눌러 내용을 변경하시면 자동으로 저장 및 반영됩니다.' required style={{ marginBottom: 0 }} title='가명정보를 처리하나요?' tools={<YesOrNoRadioButton disabled={refTables.fni.length > 0} onChange={(e: any): void => { onChange(sectionType, e.target.value, 'fni', 'usage'); e.target.value ? onFocus('preview', 7) : undefined }} size='small' value={rels.fni.usage} />} />} key='1' showArrow={false} >
            <Button onClick={(): void => { onOpenModal('fni'); onFocus('preview', 7); }} type='default' size='small' style={{ fontSize: 12, padding: '0 12px' }}>수정하기</Button>
          </Collapse.Panel>
        </Collapse>
      </DIRow>
      <DIRowDivider />
      <DIRow self={refElements ? (el: any) => (refElements.current[8] = el) : undefined}>
        <DIRowHeader title='개인정보 보호책임자 및 개인정보 열람청구' />
        <DIRowSubject description='개인정보 보호책임자의 성명, 부서의 명칭과 연락처에 관한 안내는 필수 기재사항입니다. 연락처의 경우 직통 연락처가 아닌, 정보주체의 개인정보 관련 문의나 고충처리를 담당하는 개인정보 보호책임자의 소속 부서 연락처 등을 기재해도 됩니다.' required title='개인정보 보호책임자' />
        {/* <Row gutter={8} style={{ marginBottom: 24 }}>
          <Col span={7}>
            <DIInputGroup label='직책'>
              <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'manager', 'charger', 'position')} onClick={() => onFocus('preview', 8)} value={data.manager.charger.position} />
            </DIInputGroup>
          </Col>
          <Col span={7}>
            <DIInputGroup label='성명'>
              <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'manager', 'charger', 'name')} onClick={() => onFocus('preview', 8)} value={data.manager.charger.name} />
            </DIInputGroup>
          </Col>
          <Col span={10}>
            <DIInputGroup label='연락처'>
              <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'manager', 'charger', 'contact')} onClick={() => onFocus('preview', 8)} placeholder='예 : privacy@company.com' value={data.manager.charger.contact} />
            </DIInputGroup>
          </Col>
        </Row> */}
        {/* <Button size='small' style={{ fontSize: 12, marginBottom: 24, padding: '0 12px' }} type='default'>수정하기</Button> */}
        <DIRowSubject description='필요에 따라 개인정보보호 담당부서와 연락처 정보도 함께 안내하는 것을 권장합니다.' title='개인정보보호 담당부서' />
        <Row gutter={8} style={{ marginBottom: 24 }}>
          <Col span={10}>
            <DIInputGroup label='부서명'>
              <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'manager', 'department', 'name')} onClick={() => onFocus('preview', 8)} placeholder='예 : 정보보안팀' value={data.manager.department.name} />
            </DIInputGroup>
          </Col>
          <Col span={14}>
            <DIInputGroup label='연락처'>
              <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'manager', 'department', 'contact')} onClick={() => onFocus('preview', 8)} placeholder='예 : privacy@company.com' value={data.manager.department.contact} />
            </DIInputGroup>
          </Col>
        </Row>
        <DIRowSubject description='이용자들이 개인정보 열람청구를 신청할 수 있는 부서명과 담당자 및 연락처에 관한 안내는 필수 기재사항입니다.' required title='개인정보 열람청구' />
        <Row gutter={8}>
          <Col span={7}>
            <DIInputGroup label='부서명'>
              <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'manager', 'request', 'department')} onClick={() => onFocus('preview', 8)} placeholder='예 : 정보보안팀' value={data.manager.request.department} />
            </DIInputGroup>
          </Col>
          <Col span={7}>
            <DIInputGroup label='담당자명'>
              <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'manager', 'request', 'charger')} onClick={() => onFocus('preview', 8)} placeholder='예 : 김OO' value={data.manager.request.charger} />
            </DIInputGroup>
          </Col>
          <Col span={10}>
            <DIInputGroup label='연락처'>
              <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'manager', 'request', 'contact')} onClick={() => onFocus('preview', 8)} placeholder='예 : privacy@company.com' value={data.manager.request.contact} />
            </DIInputGroup>
          </Col>
        </Row>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <DIRowHeader description='이용자가 개인정보 침해에 대한 구제를 받을 수 있도록 법에 따른 전문기관 및 수사기관 등을 안내해야 합니다. 개인정보처리자를 통한 피해구제가 원만하게 이뤄지지 않을 경우, 정보주체가 추가적으로 피해 구제를 요청할 수 있는 방법에 관한 안내 또한 필수 기재사항입니다. 이에 관하여 개인정보보호위원회에서 권장하는 안내문을 자동으로 입력해드립니다.' style={{ marginBottom: 0 }} title='권익침해 구제방법' />
      </DIRow>
      <DIRowDivider />
      <DIRow style={{ marginBottom: 80 }}>
        <DIRowHeader description='CCTV 운영자는 ‘영상정보처리기기 운영·관리 방침’을 별도로 정하여 공개해야 합니다. 개인정보 보호법 표준지침에 따라 개인정보 처리방침에 포함시켜 정할 수도 있으나, 가독성을 높이기 위해 별도의 문서로 마련할 것을 권장드립니다.\n‘영상정보처리기기 운영·관리 방침’ 작성 템플릿은 추후 서비스 제공 예정입니다.' style={{ marginBottom: 0 }} title='영상정보처리기기(CCTV)를 운영하나요?' />
      </DIRow>
    </>
  );
}
/** [Component] 개인정보 처리방침 편집을 위한 Preview section */
export const PreviewSection: React.FC<PreviewSectionProps> = ({ data, preview, prevList, refElements, refTables, rels, serviceTypes, stmt }: PreviewSectionProps): JSX.Element => {
  // 서비스 유형에 따른 쿠키 설정법
  const settingsForAuto: string[] = [];
  const settingsForShape: string[] = [];
  if (serviceTypes.includes('default') || serviceTypes.includes('web')) {
    settingsForAuto.push(...stmt.auto.content.web[1]);
    settingsForShape.push(...stmt.shape.content.web[1]);
  }
  if (serviceTypes.includes('app')) {
    settingsForAuto.push(...stmt.auto.content.app[1]);
    settingsForShape.push(...stmt.shape.content.app[1]);
  }

  // 웹 로그 분석도구 사용 여부에 따른 문구
  const webLogMethod: string[] = useMemo(() => {
    let temp: string[] = [...data.aInfo.webLog.method];
    if (temp.includes('[웹 브라우저] (거부 방법 자동입력)')) {
      temp = temp.filter((elem: string): boolean => elem !== '[웹 브라우저] (거부 방법 자동입력)');
      temp.push('[Internet Explorer] 도구 → 인터넷 옵션 → 개인정보 → 설정 → 고급 → "쿠키의 차단" 선택', '[Microsoft Edge] 설정 → 개인정보, 검색 및 서비스 → 추적방지 → "추적방지 엄격" 선택, "Inprivate를 검색할 때 항상 엄격 추적 방지 사용", "추적 안함 요청보내기" 선택', '[Chrome] 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이 데이터 → "쿠키 차단" 선택', '[Naver whale] 설정 → 개인정보 보호 → 쿠키 및 기타 사이트 데이터 → "타사 쿠키 차단" 선택', '[Firefox] 우클릭 → 페이지 정보 → 권한 → 쿠키 저장 → "기본 설정 이용" 해제, "차단" 선택');
    }
    return temp;
  }, [data.aInfo.webLog.method]);
  // let webLogMethod: string[] = [...data.aInfo.webLog.method];
  // if (data.aInfo.webLog.method.includes('[웹 브라우저] (거부 방법 자동입력)')) {
  //   webLogMethod = data.aInfo.webLog.method.filter((elem: string): boolean => elem !== '[웹 브라우저] (거부 방법 자동입력)');
  //   webLogMethod.push('[Internet Explorer] 도구 → 인터넷 옵션 → 개인정보 → 설정 → 고급 → "쿠키의 차단" 선택', '[Microsoft Edge] 설정 → 개인정보, 검색 및 서비스 → 추적방지 → "추적방지 엄격" 선택, "Inprivate를 검색할 때 항상 엄격 추적 방지 사용", "추적 안함 요청보내기" 선택', '[Chrome] 설정 → 개인정보 및 보안 → 쿠키 및 기타 사이 데이터 → "쿠키 차단" 선택', '[Naver whale] 설정 → 개인정보 보호 → 쿠키 및 기타 사이트 데이터 → "타사 쿠키 차단" 선택', '[Firefox] 우클릭 → 페이지 정보 → 권한 → 쿠키 저장 → "기본 설정 이용" 해제, "차단" 선택');
  // }
  // 개인정보 보호책임자 테이블 데이터
  const managerTableData: any[] = useMemo(() => {
    const temp: any[] = [];
    if (!blankCheck(data.dInfo.manager.charger.name) || !blankCheck(data.dInfo.manager.charger.position) || !blankCheck(data.dInfo.manager.charger.contact)) {
      temp.push({ identity: '개인정보 보호책임자', charger: !blankCheck(data.dInfo.manager.charger.name) && !blankCheck(data.dInfo.manager.charger.position) ? [`직책 : ${data.dInfo.manager.charger.position}`, `성명 : ${data.dInfo.manager.charger.name}`] : !blankCheck(data.dInfo.manager.charger.position) ? [`직책 : ${data.dInfo.manager.charger.position}`] : !blankCheck(data.dInfo.manager.charger.name) ? [`성명 : ${data.dInfo.manager.charger.name}`] : [], contact: !blankCheck(data.dInfo.manager.charger.contact) ? data.dInfo.manager.charger.contact : '' });
    }
    if (!blankCheck(data.dInfo.manager.department.name) || !blankCheck(data.dInfo.manager.department.contact)) {
      temp.push({ identity: '개인정보 담당부서', charger: !blankCheck(data.dInfo.manager.department.name) ? [`부서명 : ${data.dInfo.manager.department.name}`] : [], contact: !blankCheck(data.dInfo.manager.department.contact) ? data.dInfo.manager.department.contact : '' });
    }
    if (!blankCheck(data.dInfo.manager.request.department) || !blankCheck(data.dInfo.manager.request.charger) || !blankCheck(data.dInfo.manager.request.contact)) {
      temp.push({ identity: '개인정보 열람청구', charger: !blankCheck(data.dInfo.manager.request.department) && !blankCheck(data.dInfo.manager.request.charger) ? [`부서명 : ${data.dInfo.manager.request.department}`, `담당자 성명 : ${data.dInfo.manager.request.charger}`] : !blankCheck(data.dInfo.manager.request.department) ? [`부서명 : ${data.dInfo.manager.request.department}`] : !blankCheck(data.dInfo.manager.request.charger) ? [`담당자 성명 : ${data.dInfo.manager.request.charger}`] : [], contact: !blankCheck(data.dInfo.manager.request.contact) ? data.dInfo.manager.request.contact : '' });
    }
    return temp;
  }, [data.dInfo.manager]);
  
  // if (!blankCheck(data.dInfo.manager.charger.name) || !blankCheck(data.dInfo.manager.charger.position) || !blankCheck(data.dInfo.manager.charger.contact)) {
  //   managerTableData.push({ identity: '개인정보 보호책임자', charger: !blankCheck(data.dInfo.manager.charger.name) && !blankCheck(data.dInfo.manager.charger.position) ? [`직책 : ${data.dInfo.manager.charger.position}`, `성명 : ${data.dInfo.manager.charger.name}`] : !blankCheck(data.dInfo.manager.charger.position) ? [`직책 : ${data.dInfo.manager.charger.position}`] : !blankCheck(data.dInfo.manager.charger.name) ? [`성명 : ${data.dInfo.manager.charger.name}`] : [], contact: !blankCheck(data.dInfo.manager.charger.contact) ? data.dInfo.manager.charger.contact : '' });
  // }
  // if (!blankCheck(data.dInfo.manager.department.name) || !blankCheck(data.dInfo.manager.department.contact)) {
  //   managerTableData.push({ identity: '개인정보 담당부서', charger: !blankCheck(data.dInfo.manager.department.name) ? [`부서명 : ${data.dInfo.manager.department.name}`] : [], contact: !blankCheck(data.dInfo.manager.department.contact) ? data.dInfo.manager.department.contact : '' });
  // }
  // if (!blankCheck(data.dInfo.manager.request.department) || !blankCheck(data.dInfo.manager.request.charger) || !blankCheck(data.dInfo.manager.request.contact)) {
  //   managerTableData.push({ identity: '개인정보 열람청구', charger: !blankCheck(data.dInfo.manager.request.department) && !blankCheck(data.dInfo.manager.request.charger) ? [`부서명 : ${data.dInfo.manager.request.department}`, `담당자 성명 : ${data.dInfo.manager.request.charger}`] : !blankCheck(data.dInfo.manager.request.department) ? [`부서명 : ${data.dInfo.manager.request.department}`] : !blankCheck(data.dInfo.manager.request.charger) ? [`담당자 성명 : ${data.dInfo.manager.request.charger}`] : [], contact: !blankCheck(data.dInfo.manager.request.contact) ? data.dInfo.manager.request.contact : '' });
  // }
  // 개인정보 수집 및 이용 데이터 및 라벨링을 위한 데이터 가공 (개인정보 수집 항목)
  const itemForPI: string[] = [];
  const pi: any[] = refTables.pi ? refTables.pi.map((row: any): void => {
    const edited: any = {};
    Object.keys(row).forEach((key: string): void => {
      if (key === 'essentialItems' && row[key].length > 0) {
        if (edited.items === undefined) {
          edited.items = [];
        }
        edited.items.push(`필수 : ${row[key].join(', ')}`);
        row[key].forEach((item: string): number => !itemForPI.includes(item) ? itemForPI.push(item) : 0);
      } else if (key === 'selectionItems' && row[key].length > 0) {
        if (edited.items === undefined) {
          edited.items = [];
        }
        edited.items.push(`선택 : ${row[key].join(', ')}`);
        row[key].forEach((item: string): number => !itemForPI.includes(item) ? itemForPI.push(item) : 0);
      } else {
        edited[key] = row[key];
      }
    });
    return edited;
  }) : [];
  // 이전 개인정보 처리방침 목록
  let prevPIPPList: any[] = useMemo(() => {
    const temp: any[] = [];
    if (!preview && data.cInfo.previous.usage) {
      temp.push({ label: '이전 개인정보 처리방침', value: `https://${data.cInfo.previous.url}` });
    }
    if (prevList) {
      temp.unshift(...prevList.map((item: any): any => ({ label: moment.unix(item.applyAt).format('YYYY-MM-DD'), value: item.url })));
    }
    return temp;
  }, [data.cInfo.previous, prevList, preview]);
  // 라벨링을 위한 데이터 (제3자 제공)
  let provision: string[] = useMemo(() => !preview ? refTables.ppi ? refTables.ppi.map((row: any): string => row.recipient) : [] : [], [refTables.ppi, preview]);
  // 라벨링을 위한 데이터 (위탁)
  let consignment: string[] = useMemo(() => !preview ? refTables.cpi ? refTables.cpi.map((row: any): string => row.subject) : [] : [], [refTables.cpi, preview]);
  // 라벨링을 위한 데이터 (수집 및 이용 목적)
  const purposeForPI: string[] = useMemo(() =>!preview ? refTables.pi ? refTables.pi.reduce((acc: any, row: any): void => {
    for (const elem of row.purpose) {
      if (!acc.includes(elem)) acc.push(elem);
    }
    return acc;
  }, []) : [] : [], [refTables.pi, preview]);
  // 라벨링을 위한 데이터 (수집 및 이용기간)
  const periodForPI: string[] = useMemo(() =>!preview ? refTables.pi ? refTables.pi.reduce((acc: any, row: any): void => {
    for (const elem of row.period) {
      if (!acc.includes(elem)) acc.push(elem);
    }
    return acc;
  }, []) : [] : [], [refTables.pi, preview]);
  // if (!preview) {
    // 라벨링을 위한 데이터 가공 (개인정보 처리목적)
    // refTables.pi ? refTables.pi.forEach((row: any): void => row.purpose.forEach((item: string): number => !purposeForPI.includes(item) ? purposeForPI.push(item) : 0)) : undefined;
    // 라벨링을 위한 데이터 가공 (개인정보 보유기간)
    // refTables.pi ? refTables.pi.forEach((row: any): void => row.period.forEach((item: string): number => !periodForPI.includes(item) ? periodForPI.push(item) : 0)) : undefined;
    // 라벨링을 위한 데이터 가공 (개인정보의 제공)
    // provision = ;
    // 라벨링을 위한 데이터 가공 (처리 위탁)
    // consignment = refTables.cpi ? refTables.cpi.map((row: any): string => row.subject) : [];
    // 이전 개인정보 처리방침 목록 생성
    // if (data.cInfo.previous.usage) {
    //   prevPIPPList.push({ label: '이전 개인정보 처리방침', value: `https://${data.cInfo.previous.url}` });
    // }
  // }
  // 이전 개인정보 처리방침 리스트 추가
  // prevList ? prevPIPPList.unshift(...prevList.map((item: any): any => ({ label: moment.unix(item.applyAt).format('YYYY-MM-DD'), value: item.url }))) : undefined;

  // 컴포넌트 반환
  return (
    <div id={preview ? 'preview' : 'report'}>
      <h2 ref={refElements ? (el: any) => (refElements.current[0] = el) : undefined} style={{ fontSize: preview ? 18 : 24, fontWeight: '700', lineHeight: '22px', marginBottom: 30, textAlign: 'center' }}>{stmt.title}</h2>
      {!preview ? (
        <p style={{ color: '#262626', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 32, textAlign: 'right' }}>적용일자 : {moment.unix(data.cInfo.applyAt).format('YYYY-MM-DD')}</p>
      ) : (<></>)}
      <DDRow>
        <DDRowContent items={[`${stmt.introduction}`]} />
      </DDRow>
      {!preview ? (
        <>
          <DRLabelingHeader description='세부항목은 개인정보 처리방침 본문 확인' title='주요 개인정보 처리 표시' />
          <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center', marginBottom: 56 }}>
            {itemForPI.length > 0 ? (
              <DRLabelingItem type='item' tooltip={itemForPI.length > 5 ? `${itemForPI.slice(0, 5).join(', ')} 등` : itemForPI.join(', ')} />
            ) : (<></>)}
            {purposeForPI.length > 0 ? (
              <DRLabelingItem type='purpose' tooltip={purposeForPI.length > 3 ? `${purposeForPI.slice(0, 3).join(', ')} 등` : purposeForPI.join(', ')} />
            ) : (<></>)}
            {periodForPI.length > 0 ? (
              <DRLabelingItem type='period' tooltip={periodForPI.length > 2 ? `${periodForPI.slice(0, 2).join(', ')} 등` : periodForPI.join(', ')} />
            ) : (<></>)}
            {provision.length > 0 ? (
              <DRLabelingItem type='provision' tooltip={provision.length > 2 ? `${provision.slice(0, 2).join(', ')} 등` : provision.join(', ')} />
            ) : (<></>)}
            {consignment.length > 0 ? (
              <DRLabelingItem type='consignment' tooltip={consignment.length > 3 ? `${consignment.slice(0, 3).join(', ')} 등` : consignment.join(', ')} />
            ) : (<></>)}
            <DRLabelingItem type='complaint' tooltip={`담당부서명 : ${data.dInfo.manager.request.department}, 연락처 : ${data.dInfo.manager.request.contact}`} />
          </div>
        </>
      ) : (<></>)}
      {!preview ? (
        <DTCForm>
          <DTCItem content='개인정보의 처리목적, 수집 항목, 보유 및 이용기간' />
          {data.dInfo.child.usage ? (
            <DTCItem content='만 14세 미만 아동의 개인정보 처리에 관한 사항' />
          ) : (<></>)}
          {rels.ppi.usage ? (
            <DTCItem content='개인정보의 제3자 제공' />
          ) : (<></>)}
          {rels.cpi.usage ? (
            <DTCItem content='개인정보처리의 위탁' />
          ) : (<></>)}
          <DTCItem content='개인정보의 파기 및 절차' />
          {data.dInfo.destructionUnused.type && data.dInfo.destructionUnused.type !== 'none'  ? (
            <DTCItem content='미이용자의 개인정보 파기 등에 관한 조치' />
          ) : (<></>)}
          <DTCItem content='정보주체와 법정대리인의 권리·의무 및 행사방법' />
          {data.dInfo.safety.usage ? (
            <DTCItem content='개인정보의 안전성 확보조치' />
          ) : (<></>)}
          <DTCItem content='개인정보의 자동 수집 장치의 설치·운영 및 거부에 관한 사항' />
          <DTCItem content='행태정보의 수집·이용 및 거부 등에 관한 사항' />
          <DTCItem content='추가적인 이용·제공 판단기준' />
          {rels.fni.usage ? (
            <DTCItem content='가명정보의 처리' />
          ) : (<></>)}
          <DTCItem content='개인정보보호책임자 및 개인정보 열람청구' />
          <DTCItem content='권익침해 구제 방법' />
        </DTCForm>
      ) : (<></>)}
      <DDRow self={refElements ? (el: any) => (refElements.current[1] = el) : undefined}>
        <DDRowHeader title={stmt.pi.title} />
        <DDRowContent items={stmt.pi.content.common[1]} />
        <ReadableTable columns={[
          { title: '구분(업무명)', dataIndex: 'subject', key: 'subject', width: '16%' },
          { title: '처리 목적', dataIndex: 'purpose', key: 'purpose', render: (value: string[]) => (<ListInTable items={value} />), width: '24%' },
          { title: '수집 항목', dataIndex: 'items', key: 'items', render: (value: string[]) => value ? value.map((item: string, index: number): JSX.Element => <div key={index}>{item}</div>) : undefined, width: '36%' },
          { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]) => (<ListInTable items={value} />), width: '24%' },
        ]} dataSource={pi} />
        <DDRowContent items={stmt.pi.content.common[2]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={data.dInfo.period} />
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[2] = el) : undefined}>
        {data.dInfo.child.usage ? (
          <>
            <DDRowHeader title={stmt.child.title} />
            <DDRowContent items={stmt.child.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={data.dInfo.child.method} />
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[3] = el) : undefined}>
        {rels.ppi.usage ? (
          <>
            <DDRowHeader title={stmt.ppi.title} />
            <DDRowContent items={stmt.ppi.content.common[1]} links={rels.ppi.url ? ['', rels.ppi.url] : undefined} style={{ marginBottom: 0 }} />
            {refTables.ppi.some((row: any): boolean => !('url' in row)) ? (
              <ReadableTable columns={[
                { title: '제공받는 자', dataIndex: 'recipient', key: 'recipient', width: '16%' },
                { title: '제공받는 자의 목적', dataIndex: 'purpose', key: 'purpose', render: (values: string[]) => (<ListInTable items={values} />), width: '24%' },
                { title: '제공 항목', dataIndex: 'items', key: 'items', render: (values: string[]) => values ? (<>{values.join(', ')}</>) : undefined, width: '36%' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (values: string[]) => (<ListInTable items={values} />), width: '24%' },
              ]} dataSource={refTables.ppi} style={{ marginTop: 8 }} />
            ) : (<></>)}
            {refTables.ppi ? refTables.ppi.some((item: any): boolean => item.isForeign) ? (
              <>
                <DDRowContent items={stmt.ppi.content.foreign[1]} style={{ marginTop: 8 }} />
                <ReadableTable columns={[
                  { title: '업체명', dataIndex: 'recipient', key: 'recipient', width: '15%', },
                  { title: '국가', dataIndex: 'country', key: 'country', width: '11%' },
                  { title: '위치', dataIndex: 'location', key: 'location', width: '22%' },
                  { title: '일시 및 방법', dataIndex: 'method', key: 'method', render: (values: string[]) => (<ListInTable items={values} />), width: '30%' },
                  { title: '관리책임자의 연락처', dataIndex: 'charger', key: 'charger', render: (values: string[]) => (<ListInTable items={values} />), width: '22%' }
                ]} dataSource={refTables.ppi ? refTables.ppi.filter((item: any): boolean => item.isForeign) : []} />
              </>
            ) : (<></>) : (<></>)}
            <DDRowContent items={stmt.ppi.content.common[2]} links={stmt.ppi.content.common.link} />
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[4] = el) : undefined}>
        {rels.cpi.usage ? (
          <>
            <DDRowHeader title={stmt.cpi.title} />
            <DDRowContent items={stmt.cpi.content.common[1]} links={rels.cpi.url ? [rels.cpi.url] : undefined} style={{ marginBottom: 8 }} />
            {refTables.cpi.some((row: any): boolean => !('url' in row)) ? (
              <ReadableTable columns={[
                { title: '위탁받는 자(수탁자)', dataIndex: 'company', key: 'company', width: '42%' },
                { title: '위탁업무', dataIndex: 'content', key: 'content', render: (value: string[]) => (<ListInTable items={value} />), width: '58%' },
              ]} dataSource={refTables.cpi} style={{ marginTop: 8 }} />
            ) : (<></>)}
            {refTables.cpi ? refTables.cpi.some((item: any): boolean => item.isForeign) ? (
              <>
                <DDRowContent items={stmt.cpi.content.foreign[1]} style={{ marginTop: 8 }} />
                <ReadableTable columns={[
                  { title: '업체명', dataIndex: 'company', key: 'company' },
                  { title: '국가', dataIndex: 'country', key: 'country' },
                  { title: '위치', dataIndex: 'address', key: 'address' },
                  { title: '일시 및 방법', dataIndex: 'method', key: 'method', render: (values: string[]) => (<ListInTable items={values} />) },
                  { title: '이전 항목', dataIndex: 'items', key: 'items', render: (values: string[]) => values ? (<>{values.join(', ')}</>) : undefined },
                  { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (values: string[]) => (<ListInTable items={values} />) },
                  { title: '관리책임자의 연락처', dataIndex: 'charger', key: 'charger', render: (values: string[]) => (<ListInTable items={values} />) }
                ]} dataSource={refTables.cpi ? refTables.cpi.filter((item: any): boolean => item.isForeign) : []} />
              </>
            ) : (<></>) : (<></>)}
            <DDRowContent items={stmt.cpi.content.common[2]} />
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.dpi.title} />
        <DDRowContent items={stmt.dpi.content.common[1]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={stmt.dpi.content.common[2]} />
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[5] = el) : undefined}>
        {data.dInfo.destructionUnused.type !== undefined && data.dInfo.destructionUnused.type !== 'none' ? (
          <>
            <DDRowHeader title={stmt.dpiUnused.title} />
            {data.dInfo.destructionUnused.type === 'destruction' ? (
              <DDRowContent items={stmt.dpiUnused.content.common[1]} />
            ) : (
              <DDRowContent items={stmt.dpiUnused.content.separation[1]} />
            )}
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.agent.title} />
        <DDRowContent items={stmt.agent.content.common[1]} />
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[6] = el) : undefined}>
        <DDRowHeader title={stmt.safety.title} />
        <DDRowContent items={stmt.safety.content.common[1]} style={{ marginBottom: 0 }} />
        {data.dInfo.safety.physical ? (
          <DDRowContent items={stmt.safety.content.physical[1]} />
        ) : (<></>)}
        {data.dInfo.safety.usage ? (
          <>
            <DDRowContent items={stmt.safety.content.common[2]} style={{ marginBottom: 0 }} />
            {data.dInfo.safety.activity !== '' && data.dInfo.safety.certification.length > 0 ? (
              <DDRowItemList items={[`개인정보보호 활동 : ${data.dInfo.safety.activity}`, `국내외 개인정보보호 인증 획득: ${data.dInfo.safety.certification.join(', ')}`]} />
            ) : data.dInfo.safety.activity !== '' ? (
              <DDRowItemList items={[`개인정보보호 활동 : ${data.dInfo.safety.activity}`]} />
            ) : data.dInfo.safety.certification.length > 0 ? (
              <DDRowItemList items={[`국내외 개인정보보호 인증 획득: ${data.dInfo.safety.certification.join(', ')}`]} />
            ) : (<></>)}
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.auto.title} />
        {data.aInfo.cookie.usage && data.aInfo.webLog.usage ? (
          <>
            <DDRowContent items={stmt.auto.content.cookie[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={[
              `1) 쿠키의 사용 목적 : ${data.aInfo.cookie.purpose.join(', ')}`,
              `2) 쿠키 저장 거부 시 불이익 : ${data.aInfo.cookie.disadvantage.join(', ')}`,
              '3) 쿠키의 설치·운영 및 거부 : 브라우저나 앱의 종류에 따라 아래의 방법으로 쿠키의 저장을 거부할 수 있습니다.'
            ]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={settingsForAuto} links={stmt.auto.content.web.link} />
            <DDRowContent items={stmt.auto.content.webLog[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={[
              `1) 웹 로그 분석 도구의 사용 목적 : ${data.aInfo.webLog.purpose.join(', ')}`,
              '2) 웹 로그 분석 도구의 거부∙차단 방법 :'
            ]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={webLogMethod} />
            <DDRowContent items={[
              `3) 거부 시 불이익 : ${data.aInfo.webLog.disadvantage}`
            ]} />
          </>
        ) : data.aInfo.cookie.usage ? (
          <>
            <DDRowContent items={stmt.auto.content.cookie[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={[
              `1) 쿠키의 사용 목적 : ${data.aInfo.cookie.purpose.join(', ')}`,
              `2) 쿠키 저장 거부 시 불이익 : ${data.aInfo.cookie.disadvantage.join(', ')}`,
              '3) 쿠키의 설치·운영 및 거부 : 브라우저나 앱의 종류에 따라 아래의 방법으로 쿠키의 저장을 거부할 수 있습니다.'
            ]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={settingsForAuto} links={stmt.auto.content.web.link} />
          </>
        ) : data.aInfo.webLog.usage ? (
          <>
            <DDRowContent items={stmt.auto.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.auto.content.webLog[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={[
              `1) 웹 로그 분석 도구의 사용 목적 : ${data.aInfo.webLog.purpose.join(', ')}`,
              '2) 웹 로그 분석 도구의 거부∙차단 방법 :'
            ]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={webLogMethod} />
            <DDRowContent items={[
              `3) 거부 시 불이익 : ${data.aInfo.webLog.disadvantage}`
            ]} />
          </>
        ) : (<DDRowContent items={stmt.auto.content.none[1]} />)}
      </DDRow>
      <DDRow>
        <DDRowHeader title={stmt.shape.title} />
        {data.aInfo.advertising.usage && data.aInfo.thirdParty.usage ? (
          <>
            <DDRowContent items={stmt.shape.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.advertising.common[1]} />
            <ReadableTable
              columns={[
                { title: '행태정보 수집 항목', dataIndex: 'items', key: 'items', width: '24%' },
                { title: '수집 방법', dataIndex: 'method', key: 'method', width: '26%' },
                { title: '수집 목적', dataIndex: 'purpose', key: 'purpose', width: '26%' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', width: '24%' }]}
              dataSource={[
                { 
                  key: '1',
                  items: data.aInfo.advertising.items.join(', '),
                  method: data.aInfo.advertising.method,
                  purpose: data.aInfo.advertising.purpose,
                  period: data.aInfo.advertising.period
                }]}
            />
            <DDRowContent items={stmt.shape.content.thirdParty.common[1]}/>
            <DDRowItemList items={[
              `행태정보를 수집 및 처리하려는 광고 사업자: ${data.aInfo.thirdParty.company.join(', ')}`,
              `형태 정보 수집 방법: ${data.aInfo.thirdParty.method}`,
              `수집∙처리되는 행태정보 항목: ${data.aInfo.thirdParty.items.join(', ')}`,
              `보유 및 이용기간: ${data.aInfo.thirdParty.period}`
            ]} />
            <DDRowContent items={stmt.shape.content.common[2]} style={{ marginBottom: 0 }} />

            <DDRowContent items={stmt.shape.content.app[1].concat(stmt.shape.content.web[1])} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.common[3]} />
          </>
        ) : data.aInfo.advertising.usage ? (
          <>
            <DDRowContent items={stmt.shape.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.advertising.common[1]} />
            <ReadableTable
              columns={[
                { title: '행태정보 수집 항목', dataIndex: 'items', key: 'items', width: '24%' },
                { title: '수집 방법', dataIndex: 'method', key: 'method', width: '26%' },
                { title: '수집 목적', dataIndex: 'purpose', key: 'purpose', width: '26%' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', width: '24%' }]}
              dataSource={[
                {
                  key: '1',
                  items: data.aInfo.advertising.items.join(', '),
                  method: data.aInfo.advertising.method,
                  purpose: data.aInfo.advertising.purpose,
                  period: data.aInfo.advertising.period
                }]}
            />
            <DDRowContent items={stmt.shape.content.thirdParty.none[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.common[2]} style={{ marginBottom: 0 }} />
            <DDRowContent items={settingsForShape} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.common[3]} />
          </>
        ) : data.aInfo.thirdParty.usage ? (
          <>
            <DDRowContent items={stmt.shape.content.common[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.advertising.none[1]} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.thirdParty.common[1]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={[
              `행태정보를 수집 및 처리하려는 광고 사업자 : ${data.aInfo.thirdParty.company.join(', ')}`,
              `형태 정보 수집 방법 : ${data.aInfo.thirdParty.method}`,
              `수집∙처리되는 행태정보 항목 : ${data.aInfo.thirdParty.items.join(', ')}`,
              `보유 및 이용기간 : ${data.aInfo.thirdParty.period}`
            ]} />
            <DDRowContent items={stmt.shape.content.common[2]} style={{ marginBottom: 0}} />
            <DDRowContent items={settingsForShape} style={{ marginBottom: 0 }} />
            <DDRowContent items={stmt.shape.content.common[3]} />
          </>
        ) : (
          <DDRowContent items={stmt.shape.content.none[1]} />
        )}
      </DDRow>
      <DDRow>
        {data.aInfo.additional.usage ? (
          <>
            <DDRowHeader title={stmt.additional.title} />
            <DDRowContent items={stmt.additional.content.common[1]} />
            <ReadableTable
              columns={[
                { title: '항목', dataIndex: 'items', key: 'items', width: '24%' },
                { title: '이용·제공 목적', dataIndex: 'purpose', key: 'purpose', width: '38%' },
                { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', width: '38%' }]}
              dataSource={[
                { 
                  key: '1',
                  items: data.aInfo.additional.items.join(', '),
                  purpose: data.aInfo.additional.purpose,
                  period: data.aInfo.additional.period
                }]}
            />
            <DDRowContent items={stmt.additional.content.common[2]} style={{ marginBottom: 0 }} />
            <DDRowItemList items={stmt.additional.content.common[3]} />
          </>
        ) : (
          <></>
        )}
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[7] = el) : undefined}>
        {rels.fni.usage ? (
          <>
            <DDRowHeader title={stmt.fni.title} />
            <DDRowContent items={stmt.fni.content.common[1]} style={{ marginBottom: 0 }} />
            {refTables.fni && refTables.fni.length > 0 ? (
              <>
                <DDRowItemList items={['가명정보의 처리에 관한 사항']} style={{ marginBottom: 4, marginTop: 8 }} />
                <ReadableTable columns={[
                  { title: '구분', dataIndex: 'subject', key: 'subject', width: '20%' },
                  { title: '처리 목적', dataIndex: 'purpose', key: 'purpose', width: '30%' },
                  { title: '처리 항목', dataIndex: 'items', key: 'items', render: (value: string[]): JSX.Element => (<>{value.join(', ')}</>), width: '24%' },
                  { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]): JSX.Element => (<ListInTable items={value} />), width: '26%' }
                ]} dataSource={refTables.fni} />
              </>
            ) : (<></>)}
            {(refTables.pfni && refTables.pfni.length > 0) || rels.pfni && rels.pfni.url ? (
              <>
                <DDRowItemList items={['가명정보의 제3자 제공에 관한 사항']} links={[rels.pfni.url]} style={{ marginBottom: 4 }} />
                {refTables.pfni && refTables.pfni.length > 0 ? (
                  <ReadableTable columns={[
                    { title: '제공받는 자', dataIndex: 'recipient', key: 'recipent', width: '20%' },
                    { title: '제공 목적', dataIndex: 'purpose', key: 'purpose', render: (value: string[]): JSX.Element => (<ListInTable items={value} />), width: '30%' },
                    { title: '제공 항목', dataIndex: 'items', key: 'items', render: (value: string[]): JSX.Element => (<>{value.join(', ')}</>), width: '24%' },
                    { title: '보유 및 이용기간', dataIndex: 'period', key: 'period', render: (value: string[]): JSX.Element => (<ListInTable items={value} />), width: '26%' }
                  ]} dataSource={refTables.pfni} />
                ) : (<></>)}
              </>
            ) : (<></>)}
            {(refTables.cfni && refTables.cfni.length > 0) || rels.cfni && rels.cfni.url ? (
              <>
                <DDRowItemList items={['가명정보 처리의 위탁에 관한 사항']} style={{ marginBottom: 4 }} />
                {refTables.cfni && refTables.cfni.length > 0 ? (
                  <ReadableTable columns={[
                    { title: '위탁받는 자(수탁자)', dataIndex: 'company', key: 'company', width: '42%' },
                    { title: '위탁 업무', dataIndex: 'content', key: 'content', width: '58%' }
                  ]} dataSource={refTables.cfni} />
                ) : (<></>)}
              </>
            ) : (<></>)}
            <DDRowContent items={stmt.fni.content.common[2]} style={{ marginBottom: 0 }} />
            {data.dInfo.safety.physical === 'active' ? (
              <DDRowContent items={stmt.fni.content.common[3]} style={{ marginBottom: 0 }} />
            ) : (<></>)}  
          </>
        ) : (<></>)}
      </DDRow>
      <DDRow self={refElements ? (el: any) => (refElements.current[8] = el) : undefined}>
        <DDRowHeader title={stmt.manager.title} />
        <DDRowContent items={stmt.manager.content.common[1]} />
        <ReadableTable columns={[
          { title: '구분', dataIndex: 'identity', key: 'identity', width: '26%' },
          { title: '담당자', dataIndex: 'charger', key: 'charger', render: (value: string[]) => value.map((item: string, index: number): JSX.Element => (<p key={index} style={{ margin: 0 }}>{item}</p>)), width: '40%' },
          { title: '연락처', dataIndex: 'contact', key: 'contact', width: '34%' }
        ]} dataSource={managerTableData} />
        <DDRowContent items={stmt.manager.content.common[2]} />
      </DDRow>
      <DDRow style={preview ? { marginBottom: 80 } : undefined}>
        <DDRowHeader title={stmt.help.title} />
        <DDRowContent items={stmt.help.content.common[1]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={stmt.help.content.common[2]} />
        <DDRowContent items={stmt.help.content.common[3]} style={{ marginBottom: 0 }} />
        <DDRowItemList items={stmt.help.content.common[4]} />
      </DDRow>
      {preview ? (<></>) : (
        <DDRow>
          <DDRowHeader title='개인정보 처리방침의 변경에 관한 사항' />
          <DDRowContent items={[`① 본 방침은 ${moment.unix(data.cInfo.applyAt).format('YYYY년 M월 D일')}부터 시행됩니다.`]} style={{ marginBottom: 0 }} />
          {prevPIPPList.length > 0 ? (
            <>
              <DDRowContent items={['② 이전의 개인정보 처리방침은 아래에서 확인할 수 있습니다.']} />
              <select id='prev-list' onChange={(e: any) => e.target.value !== 'none' ? window.open(e.target.value, '_blank') : undefined} style={{ border: '1px solid #C0C0C0', padding: '6px 9px' }}>
                <option key={-1} value='none'>선택하세요.</option>
                {prevPIPPList.map((item: any, index: number): JSX.Element => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </>
          ) : (<></>)}
        </DDRow>
      )}
    </div>
  );
}
/** [Internal Component] 테이블 내에 List */
const ListInTable: React.FC<any> = ({ items }: any): JSX.Element => {
  return (
    <>
      {items ? (
        <ul style={{ margin: 0, paddingLeft: 14 }}>
          {items.map((item: string, index: number): JSX.Element => <li key={index}>{item}</li>)}
        </ul>
      ) : (<></>)}
    </>
  );
}
/** [Internal Component] 읽기 전용 테이블 */
const ReadableTable: React.FC<ReadableTableProps> = ({ columns, dataSource, preview, style }: ReadableTableProps): JSX.Element => {
  return (
    <DDRowTableForm preview={preview} style={style}>
      <Table columns={columns} dataSource={dataSource} pagination={false} size='small' />
    </DDRowTableForm>
  );
}