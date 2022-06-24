import { useRecoilValue } from 'recoil';
// Component
import { StyledPageBackground, StyledPageLayout } from '@/components/styled/JoinCompany';
import { StyledAddButton, StyledServiceCard } from '../styled/ChoiceService';
// Icon
import { IoAddOutline, IoBusinessSharp, IoDesktopOutline, IoPhonePortraitOutline, IoSettingsOutline } from 'react-icons/io5';
import { Button, Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { useState } from 'react';
import { PLIPInputGroup } from './Input';
// State
import { userSelector } from '@/models/session';

const ChoiceService: React.FC<any> = (): JSX.Element => {
  // 사용자 정보 조회
  const user = useRecoilValue(userSelector);
  // 컴포넌트 반환
  return (
    <StyledPageBackground>
      <StyledPageLayout>
        <h2 className='title'>{user.name} 님 안녕하세요 😊</h2>
        <ServiceCardList />
      </StyledPageLayout>
    </StyledPageBackground>
  );
}

/** [Internal Component] 서비스 카드 목록 */
const ServiceCardList: React.FC<any> = (): JSX.Element => {
  // 모달 열기/닫기 상태
  const [visible, setVisible] = useState<boolean>(false);

  // 

  // 
  const [list, setList] = useState<any[]>([
    { id: '0', serviceName: '주식회사 토브데이터', types: ['default'] },
    { id: '1', serviceName: '플립(plip)', types: ['web', 'app'] }
  ]);

  const onClose = () => setVisible(false);
  const onOpen = () => setVisible(true);

  return (
    <>
      <Row gutter={[20, 20]}>
        {list.map((service: any): JSX.Element => (<ServiceCard key={service.id} name={service.serviceName} types={service.types} />))}
        <AddButton onOpen={onOpen} />
      </Row>
      <EditableModal onClose={onClose} visible={visible} />
    </>
  );
}
/** [Internal Component] 서비스 카드 */
const ServiceCard: React.FC<any> = ({ name, types }): JSX.Element => {
  return (
    <Col span={12}>
      <StyledServiceCard>
        <div className='content'>
          <div className='icons'>
            {types.map((type: string): JSX.Element => (<span className='icon' key={type}>{
              type === 'default' ? (<IoBusinessSharp />) : type === 'web' ? (<IoDesktopOutline />) : (<IoPhonePortraitOutline />)
            }</span>))}
          </div>
          <span className='name'>{name}</span>
        </div>
        <span className='setting'>
          <IoSettingsOutline />
        </span>
      </StyledServiceCard>
    </Col>
  )
}
/** [Internal Component] 서비스 추가 버튼 */
const AddButton: React.FC<any> = ({ onOpen }): JSX.Element => {
  return (
    <Col span={12}>
      <StyledAddButton>
        <span className='icon'>
          <IoAddOutline />
        </span>
        <span className='name' onClick={onOpen}>서비스 추가</span>
      </StyledAddButton>
    </Col>
  );
}
/** [Internal Component] 서비스 추가/편집 모달 */
const EditableModal: React.FC<any> = ({ onClose, type, visible }): JSX.Element => {
  return (
    <Modal centered footer={<Button type='primary'>추가</Button>} onCancel={onClose} title='서비스 추가' visible={visible} width={400}>
      <Form>
        <PLIPInputGroup label='서비스명' required>
          <Form.Item name='serviceName' rules={[{ required: true, message: '서비스명을 입력해주세요.' }]}>
            <Input />
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='서비스 제공 형태' required tooltip='서비스 제공 형태 설명'>
          <Form.Item name='types'>
            <Checkbox>웹(Web)</Checkbox>
            <Checkbox>앱(App)</Checkbox>
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='서비스 URL'>
          <Form.Item name='url'>
            <Input />
          </Form.Item>
        </PLIPInputGroup>
        {type === 'edit' ? (
          <Button danger>서비스 삭제</Button>
        ) : (<></>)}
      </Form>
    </Modal>
  );
}

export default ChoiceService;