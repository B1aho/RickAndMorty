import styled from 'styled-components';
import { useState, useRef, useEffect, useCallback } from 'react';
import { BaseInput } from '../../common/BaseInput';
import { OptionItem } from './OptionItem';
import { OptionsList } from './OptionList';

export function Select({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  const toggleOpen = useCallback(() => setIsOpen((prev) => !prev), []);
  const handleOptionClick = useCallback(
    (option) => {
      onChange(option);
      setIsOpen(false);
    },
    [onChange]
  );

  const clearValue = useCallback(() => onChange(''), [onChange]);
  const onClearClick = useCallback(
    (e) => {
      e.stopPropagation();
      clearValue();
    },
    [clearValue]
  );
  const onOptionClick = useCallback(
    (option) => {
      handleOptionClick(option);
    },
    [handleOptionClick]
  );

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);

    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <Wrapper ref={ref} $isOpen={isOpen}>
      <Input onClick={toggleOpen} $isActive={isOpen || !!value}>
        <span>{value || placeholder}</span>
        {value ? (
          <IconButton onClick={onClearClick} title="Clear">
            ✕
          </IconButton>
        ) : (
          <IconButton title="Toggle options"> {isOpen ? '▲' : '▼'} </IconButton>
        )}
      </Input>
      {isOpen && (
        <OptionsList>
          {options.map((option) => (
            <OptionItem
              key={option}
              option={option}
              isSelected={value === option}
              onClick={onOptionClick}
            />
          ))}
        </OptionsList>
      )}
    </Wrapper>
  );
}

const accentColor = '#83BF46';

const Wrapper = styled.div`
  position: relative;
  user-select: none;
`;

const Input = styled.div`
  ${BaseInput};
  display: flex;
  justify-content: space-between;
  align-items: center;
  svg {
    transition: color 0.2s;
  }

  span {
    color: ${({ $hasValue }) => ($hasValue ? 'black' : '#bbbbbb')};
  }

  &:hover svg {
    color: ${accentColor};
  }
`;

const IconButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: ${accentColor};
  }
`;
