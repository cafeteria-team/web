import React, { useEffect } from "react";
import { SideMenu, Header } from "../components";
import { FlexBox } from "../components/StyledElements";
import { inject, observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import axios from "../utils/axios";

const Main = inject("authStore")(
  observer(({ authStore }) => {
    console.log(authStore.accessToken);
    //?page=1&page_size=10
    const getUserList = async () => {
      if (authStore.accessToken) {
        try {
          const response = await axios.get("/api/user?page=1&page_size=10", {
            headers: {
              Authorization: `Bearer ${authStore.accessToken}`,
            },
          });
          console.log(response);
          return response;
        } catch (error) {
          console.log(error.response);
        }
      }
    };

    useEffect(() => {
      getUserList();
    }, []);

    const sss = "gg";

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
