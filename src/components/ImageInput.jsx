import React from "react";
import styled from "styled-components";

const StyledInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

const StyledLabel = styled.label`
  position: absolute;
  right: 10px;
  top: 15.5px;
  background-color: unset;
  border: unset;
  color: #3b86ff;
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
`;

const EditLabel = styled.label`
  background-color: unset;
  border: unset;
  color: #3b86ff;
  font-size: 14px;
  cursor: pointer;
  z-index: 2;
`;

function ImageInput({ onClick, onChange, id, accept, editImage }) {
  return (
    <>
      <StyledInput
        onClick={onClick}
        onChange={onChange}
        accept={accept}
        id={id}
      />
      {editImage ? (
        <EditLabel htmlFor={id}>
          <p>수정하기</p>
        </EditLabel>
      ) : (
        <StyledLabel htmlFor={id}>
          <p>이미지 등록</p>
        </StyledLabel>
      )}
    </>
  );
}

export default ImageInput;
