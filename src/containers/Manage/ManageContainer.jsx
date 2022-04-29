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

  const [facilityList, setFacilityList] = useState(null);

  // 편의시설 리스트 받아오기
  const getFacilityList = () => {
    ManageStore.callFacilityList()
      .then((res) => setFacilityList(res.data))
      .catch((err) => alert("편의시설 정보를 불러올수없습니다."));
  };

  useEffect(() => {
    getFacilityList();
  }, []);

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
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
          facilityList={facilityList}
          DragDropContext={DragDropContext}
          Draggable={Draggable}
          Droppable={Droppable}
          onDragEnd={onDragEnd}
        />
      </FlexBox>
    </FlexBox>
  );
});

export default ManageContainer;
