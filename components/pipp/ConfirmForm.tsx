// Component
import { Col, Collapse, DatePicker, Form, Input, Row, Spin, Table } from "antd";
import { YesOrNoRadioButton } from "../common/Radio";
import { DIRow, DIRowContent, DIRowDivider, DIRowHeader } from "./Documentation";
// Module
import moment from 'moment';

/** [Interface] Properties for ConfirmSection */
interface ConfirmSectionProps {
  data: any;
  onChange: (step: string, value: any, category: string, property?: string, subProperty?: string) => void;
  prevList: any[];
  sectionType: string;
}

/** [Component] 개인정보 처리방침 검토를 위한 Section */
export const ConfirmSection: React.FC<ConfirmSectionProps> = ({ data, onChange, prevList, sectionType }: ConfirmSectionProps): JSX.Element => {
  return (
    <>
      <DIRow>
        <DIRowHeader description='개인정보 처리방침이 적용될 날짜를 선택하여 주세요.' required title='개인정보 처리방침 최종 게재일' />
        <DIRowContent>
          <Row gutter={16}>
            <Col span={8}>
              <DatePicker format='YYYY-MM-DD' mode='date' onChange={(value: any): void => onChange(sectionType, value !== null ? value.unix() : undefined, 'applyAt')} placeholder='날짜 선택' style={{ width: 280 }} value={data.applyAt ? moment.unix(data.applyAt) : undefined} />
            </Col>
          </Row>
        </DIRowContent>
      </DIRow>
      <DIRowDivider />
      <Row>
        <Col span={24}>
          <Row>
            <Col span={16}>
              <DIRow>
                <Collapse activeKey={data.previous.usage ? ['1'] : []} ghost>
                  <Collapse.Panel header={<DIRowHeader description='개인정보 처리방침 갱신 시, 이전 처리방침도 반드시 확인할 수 있어야 합니다.\n따라서, 본 처리방침 이전에 게재되어 있는 처리방침의 URL을 입력하여 주세요.' style={{ marginBottom: 0 }} title='본 서비스에서 생성하지 않은 다른 개인정보 처리방침이 있나요?' tools={<YesOrNoRadioButton onChange={(e: any): void => onChange(sectionType, e.target.value, 'previous', 'usage')} size='small' value={data.previous.usage} />} />} key='1' showArrow={false} >
                    <h4 style={{ color: '#000000D9', fontSize: 14, fontWeight: '500', lineHeight: '22px', marginBottom: 8 }}>이전 개인정보 처리방침 URL</h4>
                    <Form>
                      <Form.Item initialValue={data.previous.url} name='url' rules={[{ pattern: new RegExp('^((?!http://|https://).)*$'), message: 'http 또는 https를 빼고 입력해주세요' }]}>
                        <Input addonBefore='https://' allowClear onChange={(e: any) => onChange(sectionType, e.target.value, 'previous', 'url')} value={data.previous.url} />
                      </Form.Item>
                    </Form>
                  </Collapse.Panel>
                </Collapse>
              </DIRow>
            </Col>
          </Row>
          <DIRowDivider style={{ marginTop: 8 }} />
        </Col>
        <Col span={16}>
          <DIRow>
            <DIRowHeader description='본 서비스에서 만든 이전 개인정보 처리방침은 새로 업데이트 되는 개인정보 처리방침에 자동으로 삽입됩니다.' title='플립(Plip) 개인정보 처리방침' />
            {prevList.length > 0 ? (
              <DIRowContent>
                <Row gutter={16} style={{ marginBottom: 8 }}>
                  <Col span={8} style={{ color: '#000000D9', fontSize: 14, fontWeight: '500', lineHeight: '22px' }}>적용일자</Col>
                  <Col span={16} style={{ color: '#000000D9', fontSize: 14, fontWeight: '500', lineHeight: '22px' }}>개인정보 처리방침 URL</Col>
                </Row>
                <Row gutter={[16, 8]}>
                  {prevList.sort((a: any, b: any): number => a.applyAt - b.applyAt).map((item: any, index: number): JSX.Element => (<URLList date={item.applyAt} key={index} url={item.url} />))}
                </Row>
              </DIRowContent>
            ) : (<></>)}
          </DIRow>
        </Col>
      </Row>
    </>
  );
}

const URLList: React.FC<any> = ({ date, url }): JSX.Element => {
  return (
    <>
      <Col span={8}>
        <DatePicker disabled format='YYYY-MM-DD' value={moment.unix(date)} style={{ width: '100%' }} />
      </Col>
      <Col span={16}>
        <Input disabled value={url} />
      </Col>
    </>
  );
}