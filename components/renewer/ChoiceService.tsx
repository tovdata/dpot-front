import Router from 'next/router';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilValue, useSetRecoilState } from 'recoil';
// Component
import { StyledPageBackground, StyledPageLayout } from '@/components/styled/JoinCompany';
import { StyledAddButton, StyledServiceCard } from '../styled/ChoiceService';
import { PLIP401Page, PLIP403Page } from './Page';
// Icon
import { IoAddOutline, IoBusinessSharp, IoDesktopOutline, IoPhonePortraitOutline, IoSettingsOutline } from 'react-icons/io5';
import { Button, Checkbox, Col, Form, Input, Modal, Row } from 'antd';
import { useCallback, useState } from 'react';
import { PLIPInputGroup } from './Input';
// State
import { companySelector, serviceSelector, userSelector } from '@/models/session';
import { createService, getServiceList, updateService } from '@/models/queries/apis/company';
import { errorNotification, successNotification } from '../common/Notification';
// Query key
const KEY_SERVICES = "plip-services"

const ChoiceService: React.FC<any> = (): JSX.Element => {
  // 회사 정보 조회
  const company = useRecoilValue(companySelector);
  // 사용자 정보 조회
  const user = useRecoilValue(userSelector);

  // 컴포넌트 반환
  return (
    <>
      {user.id === '' ? (
        <PLIP401Page />
      ) : company.id === '' ? (
        <PLIP403Page />
      ) : (
        <StyledPageBackground>
          <StyledPageLayout>
            <h2 className='title'>{user.name} 님 안녕하세요 😊</h2>
            <ServiceCardList companyId={company.id} />
          </StyledPageLayout>
        </StyledPageBackground>
      )}
    </>
  );
}

/** [Internal Component] 서비스 카드 목록 */
const ServiceCardList: React.FC<any> = ({ companyId }): JSX.Element => {
  // 서비스 목록 조회
  const { isLoading, data } = useQuery(KEY_SERVICES, async () => await getServiceList(companyId));
  // Query client
  const queryClient = useQueryClient();

  // 모달 열기/닫기 상태
  const [visible, setVisible] = useState<boolean>(false);
  // 서비스 ID
  const [serviceId, setServiceId] = useState<string>('');
  // 폼 객체 생성
  const [form] = Form.useForm();

  /** [Event handler] 모달 종료 */
  const onClose = useCallback(() => setVisible(false), []);
  /** [Event handler] 서비스 수정 */
  const onEditService = useCallback((service: any) => {
    // 서비스 ID 설정
    setServiceId(service.id);
    // 폼 필드 설정
    form.setFieldsValue(service);
    // 모달 열기
    setVisible(true);
  }, []);
  /** [Event handler] 모달 열기 */
  const onOpen = useCallback(() => {
    // 서비스 ID 초기화
    setServiceId('');
    // 폼 필드 초기화
    form.resetFields();
    // 모달 열기
    setVisible(true);
  }, []);
  /** [Event handler] 서비스 생성 */
  const onSave = useCallback(() => form.validateFields().then(async (values: any): Promise<void> => {
    const isCreate: boolean = serviceId === '' ? true : false;
    const response = isCreate ? await createService(companyId, values) : await updateService(serviceId, values);
    if (response.result) {
      successNotification(serviceId === '' ? '서비스를 생성하였습니다.' : '서비스를 변경하였습니다.');
      // 폼 필드 초기화
      form.resetFields();
      // 모달 종료
      onClose();
      // 서비스 목록 갱신
      queryClient.setQueryData(KEY_SERVICES, (oldData: any) => {
        if (isCreate) {
          return [...oldData, values];
        } else {
          // 배열 내에 기존 서비스 인덱스 추출
          const index: number = oldData.findIndex((service: any): boolean => service.id === serviceId);
          // 추출된 인덱스에 위치한 데이터를 제외한 데이터로 새로운 배열 생성 및 반환
          return index === oldData.length - 1 ? [...oldData.slice(0, index), { ...values, id: serviceId }] : [...oldData.slice(0, index), { ...values, id: serviceId }, ...oldData.slice(index + 1, oldData.length)];
        }
      });
    } else {
      errorNotification(serviceId === '' ? '서비스 생성 과정에서 문제가 발생하였습니다.' : '서비스 변경 과정에서 문제가 발생하였습니다.');
    }
  }).catch((err: any): void => {}), [form, serviceId]);

  // 컴포넌트 반환
  return (
    <>
      <Row gutter={[20, 20]}>
        {isLoading ? (
          <></>
        ) : data === undefined ? (
          <></>
        ) : data.map((service: any): JSX.Element => (
          <ServiceCard key={service.id} onEditService={onEditService} service={service} />
        ))}
        <AddButton onOpen={onOpen} />
      </Row>
      <EditableModal edit={serviceId === '' ? false : true} form={form} onClose={onClose} onSave={onSave} visible={visible} />
    </>
  );
}
/** [Internal Component] 서비스 카드 */
const ServiceCard: React.FC<any> = ({ onEditService, service }): JSX.Element => {
  // 서비스 설정 Handler
  const setService = useSetRecoilState(serviceSelector);
  /** [Event handler] 서비스 선택 */
  const onSelect = useCallback(() => {
    setService({ ...service, name: service.serviceName });
    // 이동
    Router.push('/');
  }, []);
  /** [Event handler] 서비스 수정 */
  const onEdit = useCallback(() => onEditService(service), [service]);

  // 컴포넌트 반환
  return (
    <Col span={12}>
      <StyledServiceCard>
        <div className='content'>
          <div className='icons'>
            {service.types.map((type: string): JSX.Element => (<span className='icon' key={type}>{
              type === 'default' ? (<IoBusinessSharp />) : type === 'web' ? (<IoDesktopOutline />) : (<IoPhonePortraitOutline />)
            }</span>))}
          </div>
          <span className='name' onClick={onSelect}>{service.serviceName}</span>
        </div>
        {service.types.includes('default') ? (
          <></>
        ) : (
          <span className='setting' onClick={onEdit}>
            <IoSettingsOutline />
          </span>
        )}
      </StyledServiceCard>
    </Col>
  )
}
/** [Internal Component] 서비스 추가 버튼 */
const AddButton: React.FC<any> = ({ onOpen }): JSX.Element => {
  return (
    <Col span={12}>
      <StyledAddButton onClick={onOpen}>
        <span className='icon'>
          <IoAddOutline />
        </span>
        <span className='name'>서비스 추가</span>
      </StyledAddButton>
    </Col>
  );
}
/** [Internal Component] 서비스 추가/편집 모달 */
const EditableModal: React.FC<any> = ({ edit, form, onClose, onSave, visible }): JSX.Element => {
  return (
    <Modal centered footer={<Button onClick={onSave} type='primary'>{edit ? '저장' : '추가'}</Button>} onCancel={onClose} title={edit ? '서비스 편집' : '서비스 추가'} visible={visible} width={400}>
      <Form form={form}>
        <PLIPInputGroup label='서비스명' required>
          <Form.Item name='serviceName' rules={[{ required: true, message: '서비스명을 입력해주세요.' }]}>
            <Input />
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='서비스 제공 형태' required tooltip='서비스 제공 형태 설명'>
          <Form.Item name='types' rules={[{ required: true, message: '서비스 제공 형태를 선택해주세요.' }]}>
            <Checkbox.Group>
              <Checkbox value='web'>웹(Web)</Checkbox>
              <Checkbox value='app'>앱(App)</Checkbox>
            </Checkbox.Group>
          </Form.Item>
        </PLIPInputGroup>
        <PLIPInputGroup label='서비스 URL'>
          <Form.Item name='url'>
            <Input />
          </Form.Item>
        </PLIPInputGroup>
        {edit ? (
          <Button danger>서비스 삭제</Button>
        ) : (<></>)}
      </Form>
    </Modal>
  );
}

export default ChoiceService;