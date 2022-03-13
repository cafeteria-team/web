import React, { useEffect, useState } from "react";
import { SideMenu, Header } from "../components";
import { FlexBox } from "../components/StyledElements";
import { inject, observer } from "mobx-react";
import { Outlet } from "react-router-dom";

const Main = inject(
  "authStore",
  "listStore"
)(
  observer(({ authStore, listStore }) => {
    const [userList, setUserList] = useState(null);

    const _callUserList = async (access) => {
      const response = await listStore.callUserList(access, 1);
      setUserList(response);
    };

    useEffect(() => {
      let access = localStorage.getItem("access");
      _callUserList(access);
    }, []);

    const onSearchList = (title) => {
      console.log(title);
      let newList = userList?.data?.results;
      newList = newList?.filter((lists) => {
        console.log(title, lists);
        return lists.username.toLowerCase().search(title.toLowerCase()) !== -1;
      });

      setUserList(newList);
    };

    console.log("Main 에서값호출", userList);

    return (
      <FlexBox width="100%" height="100%" background="#ededed">
        <SideMenu></SideMenu>
        <FlexBox direction="column" width="100%">
          <Header name={authStore._username} logout={authStore.logout} />
          <FlexBox>
            <Outlet context={{ userList, onSearchList }} />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    );
  })
);

export default Main;
