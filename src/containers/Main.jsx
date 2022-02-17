import React from "react";
import { SideMenu } from "../components";
import { FlexBox } from "../components/StyledElements";

const Main = (props) => {
  return (
    <FlexBox width="100%" height="100%">
      <SideMenu></SideMenu>
      <FlexBox>12312</FlexBox>
    </FlexBox>
  );
};

export default Main;
