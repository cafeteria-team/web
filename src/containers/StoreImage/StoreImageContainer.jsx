import React from "react";
import { FlexBox, StyledTitle } from "../../components/StyledElements";
import { DragDrop } from "../../views";

const StoreImageContainer = () => {
  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">업체 이미지 관리</StyledTitle>
      <FlexBox
        width="100%"
        margin="24px 0 0"
        background="#fff"
        boxSizing="border-box"
        direction="column"
        rad="16px"
        shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
        padding="20px"
      >
        <DragDrop />
      </FlexBox>
    </FlexBox>
  );
};

export default StoreImageContainer;
