import React, { useState, useEffect } from "react";
import { Facility, TextEditor, Menu } from "../../views";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  Ul,
  Li,
  LoadingLi,
} from "../../components/StyledElements";
import moment from "moment";

import uuid from "react-uuid";
import { useStores } from "../../stores/Context";
import { observer } from "mobx-react";

const ManageContainer = observer(() => {
  const { AuthStore, ManageStore } = useStores();

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
  const getFacilityList = (userLists) => {
    setIsLoading(true);
    ManageStore.callFacilityList()
      .then((res) => {
        const nameLists = res.data.map((item) => item.name);

        var intersection = nameLists.filter(
          (value) => userLists.indexOf(value) === -1
        );
        setFacilityList((prev) => ({
          ...prev,
          facility: {
            ...prev.facility,
            list: intersection,
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

  // 선택된 편의시설 리스트
  const getSelectedFacilityList = () => {
    setIsLoading(true);

    AuthStore.getPersistedAuth()
      .then((res) => {
        ManageStore.callUserFacilityList(res.user.userId)
          .then((res) => {
            const nameLists = res.data.store_facility.map(
              (item) => item.facility.name
            );
            setFacilityList((prev) => ({
              ...prev,
              userFacility: {
                ...prev.userFacility,
                list: nameLists,
              },
            }));
            getFacilityList(nameLists);
          })
          .catch((err) => {
            alert("편의시설 정보를 불러올수없습니다.");
            setIsLoading(false);
          });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getSelectedFacilityList();
  }, [AuthStore]);

  const onDragEnd = ({ source, destination }) => {
    console.log(source);
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // Make sure we're actually moving the item
    if (
      source.droppableId === destination.droppableId &&
      destination.index === source.index
    )
      return null;

    // Set start and end variables
    const start = facilityList[source.droppableId];
    const end = facilityList[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
        title: start.title,
      };

      // Update the state
      setFacilityList((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        list: newStartList,
        title: start.title,
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        list: newEndList,
        title: end.title,
      };

      // Update the state
      setFacilityList((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol,
      }));
      return null;
    }
  };

  // 공지사항 저장
  const sendNotice = (result) => {
    console.log(result);
  };

  // 편의시설 저장
  const sendFacility = () => {};

  // 메뉴날짜선정
  const selectedDate = (date) => {
    console.log(moment(date).format());
  };

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">업체관리</StyledTitle>
      <FlexBox
        width="100%"
        background="#fff"
        boxSizing="border-box"
        direction="column"
        rad="16px"
        shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
      >
        <Menu selectedDate={selectedDate} />
      </FlexBox>

      <FlexBox
        width="100%"
        margin="24px 0 0"
        background="#fff"
        boxSizing="border-box"
        direction="column"
        rad="16px"
        shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
      >
        <Facility
          isLoading={isLoading}
          columns={facilityList}
          onDragEnd={onDragEnd}
          sendFacility={sendFacility}
        />
      </FlexBox>
      <FlexBox
        width="100%"
        margin="24px 0 0"
        background="#fff"
        boxSizing="border-box"
        direction="column"
        rad="16px"
        shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
      >
        <TextEditor sendNotice={sendNotice} />
      </FlexBox>
    </FlexBox>
  );
});

export default ManageContainer;
