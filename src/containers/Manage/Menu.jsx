import React, { useEffect, useState, useCallback, memo, useRef } from "react";
import { FlexBox, StyledBody } from "../../components/StyledElements";
import { Button, Input } from "../../components";
import { Ul, Li } from "../../components/StyledElements";
import { useStores } from "../../stores/Context";
import moment from "moment";
import Decode from "../../utils/decode";

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
  const todayFormat = moment().format();

  const [inputMenu, setInputMenu] = useState("");
  const [preMenu, setPreMenu] = useState([]);
  const [menu, setMenu] = useState();

  const addPreMenu = () => {
    if (inputMenu === "") {
      alert("메뉴를 입력해주세요.");
    } else if (preMenu.length >= 10) {
      alert("최대 메뉴 등록은 10개까지입니다.");
    } else {
      setPreMenu((prev) => {
        if (prev.some((item) => item === inputMenu)) {
          alert("이미 등록된 메뉴입니다.");
          return prev;
        }
        return [...prev, inputMenu];
      });
      setInputMenu("");
    }
  };

  const deletePreMenu = (index) => {
    const targetMenu = preMenu[index];
    const newMenu = preMenu.filter((item) => item !== targetMenu);

    setPreMenu(newMenu);
  };

  const selctedList = (index) => {
    setIsClicked(index);
  };

  const editList = async (index) => {
    const arr = preMenu;
    arr[index] = editState.name;

    setPreMenu(arr);
    setIsClicked(false);
    setEditState({
      name: "",
    });
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setInputMenu(value);
  };

  const editOnChange = (e) => {
    const { id, value } = e.target;
    setEditState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const registerMenu = () => {
    ManageStore.addMenu(preMenu, todayFormat, AuthStore.user.userId).then(
      (res) => {
        setMenu(res);
      }
    );
  };

  useEffect(() => {
    const getPostedMenu = async () => {
      const decode = new Decode();
      const access = localStorage.getItem("access");
      const data = await decode.getUserId(access);
      ManageStore.callMenu(data.user_id).then((res) => {
        setMenu(res);
      });
    };

    getPostedMenu();
  }, [ManageStore, AuthStore.user.userId]);

  const [facilityList, setFacilityList] = useState([]);

  const [editState, setEditState] = useState({
    name: "",
  });

  const [isClicked, setIsClicked] = useState("");

  // const getFacilityList = useCallback(async () => {
  //   await ManageStore.callFacilityList();
  //   setFacilityList(ManageStore.getFacilityList);
  // }, [ManageStore]);

  // const deleteList = async (id) => {
  //   await ManageStore.deleteFacilityList(id);
  //   getFacilityList();
  // };

  //   const _addMenu = async () => {
  //     const addTime = moment().format();
  //     if (menu !== "") {
  //       await ManageStore.addMenu(menu, addTime, AuthStore.getUser.userId);
  //       setMenu("");
  //     } else {
  //       alert("카테고리 또는 편의시설명을 입력해주세요");
  //     }
  //   };

  // useEffect(() => {
  //   getFacilityList();
  // }, [getFacilityList]);

  if (preMenu && preMenu.length !== 0) {
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
        <Ul direction="column" margin="0 0 60px 0">
          {preMenu && preMenu.length !== 0 ? (
            preMenu.map((item, index) => (
              <Li
                key={index}
                border="1px solid #fdcc97"
                padding="14px"
                align="center"
              >
                <FlexBox width="20%" just="center" height="16px" align="center">
                  {today}
                </FlexBox>
                <Input
                  width="60%"
                  margin="0"
                  placeholder={item}
                  value={isClicked === index ? editState.name : item}
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
                        ? (e) => editList(index)
                        : (e) => selctedList(index)
                    }
                  />
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
        <FlexBox just="center" margin="0 0 50px 0">
          <Button
            title={"메뉴등록"}
            margin="0 10px 0 0"
            padding="10px"
            width="200px"
            background="#06c"
            onClick={registerMenu}
          />
        </FlexBox>
      </FlexBox>
    );
  } else if (menu && menu.length !== 0) {
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
        <Ul direction="column" margin="0 0 60px 0">
          {menu.map((item, index) => (
            <Li
              key={index}
              border="1px solid #fdcc97"
              padding="14px"
              align="center"
            >
              <FlexBox width="20%" just="center" height="16px" align="center">
                {moment(item.provide_at).format("L")}
              </FlexBox>
              <Input
                width="60%"
                margin="0"
                placeholder={item}
                value={isClicked === index ? editState.name : item.menus[0]}
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
                      ? (e) => editList(index)
                      : (e) => selctedList(index)
                  }
                />
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
          ))}
        </Ul>
        <FlexBox just="center" margin="0 0 50px 0">
          <Button
            title={"메뉴등록"}
            margin="0 10px 0 0"
            padding="10px"
            width="200px"
            background="#06c"
            onClick={registerMenu}
          />
        </FlexBox>
      </FlexBox>
    );
  } else {
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
        <Ul direction="column" margin="0 0 60px 0">
          <Li border="1px solid #fdcc97" padding="14px" align="center">
            등록된 메뉴가없습니다.
          </Li>
        </Ul>
        <FlexBox just="center" margin="0 0 50px 0">
          <Button
            title={"메뉴등록"}
            margin="0 10px 0 0"
            padding="10px"
            width="200px"
            background="#06c"
            onClick={registerMenu}
          />
        </FlexBox>
      </FlexBox>
    );
  }
};

export default Menu;
