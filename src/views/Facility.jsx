import React from "react";
import {
  FlexBox,
  StyledBody,
  Ul,
  Li,
  StyledSpan,
} from "../components/StyledElements";
import uuid from "react-uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Column = ({ col: { list, id, title } }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => {
        return (
          <FlexBox>
            <Ul
              className="facilities"
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction="column"
              padding="20px"
              margin="0 24px 24px"
              rad="8px"
              width="fit-content"
              mWidth="242px"
              align="center"
              background={
                id === "facility"
                  ? "rgba(145, 158, 171, 0.12)"
                  : "rgb(209, 233, 252)"
              }
            >
              <StyledBody
                color={
                  id === "facility"
                    ? "color rgb(33, 43, 54)"
                    : "rgb(6, 27, 100)"
                }
                fontSize="14px"
                fontW="600"
                width="100%"
                margin="0 0 20px"
              >
                {title}
              </StyledBody>
              {list.map((text, index, arr) => {
                return (
                  <Item
                    key={uuid()}
                    text={text}
                    index={index}
                    last={arr.length - 1}
                  />
                );
              })}
              {provided.placeholder}
            </Ul>
          </FlexBox>
        );
      }}
    </Droppable>
  );
};

const Item = ({ text, index, last }) => {
  return (
    <Draggable draggableId={`${text}`} index={index}>
      {(provided) => {
        return (
          <Li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            height="48px"
            borderA="1px solid #e2e6e7"
            width="200px"
            rad="8px"
            align="center"
            just="center"
            background="#fff"
            // margin="0 0 24px"
            margin={last === index ? "0" : "0 0 24px"}
          >
            {text}
          </Li>
        );
      }}
    </Draggable>
  );
};

const Facility = ({ isLoading, columns, onDragEnd }) => {
  return (
    <>
      <FlexBox
        just="space-between"
        height="62px"
        align="center"
        padding="20px 24px"
        minW="612px"
      >
        <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
          편의시설관리
        </StyledBody>
        <StyledSpan color="rgb(99, 115, 129)" font="12px">
          원하시는 품목을 마우스로 끌어서 넣어주세요.
        </StyledSpan>
      </FlexBox>
      <DragDropContext
        onDragEnd={(result) => {
          onDragEnd(result);
        }}
      >
        {isLoading ? (
          <FlexBox padding="24px">리스트를 불러오는중입니다.</FlexBox>
        ) : (
          <FlexBox>
            {Object.values(columns).map((col) => (
              <Column col={col} key={col.id} />
            ))}
          </FlexBox>
        )}
      </DragDropContext>
    </>
  );
};

export default Facility;
