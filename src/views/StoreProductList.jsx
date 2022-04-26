import React from "react";
import { FlexBox, StyledBody, Ul, Li } from "../components/StyledElements";

const StoreProductList = () => {
  return (
    <FlexBox
      width="30%"
      background="#fff"
      boxSizing="border-box"
      direction="column"
      rad="16px"
      shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
    >
      <FlexBox height="62px" align="center" padding="20px 24px">
        <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
          업체상품 등록관리
        </StyledBody>
      </FlexBox>

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
        <Li>업체명</Li>
        <Li>변경사항</Li>
        <Li>등록일시</Li>
      </Ul>
    </FlexBox>
  );
};

export default StoreProductList;
