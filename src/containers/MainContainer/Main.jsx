import React, { useEffect, useState, useCallback, useRef } from "react";
import { SideMenu, Header } from "../../components";
import { FlexBox } from "../../components/StyledElements";
import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import { useStores } from "../../stores/Context";
import { getCookie } from "../../utils/cookie";

const Main = observer(() => {
  const { AuthStore, ListStore } = useStores();

  const [userList, setUserList] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  // 사용자 이름저장
  const [userName, setUserName] = useState("");

  // 유저 리스트 불러오기
  const _callUserList = useCallback(
    async (access) => {
      await ListStore.callUserList(access);
      setUserList(ListStore.userList);
    },
    [ListStore]
  );

  // 유저검색
  const onSearchList = (title) => {
    let lists = userList;
    if (title !== "") {
      lists = lists?.filter((item) => {
        return item?.username?.toLowerCase().search(title.toLowerCase()) !== -1;
      });
      setUserList(lists);
    } else {
      _callUserList(AuthStore.accessToken);
    }
  };

  // 유저삭제
  const deleteUser = async (userId) => {
    await ListStore.deleteUser(userId);
    _callUserList(AuthStore.user.accessT);
  };

  // 선택된 유저 불러오기
  const getEditUser = useCallback(async () => {
    let userId = localStorage.getItem("userId");
    if (userId) {
      const response = await ListStore.getEditUser(
        userId,
        AuthStore.user.accessT
      );
      setSelectedUser(response?.data);
    }
  }, [AuthStore.user.accessT, ListStore]);

  // 유저수정
  const editUser = async (id, state) => {
    let userId = localStorage.getItem("userId");
    let access = localStorage.getItem("access");
    if (userId) {
      await ListStore.editUser(userId, state);
      alert("회원정보가 수정되었습니다.");
      return _callUserList(access);
    }
  };

  // 유저 권한수정
  const approveUser = async (userId, data) => {
    let access = localStorage.getItem("access");
    if (userId) {
      await ListStore.approveUser(userId, data);
      return _callUserList(access);
    }
  };

  useEffect(() => {
    // 유저정보 불러오기
    _callUserList(AuthStore.user.accessT);

    // 유저정보 수정
    getEditUser();

    setUserName(getCookie("username"));
  }, [AuthStore.user.accessT, _callUserList, getEditUser]);

  // AuthStore.user.accessT, _callUserList, getEditUser

  console.log("main호출");

  return (
    <FlexBox width="100%" height="100%" background="#ededed">
      <SideMenu></SideMenu>
      <FlexBox direction="column" width="100%">
        <Header name={userName} logout={AuthStore.logout} />
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
});

export default Main;
