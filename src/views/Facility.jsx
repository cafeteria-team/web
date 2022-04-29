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
  isLoading,
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
        <Droppable droppableId="facilities">
          {(provided) => (
            <Ul
              className="facilities"
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction="column"
            >
              {isLoading ? (
                <div>로딩중</div>
              ) : facilityList ? (
                facilityList.map(({ id, name }, index) => (
                  <Draggable key={uuid()} index={index} draggableId={`${id}`}>
                    {(provided) => (
                      <Li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        height="48px"
                      >
                        {name}
                      </Li>
                    )}
                  </Draggable>
                ))
              ) : (
                <div>ss</div>
              )}
              {provided.placeholder}
            </Ul>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default Facility;
