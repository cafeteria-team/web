import React, { memo } from "react";
import styled from "styled-components";

const StyledInput = styled.input`
  width: ${({ width }) => width || "300px"};
  padding: ${({ padding }) => padding || "14px 20px"};
  margin: ${({ margin }) => margin || " 0 0 20px 0"};
  border: 1px solid #ccc;
  border-radius: ${({ theme }) => theme.radii[2]};
  outline: unset;
  transition: border 0.3s ease-in-out;
  font-size: ${({ theme }) => theme.fontSizes[1]};
  &:focus {
    border-color: ${({ theme }) => theme.colors.orange};
  }
  ::placeholder {
    color: "#ccc";
  }
`;

const Input = memo(
  ({
    placeholder,
    type,
    onChange,
    value,
    width,
    id,
    disabled,
    padding,
    margin,
    dataId,
  }) => {
    return (
      <StyledInput
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value || ""}
        id={id || ""}
        disabled={disabled}
        width={width || ""}
        padding={padding || ""}
        margin={margin || ""}
        data-id={dataId}
      ></StyledInput>
    );
  }
);
export default Input;
