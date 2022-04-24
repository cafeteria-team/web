import React from "react";
import styled from "styled-components";

const StyledInput = styled.input``;

const StyledLabel = styled.label``;

const StyledSpan = styled.span`
  cursor: pointer;
  color: #ff9030;
  margin-left: 6px;
  text-decoration: underline !important;
  text-underline-position: under;
  text-decoration-color: #fdc89a !important;
`;

function PrivacyInput({
  checked,
  type,
  onChange,
  value,
  id,
  htmlFor,
  onClick,
}) {
  return (
    <>
      <StyledInput type={type} id={id} checked={checked} onChange={onChange} />
      <StyledLabel htmlFor={htmlFor}>
        <StyledSpan onClick={onClick}>개인정보 수집</StyledSpan> 및 이용에 동의
      </StyledLabel>
    </>
  );
}

export default PrivacyInput;
