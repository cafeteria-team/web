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
    const [allList, setAllList] = useState(null);

    const _callUserList = async (access) => {
      const response = await listStore.callUserList(access, 1);
      const res = await listStore.searchForList(access);
      setUserList(response);
      setAllList(res);
    };

    useEffect(() => {
      let access = localStorage.getItem("access");
      _callUserList(access);
    }, []);

    const onSearchList = async (title) => {
      console.log("검색 실행");
      console.log(title);
      let lists = allList.data;
      if (title !== "") {
        lists = lists.filter((item) => {
          return item.username.toLowerCase().search(title.toLowerCase()) !== -1;
        });
        setUserList(lists);
      } else {
        _callUserList(authStore.accessToken);
      }

      console.log(title);
      // await listStore.searchList(authStore.accessToken).then((res) => {
      //   let lists = res.data;
      //   console.log(title);
      //   if (title !== "") {
      //     lists = lists.filter((item) => {
      //       return (
      //         item.username.toLowerCase().search(title.toLowerCase()) !== -1
      //       );
      //     });
      //     setUserList(lists);
      //   } else {
      //     _callUserList(authStore.accessToken);
      //   }
      // });
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
