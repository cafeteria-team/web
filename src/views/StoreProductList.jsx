import React from "react";
import { FlexBox, StyledBody, Ul, Li } from "../components/StyledElements";

const StoreProductList = () => {
  return (
    <FlexBox
      width="30%"
      background="#fff"
      padding="20px"
      boxSizing="border-box"
      direction="column"
    >
      <StyledBody margin="0 0 20px 0">업체상품 등록관리</StyledBody>
      <Ul
        width="100%"
        background="#FF8400"
        padding="14px"
        boxSizing="border-box"
        just="space-around"
        color="#fff"
      >
        <Li>업체명</Li>
        <Li>변경사항</Li>
        <Li>등록일시</Li>
      </Ul>
    </FlexBox>
  );
};

export default StoreProductList;
