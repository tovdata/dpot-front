import styled from "styled-components"
import { InputDropDownProps } from "../../models/Type2"
import { FS_BS } from "../../static/Font"

const ListDiv = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  border: 1px solid #5965B6;
  border-radius: 0.5rem;
  padding: 0.5rem 0;
  margin-top: 0.5rem;
  div{
    padding: 0.3rem 1rem;
    font-size: ${FS_BS};
    cursor: pointer;
    &:hover{
      background-color: #E7E9F5;
    }
  }
`

export const InputDropDown = ({ items }: InputDropDownProps): JSX.Element => {
  return (
    <ListDiv>
      {items.map((item: string, index: number) => <div key={index}>{item}</div>)}
    </ListDiv>
  )
}