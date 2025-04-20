import { css } from 'styled-components';

export const BaseInput = css`
  background-color: #263750;
  border: 1px solid #83bf46;
  font-size: 16px;
  font-family: Inter, 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 400;
  border-radius: 8px;
  color: #ffffff;
  padding: 12px 16px;
  width: 180px;
  height: 40px;
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
  }
`;
