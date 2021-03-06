import dynamic from 'next/dynamic';
import Router from 'next/router';
import { ComponentType } from 'react'; 
import { useCallback, useEffect, useRef, useState } from 'react';
import { useQueries, useQuery, useQueryClient } from 'react-query';
// Component
import { Button, Col, Input, Modal, Row, Spin, Table, Tag } from 'antd';
import { StyledPageHeader, StyledPIPPName } from '@/components/styled/PIPP';
import { LinkButtonInTable } from '@/components/renewer/Button';
import { PageHeaderContainStep } from '@/components/common/Header';
import { successNotification, warningNotification } from '@/components/common/Notification';
import { StyledTableForm, TableFormHeader } from '@/components/common/Table';
const CollapseForPIPP: ComponentType<any> = dynamic(() => import('@/components/pipp/Collapse').then((mod: any): any => mod.CollapseForPIPP));
const ConfirmSection: ComponentType<any> = dynamic(() => import('@/components/pipp/ConfirmForm').then((mod: any): any => mod.ConfirmSection));
const InputSection: ComponentType<any> = dynamic(() => import('@/components/pipp/EditForm').then((mod: any): any => mod.InputSection));
const PLIPLoadingContainer = dynamic(() => import('@/components/renewer/Page').then((mod: any): any => mod.PLIPLoadingContainer));
const PreviewSection: ComponentType<any> = dynamic(() => import('@/components/pipp/EditForm').then((mod: any): any => mod.PreviewSection));
import { DRModal } from '../pipp/Documentation';
// Component (table)
const FNITable: ComponentType<any> = dynamic(() => import('@/components/renewer/PI').then((mod: any): any => mod.FNITable), { loading: () => (<></>) });
const PITable: ComponentType<any> = dynamic(() => import('@/components/renewer/PI').then((mod: any): any => mod.PITable), { loading: () => (<></>) });
const CFNITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PC').then((mod: any): any => mod.CFNITableForm), { loading: () => (<></>) });
const CPITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PC').then((mod: any): any => mod.CPITableForm), { loading: () => (<></>) });
const PFNITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PC').then((mod: any): any => mod.PFNITableForm), { loading: () => (<></>) });
const PPITableForm: ComponentType<any> = dynamic(() => import('@/components/renewer/PC').then((mod: any): any => mod.PPITableForm), { loading: () => (<></>) });
// Data
import { defaultPIPPData } from '@/models/static/data';
// Icon
const CheckCircleOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.CheckCircleOutlined));
const EditOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.EditOutlined));
const FiEdit = dynamic(() => import('react-icons/fi').then((mod: any): any => mod.FiEdit));
const PlusOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.PlusOutlined));
const RedoOutlined = dynamic(() => import('@ant-design/icons').then((mod: any): any => mod.RedoOutlined));
// Statement
import { statementForPIPP as stmt } from '@/models/static/statement';
// Type
import { DocProgressStatus } from '@/models/type';
import { SERVICE_CFNI, SERVICE_CPI, SERVICE_FNI, SERVICE_LIST, SERVICE_PFNI, SERVICE_PI, SERVICE_PIPP, SERVICE_PPI } from '@/models/queries/type';
import { KEY_SERVICE, KEY_USER } from '@/models/queries/key';
// Query
import { getCompany, getService } from '@/models/queries/apis/company';
import { getPIPPData, setPIPPData } from '@/models/queries/apis/pipp';
import { getDatasByTableType, getPIDatas } from '@/models/queries/apis/manage';
import { getUser } from '@/models/queries/apis/user';
// Util
import { blankCheck, copyTextToClipboard, decodeAccessToken, writeActivityLog } from 'utils/utils';
import moment from 'moment';

/** [Interface] PIPP process */
interface PIPPProcess {
  list?: any[];
  onProcess: (process: DocProgressStatus) => void;
  serviceId: string;
  status?: string;
}
/** [Type] Scroll position */
type ScrollPosition = 'start' | 'end';

/**
 * [Component] ???????????? ???????????? ?????? ?????????
 */
export const CreatePIPPForm: React.FC<any> = ({ accessToken, companyId, list, onBack, onUpdateStatus, progress, serviceId, status }: any): JSX.Element => {
  // ????????? ID ??????
  const userId: string = decodeAccessToken(accessToken);

  // ???????????? ?????? ???????????? ????????? ????????? ??????
  const [data, setData] = useState<any>(defaultPIPPData);
  // // ?????? ???????????? ????????? ??????
  // useEffect(() => {
  //   console.log('render1', data.aInfo);
  //   // if (progress === 'create') {
  //     (async () => {
  //       // ?????? ?????? ??????
  //       const response = await getCompany(accessToken, companyId);
  //       // ???????????? ??????????????? ??????
  //       let manager = { name: '', position: '', email: '' };
  //       if (response && response.manager) {
  //         manager = response.manager;
  //       }
  //       // ???????????? ???????????? ????????? ??????
  //       setData({ ...data, dInfo: { ...data.dInfo, manager: { ...data.dInfo.manager, charger: { name: manager.name, position: manager.position, contact: manager.email } } } });
  //     })();
  //   // }
  // }, [companyId, progress, serviceId]);
  // ????????? ??????????????? ?????? ??????
  const [loading, setLoading] = useState<boolean>(true);
  // ????????? ??????
  const { data: user } = useQuery([KEY_USER, userId], async () => await getUser(userId));
  // ????????? ??????
  const { data: service } = useQuery([KEY_SERVICE, serviceId], async () => await getService(serviceId));
  // ???????????? ??????????????? ?????? ?????? ?????? ????????? ????????????
  const { isLoading: isLoadingForData, data: loadData } = useQuery([SERVICE_PIPP, serviceId], async () => await getPIPPData(serviceId));
  // ????????? ????????? ?????? (API ??????)
  const results = useQueries(SERVICE_LIST.map((type: string): any => ({ queryKey: [type, serviceId], queryFn: async () => await getDatasByTableType(serviceId, type) })));
  // ?????? ????????? Hook
  useEffect(() => setLoading(isLoadingForData || results.some((result: any): boolean => result.isLoading)), [isLoadingForData, results]);
  // ????????? ??????
  useEffect(() => {
    (async () => {
      // ?????? ?????? ??????
      const response = await getCompany(companyId);
      // ???????????? ??????????????? ??????
      let charger = { name: '', position: '', contact: '' };
      if (response && response.manager) {
        charger = { name: response.manager.name, position: response.manager.position, contact: response.manager.email };
      }

      // ?????? ?????? ????????? ??????
      if (progress === 'update' && loadData) {
        setData({ ...loadData, dInfo: { ...loadData.dInfo, manager: { ...loadData.dInfo.manager, charger: charger } } });
      } else {
        setData({ ...data, dInfo: { ...data.dInfo, manager: { ...data.dInfo.manager, charger: charger } } });
      }
    })();
  }, [companyId, loadData, progress]);

  // ????????? ?????? Title
  const steps: string[] = ['???????????? ??????', '???????????? ??????', '?????? ??????'];
  // ?????? Step, ?????? ??????, ?????? ???????????? ?????? ?????? ??????
  const [stepIndex, setStepIndex] = useState<number>(0);
  const [ref, setRef] = useState<any>({
    pi: [],
    ppi: [],
    cpi: [],
    fni: [],
    pfni: [],
    cfni: []
  });
  const [rels, setRels] = useState<any>({
    cfni: { url: undefined },
    cpi: { usage: undefined, url: undefined },
    fni: { usage: undefined },
    pfni: { url: undefined },
    ppi: { usage: undefined, url: undefined }
  });
  // Focus??? ?????? ????????? ????????? ?????? ???????????? ?????? ??????
  const refs: any = {
    input: useRef([]),
    preview: useRef([])
    // index
    // 0 : name
    // 1 : pi
    // 2 : child
    // 3 : ppi
    // 4 : cpi
    // 5 : destructionUnused
    // 6 : safety
    // 7 : fni
    // 8 : manager
  };
  // ?????? ?????? ?????? ????????? ?????? visible ??????
  const [visible, setVisible] = useState<boolean>(false);
  const [visible2, setVisible2] = useState<boolean>(false);
  // ????????? URL
  const [url, setUrl] = useState<string>('');

  // ?????? ????????? ??????
  useEffect(() => {
    if (!loading) {
      const tempRef: any = {};
      for (let i = 0; i < SERVICE_LIST.length; i++) {
        tempRef[SERVICE_LIST[i]] = results[i].data ? results[i].data : [];
      }
      // ?????? ????????? ??????
      setRef(tempRef);
      // ????????? ?????? ?????? ????????? ??? ??????
      const tempData: any = JSON.parse(JSON.stringify(rels));
      // ????????? ?????? ??? ??????
      SERVICE_LIST.forEach((type: string): any => {
        // URL filter
        if ((type === SERVICE_PPI || type === SERVICE_CPI || type === SERVICE_FNI || type === SERVICE_CFNI || type === SERVICE_PFNI) && tempRef[type].length > 0) {
          if (type === SERVICE_PFNI || type === SERVICE_CFNI) {
            tempData.fni.usage = true;
          } else {
            tempData[type].usage = true;
          }
          // Extract a url
          if (type === SERVICE_PPI || type === SERVICE_PFNI || type === SERVICE_CPI || type === SERVICE_CFNI) {
            let isUrl: boolean = false;
            tempRef[type] = tempRef[type].filter((row: any): boolean => {
              if (row['url'] === undefined) {
                return true;
              } else {
                isUrl = true;
                tempData[type] !== undefined ? tempData[type].url = row['url'] : undefined;
                return false;
              }
            });
            if (!isUrl) {
              if (tempData[type] === undefined) tempData[type] = {};
              tempData[type].url = undefined;
            }
          }
        }
      });
      // ??????
      setRels(tempData);
    }
  }, [loading, results[0].data, results[1].data, results[2].data, results[3].data, results[4].data, results[5].data]);
  // ???????????? ????????? ????????? ?????? ??? ??????
  // useEffect(() => {
  //   if (!loading) {
  //     if (!initQuery) {
  //       setInitQuery(true);
  //       // ????????? ?????? ?????? ????????? ??? ??????
  //       const tempRef: any = {};
  //       const tempData: any = JSON.parse(JSON.stringify(rels));
  //       // ????????? ?????? ??? ??????
  //       SERVICE_LIST.forEach((type: string, index: number): any => {
  //         // URL filter
  //         if ((type === SERVICE_PPI || type === SERVICE_CPI || type === SERVICE_FNI || type === SERVICE_CFNI || type === SERVICE_PFNI) && tempRef[type].length > 0) {
  //           if (type === SERVICE_PFNI || type === SERVICE_CFNI) {
  //             tempData.fni.usage = true;
  //           } else {
  //             tempData[type].usage = true;
  //           }
  //           // Extract a url
  //           if (type === SERVICE_PPI || type === SERVICE_PFNI || type === SERVICE_CPI || type === SERVICE_CFNI) {
  //             let isUrl: boolean = false;
  //             tempRef[type] = tempRef[type].filter((row: any): boolean => {
  //               if (row['url'] === undefined) {
  //                 return true;
  //               } else {
  //                 isUrl = true;
  //                 tempData[type] !== undefined ? tempData[type].url = row['url'] : undefined;
  //                 return false;
  //               }
  //             });
  //             if (!isUrl) {
  //               if (tempData[type] === undefined) tempData[type] = {};
  //               tempData[type].url = undefined;
  //             }
  //           }
  //         }
  //       });
  //       // ?????? ????????? ??????
  //       setRef(tempRef);
  //       // ?????? ????????? ??????
  //       setRels(tempData);
  //     }
  //   }
  // }, [initQuery, loading]);

  /** [Event handler] ?????? ?????? */
  const onOpen = useCallback((): void => setVisible(true), []);
  /** [Event handler] ?????? ?????? */
  const onClose = useCallback((): void => setVisible(false), []);
  /** [Event handler] ????????? ?????? ????????? */
  const onChange = useCallback((step: string, value: any, category: string, property?: string, subProperty?: string): void => {
    if (property!== undefined && subProperty !== undefined) {
      setData({ ...data, [step]: { ...data[step], [category]: { ...data[step][category], [property]: { ...data[step][category][property], [subProperty]: value } } } });
    } else if (property !== undefined) {
      if (category === SERVICE_CPI || category === SERVICE_FNI || category === SERVICE_PPI) {
        setRels({ ...rels, [category]: { ...rels[category], [property]: value }});
      } else {
        setData({ ...data, [step]: { ...data[step], [category]: { ...data[step][category], [property]: value } } });
      }
    } else {
      setData({ ...data, [step]: { ...data[step], [category]: value } });
    }
  }, [data, rels]);
  /** [Event handler] ???????????? ?????? ????????? ?????? ????????? (Prview part) */
  const onFocus = useCallback((type: string, index: number, pos?: ScrollPosition) => { refs[type].current[index] ? refs[type].current[index].scrollIntoView((type === 'preview' && (index === 1 || index === 3 || index === 4 || index === 7)) ? { block: pos ? pos : 'start' } : { behavior: 'smooth' , block: pos ? pos : 'start' }) : undefined }, [refs]);
  /** [Event handler] ?????? ?????? ????????? */
  const onMoveStep = useCallback((type: string): void => {
    if (type === 'prev') {
      stepIndex - 1 >= 0 ? setStepIndex(stepIndex - 1) : undefined;
    } else if (type === 'next') {
      if (stepIndex === 0) {
        const aInfo: any = data.aInfo;
        // ?????? ????????? ?????? ?????? ??????
        if (Object.keys(aInfo).some((key: string): boolean => aInfo[key].usage === undefined)) {
          warningNotification('?????? ????????? ??????????????????.');
        } else if (aInfo.cookie.usage && (aInfo.cookie.purpose.length === 0 || aInfo.cookie.disadvantage.length === 0)) {
          warningNotification('??? ?????? ????????? ?????? ????????? ???????????? ??????????????????.');
        } else if (aInfo.webLog.usage && (aInfo.webLog.purpose.length === 0 || aInfo.webLog.method.length === 0 || blankCheck(data.aInfo.webLog.disadvantage))) {
          warningNotification('??? ?????? ????????? ?????? ????????? ???????????? ??????????????????.');
        } else if (aInfo.advertising.usage && (aInfo.advertising.items.length === 0 || blankCheck(aInfo.advertising.method) || blankCheck(aInfo.advertising.purpose) || blankCheck(aInfo.advertising.period))) {
          warningNotification('??? ?????? ????????? ?????? ????????? ???????????? ??????????????????.');
        } else if (aInfo.thirdParty.usage && (aInfo.thirdParty.company.length === 0 || aInfo.thirdParty.items.length === 0 || blankCheck(aInfo.thirdParty.method) || blankCheck(aInfo.thirdParty.period))) {
          warningNotification('??? ?????? ????????? ?????? ????????? ???????????? ??????????????????.');
        } else if (aInfo.additional.usage && (aInfo.additional.items.length === 0 || aInfo.additional.purpose.length === 0 || blankCheck(aInfo.additional.period))) {
          warningNotification('?????? ?????? ????????? ?????? ????????? ???????????? ??????????????????.');
        } else {
          stepIndex + 1 <= steps.length ? setStepIndex(stepIndex + 1) : undefined;
        }
      } else if (stepIndex === 1) {
        const dInfo: any = data.dInfo;
        if (blankCheck(dInfo.name)) {
          warningNotification('???????????? ????????????/??????????????? ??????????????????.');
          onFocus('input', 0);
        } else if (dInfo.period.length === 0) {
          warningNotification('?????? ????????? ????????? ?????????.');
          onFocus('input', 1);
        } else if (dInfo.child.usage === undefined) {
          warningNotification('??? 14??? ?????? ????????? ???????????? ?????? ????????? ??????????????????.');
          onFocus('input', 2);
        } else if (dInfo.child.usage && dInfo.child.method.length === 0) {
          warningNotification('?????????????????? ?????? ?????? ????????? ??????????????????.');
          onFocus('input', 2);
        } else if (rels.ppi.usage === undefined) {
          warningNotification('???3??? ?????? ????????? ??????????????????.');
          onFocus('input', 3);
        } else if (rels.ppi.usage && (rels.ppi.url === undefined && ref.ppi.length === 0)) {
          warningNotification('???????????? ????????? ?????? ????????? ??????????????????.');
          onFocus('input', 3);
        } else if (rels.cpi.usage === undefined) {
          warningNotification('?????? ????????? ??????????????????.');
          onFocus('input', 4);
        } else if (rels.cpi.usage && (rels.cpi.url === undefined && ref.cpi.length === 0)) {
          warningNotification('???????????? ????????? ?????? ????????? ??????????????????.');
          onFocus('input', 4);
        } else if (dInfo.destructionUnused.type === undefined) {
          warningNotification('??????????????? ???????????? ?????? ?????? ?????? ????????? ??????????????????.');
          onFocus('input', 5);
        } else if (dInfo.safety.physical === undefined) {
          warningNotification('????????? ???????????? ????????? ??????????????????.');
          onFocus('input', 6);
        } else if (dInfo.safety.usage === undefined) {
          warningNotification('????????? ???????????? ????????? ??????????????????.');
          onFocus('input', 6);
        } else if (dInfo.safety.usage && (blankCheck(dInfo.safety.activity) && dInfo.safety.certification.length === 0)) {
          warningNotification('????????? ??????????????? ?????? ????????? ??????????????????.');
          onFocus('input', 6);
        } else if (rels.fni.usage === undefined) {
          warningNotification('???????????? ?????? ????????? ??????????????????.');
          onFocus('input', 7);
        } else if (rels.fni.usage && (ref.fni.length === 0 && ref.cfni.length === 0 && ref.pfni.length === 0)) {
          warningNotification('???????????? ????????? ?????? ????????? ??????????????????.');
          onFocus('input', 7);
        } else if (blankCheck(dInfo.manager.charger.name) || blankCheck(dInfo.manager.charger.position)) {
          warningNotification('???????????? ?????????????????? ?????? ????????? ??????????????????.');
          onFocus('input', 8);
        } else if (blankCheck(dInfo.manager.request.department) || blankCheck(dInfo.manager.request.charger) || blankCheck(dInfo.manager.request.contact)) {
          warningNotification('???????????? ?????? ?????? ????????? ?????? ????????? ??????????????????.');
          onFocus('input', 8);
        }
        else {
          stepIndex + 1 <= steps.length ? setStepIndex(stepIndex + 1) : undefined;
        }
      }
    } else if (type === 'complete') {
      const cInfo: any = data.cInfo;
      if (cInfo.applyAt === undefined) {
        warningNotification('???????????? ???????????? ?????? ???????????? ??????????????????.');
      } else if (cInfo.previous.usage === undefined) {
        warningNotification('?????? ???????????? ????????? ?????? ????????????.');
      } else if (cInfo.previous.usage && blankCheck(cInfo.previous.url)) {
        warningNotification('?????? ??????????????? ?????? ????????? ??????????????????.');
      } else {
        onOpen();
      }
    }
  }, [data, onFocus, onOpen, ref, rels, stepIndex, steps.length]);
  /** [Event handler] ?????? ????????? */
  const onSave = useCallback(async (temp: boolean = true): Promise<void> => {
    // ???????????? ?????? ??????
    onClose();
    // ?????? ?????? ??????
    const apiStatus: string = status === 'none' ? 'create' : temp ? 'update' : 'publish';
    // API ??????
    const response = await setPIPPData(serviceId, userId, data, apiStatus, apiStatus ? document.getElementById('report')?.outerHTML : undefined);
    if (response.result) {
      if (temp) {
        successNotification('?????? ?????? ??????');
      } else {
        // ?????? ??????
        if (user) writeActivityLog('create', SERVICE_PIPP, serviceId, user.userName);
        if (service) writeActivityLog('create', SERVICE_PIPP, userId, undefined, service.serviceName);
        // ?????? ??????
        setUrl(response.data.url);
        setVisible2(true);
        onUpdateStatus();
      }
    } else {
      temp ? warningNotification('?????? ?????? ??????') : warningNotification('?????? ?????? ??????');
    }
  }, [data, onClose, onUpdateStatus, service, serviceId, status, user, userId]);

  // ???????????? ?????? ??? ?????? ????????? ??? ???????????? ?????? ????????? ?????? (???????????? ?????? ??????)
  const itemForPI: string[] = [];
  ref.pi.forEach((row: any): void => {
    if ('essentialItems' in row) {
      row['essentialItems'].forEach((item: string): number => !itemForPI.includes(item) ? itemForPI.push(item) : 0);
    }
    if ('selectionItems' in row) {
      row['selectionItems'].forEach((item: string): number => !itemForPI.includes(item) ? itemForPI.push(item) : 0);
    }
  });
  
  // ???????????? ??????
  return (
    <>
      {loading ? (
        <PLIPLoadingContainer />
      ) : (
        <>
          <PageHeaderContainStep current={stepIndex} goTo='/doc/pipp' onBack={onBack} onMove={onMoveStep} onSave={onSave} title='???????????? ???????????? ?????????' steps={steps} />
          {stepIndex === 0 ? data ? (
            <div style={{ marginBottom: '3rem' }}>
              <CollapseForPIPP data={data.aInfo} items={itemForPI} onChange={onChange} />
            </div>
          ) : (
            <PLIPLoadingContainer />
          ) : stepIndex === 1 ? data ? (
            <CreatePIPPSection accessToken={accessToken} data={data} onChange={onChange} onFocus={onFocus} refElements={refs} refTables={ref} rels={rels} serviceId={serviceId} serviceTypes={service ? service.types : []} />
          ) : (
            <PLIPLoadingContainer />
          ) : stepIndex === 2 ? (
            <ConfirmSection data={data.cInfo} onChange={onChange} prevList={list.filter((item: any): boolean => item.version !== 0)} sectionType='cInfo' />
          ) : (<></>)}
          <DRModal cancelText='??????' centered onCancel={onClose} okText='??????' onOk={() => onSave(false)} visible={visible} style={{ paddingBottom: 56, top: 56 }} width='80%'>
            {data ? (
              <PreviewSection data={data} preview={false} prevList={list.filter((item: any): boolean => item.version !== 0)} refTables={ref} rels={rels} serviceTypes={service ? service.types : []} stmt={stmt(data.dInfo.name)} />
            ) : (
              <PLIPLoadingContainer />
            )}
          </DRModal>
          <Modal centered footer={false} onCancel={() => {setVisible2(false); onBack()}} visible={visible2} width={420}>
            <div style={{ textAlign: 'center' }}>
              <span style={{ color: '#52C41A', display: 'block', fontSize: 46, marginBottom: 16, marginTop: 8 }}>
                <CheckCircleOutlined />
              </span>
              <h3 style={{ fontSize: 16, fontWeight: '600', lineHeight: '24px', marginBottom: 16 }}>???????????? ???????????? ?????? ??????</h3>
              <Input.Group compact style={{ display: 'flex' }}>
                <Input value={url} style={{ flex: 1 }} />
                <Button onClick={() => copyTextToClipboard(url)} type='primary'>??????</Button>
              </Input.Group>
            </div>            
          </Modal>
        </>
      )}
    </>
  );
}
/** [Component] ???????????? ???????????? ?????? ????????? */
export const PIPPList: React.FC<PIPPProcess> = ({ list, onProcess, serviceId, status }: PIPPProcess): JSX.Element => {
  return (
    <>
      <MainPageHeader onProcess={onProcess} serviceId={serviceId} status={status} />
      <StyledTableForm>
        <TableFormHeader title='???????????? ???????????? ??????' />
        <Table columns={[
          { title: '??????', dataIndex: 'version', key: 'version', render: (value: number, record: any): JSX.Element => record.version === 0 ? (<PPIPName subject='?????? ???????????? ????????????' url={record.url} />) : (<PPIPName subject={`???????????? ???????????? (ver. ${value === 9999 ? '??????' : value})`} url={record.url} />), sorter: (a: any, b: any): number => a.version - b.version },
          { title: '??????', dataIndex: 'sortation', key: 'sortation', render: (_: string, record: any): JSX.Element => list ? record.version === 0 ? (<Tag color='default'>????????????</Tag>) : record.version === 9999 ? (<Tag color='geekblue'>??????</Tag>) : (<Tag color='green'>??????</Tag>) : (<></>) },
          { title: '?????? ?????????', dataIndex: 'createAt', key: 'createAt', render: (value: number, record: any): string => record.version === 0 ? '-' : moment.unix(value / 1000).format('YYYY-MM-DD HH:mm'), sorter: (a: any, b: any): number => a.createAt - b.createAt },
          { title: '?????? ??????', dataIndex: 'applyAt', key: 'applyAt', render: (value: number, record: any): string => record.version === 0 ? '-' : moment.unix(value).format('YYYY-MM-DD'), sorter: (a: any, b: any): number => a.applyAt - b.applyAt },
          { title: '??????', dataIndex: 'url', key: 'url', render: (value: string) => (<LinkButtonInTable url={value} />) }
        ]} dataSource={list} showSorterTooltip={false} />
      </StyledTableForm>
    </>
  );
}

/** [Internal Component] ???????????? ???????????? ?????? ?????? */
const CreatePIPPSection: React.FC<any> = ({ accessToken, onChange, data, onFocus, refElements, refTables, rels, serviceId, serviceTypes }): JSX.Element => {
  // Query Client ??????
  const queryClient = useQueryClient();
  // ????????? ?????? ?????? ?????? ??????
  const [open, setOpen] = useState<boolean>(false);
  // ?????? ????????? ??????
  const [refType, setRefType] = useState<string>('');

  /** [Event handler] ?????? ?????? */
  const onOpen = useCallback((type: string): void => {
    setRefType(type);
    setOpen(true);
  }, []);
  /** [Event handler] ?????? ?????? */
  const onClose = useCallback((): void => {
    setOpen(false);
    queryClient.invalidateQueries([refType, serviceId]);
  }, [queryClient, refType, serviceId]);

  // ???????????? ??????
  return (
    <>
      <Row gutter={74} style={{ height: 'calc(100vh - 324px)' }}>
        <Col span={12} style={{ height: '100%', overflowY: 'auto' }}>
          <InputSection data={data.dInfo} onChange={onChange} onFocus={onFocus} onOpenModal={onOpen} refElements={refElements.input} refTables={refTables} rels={rels} sectionType='dInfo' />
        </Col>
        <Col span={12} style={{ borderLeft: '1px solid rgba(156, 156, 156, 0.3)', height: '100%', overflowY: 'auto' }}>
          <PreviewSection data={data} preview={true} refElements={refElements.preview} refTables={refTables} rels={rels} serviceTypes={serviceTypes} stmt={stmt(data.dInfo.name)} />
        </Col>
      </Row>
      <EditableModal accessToken={accessToken} onClose={onClose} serviceId={serviceId} type={refType} visible={open} />
    </>
  );
}
/** [Internal Component] ???????????? ?????? ???????????? ?????? ????????? ?????? ?????? */
 export const EditableModal: React.FC<any> = ({ accessToken, onClose, serviceId, type, visible }: any): JSX.Element => {
  // ?????? ??????, ????????? ?????? ?????? ??????
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<JSX.Element>(<></>);
  // ????????? ?????? ?????? ??? ?????? ??????
  useEffect(() => {
    switch (type) {
      case 'pi':
        setTitle('???????????? ?????? ??? ??????');
        setContent(<PITable accessToken={accessToken} serviceId={serviceId} />);
        break;
      case 'ppi':
        setTitle('???????????? ??????');
        setContent(<PPITableForm accessToken={accessToken} modal={true} serviceId={serviceId} />);
        break;
      case 'cpi':
        setTitle('???????????? ??????');
        setContent(<CPITableForm accessToken={accessToken} modal={true} serviceId={serviceId} />);
        break;
      case 'fni':
        setTitle('????????????');
        setContent(
          <>
            <h2 style={{ fontSize: 15, fontWeight: '500', marginBottom: 16 }}>???????????? ?????? ??? ??????</h2>
            <FNITable accessToken={accessToken} modal={true} serviceId={serviceId} />
            <div style={{ marginTop: 48 }}></div>
            <PFNITableForm accessToken={accessToken} modal={true} serviceId={serviceId} style={{ marginBottom: 48 }} />
            <CFNITableForm accessToken={accessToken} modal={true} serviceId={serviceId} style={{ marginBottom: 0 }} />
          </>
        );
        break;
      default:
        setTitle('');
        setContent(<></>);
        break;
    }
  }, [accessToken, serviceId, type]);
  // ???????????? ??????
  return (
    <Modal centered footer={false} maskClosable={false} onCancel={onClose} style={{ fontFamily: 'Pretendard' }} title={title} visible={visible} width='80%'>{content}</Modal>
  );
}
/** [Internal Component] ???????????? ???????????? ?????? ????????? Header (?????? ?????? ????????? ?????? ????????? ?????? ?????? ??????) */
const MainPageHeader: React.FC<PIPPProcess> = ({ onProcess, serviceId, status }: PIPPProcess): JSX.Element => {
  // ???????????? ?????? ??? ?????? ????????? ??????
  const { isLoading, data: pi } = useQuery([SERVICE_PI, serviceId], async () => await getPIDatas(serviceId));

  /** [Event handler] ?????? ?????? ?????? */
  const onConfirm = useCallback(() => Modal.confirm({
    cancelText: '?????????',
    centered: true,
    content: '????????? ?????????????????? ????????? ???????????????.',
    okText: '???',
    onOk: () => onProcess('create'),
    title: '???????????? ?????? ??????????????????????',
  }), [onProcess]);
  /** [Event handler] ?????? ?????? */
  const onCreate = useCallback(() => pi && pi.length > 0 ? onProcess('create') : Modal.confirm({
    cancelText: '?????????',
    centered: true,
    content: '???????????? ?????? ????????? ???????????? ????????? ?????? ????????? ??????????????? ????????? ????????? ??? ????????????.',
    okText: '??????????????????',
    onOk: () => Router.push('/pim/cu'),
    title: '????????? ????????? ????????????.'
  }), [pi, onProcess]);
  /** [Event handler] ?????? ???????????? */
  const onUpdate = useCallback(() => onProcess('update'), [onProcess]);

  // ???????????? ??????
  return (
    <StyledPageHeader>
      <Spin spinning={isLoading}>
        <div className="header">
          <h2 className="title">???????????? ???????????? ??????</h2>
          <Button type='default'>???????????? ?????? ?????????</Button>
        </div>
        <div className="content">
          <span className="form-description">
            <span className="icon">
              <FiEdit />
            </span>
            <p className="description">
              {status === undefined || status === 'none' ? (
                <>???????????? ?????? ????????? ????????? ????????? ????????????, ???????????? ??????????????? ??????????????????!</>
              ) : status === 'progress' ? (
                <>?????? ?????? ?????? ???????????? ??????????????? ?????????.<br/>???????????? ??????????????? ???????????? ?????? ????????? ???????????? ?????????<br/>???????????? ?????? ????????? ??????????????? ????????? ??????????????? ????????? ???????????????.</>
              ) : (
                <>???????????? ??????????????? ?????? ????????? ????????????, ???????????? ??????????????? ?????????????????? ?????????.<br/>????????? ??????????????? ???????????? ????????? ??????????????????!</>
              )}
            </p>
          </span>
          {status === undefined || status === 'none' ? (
            <Button icon={<PlusOutlined />} onClick={onCreate} type='primary'>?????? ????????????</Button>
          ) : status === 'progress' ? (
            <span>
              <Button icon={<EditOutlined />} onClick={onUpdate} type='primary' style={{ marginRight: 16 }}>?????? ?????????</Button>
              <Button icon={<PlusOutlined />} onClick={onConfirm} type='default'>?????? ????????????</Button>
            </span>
          ) : (
            <Button icon={<RedoOutlined />} onClick={onUpdate} type='primary'>?????? ????????????</Button>
          )}
        </div>
      </Spin>
    </StyledPageHeader>
  );
}
/** [Internal Compoent] ????????? ??? Row ?????? */
const PPIPName: React.FC<any> = ({ subject, url }): JSX.Element => {
  return (
    <StyledPIPPName href={url} rel='noreferrer' target='_blank'>{subject}</StyledPIPPName>
  );
}