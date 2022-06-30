import Router from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
// Component
import { StyledPageBackground, StyledPageLayout } from '@/components/styled/JoinCompany';
import { StyledAddButton, StyledServiceCard } from '../styled/ChoiceService';
import { PLIP401Page, PLIP403Page, PLIPAwaitingApprovalPage, PLIPSimpleLoadingPage } from './Page';
import { errorNotification, successNotification } from '../common/Notification';
import { PLIPInputGroup } from './Input';
// Icon
import { IoAddOutline, IoBusinessSharp, IoDesktopOutline, IoPhonePortraitOutline, IoSettingsOutline } from 'react-icons/io5';
import { Button, Checkbox, Col, Form, Input, Modal, Popconfirm, Row } from 'antd';
// State
import { defaultService, serviceSelector, userSelector } from '@/models/session';
import { createService, deleteService, getServiceList, updateService } from '@/models/queries/apis/company';
// Query
import { getUser } from '@/models/queries/apis/user';
// Query key
import { KEY_SERVICES, KEY_USER } from '@/models/queries/key';

const ChoiceService: React.FC<any> = (): JSX.Element => {
  // 로컬 스토리지 내 사용자 정보 조회
  const sessionUser = useRecoilValue(userSelector);
  // 사용자 정보 조회 (API)
  const { isLoading, data: user } = useQuery([KEY_USER, sessionUser.id], async () => await getUser(sessionUser.id));
  // 표시될 컴포넌트
  const [component, setComponent] = useState<JSX.Element>(<PLIPSimpleLoadingPage />);

  // 회사 소속 여부 확인
  useEffect(() => {
    if (!isLoading) {
      if (user) {
        if (user.affiliations === undefined || (user.affiliations && user.affiliations.length === 0)) {
          setComponent(<PLIP403Page redirectPath='/company/join' />);
        } else if (user.affiliations[0].accessLevel === 0) {
          setComponent(<PLIPAwaitingApprovalPage />);
        } else {
          setComponent(
            <StyledPageBackground>
              <StyledPageLayout>
                <h2 className='title'>{user.userName} 님 안녕하세요 😊</h2>
                <ServiceCardList companyId={user.affiliations[0].id} />
              </StyledPageLayout>
            </StyledPageBackground>
          );
        }
      } else {
        setComponent(<PLIP401Page />);
      }
    }
  }, [isLoading, user]);

  // 컴포넌트 반환
  return (component);
}

/** [Internal Component] 서비스 카드 목록 */
const ServiceCardList: React.FC<any> = ({ companyId }): JSX.Element => {
  // 로컬 스토리지 내 서비스 정보
  const [sessionService, setSessionService] = useRecoilState(serviceSelector);
  // 서비스 목록 조회
  const { isLoading, data: services } = useQuery([KEY_SERVICES, companyId], async () => await getServiceList(companyId));
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
  /** [Event handler] 서비스 삭제 */
  const onDelete = useCallback(async () => {
    const response = await deleteService(serviceId);
    if (response) {
      successNotification('서비스를 삭제하였습니다.');
      // 로컬 스토리지에 저장된 서비스와 같을 경우, 삭제
      if (sessionService.id === serviceId) {
        setSessionService(defaultService);
      }
      // 모달 종료
      setVisible(false);
      // 쿼리 초기화
      queryClient.invalidateQueries([KEY_SERVICES, companyId]);
    } else {
      errorNotification('서비스를 삭제하는 과정에서 오류가 발생하였습니다.');
    }
  }, [companyId, serviceId, queryClient]);
  /** [Event handler] 서비스 수정 */
  const onEditService = useCallback((service: any) => {
    // 서비스 ID 설정
    setServiceId(service.id);
    // 폼 필드 설정
    form.setFieldsValue(service);
    // 모달 열기
    setVisible(true);
  }, [form]);
  /** [Event handler] 모달 열기 */
  const onOpen = useCallback(() => {
    // 서비스 ID 초기화
    setServiceId('');
    // 폼 필드 초기화
    form.resetFields();
    // 모달 열기
    setVisible(true);
  }, [form]);
  /** [Event handler] 서비스 생성 */
  const onSave = useCallback(() => form.validateFields().then(async (values: any): Promise<void> => {
    const isCreate: boolean = serviceId === '' ? true : false;
    const response = isCreate ? await createService(companyId, values) : await updateService(serviceId, values);
    if (response.result) {
      successNotification(serviceId === '' ? '서비스를 생성하였습니다.' : '서비스를 변경하였습니다.');
      // 폼 필드 초기화
      form.resetFields();
      // 모달 종료
      setVisible(false);
      // 서비스 목록 갱신
      queryClient.setQueryData([KEY_SERVICES, companyId], (oldData: any) => {
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
  }).catch((err: any): void => {}), [companyId, form, serviceId]);

  // 컴포넌트 반환
  return (
    <>
      <Row gutter={[20, 20]}>
        {isLoading || services === undefined ? (
          <></>
        ) : services.map((service: any): JSX.Element => (
          <ServiceCard key={service.id} onEditService={onEditService} service={service} />
        ))}
        <AddButton onOpen={onOpen} />
      </Row>
      <EditableModal edit={serviceId === '' ? false : true} form={form} onClose={onClose} onDelete={onDelete} onSave={onSave} visible={visible} />
    </>
  );
}
/** [Internal Component] 서비스 카드 */
const ServiceCard: React.FC<any> = ({ onEditService, service }): JSX.Element => {
  // 로컬 스토리지 내 서비스 정보
  const setSessionService = useSetRecoilState(serviceSelector);
  /** [Event handler] 서비스 선택 */
  const onSelect = useCallback(() => {
    setSessionService({ ...service, name: service.serviceName });
    // 이동
    Router.push('/');
  }, [service]);
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
const EditableModal: React.FC<any> = ({ edit, form, onClose, onDelete, onSave, visible }): JSX.Element => {
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
          <Popconfirm cancelText='아니오' okText='예' onConfirm={onDelete} title='해당 서비스를 삭제하시겠습니다?'>
            <Button danger>서비스 삭제</Button>
          </Popconfirm>
        ) : (<></>)}
      </Form>
    </Modal>
  );
}

export default ChoiceService;