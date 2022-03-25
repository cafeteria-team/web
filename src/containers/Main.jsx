import React, { useEffect, useState, useCallback } from "react";
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
    const [selectedUser, setSelectedUser] = useState(null);

    // 유저 리스트 불러오기
    const _callUserList = useCallback(
      async (access) => {
        const response = await listStore.callUserList(access);
        setUserList(response?.data);
      },
      [listStore]
    );

    // 유저검색
    const onSearchList = (title) => {
      let lists = userList;
      if (title !== "") {
        lists = lists?.filter((item) => {
          return (
            item?.username?.toLowerCase().search(title.toLowerCase()) !== -1
          );
        });
        setUserList(lists);
      } else {
        _callUserList(authStore.accessToken);
      }
    };

    // 유저삭제
    const deleteUser = async (userId) => {
      let access = localStorage.getItem("access");
      await listStore.deleteUser(userId);
      _callUserList(access);
    };

    // 선택된 유저 불러오기
    const getEditUser = useCallback(async () => {
      let userId = localStorage.getItem("userId");
      let access = localStorage.getItem("access");
      if (userId) {
        const response = await listStore.getEditUser(userId, access);
        console.log(response);
        setSelectedUser(response.data);
      }
    }, [listStore]);

    // 유저수정
    const editUser = async () => {
      let userId = localStorage.getItem("userId");
      let access = localStorage.getItem("access");
      if (userId) {
        await listStore.editUser(userId);
        return _callUserList(access);
      }
    };

    // 유저 권한수정
    const approveUser = async (userId, data) => {
      let access = localStorage.getItem("access");
      if (userId) {
        await listStore.approveUser(userId, data);
        return _callUserList(access);
      }
    };

    useEffect(() => {
      let access = localStorage.getItem("access");

      _callUserList(access);
      getEditUser();
    }, [_callUserList, getEditUser]);

    // console.log("Main 에서값호출", userList);

    return (
      <FlexBox width="100%" height="100%" background="#ededed">
        <SideMenu></SideMenu>
        <FlexBox direction="column" width="100%">
          <Header name={authStore._username} logout={authStore.logout} />
          <FlexBox>
            <Outlet
              context={{
                userList,
                onSearchList,
                deleteUser,
                getEditUser,
                selectedUser,
                editUser,
                approveUser,
              }}
            />
          </FlexBox>
        </FlexBox>
      </FlexBox>
    );
  })
);

export default Main;
