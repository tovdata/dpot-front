import { getPIDatas } from "@/models/queries/api";
import { SERVICE_EPI, SERVICE_ESI, SERVICE_PI } from "@/models/queries/type";
import { TableHeaderData } from "@/models/type";
import { LinkOutlined } from "@ant-design/icons";
import { Checkbox, Table, TableColumnProps, Tag, Typography } from "antd";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { copyTextToClipboard } from "utils/utils";
import { TagSelect } from "../common/Select";
import { createTableColumnProps, EditableTable, EditableTableForm, TableContentForList, TableContentForTags } from "../common/Table";
import { consentListHeader } from "./Header";

/**
 * [Component] '정보 입력'에서 수정되는 개인정보 테이블
 * @param {object} headers 헤더정보
 * @param {object} orignData 변경되지 않는 본래의 데이터(defaultOption 때문에 존재)
 * @param {object} data 변경되는 정보
 * @param {void} setData 정보를 변경시키는 함수
 * @returns 
 */
export const ConsentEditPITable = ({ headers, orignData, data, setData }: any): JSX.Element => {
  // [Handler] items가 변경될 때 동작
  const onChangeHandler = (index: number, key: React.Key | undefined, items: string | string[]): void => {
    const newData = JSON.parse(JSON.stringify(data));
    newData[index][key as string] = items;
    setData(newData);
  }
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a header data
    const header: TableHeaderData = headers[key];
    // Create a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description, header.width);
    column.render = (item: any, record: any, index: number): JSX.Element => {
      if (header.editable) {
        return <TagSelect onChange={(items: string | string[]): void => onChangeHandler(index, column.key, items)} value={item} options={orignData[index][column.key as string]} />
      }
      switch (header.display) {
        case 'string':
          return <>{item}</>
        case 'list':
          return <TableContentForList items={item} key={index} />
        default:
          return <>{item}</>
      }
    };
    return column;
  });
  return <Table columns={columns} dataSource={data} pagination={false} />
}
/**
 * [Component] 법령에 근거하여 정보주체의 동의없이 수집하는 정보를 작성하는 테이블
 * @param {string} description 설명
 * @param {object} headers 헤더정보
 * @param {object} data 변경되는 정보
 * @param {void} setData 정보를 변경시키는 함수
 * @returns 
 */
export const ConsentEPITable = ({ description, header, data, saveData, type }: any): JSX.Element => {
  // [State] Exception Personal Information
  const [epiData, setEpiData] = useState(data || []);
  // Get a state (for select options) 개인정보 수집 및 이용 정보
  const { isLoading: piLoading, data: piData } = useQuery(SERVICE_PI, async () => await getPIDatas('b7dc6570-4be9-4710-85c1-4c3788fcbd12'));

  // [Event handler] 행(Row) 추가 이벤트
  const onAdd = (record: any): void => setEpiData([...epiData, record]);
  // [Event handler] 행(Row) 삭제 이벤트
  const onDelete = (index: number): void => epiData.length - 1 === index ? setEpiData([...epiData.slice(0, index)]) : setEpiData([...epiData.slice(0, index), ...epiData.slice(index + 1)]);
  // [Event handler] 행(Row) 저장 이벤트
  const onSave = (record: any): boolean => {
    const newEpiData = epiData.map((item: any, index: number) => record.id === item.id ? record : item);
    setEpiData(newEpiData);
    saveData({ epiData: newEpiData });
    return true;
  }
  // Return an element
  return (
    <EditableTableForm title='' description={description}>
      <EditableTable refData={piLoading ? [] : piData} dataSource={epiData} headers={header} isLoading={false} onAdd={onAdd} onDelete={onDelete} onSave={onSave} tableName={type === 2 ? SERVICE_ESI : SERVICE_EPI} />
    </EditableTableForm>);
}
/** [Component] 최종 확인 단계에서 입력한 정보를 보여주는 테이블
 * @param {object} headers 헤더정보
 * @param {object} data 변경되는 정보
 * @param {string} mode ['pi':'개인정보 수집·이용 내역', other:'기타 고지 사항'] 
 * @returns 
 */
export const ConsentTable = ({ headers, data, mode }: any) => {
  const convertData = data?.map((item: any) => {
    const newItem = JSON.parse(JSON.stringify(item));
    const items: any = {};
    items.essentialItems = item.essentialItems;
    items.selectionItems = item.selectionItems;
    newItem.items = items;
    delete newItem.essentialItems;
    delete newItem.selectionItems;
    return newItem;
  })
  const ItemComponent = ({ name, items, isBold }: any) => {
    if (items.length === 0) return <></>;
    const itemsText = isBold ? <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{items.join(', ')}</span> : <span>{items.join(', ')}</span>
    if (name)
      return (
        <span>{`${name} : `}{itemsText}</span>
      )
    else
      return (
        <span>{itemsText}</span>
      );
  }
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a header data
    const header: TableHeaderData = headers[key];
    // Create a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description, header.width);
    column.render = (item: any, record: any, index: number): JSX.Element => {
      switch (header.display) {
        case 'string':
          return <>{item}</>
        case 'stringB':
          return <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}>{item}</span>
        case 'list':
          return <TableContentForList items={item} key={index} />
        case 'listB':
          return <span style={{ fontWeight: 'bold', textDecoration: 'underline' }}><TableContentForList items={item} key={index} /></span>
        case 'item':
          return item && item.length > 0 ? (<ItemComponent items={item} />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
        case 'collection':
        case 'collectionB':
          return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <ItemComponent name="필수" items={item.essentialItems} isBold={header.display === 'collectionB'} />
              <ItemComponent name="선택" items={item.selectionItems} isBold={header.display === 'collectionB'} />
            </div>
          );
        default:
          return <>{item}</>
      }
    };
    return column;
  });
  return <Table columns={columns} dataSource={mode === 'pi' ? convertData : data} pagination={false} />
}

export const ConsentEditPPITable = ({ data, headers, ids, setIds }: any) => {
  const onChangeHandler = (id: string, isChecked: boolean) => {
    isChecked ? setIds([...ids, id]) : setIds(ids.filter((item: any) => item !== id));
  }
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a header data
    const header: TableHeaderData = headers[key];
    // Create a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description, header.width);
    column.render = (item: any, record: any, index: number): JSX.Element => {
      switch (header.display) {
        case 'string':
          return <>{item}</>
        case 'list':
          return <TableContentForList items={item} key={index} />
        case 'checkbox':
          return (<Checkbox checked={ids?.includes(record.id)} onChange={(e: any) => onChangeHandler(record.id, e.target.checked)} />);
        case 'item':
          return item && item.length > 0 ? (<TableContentForTags items={item} key={index} tooltip='고유식별정보' />) : (<Typography.Text type='secondary'>해당 없음</Typography.Text>);
        default:
          return <>{item}</>
      }
    }
    return column;
  });
  return <Table dataSource={data} columns={columns} pagination={false} />;
}

const StyledLinkText = styled.a`
  cursor: pointer;
  color:black;
  &:hover{
    text-decoration: underline;
  }
`;
const StyledCopyButton = styled.button`
  border: none;
  background-color: transparent;
`;
export const ConsentListTable = ({ data }: any): JSX.Element => {
  const headers = consentListHeader;
  const docType: any = {
    'pi': { name: '개인정보', color: 'geekblue' },
    'si': { name: '민감정보', color: 'magenta' },
    'uii': { name: '고유식별정보', color: 'purple' },
    'mai': { name: '마케팅', color: 'cyan' },
    'tpp': { name: '제3자제공', color: 'green' }
  };
  const columns: TableColumnProps<any>[] = Object.keys(headers).map((key: string): TableColumnProps<any> => {
    // Extract a header data
    const header: TableHeaderData = headers[key];
    // Create a column
    const column: TableColumnProps<any> = createTableColumnProps(key, header.name, header.description, header.width);
    column.render = (item: any, record: any, index: number): JSX.Element => {
      switch (header.display) {
        case 'tag':
          return <Tag color={docType[item].color}>{docType[item].name}</Tag>
        case 'list':
          return <TableContentForList items={item} key={index} />
        case 'title':
          return <StyledLinkText href={record.url} target='_blank'>{item}</StyledLinkText>
        case 'url':
          return <StyledCopyButton onClick={() => copyTextToClipboard(item)} style={{ color: '#000000D9', cursor: 'pointer' }}><LinkOutlined /></StyledCopyButton>
        default:
          return <>{item}</>
      }
    };
    return column;
  });
  return <Table 
    columns={columns}
    dataSource={data}
    pagination={{
      position: ['bottomRight'],
    }} />
}