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
      data = PIData.filter((data: any) => returnUniqueInfo([...data.essentialItems, ...data.selectionItems]).length > 0);
      break;
    default:
      break;
  }
  dataProcess(data);
  return subjects;
}