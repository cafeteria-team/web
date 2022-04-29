import React from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  Ul,
  Li,
  LoadingLi,
} from "../components/StyledElements";
import uuid from "react-uuid";

const Facility = ({
  facilityList,
  DragDropContext,
  Draggable,
  Droppable,
  onDragEnd,
}) => {
  return (
    <>
      <FlexBox
        just="space-between"
        height="62px"
        align="center"
        padding="20px 24px"
      >
        <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
          회원관리
        </StyledBody>
      </FlexBox>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        {facilityList.map((item, index) => (
          <div key={uuid()}>{item.name}</div>
        ))}
      </DragDropContext>
    </>
  );
};

export default Facility;
