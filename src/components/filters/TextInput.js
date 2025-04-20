import styled from 'styled-components';
import { BaseInput } from '../common/BaseInput';
import { useCallback } from 'react';

export function TextInput({ placeholder, value, onChange }) {
  const handleInput = useCallback(
    (e) => {
      onChange(e.target.value);
    },
    [onChange]
  );

  return (
    <Input value={value} placeholder={placeholder} onChange={handleInput} />
  );
}

const Input = styled.input`
  ${BaseInput}
`;
