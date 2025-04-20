import styled from 'styled-components';

export const BaseButton = (accentColor) => styled.button`
  width: 85px;
  height: 40px;
  padding: 12px;
  background: transparent;
  color: ${accentColor};
  border: 1px solid ${accentColor};
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;

  &:hover {
    background-color: ${accentColor};
    color: #ffffff;
  }
`;
