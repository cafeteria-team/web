import React, { useState, useEffect } from "react";
import { Facility, TextEditor, Menu, Price } from "../../views";
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

  // 리스트 로딩
  const [isMenuLoading, setIsMenuLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isNoticeLoading, setIsNoticeLoading] = useState(false);
  const [isPriceLoading, setIsPriceLoadging] = useState(false);

  // 메뉴 리스트 판독
  const [showMenuList, setShowMenuList] = useState(false);
  const [firstTry, setFirstTry] = useState(false);

  // 가격리스트 체크
  const [pirceFirst, setPriceFirst] = useState(false);

  // 데이터셋
  const [noticeData, setNoticeData] = useState("");

  const [menuData, setMenuData] = useState(null);

  const [menuId, setMenuId] = useState("");

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

  const [adminFacility, setAdminFacility] = useState("");

  const [priceData, setPriceData] = useState([
    { 1: "" },
    { 5: "" },
    { 10: "" },
  ]);

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
        setAdminFacility(res.data);
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

  const onDragEnd = ({ source, destination }) => {
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

      if (end?.id === "userFacility") {
        const target = facilityList.facility.list[source.index];
        const checkId = adminFacility.filter((item) => item.name === target);

        ManageStore.addUserFacilityList(checkId[0].id, AuthStore.getUser.userId)
          .then((res) => alert("편의시설이 추가되었습니다."))
          .catch((err) =>
            alert("편의시설을 등록할수 없습니다. 잠시후 다시 시도해주세요.")
          );
      } else {
        const target = facilityList.facility.list[source.index];
        const checkId = adminFacility.filter((item) => item.name === target);

        ManageStore.deleteUserFacilityList(
          checkId[0].id,
          AuthStore.getUser.userId
        )
          .then((res) => alert("편의시설이 삭제되었습니다."))
          .catch((err) =>
            alert("편의시설을 삭제할수 없습니다. 잠시후 다시 시도해주세요.")
          );
      }

      return null;
    }
  };

  // 편의시설 저장
  const sendFacility = () => {
    ManageStore.addUserFacilityList(
      AuthStore.getUser.userId,
      facilityList.userFacility.list
    );
  };

  // 메뉴날짜선정
  const selectedDate = (date) => {
    setIsMenuLoading(true);
    if (date === null) {
      alert("날짜를 선택해주세요.");
      setIsMenuLoading(false);
    } else {
      setShowMenuList(true);
      const finalDate = moment(date).format("YYYY-MM-DD");
      ManageStore.callMenu(AuthStore.getUser.userId, finalDate)
        .then((res) => {
          if (res[0]?.id) {
            setMenuData(res[0].menus);
            setMenuId(res[0].id);
            setIsMenuLoading(false);
            setFirstTry(false);
          } else {
            setMenuData("");
            setIsMenuLoading(false);
            setFirstTry(true);
          }
        })
        .catch((err) => {
          alert("메뉴리스트를 불러올수없습니다.");
          setShowMenuList(false);
        })
        .finally(() => setIsMenuLoading(false));
    }
  };

  // 메뉴 리스트 추가
  const addMenuList = (date) => {
    setMenuData((prev) => [...prev, date]);
  };

  // 메뉴 리스트 저장
  const saveMenuList = (date) => {
    const selectedDate = moment(date).format();
    ManageStore.addMenu(menuData, selectedDate, AuthStore.getUser.userId)
      .then((res) => alert("메뉴가 등록되었습니다."))
      .catch((err) =>
        alert("메뉴등록에 실패했습니다. 잠시후 다시 시도해주세요.")
      );
  };

  // 메뉴 리스트 수정
  const editMenuList = (date) => {
    const selectedDate = moment(date).format();
    ManageStore.editMenu(
      menuData,
      selectedDate,
      AuthStore.getUser.userId,
      menuId
    )
      .then((res) => alert("메뉴가 등록되었습니다."))
      .catch((err) =>
        alert("메뉴등록에 실패했습니다. 잠시후 다시 시도해주세요.")
      );
  };

  // 메뉴리스트 변경
  const editList = (e, index) => {
    const { value } = e.target;
    setMenuData((prev) => prev.map((item, i) => (i === index ? value : item)));
  };

  //메뉴 리스트 삭제
  const deleteList = (index) => {
    setMenuData((prev) => prev.filter((item, i) => i !== index));
  };

  // 가격 리스트 불러오기
  const getPriceList = () => {
    setIsPriceLoadging(true);

    AuthStore.getPersistedAuth()
      .then((res) => {
        ManageStore.callPrice(res.user.userId)
          .then((res) => {
            if (res.data.price !== null) {
              setPriceData(res.data.price);
              setIsPriceLoadging(false);
              setPriceFirst(false);
            } else {
              setIsMenuLoading(false);
              setFirstTry(true);
            }
          })
          .catch((err) => {
            alert("가격정보를 불러올수없습니다. 잠시후 다시 시도해주세요.");
          })
          .finally(() => {
            setIsPriceLoadging(false);
          });
      })
      .catch((err) => console.log(err));
  };

  // 가격 리스트 추가
  // 가격 리스트 저장
  const savePriceList = () => {
    ManageStore.savePrice(AuthStore.getUser.userId, priceData)
      .then((res) => alert("가격정보가 등록되었습니다."))
      .catch((err) =>
        alert("가격정보를 등록할수없습니다. 잠시후 다시 시도해주세요.")
      );
  };
  // 가격 리스트 수정
  const patchPriceList = () => {
    ManageStore.editPrice(AuthStore.getUser.userId, priceData)
      .then((res) => alert("가격정보가 등록되었습니다."))
      .catch((err) =>
        alert("가격정보를 등록할수없습니다. 잠시후 다시 시도해주세요.")
      );
  };

  // 가격 리스트 변경
  const editPriceList = (e, index) => {
    const { id, value } = e.target;
    setPriceData((prev) =>
      prev.map((item, i) => (i === index ? { [id]: value } : item))
    );
  };
  // 가격 리스트 삭제
  const deletePriceList = (index, _id) => {
    setPriceData((prev) =>
      prev.map((item, i) => (i === index ? { [_id]: "" } : item))
    );
  };

  // 공지사항 저장
  const sendNotice = (result) => {
    ManageStore.postNotice(result, AuthStore.getUser.userId)
      .then((res) => alert("공지사항이 등록되었습니다."))
      .catch((err) =>
        alert("공지사항을 저장할수없습니다. 잠시후 다시 시도해주세요.")
      );
  };

  // 공지사항 불러오기
  const callNotice = () => {
    setIsNoticeLoading(true);
    AuthStore.getPersistedAuth().then((res) => {
      ManageStore.callNotice(res.user.userId)
        .then((res) => {
          setNoticeData(res.data.content);
          setIsNoticeLoading(false);
        })
        .catch((err) => alert("공지사항을 불러올수없습니다."));
    });
  };

  useEffect(() => {
    getSelectedFacilityList();
    callNotice();
    getPriceList();
  }, [AuthStore]);

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
        <Menu
          isLoading={isMenuLoading}
          selectedDate={selectedDate}
          menuData={menuData}
          showMenuList={showMenuList}
          addMenuList={addMenuList}
          saveMenuList={saveMenuList}
          firstTry={firstTry}
          editMenuList={editMenuList}
          editList={editList}
          deleteList={deleteList}
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
        <Price
          isLoading={isPriceLoading}
          priceList={priceData}
          editList={editPriceList}
          deleteList={deletePriceList}
          firstTry={pirceFirst}
          savePriceList={savePriceList}
          editPriceList={patchPriceList}
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
        <TextEditor
          isLoading={isNoticeLoading}
          sendNotice={sendNotice}
          noticeData={noticeData}
        />
      </FlexBox>
    </FlexBox>
  );
});

export default ManageContainer;
