import { InputDivProps } from "../../models/Type2"
import styled from 'styled-components';
import React, { useState } from "react";
import { FS_BXS } from "../../static/Font";

const Div = styled.div`
  position: relative;
`;
const TitleSpan = styled.span`
  position: absolute;
  top:-0.25rem;
  left:0.75rem;
  padding:0 0.25rem;
  font-size:${FS_BXS};
  color:#5965B6;
  background-color: #ffffff;
`;
const Input = styled.input`
  border: 1px solid #5965B6;
  border-radius: 0.5rem;
  padding: 0.625rem 1rem;
  width: 100%;
`;

export const InputDiv = ({ type, title, afterSearchHandler }: InputDivProps): JSX.Element => {
  const [inputText, setInputText] = useState<string>('');
  const onChangeHandler = (e: React.ChangeEvent<HTMLElement>) => {
    const input = e.target as HTMLInputElement;
    setInputText(input.value);
  }
  const onKeyPressHandler = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.key === "Enter") {
      afterSearchHandler(inputText);
    }
  }
  return <Div>
    {title && <TitleSpan>{title}</TitleSpan>}
    <Input type={type} value={inputText} onChange={onChangeHandler} onKeyPress={onKeyPressHandler} />
  </Div>
}