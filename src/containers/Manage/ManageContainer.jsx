import React, { useState, useEffect } from "react";
import { Facility, TextEditor, Menu, Price } from "../../views";
import { FlexBox, StyledTitle } from "../../components/StyledElements";
import moment from "moment";

import { useStores } from "../../stores/Context";
import { observer } from "mobx-react";
import Spinner from "../../components/Spinner";

const ManageContainer = observer(() => {
  const { AuthStore, ManageStore } = useStores();

  // 리스트 로딩
  const [userLoading, setUserLoading] = useState(false);
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
      listId: [],
    },
    userFacility: {
      id: "userFacility",
      list: [],
      title: "우리 업체 시설목록",
      listId: [],
      joinId: [],
    },
  });

  const [priceData, setPriceData] = useState([
    { 1: "" },
    { 5: "" },
    { 10: "" },
  ]);

  // // 편의시설 리스트 받아오기
  // const getFacilityList = (userLists, listId) => {
  //   ManageStore.callFacilityList()
  //     .then((res) => {
  //       const nameLists = res.data.map((item) => item.name);
  //       const idLists = res.data.map((item) => item.id);

  //       let intersection = nameLists.filter(
  //         (value) => userLists.indexOf(value) === -1
  //       );

  //       let idIntersection = idLists.filter(
  //         (value) => listId.indexOf(value) === -1
  //       );

  //       setFacilityList((prev) => ({
  //         ...prev,
  //         facility: {
  //           ...prev.facility,
  //           list: intersection,
  //           listId: idIntersection,
  //         },
  //       }));

  //       setIsLoading(false);
  //     })
  //     .catch((err) => {
  //       alert("편의시설 정보를 불러올수없습니다.");
  //       setIsLoading(false);
  //     })
  //     .finally(() => setIsLoading(false));
  // };

  // // 선택된 편의시설 리스트
  // const getSelectedFacilityList = () => {
  //   setIsLoading(true);
  //   ManageStore.callUserFacilityList(AuthStore.getUser.userId)
  //     .then((res) => {
  //       const nameLists = res.data.store_facility.map(
  //         (item) => item.facility.name
  //       );
  //       const idLists = res.data.store_facility.map((item) => item.facility.id);
  //       const targetId = res.data.store_facility.map((item) => item.id);

  //       setFacilityList((prev) => ({
  //         ...prev,
  //         userFacility: {
  //           ...prev.userFacility,
  //           list: nameLists,
  //           listId: idLists,
  //           joinId: targetId,
  //         },
  //       }));

  //       getFacilityList(nameLists, idLists);
  //     })
  //     .catch((err) => {
  //       alert("편의시설 정보를 불러올수없습니다.");
  //       setIsLoading(false);
  //     });
  // };
  // 편의시설 리스트 받아오기
  const getFacilityList = (userLists, listId, targetId) => {
    ManageStore.callFacilityList()
      .then((res) => {
        const nameLists = res.data.map((item) => item.name);
        const idLists = res.data.map((item) => item.id);

        let intersection = nameLists.filter(
          (value) => userLists.indexOf(value) === -1
        );

        let idIntersection = idLists.filter(
          (value) => listId.indexOf(value) === -1
        );

        setFacilityList((prev) => ({
          ...prev,
          facility: {
            ...prev.facility,
            list: intersection,
            listId: idIntersection,
          },
          userFacility: {
            ...prev.userFacility,
            list: userLists,
            listId: listId,
            joinId: targetId,
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
    ManageStore.callUserFacilityList(AuthStore.getUser.userId)
      .then((res) => {
        const nameLists = res.data.store_facility.map(
          (item) => item.facility.name
        );
        const idLists = res.data.store_facility.map((item) => item.facility.id);
        const targetId = res.data.store_facility.map((item) => item.id);
        getFacilityList(nameLists, idLists, targetId);
      })
      .catch((err) => {
        alert("편의시설 정보를 불러올수없습니다.");
        setIsLoading(false);
      });
  };

  // 편의시설 드래그
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
      const newListId = start.listId.filter((_, idx) => idx !== source.index);
      const newJoinId = start.joinId?.filter((_, idx) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);
      newListId.splice(destination.index, 0, start.listId[source.index]);
      newJoinId?.splice(destination.index, 0, start.joinId[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        list: newList,
        title: start.title,
        listId: newListId,
        joinId: newJoinId,
      };

      // Update the state
      setFacilityList((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      if (end?.id === "userFacility") {
        ManageStore.addUserFacilityList(
          facilityList.facility.listId[source.index],
          AuthStore.getUser.userId
        )
          .then((res) => {
            const newStartList = start.list.filter(
              (_, idx) => idx !== source.index
            );
            const newStartListId = start.listId.filter(
              (_, idx) => idx !== source.index
            );

            setFacilityList((prev) => ({
              facility: {
                ...prev.facility,
                list: newStartList,
                listId: newStartListId,
              },
              userFacility: {
                ...prev.userFacility,
                list: [...prev.userFacility.list, res.data.facility.name],
                listId: [...prev.userFacility.listId, res.data.facility.id],
                joinId: [...prev.userFacility.joinId, res.data.id],
              },
            }));

            alert("편의시설이 추가되었습니다.");
          })
          .catch((err) =>
            alert("편의시설을 등록할수 없습니다. 잠시후 다시 시도해주세요.")
          );
      } else {
        const targetId = facilityList.userFacility.joinId[source.index];

        ManageStore.deleteUserFacilityList(targetId, AuthStore.getUser.userId)
          .then((res) => {
            const newEndList = end.list;
            const newEndListId = end.listId;
            newEndList.splice(destination.index, 0, start.list[source.index]);
            newEndListId.splice(
              destination.index,
              0,
              start.listId[source.index]
            );

            setFacilityList((prev) => ({
              facility: {
                ...prev.facility,
                list: newEndList,
                listId: newEndListId,
              },
              userFacility: {
                ...prev.userFacility,
                list: prev.userFacility.list.filter(
                  (_, idx) => idx !== source.index
                ),
                listId: prev.userFacility.listId.filter(
                  (_, idx) => idx !== source.index
                ),
                joinId: prev.userFacility.joinId.filter(
                  (_, idx) => idx !== source.index
                ),
              },
            }));
            alert("편의시설이 삭제되었습니다.");
          })
          .catch((err) =>
            alert("편의시설을 삭제할수 없습니다. 잠시후 다시 시도해주세요.")
          );
      }
      return null;
    }
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

    ManageStore.callPrice(AuthStore.getUser.userId)
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
      .then((res) => {
        alert("가격정보가 등록되었습니다.");
      })
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
    ManageStore.callNotice(AuthStore.getUser.userId)
      .then((res) => {
        setNoticeData(res.data.content);
        setIsNoticeLoading(false);
      })
      .catch((err) => alert("공지사항을 불러올수없습니다."));
  };

  const checkUserId = () => {
    if (!AuthStore.getUser.userId) {
      setUserLoading(true);
    } else {
      setUserLoading(false);
      getSelectedFacilityList();
      callNotice();
      getPriceList();
    }
  };

  useEffect(() => {
    checkUserId();
  }, [AuthStore.getUser.userId]);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <Spinner loading={userLoading} />
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
