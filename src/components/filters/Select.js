import styled from 'styled-components';
import { BaseInput } from '../common/BaseInput';

// При поиске params lowerCase
export function Select({ placeholder, options }) {
  return (
    <SelectInput>
      <option value="" selected disabled hidden>
        {placeholder}
      </option>
      {options.map((option) => {
        return <option key={option}>{option}</option>;
      })}
    </SelectInput>
  );
}

const SelectInput = styled.select`
  ${BaseInput}

  option {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;
