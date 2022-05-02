import React, { useState, useEffect } from "react";
import { Facility } from "../../views";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  Ul,
  Li,
  LoadingLi,
} from "../../components/StyledElements";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import uuid from "react-uuid";
import { useStores } from "../../stores/Context";
import { observer } from "mobx-react";

const ManageContainer = observer(() => {
  const { ManageStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);

  const [facilityList, setFacilityList] = useState({
    facility: {
      id: "facility",
      list: [],
      title: "등록가능한 시설목록",
    },
    userFacility: {
      id: "userFacility",
      list: [],
      title: "우리 업체 시설목록",
    },
  });

  // 편의시설 리스트 받아오기
  const getFacilityList = () => {
    setIsLoading(true);
    ManageStore.callFacilityList()
      .then((res) => {
        setFacilityList((prev) => ({
          ...prev,
          facility: {
            ...prev.facility,
            list: res.data,
          },
        }));
        setIsLoading(false);
      })
      .catch((err) => {
        alert("편의시설 정보를 불러올수없습니다.");
        setIsLoading(false);
      })
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    getFacilityList();
  }, []);

  //   const onDragEnd = (result, columns, setColumns) => {
  //     if (!result.destination) return;
  //     const { source, destination } = result;

  //     if (source.droppableId !== destination.droppableId) {
  //       const sourceColumn = columns[source.droppableId];
  //       const destColumn = columns[destination.droppableId];
  //       const sourceItems = [...sourceColumn.items];
  //       const destItems = [...destColumn.items];
  //       const [removed] = sourceItems.splice(source.index, 1);
  //       destItems.splice(destination.index, 0, removed);
  //       setColumns({
  //         ...columns,
  //         [source.droppableId]: {
  //           ...sourceColumn,
  //           items: sourceItems,
  //         },
  //         [destination.droppableId]: {
  //           ...destColumn,
  //           items: destItems,
  //         },
  //       });
  //     } else {
  //       const column = columns[source.droppableId];
  //       const copiedItems = [...column.items];
  //       const [removed] = copiedItems.splice(source.index, 1);
  //       copiedItems.splice(destination.index, 0, removed);
  //       setColumns({
  //         ...columns,
  //         [source.droppableId]: {
  //           ...column,
  //           items: copiedItems,
  //         },
  //       });
  //     }
  //   };

  //   function handleOnDragEnd(result) {
  //     /**
  //      * 필요한 요소
  //      *  드래그할 대상의 index
  //      *  드래그가 끝났을때의 index
  //      *
  //      * 할 일
  //      * 1. 드래그할 대상의 index를 지운다
  //      * 2. 드래그가 끝난 당시의 index에 현재 드래그 중인 요소를 넣는다
  //      */

  //     const currentTags = [...facilityList];
  //     const draggingItemIndex = result.source.index;
  //     const afterDragItemIndex = result.destination.index;

  //     const removeTag = currentTags.splice(beforeDragItemIndex, 1);

  //     currentTags.splice(afterDragItemIndex, 0, removeTag[0]);

  //     setFacilityList(currentTags);
  //   }

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Move the item within the list
    // Start by making a new list without the dragged item
    const newList = facilityList.filter((_, idx) => idx !== source.index);

    // Then insert the item at the right location
    newList.splice(destination.index, 0, facilityList[source.index]);

    // Update the list
    setFacilityList(newList);
  };

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">업체관리 </StyledTitle>
      <FlexBox
        width="100%"
        background="#fff"
        boxSizing="border-box"
        direction="column"
        rad="16px"
        shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
      >
        <Facility
          isLoading={isLoading}
          columns={facilityList}
          //   DragDropContext={DragDropContext}
          //   Draggable={Draggable}
          //   Droppable={Droppable}
          onDragEnd={onDragEnd}
        />
      </FlexBox>
    </FlexBox>
  );
});

export default ManageContainer;
