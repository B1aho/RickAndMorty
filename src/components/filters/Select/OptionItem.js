import { useCallback } from 'react';
import styled from 'styled-components';

export function OptionItem({ option, isSelected, onClick }) {
  const handleClick = useCallback(() => {
    onClick(option);
  }, [option, onClick]);

  return (
    <Option onClick={handleClick} $selected={isSelected}>
      {option}
    </Option>
  );
}

const Option = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  font-weight: ${({ $selected }) => ($selected ? 'bold' : 'normal')};
  background-color: white;

  &:hover {
    background-color: #83bf4633;
    color: black;
  }
`;
