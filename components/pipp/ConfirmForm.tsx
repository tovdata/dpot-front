// Component
import { Col, Collapse, DatePicker, Input, Row } from "antd";
import { YesOrNoRadioButton } from "../common/Radio";
import { DIRow, DIRowContent, DIRowDivider, DIRowHeader } from "./Documentation";
// Module
import moment from 'moment';

/** [Interface] Properties for ConfirmSection */
interface ConfirmSectionProps {
  data: any;
  onChange: (step: string, value: any, category: string, property?: string, subProperty?: string) => void;
  refTables: any;
  sectionType: string;
}

/** [Component] 개인정보 처리방침 검토를 위한 Section */
export const ConfirmSection: React.FC<ConfirmSectionProps> = ({ data, onChange, refTables, sectionType }: ConfirmSectionProps): JSX.Element => {
  // 컴포넌트 반환
  return (
    <>
      <DIRow>
        <DIRowHeader description='개인정보 처리방침이 적용될 날짜를 선택하여 주세요.' required title='개인정보 처리방침 최종 게재일' />
        <DIRowContent>
          <Row gutter={16}>
            <Col span={8}>
              <DatePicker allowClear format='YYYY-MM-DD' mode='date' onChange={(value: any): void => onChange(sectionType, value ? value.format('YYYY-MM-DD') : '', 'applyAt')} placeholder='날짜 선택' style={{ width: 280 }} value={data.applyAt !== '' ? moment(data.applyAt, 'YYYY-MM-DD') : undefined} />
            </Col>
          </Row>
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <DIRow>
        <Collapse activeKey={data.previous.usage ? ['1'] : []} ghost>
          <Collapse.Panel header={<DIRowHeader description='개인정보 처리방침 갱신 시, 이전 처리방침도 반드시 확인할 수 있어야 합니다.\n따라서, 본 처리방침 이전에 게재되어 있는 처리방침의 URL을 입력하여 주세요.' style={{ marginBottom: 0 }} title='디팟에서 생성하지 않은 다른 개인정보 처리방침이 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(sectionType, e.target.value, 'previous', 'usage')} size='small' value={data.previous.usage} />} />} key='1' showArrow={false} >
            <h4 style={{ color: '#000000D9', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 8 }}>이전 개인정보 처리방침 URL</h4>
            <Input allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'previous', 'url')} placeholder='https://' value={data.previous.url} />
          </Collapse.Panel>
        </Collapse>
      </DIRow>
    </>
  );
}