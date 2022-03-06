import React from "react";
import { SideMenu, Header } from "../components";
import { FlexBox } from "../components/StyledElements";
import { inject, observer } from "mobx-react";
import { Outlet } from "react-router-dom";

const Main = inject("authStore")(
  observer(({ authStore }) => {
    const sss = "hh";

    return (
      <FlexBox width="100%" height="100%" background="#ededed">
        <SideMenu></SideMenu>
        <FlexBox direction="column" width="100%">
          <Header name={authStore._username} logout={authStore.logout} />
          <FlexBox>
            <Outlet context={sss} />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    );
  })
);

export default Main;
