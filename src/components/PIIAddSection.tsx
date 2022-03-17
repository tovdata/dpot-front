import { useState } from "react";
import styled from "styled-components"
import { ItemListComponentProps, PIIAddSectionProps } from "../models/type2";
import { SectionElement } from "./common/BorderSection"
import { IoCheckmarkSharp } from "react-icons/io5";
import { InputDiv } from "./common/Input";
import { FS_BS, FS_BXS } from "../static/font";
import { InputDropDown } from "./common/InputDropDown";
const AddSection = styled(SectionElement)`
  padding:2rem; 
`
const TitleH1 = styled.h1`
  font-size:${FS_BS};
  font-weight: 700;
  color:#212121;
`;
const DescriptionDiv = styled.div`
  font-weight: 400;
  font-size:${FS_BXS};
  color:#929292;
`;
const ItemListDiv = styled.div`
  display: flex;
  margin:1rem 0;
  flex-wrap: wrap;
`;

const TagItem = styled.span`
  color:#3643A0;
  border:1px solid #9CA4D4;
  border-radius: 0.75rem;
  font-size: ${FS_BXS};
  padding:0.25rem 0.625rem;
  margin:0.25rem 0.5rem 0.25rem 0;
  word-break:keep-all;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
`;
const CheckedTagItem = styled(TagItem)`
  color:#FAFAFD;
  background-color: #5965B6;
  border-color:transparent;
  svg{
    margin-right:0.25rem;
  }
`

const ItemListComponent = ({ items, selectedItems, setSelectedItems }: ItemListComponentProps): JSX.Element => {
  const tagClickHandler = (e: React.MouseEvent<HTMLElement>) => {
    const span = e.target as HTMLElement;
    const text = span.textContent;
    if (span.tagName === 'SPAN' && text) {
      if (selectedItems.includes(text)) {
        setSelectedItems(selectedItems.filter(item => item !== text));
      } else {
        setSelectedItems([...selectedItems, text]);
      }
    }
  }

  return (
    <ItemListDiv onClick={tagClickHandler}>
      {items.map((item: string, index: number) => {
        if (!selectedItems.includes(item))
          return <TagItem key={index} data-index={index}>{item}</TagItem>
        else
          return <CheckedTagItem key={index} data-index={index}><IoCheckmarkSharp />{item}</CheckedTagItem>
      }
      )}
    </ItemListDiv>
  );
}

export const PIIAddSection = ({ information }: PIIAddSectionProps): JSX.Element => {
  const [items, setItems] = useState([...information.items]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [searchList, setSearchList] = useState<string[]>([]);

  const setSearchListHandler = (text: string) => {
    setSearchList([...searchList, text]);
    setItems([...items, text])
  }
  return (
    <AddSection width="30%">
      <TitleH1>{information.title}</TitleH1>
      <DescriptionDiv>{information.description}</DescriptionDiv>
      <ItemListComponent items={items} selectedItems={selectedItems} setSelectedItems={setSelectedItems} />
      <InputDiv type="text" title="검색 또는 직접 입력" afterSearchHandler={setSearchListHandler}></InputDiv>
      {searchList.length > 0 ? <InputDropDown items={searchList}></InputDropDown> : <></>}
    </AddSection>
  )
}