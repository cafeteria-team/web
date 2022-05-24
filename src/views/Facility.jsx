import React, { memo } from "react";
import {
  FlexBox,
  StyledBody,
  Ul,
  Li,
  StyledSpan,
} from "../components/StyledElements";
import { Button } from "../components";
import uuid from "react-uuid";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const Column = memo(({ col: { list, id, title } }) => {
  return (
    <Droppable droppableId={id}>
      {(provided) => {
        return (
          <FlexBox
            width="50%"
            direction="column"
            padding="20px"
            margin="0 24px 24px"
            rad="8px"
            background={
              id === "facility"
                ? "rgba(145, 158, 171, 0.12)"
                : "rgb(209, 233, 252)"
            }
          >
            <StyledBody
              color={
                id === "facility" ? "color rgb(33, 43, 54)" : "rgb(6, 27, 100)"
              }
              fontSize="14px"
              fontW="600"
              width="100%"
              margin="0 0 20px"
            >
              {title}
            </StyledBody>
            <Ul
              className="facilities"
              {...provided.droppableProps}
              ref={provided.innerRef}
              direction="column"
              width="100%"
              mWidth="242px"
              //   align="center"
              margin="-24px"
              mHeight="380px"
              minHeight="380px"
              wrap="wrap"
              padding="12px"
            >
              {list.map((text, index, arr) => {
                return (
                  <Item
                    key={uuid()}
                    text={text}
                    index={index}
                    last={arr.length - 1}
                    id={id}
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
});

const Item = ({ text, index, last, id }) => {
  return (
    <Draggable draggableId={`${text}`} index={index}>
      {(provided) => {
        return (
          <Li
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            height="48px"
            borderA={
              id === "facility"
                ? "1px solid #e2e6e7"
                : "1px solid rgb(147 171 225)"
            }
            width="45%"
            rad="8px"
            align="center"
            just="center"
            color={id === "facility" ? "#212B36" : "rgb(16, 57, 150)"}
            background={id === "facility" ? "#fff" : "rgba(16, 57, 150, 0.24)"}
            fontW={id === "facility" ? "400" : "600"}
            margin="12px"
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
        // minW="612px"
      >
        <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
          편의시설관리
        </StyledBody>
        <StyledSpan color="rgb(99, 115, 129)" font="12px">
          원하시는 품목을 마우스로 끌어서 넣어주세요.
        </StyledSpan>
      </FlexBox>
      <FlexBox just="center">
        <DragDropContext
          onDragEnd={(result) => {
            onDragEnd(result);
          }}
        >
          {isLoading ? (
            <FlexBox padding="24px">리스트를 불러오는중입니다.</FlexBox>
          ) : (
            <FlexBox width="100%">
              {Object.values(columns).map((col) => (
                <Column col={col} key={col.id} />
              ))}
            </FlexBox>
          )}
        </DragDropContext>
      </FlexBox>
      <FlexBox just="center" padding="0 24px 50px"></FlexBox>
    </>
  );
};

export default memo(Facility);
