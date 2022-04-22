import React, { useEffect, useState, useCallback, memo, useRef } from "react";
import { FlexBox, StyledBody } from "../../components/StyledElements";
import { Button, Input } from "../../components";
import { Ul, Li } from "../../components/StyledElements";
import { useStores } from "../../stores/Context";
import moment from "moment";

const PreListTitle = memo(() => {
  return (
    <Ul
      width="100%"
      background="#FF8400"
      padding="14px"
      boxSizing="border-box"
      just="space-around"
      color="#fff"
    >
      <Li just="center" width="80%">
        메뉴
      </Li>
      <Li just="center" width="20%">
        관리
      </Li>
    </Ul>
  );
});

const ListTitle = memo(() => {
  return (
    <Ul
      width="100%"
      background="#FF8400"
      padding="14px"
      boxSizing="border-box"
      just="space-around"
      color="#fff"
    >
      <Li just="center" width="20%">
        등록날짜
      </Li>
      <Li just="center" width="60%">
        메뉴
      </Li>
      <Li just="center" width="20%">
        관리
      </Li>
    </Ul>
  );
});

const Menu = () => {
  const { ManageStore, AuthStore } = useStores();

  const today = moment().format("L");

  const [inputMenu, setInputMenu] = useState("");
  const [preMenu, setPreMenu] = useState([]);
  const [menu, setMenu] = useState();

  const addPreMenu = () => {
    setPreMenu((prev) => [...prev, inputMenu]);
  };

  const deletePreMenu = (index) => {
    const targetMenu = preMenu[index];
    const newMenu = preMenu.filter((item) => item !== targetMenu);

    setPreMenu(newMenu);
  };

  const [facilityList, setFacilityList] = useState([]);

  const [editState, setEditState] = useState({
    name: "",
  });

  const [isClicked, setIsClicked] = useState("");

  const getFacilityList = useCallback(async () => {
    await ManageStore.callFacilityList();
    setFacilityList(ManageStore.getFacilityList);
  }, [ManageStore]);

  const deleteList = async (id) => {
    await ManageStore.deleteFacilityList(id);
    getFacilityList();
  };

  const selctedList = (index) => {
    setIsClicked(index);
  };

  const editList = async (id, category) => {
    await ManageStore.editFacilityList(id, category, editState.name);
    getFacilityList();
    setIsClicked(false);
    setEditState({
      name: "",
    });
  };

  //   const _addMenu = async () => {
  //     const addTime = moment().format();
  //     if (menu !== "") {
  //       await ManageStore.addMenu(menu, addTime, AuthStore.getUser.userId);
  //       setMenu("");
  //     } else {
  //       alert("카테고리 또는 편의시설명을 입력해주세요");
  //     }
  //   };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputMenu(value);
  };

  const editOnChange = (e) => {
    const { id, value } = e.target;
    setEditState(value);
  };

  useEffect(() => {
    getFacilityList();
  }, [getFacilityList]);

  return (
    <FlexBox
      width="100%"
      background="#fff"
      padding="20px"
      boxSizing="border-box"
      direction="column"
      margin="0 0 30px 0"
    >
      <FlexBox just="space-between" align="center" margin="0 0 20px 0">
        <StyledBody>오늘의 메뉴등록 - {today}</StyledBody>
        <FlexBox>
          <Input
            placeholder="오늘의 메뉴명"
            width="360px"
            margin="0 10px 0px 0"
            value={inputMenu}
            id="name"
            onChange={handleChange}
          />
          <Button
            title="추가"
            margin="0"
            padding="4px"
            width="40px"
            height="38px"
            background="#06c"
            onClick={addPreMenu}
          />
        </FlexBox>
      </FlexBox>
      <StyledBody margin="0 0 10px 0">등록대기 메뉴리스트</StyledBody>
      <PreListTitle />
      <Ul direction="column" margin="0 0 50px 0">
        {preMenu && preMenu.length !== 0 ? (
          preMenu.map((item, index) => (
            <Li
              border="1px solid #fdcc97"
              padding="14px"
              align="center"
              key={index}
            >
              <FlexBox width="80%" just="center" height="16px" align="center">
                {item}
              </FlexBox>
              <FlexBox width="20%" just="center" height="16px" align="center">
                <Button
                  title="삭제"
                  margin="0"
                  padding="4px"
                  width="40px"
                  background="tomato"
                  onClick={() => deletePreMenu(index)}
                />
              </FlexBox>
            </Li>
          ))
        ) : (
          <Li border="1px solid #fdcc97" padding="14px" align="center">
            등록된 메뉴가없습니다.
          </Li>
        )}
      </Ul>
      <StyledBody margin="0 0 10px 0">등록된 메뉴리스트</StyledBody>
      <ListTitle />
      <Ul direction="column">
        {facilityList ? (
          facilityList.map(({ category, name, id }, index) => (
            <Li
              key={id}
              border="1px solid #fdcc97"
              padding="14px"
              align="center"
            >
              <FlexBox width="20%" just="center" height="16px" align="center">
                {id}
              </FlexBox>
              <Input
                width="60%"
                margin="0"
                placeholder={name}
                value={isClicked === index ? editState.name : name}
                id="name"
                disabled={isClicked === index ? false : true}
                onChange={editOnChange}
              />
              <FlexBox width="20%" just="center" height="16px" align="center">
                <Button
                  title={isClicked === index ? "변경" : "수정"}
                  margin="0 10px 0 0"
                  padding="4px"
                  width="40px"
                  background="#06c"
                  onClick={
                    isClicked === index
                      ? (e) => editList(id, category)
                      : (e) => selctedList(index)
                  }
                />
                <Button
                  title="삭제"
                  margin="0"
                  padding="4px"
                  width="40px"
                  background="tomato"
                  onClick={() => deleteList(id)}
                />
              </FlexBox>
            </Li>
          ))
        ) : (
          <div>등록된 리스트가 없습니다.</div>
        )}
      </Ul>
    </FlexBox>
  );
};

export default Menu;
