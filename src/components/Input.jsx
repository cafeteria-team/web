import React, { memo } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: ${({ width }) => width || "300px"};
  padding: 14px 20px;
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.radii[2]};
  outline: unset;
  transition: border 0.3s ease-in-out;
  margin-bottom: 20px;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  &:focus {
    border-color: ${({ theme }) => theme.colors.orange};
  }
  ::placeholder {
    color: "#ccc";
  }
`;

const Input = memo(({ placeholder, type, onChange, value, width, id }) => {
  return (
    <StyledInput
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      value={value || ""}
      id={id || ""}
    ></StyledInput>
  );
});

export default Input;
