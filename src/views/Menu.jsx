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

const Menu = ({ isLoading, menuList }) => {
  const [value, setValue] = useState(null);

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
      <FlexBox padding="24px" width="372px" direction="column">
        <StyledBody
          color="color rgb(33, 43, 54)"
          fontSize="14px"
          fontW="600"
          width="100%"
          margin="0 0 20px"
        >
          날짜 선택
        </StyledBody>
        <LocalizationProvider dateAdapter={AdapterDateFns} fullWidth>
          <DatePicker
            label="원하시는 날짜를 선택 또는 기입해주세요."
            value={value}
            onChange={(newValue) => {
              setValue(newValue);
            }}
            renderInput={(params) => <TextField {...params} />}
          />
        </LocalizationProvider>
      </FlexBox>
      <FlexBox padding="24px" direction="column">
        <StyledBody
          color="color rgb(33, 43, 54)"
          fontSize="14px"
          fontW="600"
          width="100%"
          margin="0 0 20px"
        >
          메뉴 리스트
        </StyledBody>
        <FlexBox
          background="rgba(145,158,171,0.12)"
          rad="12px"
          direction="column"
          border="1px solid #e2e6e7"
        >
          <ListTitle />
          <Ul
            direction="column"
            width="100%"
            boxSizing="border-box"
            just="space-around"
            color="rgb(33, 43, 54)"
            fontSize="14px"
            align="center"
            overflow="hidden"
            background="#fff"
            rad="0 0 12px 12px"
          >
            {isLoading ? (
              new Array(5).fill(1).map((_, i) => {
                return <SkeletonList key={i} />;
              })
            ) : menuList ? (
              menuList.map(({ provide_at, menus }, index, item) => {
                return (
                  <Li
                    key={uuid()}
                    border={
                      item.length - 1 === index ? "null" : "1px solid #e2e6e7"
                    }
                    align="center"
                    width="100%"
                    padding="14px 24px"
                    boxSizing="border-box"
                    just="space-around"
                  >
                    <FlexBox
                      width="20%"
                      just="center"
                      height="16px"
                      align="center"
                    >
                      {moment(provide_at).format("L")}
                    </FlexBox>
                    <Input
                      width="60%"
                      maxW="259px"
                      margin="0"
                      placeholder={menus}
                      //   value={isClicked === index ? editState.name : menus}
                      id="name"
                      //   disabled={isClicked === index ? false : true}
                      //   onChange={editOnChange}
                    />
                    <FlexBox
                      width="20%"
                      just="center"
                      height="16px"
                      align="center"
                    >
                      <Button
                        title="수정"
                        // title={isClicked === index ? "변경" : "수정"}
                        margin="0 10px 0 0"
                        padding="6px 8px"
                        width="40px"
                        background="rgb(24, 144, 255)"
                        // onClick={
                        //   isClicked === index
                        //     ? (e) => editList(id, category)
                        //     : (e) => selctedList(index)
                        // }
                      />
                      <Button
                        title="삭제"
                        margin="0"
                        padding="6px 8px"
                        width="40px"
                        background="rgb(255, 72, 66)"
                        // onClick={() => deleteList(id)}
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
      </FlexBox>
    </>
  );
};

export default Menu;

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
