import React from "react";
import styled from "styled-components";

const StyledInput = styled.input.attrs({ type: "file" })`
  display: none;
`;

const StyledLabel = styled.label`
  position: absolute;
  right: 80px;
  top: 49px;
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

function ImageInput({ onClick, onChange, id, accept, editImage, FaCamera }) {
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
          <FaCamera style={{ width: "24px", height: "24px" }} />
        </EditLabel>
      ) : (
        <StyledLabel htmlFor={id}>
          <FaCamera style={{ width: "24px", height: "24px" }} />
        </StyledLabel>
      )}
    </>
  );
}

export default ImageInput;
