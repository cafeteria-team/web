import React from "react";
import styled from "styled-components";

const StyledInput = styled.input``;

const StyledLabel = styled.label``;

const StyledSpan = styled.span`
  cursor: pointer;
  text-decoration: underline;
  color: #3b86ff;
  margin-left: 6px;
`;

function PrivacyInput({ checked, type, onChange, value, id, htmlFor }) {
  return (
    <>
      <StyledInput type={type} id={id} checked={checked} onChange={onChange} />
      <StyledLabel htmlFor={htmlFor}>
        <StyledSpan>개인정보 수집</StyledSpan> 및 이용에 동의
      </StyledLabel>
    </>
  );
}

export default PrivacyInput;
