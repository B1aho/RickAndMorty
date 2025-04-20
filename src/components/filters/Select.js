import styled from 'styled-components';
import { BaseInput } from '../common/BaseInput';
import { useCallback } from 'react';

// При поиске params lowerCase
export function Select({ placeholder, options, value, onChange }) {
  const handleSelect = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <SelectInput value={value} onChange={handleSelect}>
      <option key="DEF-KEY" value="" disabled hidden>
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
