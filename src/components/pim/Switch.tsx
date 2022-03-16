import styled from 'styled-components';
// Color
import { PRIMARY50, PRIMARY_D, WHITE } from '../../static/Color';
// Props
import { SwitchProps } from '../../models/Type';

// Create a styled element (Switch)
export const StyledSwitch = styled.div`
  display: block;
  input {
    display: none;
  }
  label {
    align-items: center;
    background-color: ${PRIMARY50};
    border-radius: 2.75rem;
    cursor: pointer;
    display: flex;
    justify-content: start;
    height: 0.875rem;
    padding: 0.125rem;
    position: relative;
    transition: background-color 0.16s;
    width: 1.5rem;
  }
  label > span {
    background-color: ${WHITE};
    border-radius: 2.75rem;
    box-shadow: 0 0 2px 0 rgba(10, 10, 10, 0.29);
    height: 0.625rem;
    left: 0.125rem;
    position: absolute;
    transition: 0.16s;
    width: 0.625rem;
  }
  input:checked + label {
    background-color: ${PRIMARY_D};
  }
  input:checked + label > span {
    left: calc(100% - 0.125rem);
    transform: translateX(-100%);
  }
`;

const Switch = ({ id, onChange, status }: SwitchProps): JSX.Element => {
  return (
    <StyledSwitch>
      <input id={id} checked={status} type='checkbox' onChange={onChange} />
      <label htmlFor={id}>
        <span></span>
      </label>
    </StyledSwitch>
  )
}

export default Switch;