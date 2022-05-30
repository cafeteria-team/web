import React, { useState, memo, useEffect } from "react";
import {
  FlexBox,
  StyledBody,
  Ul,
  Li,
  LoadingLi,
} from "../components/StyledElements";
import { Input, Button } from "../components";

const ListTitle = memo(() => {
  return (
    <Ul
      borderB="1px solid #e2e6e7"
      width="100%"
      padding="14px 24px"
      rad="12px 12px 0 0"
      boxSizing="border-box"
      just="space-around"
      color="rgb(33, 43, 54)"
      fontW="600"
      fontSize="14px"
      height="68px"
      align="center"
      background="rgba(145,158,171,0.12)"
    >
      <Li just="center" width="20%" align="center">
        식권 수량
      </Li>
      <Li just="center" width="60%" align="center">
        신권 가격
      </Li>
      <Li just="center" width="20%" align="center">
        관리
      </Li>
    </Ul>
  );
});

const MenuList = ({
  isLoading,
  priceList,
  editList,
  deleteList,
  isClicked,
  editListDone,
  selctedList,
}) => {
  return (
    <FlexBox
      background="#fff"
      rad="12px"
      direction="column"
      border="1px solid #e2e6e7"
    >
      <ListTitle />
      <Ul width="100%" background="#fff" rad="0 0 12px 12px" direction="column">
        {isLoading
          ? new Array(5).fill(1).map((_, i) => {
              return <SkeletonList key={i} />;
            })
          : priceList.map((item, index, arr) => {
              return (
                <Li
                  key={index}
                  border={
                    arr.length - 1 === index ? "null" : "1px solid #e2e6e7"
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
                  <FlexBox
                    width="20%"
                    just="center"
                    height="16px"
                    align="center"
                  >
                    {Object.keys(item)}장
                  </FlexBox>
                  <FlexBox width="60%" just="center" align="center">
                    <Input
                      width="100%"
                      maxW="259px"
                      margin="0 10px 0 0"
                      placeholder={`${Object.values(item)}`}
                      value={`${Object.values(item)}`}
                      id={Object.keys(item)}
                      disabled={isClicked === index ? false : true}
                      onChange={(e) => editList(e, index)}
                    />
                    <StyledBody color="rgb(33, 43, 54)" fontSize="14">
                      원
                    </StyledBody>
                  </FlexBox>
                  <FlexBox
                    width="20%"
                    just="center"
                    height="16px"
                    align="center"
                  >
                    <Button
                      title={isClicked === index ? "변경" : "수정"}
                      margin="0 10px 0 0"
                      padding="6px 8px"
                      width="40px"
                      background="rgb(24, 144, 255)"
                      onClick={
                        isClicked === index
                          ? editListDone
                          : (e) => selctedList(index)
                      }
                    />
                    <Button
                      title="삭제"
                      margin="0"
                      padding="6px 8px"
                      width="40px"
                      background="rgb(255, 72, 66)"
                      onClick={() => deleteList(index, Object.keys(item))}
                    />
                  </FlexBox>
                </Li>
              );
            })}
      </Ul>
    </FlexBox>
  );
};

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

const Price = ({
  isLoading,
  priceList,
  editList,
  deleteList,
  firstTry,
  savePriceList,
  editPriceList,
}) => {
  const [isClicked, setIsClicked] = useState("");

  const selctedList = (index) => {
    setIsClicked(index);
  };

  const editListDone = () => {
    setIsClicked(null);
  };

  return (
    <>
      <FlexBox
        just="space-between"
        height="62px"
        align="center"
        padding="20px 24px"
      >
        <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
          메뉴 가격관리
        </StyledBody>
      </FlexBox>
      <FlexBox rad="12px" direction="column" margin="0 24px 24px">
        <MenuList
          isLoading={isLoading}
          priceList={priceList}
          editList={editList}
          deleteList={deleteList}
          isClicked={isClicked}
          editListDone={editListDone}
          selctedList={selctedList}
        />
        <Button
          width="120px"
          margin="40px auto 10px"
          padding="18.25px 20px"
          background="#ff9030"
          shadow="rgb(249 217 189) 0px 8px 16px 0px"
          title="가격정보 저장"
          onClick={firstTry ? savePriceList : editPriceList}
        />
      </FlexBox>
    </>
  );
};

export default memo(Price);
