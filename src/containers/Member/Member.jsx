import React, { useState, useEffect, useCallback } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  Ul,
  Li,
} from "../../components/StyledElements";
import { Button, SearchBar, Pagination } from "../../components";
import Toggle from "react-toggle";
import moment from "moment";
import { useNavigate, Outlet } from "react-router-dom";
import { useParams } from "react-router";
import "react-toggle/style.css";
import { observer } from "mobx-react";
import { useStores } from "../../stores/Context";
import { MemberListTitle } from "../../views";

const MemberList = ({
  results,
  offset,
  limit,
  deleteUser,
  selectUser,
  changeToggled,
}) => {
  console.log("member호출");

  return (
    <Ul width="100%" direction="column">
      {results ? (
        results
          .slice(offset, offset + limit)
          .map(({ date_joined, id, is_active, store, username }) => (
            <Li key={id} width="100%" border="1px solid #fdcc97">
              <Ul
                width="100%"
                padding="8px"
                boxSizing="border-box"
                just="space-around"
                align="center"
              >
                <Li just="center" width="16.6666666667%">
                  {id}
                </Li>
                <Li just="center" width="16.6666666667%">
                  {moment(date_joined).format("L")}
                </Li>
                <Li just="center" width="16.6666666667%">
                  {username}
                </Li>
                <Li just="center" width="16.6666666667%">
                  <Toggle
                    defaultChecked={is_active}
                    aria-label="No label tag"
                    onChange={() => {
                      changeToggled(id, is_active);
                    }}
                  />
                </Li>
                <Li just="center" width="16.6666666667%">
                  {store.name}
                </Li>
                <Li just="center" width="16.6666666667%">
                  <Button
                    title="수정"
                    margin="0 10px 0 0"
                    padding="4px"
                    width="40px"
                    background="#06c"
                    onClick={() => selectUser(id)}
                  />
                  <Button
                    title="탈퇴"
                    margin="0"
                    padding="4px"
                    width="40px"
                    background="tomato"
                    onClick={() => deleteUser(id)}
                  />
                </Li>
              </Ul>
            </Li>
          ))
      ) : (
        <></>
      )}
    </Ul>
  );
};

const Member = observer(() => {
  const { AuthStore, ListStore } = useStores();

  const params = useParams();

  const navigate = useNavigate();

  // state
  const [state, setState] = useState({
    search: "",
  });

  // 유저정보 저장
  const [userList, setUserList] = useState(null);

  // for pagination
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [id, setId] = useState("");
  const [total, setTotal] = useState("");

  // 유저선택
  const [selectedUser, setSelectedUser] = useState(null);

  // change toggle status
  const changeToggled = (id, toggle) => {
    toggle = toggle ? false : true;
    approveUser(id, toggle);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    onSearchList(e.target.value);
  };

  // 유저 리스트 불러오기
  const _callUserList = useCallback(
    async (access) => {
      await ListStore.callUserList(access);
      setUserList(ListStore.userList);
      setTotal(ListStore.userList.length);
      console.log("리스트함수실행");
    },
    [ListStore]
  );

  // 유저수정 완료
  const editUser = async (id, state) => {
    console.log("수정실행");
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
    if (userId) {
      await ListStore.approveUser(userId, data);
      return _callUserList(AuthStore.user.accessT);
    }
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

  // 유저선택
  const selectUser = async (userId) => {
    localStorage.setItem("userId", userId);
    let _userId = localStorage.getItem("userId");
    setId(_userId);

    await getEditUser();
    navigate(`${_userId}`);
  };

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

  useEffect(() => {
    // 유저정보 불러오기
    _callUserList(AuthStore.user.accessT);

    // 선택된유저정보불러오기
    getEditUser();
  }, [AuthStore.user.accessT, _callUserList, getEditUser]);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">일반회원</StyledTitle>

      <FlexBox
        width="100%"
        background="#fff"
        padding="20px"
        boxSizing="border-box"
        direction="column"
      >
        <FlexBox just="space-between" align="center">
          <StyledBody margin="0 0 20px 0">
            회원관리 {params.detail && "- 기본정보"}
          </StyledBody>
          {!params.detail && (
            <SearchBar search={state.search} handleChange={handleChange} />
          )}
        </FlexBox>

        {params.detail ? (
          <Outlet context={{ selectedUser, id, editUser }} />
        ) : (
          <FlexBox direction="column">
            <MemberListTitle />
            <MemberList
              results={userList}
              limit={limit}
              offset={offset}
              deleteUser={deleteUser}
              getEditUser={getEditUser}
              selectUser={selectUser}
              changeToggled={changeToggled}
            />
            <Pagination
              total={total}
              limit={limit}
              page={page}
              setPage={setPage}
            />
          </FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
});

export default Member;
