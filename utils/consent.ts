import { warningNotification } from "@/components/common/Notification";

// 고유식별정보 리턴
export const returnUniqueInfo = (info: string[]) => {
  const unique = ['주민등록번호', '여권번호', '운전면허번호', '외국인등록번호'];
  return info?.filter((item: string) => unique.includes(item));
}

// 고유식별정보의 경우 고유식별 정보만 보여주는 piData를 리턴한다.
export const filteredNotUnique = (type: number, _data: any) => {
  if (type === 2) {
    return _data?.map((item: any) => {
      const newItem = JSON.parse(JSON.stringify(item));
      newItem.essentialItems = returnUniqueInfo(item.essentialItems);
      newItem.selectionItems = returnUniqueInfo(item.selectionItems);
      return newItem;
    });
  } else {
    return _data;
  }
}
// 고유식별정보를 가지고 있는지 체크
export const hasUniqueItems = (type: number, data: any) => {
  // 고유식별정보 ,제 3자 제공는 제외
  if (type === 2 || type === 4) {
    return false;
  }
  for (let i = 0; i < data.length; i++) {
    const item = data[i];
    const ei = returnUniqueInfo(item.essentialItems);
    const si = returnUniqueInfo(item.selectionItems);
    if (ei.length > 0 || si.length > 0) return true;
  }
  return false;
}

// type에 따른 PI Subject 필터링
export const filteredPISubjects = (type: number, subject: string[], PIData: any) => {
  const subjects: any = {};
  let data;
  const dataProcess = (prData: any) => {
    prData?.forEach((data: any) => {
      const newData: any = {};
      newData.subject = data.subject;
      newData.value = subject?.includes(data.id);
      subjects[data.id] = newData;
    });
  }
  switch (type) {
    case 0:
    case 1:
    case 3:
      data = PIData;
      break;
    case 2:
      data = filteredNotUniqueData(PIData);
      break;
    default:
      break;
  }
  dataProcess(data);
  return subjects;
}
// 고유식별정보를 가진 데이터만 추출
export const filteredNotUniqueData = (data: any) => {
  return data?.filter((data: any) => returnUniqueInfo([...data.essentialItems, ...data.selectionItems]).length > 0)
}

export const filteredData = (oData: any, ids: string[], type: number) => {
  const result = oData?.filter((item: any) => ids.includes(item.id));
  return filteredNotUnique(type, result);
}
// 다음 단계로 넘어가기위한 null값 체크
export const nullCheckForNextStep = (type: number, consentData: any, newStepIndex: number) => {
  let result = false;
  if (type === 4) {
    if (newStepIndex === 1) {
      if (!consentData.title) {
        warningNotification('동의서 제목을 입력해주세요.');
        result = true;
      }
      if (!consentData.subjects || consentData.subjects.length === 0) {
        warningNotification('동의를 받고자 하는 업체를 선택해주세요.');
        result = true;
      }
      if (!consentData.checkList) {
        warningNotification('확인사항을 체크해주세요.');
        result = true;
      }
    }
  } else {
    if (newStepIndex === 1) {
      if (!consentData.title) {
        warningNotification('동의서 제목을 입력해주세요.');
        result = true;
      }
      if (!consentData.subjects || consentData.subjects.length === 0) {
        warningNotification('동의를 받고자 하는 업무를 선택해주세요.');
        result = true;
      }
    } else if (newStepIndex === 2) {
      consentData.pData?.forEach((item: any) => {
        if ((item.essentialItems.length === 0 && item.selectionItems.length === 0) || item.purpose.length === 0) {
          result = true;
          warningNotification('동의를 받고자 하는 목적과 항목을 선택해주세요.');
        }
      })
      if (!consentData.checkList) {
        warningNotification('확인사항을 체크해주세요.');
        result = true;
      }
      if (hasUniqueItems(type, consentData.pData)) {
        warningNotification('선택한 항목 중 고유식별정보가 있습니다. 고유식별정보를 제거해주세요.');
        result = true;
      }
    }
  }
  return result;
}
// 기존의 데이터에 isSelected 속성 추가
export const addSelectedOption = (data: any, ids: string[]) => {
  return data.map((item: any) => {
    const newItem = JSON.parse(JSON.stringify(item));
    newItem.isSelected = ids?.includes(item.id);
    return newItem;
  });
}
// PPI 데이터 중 선택한(subjects 속하는 데이터)만 반환 
export const getSelectedPPIData = (data: any, subjects: string[]) => {
  return data.filter((item: any) => subjects.includes(item.id));
}