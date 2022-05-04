import React, { useState, memo } from "react";
import {
  FlexBox,
  StyledBody,
  Ul,
  Li,
  LoadingLi,
} from "../components/StyledElements";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import uuid from "react-uuid";
import moment from "moment";
import { Input, Button } from "../components";

const MenuListContainer = ({
  state,
  handleChange,
  addList,
  isLoading,
  menuList,
}) => {
  return (
    <FlexBox padding="24px" direction="column">
      <FlexBox just="space-between" margin="0 0 20px" align="center">
        <StyledBody color="color rgb(33, 43, 54)" fontSize="14px" fontW="600">
          메뉴 리스트
        </StyledBody>
        <FlexBox>
          <Input
            placeholder="메뉴이름"
            width="300px"
            margin="0 10px 0px 0"
            value={state.name}
            id="name"
            onChange={handleChange}
          />
          <Button
            title="추가"
            margin="0 10px 0 0"
            padding="6px 8px"
            width="40px"
            background="rgb(24, 144, 255)"
            onClick={addList}
          />
        </FlexBox>
      </FlexBox>
      <MenuList isLoading={isLoading} menuList={menuList} />
    </FlexBox>
  );
};

const MenuList = ({ isLoading, menuList }) => {
  const [editState, setEditState] = useState({
    name: "",
  });

  const [isClicked, setIsClicked] = useState("");

  const editOnChange = (e) => {
    const { id, value } = e.target;
    setEditState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const editList = (id, category) => {
    if (editState.name !== "") {
      //   ManageStore.editFacilityList(id, category, editState.name)
      //     .then((res) => {
      //       getFacilityList();
      //       setIsClicked(false);
      //       setEditState({
      //         name: "",
      //       });
      //     })
      //     .catch((err) =>
      //       alert("편의시설이 이미 등록되있거나 잘못된 입력입니다.")
      //     );
      return;
    } else {
      return setIsClicked(false);
    }
  };

  const deleteList = async () => {
    // await ManageStore.deleteFacilityList(id);
    // getFacilityList();
  };

  const selctedList = (index) => {
    setIsClicked(index);
  };

  return (
    <FlexBox
      background="rgba(145,158,171,0.12)"
      rad="12px"
      direction="column"
      border="1px solid #e2e6e7"
    >
      <ListTitle />
      <Ul width="100%" background="#fff" rad="0 0 12px 12px" direction="column">
        {isLoading ? (
          new Array(5).fill(1).map((_, i) => {
            return <SkeletonList key={i} />;
          })
        ) : menuList ? (
          menuList.map(({ provide_at, menus }, index, item) => {
            return (
              <Li
                key={index}
                border={
                  item.length - 1 === index ? "null" : "1px solid #e2e6e7"
                }
                width="100%"
                padding="14px 24px"
                boxSizing="border-box"
                just="space-between"
                color="rgb(33, 43, 54)"
                fontSize="14px"
                height="68px"
                align="center"
              >
                <FlexBox width="20%" just="center" height="16px" align="center">
                  {moment(provide_at).format("L")}
                </FlexBox>
                <Input
                  width="60%"
                  maxW="259px"
                  margin="0"
                  placeholder={menus}
                  value={isClicked === index ? editState.name : menus}
                  id="name"
                  disabled={isClicked === index ? false : true}
                  onChange={editOnChange}
                />
                <FlexBox width="20%" just="center" height="16px" align="center">
                  <Button
                    title={isClicked === index ? "변경" : "수정"}
                    margin="0 10px 0 0"
                    padding="6px 8px"
                    width="40px"
                    background="rgb(24, 144, 255)"
                    onClick={
                      isClicked === index
                        ? (e) => editList()
                        : (e) => selctedList(index)
                    }
                  />
                  <Button
                    title="삭제"
                    margin="0"
                    padding="6px 8px"
                    width="40px"
                    background="rgb(255, 72, 66)"
                    onClick={() => deleteList()}
                  />
                </FlexBox>
              </Li>
            );
          })
        ) : (
          <FlexBox padding="24px">등록된 리스트가 없습니다.</FlexBox>
        )}
      </Ul>
    </FlexBox>
  );
};

const ListTitle = memo(() => {
  return (
    <Ul
      borderB="1px solid #e2e6e7"
      width="100%"
      padding="14px 24px"
      boxSizing="border-box"
      just="space-around"
      color="rgb(33, 43, 54)"
      fontW="600"
      fontSize="14px"
      height="68px"
      align="center"
    >
      <Li just="center" width="20%" align="center">
        등록날짜
      </Li>
      <Li just="center" width="60%" align="center">
        메뉴
      </Li>
      <Li just="center" width="20%" align="center">
        관리
      </Li>
    </Ul>
  );
});

const SkeletonList = () => {
  return (
    <Li height="68px" width="100%" border="1px solid #e2e6e7" align="center">
      <Ul
        width="100%"
        padding="14px 24px"
        boxSizing="border-box"
        just="space-around"
      >
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
      </Ul>
    </Li>
  );
};

const DateContainer = styled("div")`
  .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input {
    width: 370px;
  }

  .MuiInputBase-input-MuiOutlinedInput-input {
    width: 370px;
  }

  .MuiOutlinedInput-input {
    width: 370px;
  }
  .MuiInputBase-input {
    width: 370px;
  }
`;

const Menu = ({ isLoading, menuList, selectedDate }) => {
  const [date, setDate] = useState(null);

  const [state, setState] = useState({
    name: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addList = async () => {
    if (state.name !== "") {
      return;
    } else {
      alert("메뉴를 입력해주세요");
    }
  };

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
          메뉴등록
        </StyledBody>
      </FlexBox>
      <FlexBox padding="24px" width="100%" direction="column">
        <StyledBody
          color="color rgb(33, 43, 54)"
          fontSize="14px"
          fontW="600"
          width="100%"
          margin="0 0 20px"
        >
          날짜 선택
        </StyledBody>
        <DateContainer width="100%">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="원하시는 날짜를 선택 또는 기입해주세요."
              value={date}
              onChange={(newValue) => {
                setDate(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Button
            width="120px"
            margin="0 0 0 20px"
            padding="18.25px 20px"
            background="#ff9030"
            shadow="rgb(249 217 189) 0px 8px 16px 0px"
            title="선택"
            onClick={(date) => selectedDate(date)}
          ></Button>
        </DateContainer>
      </FlexBox>
      <MenuListContainer
        state={state}
        handleChange={handleChange}
        addList={addList}
        isLoading={isLoading}
        menuList={menuList}
      />
    </>
  );
};

export default Menu;
