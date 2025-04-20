import { css } from 'styled-components';

export const BaseInput = css`
  background-color: #263750;
  border: 1px solid #263750;
  border-radius: 4px;
  color: #ffffff;
  padding: 8px 12px;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: background-color 0.2s, border-color 0.2s, box-shadow 0.2s;

  &::placeholder {
    color: #bbbbbb;
  }

  &:hover {
    background-color: #334466;
  }

  &:focus {
    outline: none;
    border-color: #83bf46;
    box-shadow: 0 0 0 3px rgba(131, 191, 70, 0.4);
  }
`;
