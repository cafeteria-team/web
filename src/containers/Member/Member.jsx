import React, { useState, useEffect, useCallback } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  Ul,
  Li,
  LoadingLi,
} from "../../components/StyledElements";
import { Button, SearchBar, Pagination } from "../../components";
import Toggle from "react-toggle";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import "react-toggle/style.css";
import { observer } from "mobx-react";
import { useStores } from "../../stores/Context";
import { MemberListTitle } from "../../views";
import Modal from "react-modal";
import Decode from "../../utils/decode";

// modal style
const modalStyle = {
  content: {
    position: "absolute",
    top: "50%",
    left: "50%",
    right: "50%",
    bottom: "50%",
    transform: "translate(-50%,-50%)",
    backgroundColor: "#fff",
    zIndex: "999",
    width: "442px",
    height: "300px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  overlay: {
    position: "fixed",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0",
    backgroundColor: "rgba(0,0,0,0.6)",
    zIndex: "999",
  },
};

const MemberList = ({
  results,
  offset,
  limit,
  askDeleteUser,
  selectUser,
  changeToggled,
}) => {
  return (
    <Ul direction="column">
      {results ? (
        results
          .slice(offset, offset + limit)
          .map(({ date_joined, id, is_active, store, username }) => (
            <Li
              key={id}
              height="68px"
              width="100%"
              border="1px solid #e2e6e7"
              align="center"
            >
              <Ul
                width="100%"
                padding="14px 24px"
                boxSizing="border-box"
                just="space-around"
              >
                <Li just="center" width="16.6666666667%" align="center">
                  {id}
                </Li>
                <Li just="center" width="16.6666666667%" align="center">
                  {moment(date_joined).format("L")}
                </Li>
                <Li just="center" width="16.6666666667%" align="center">
                  {username}
                </Li>
                <Li just="center" width="16.6666666667%" align="center">
                  <Toggle
                    defaultChecked={is_active}
                    aria-label="No label tag"
                    onChange={() => {
                      changeToggled(id, is_active);
                    }}
                  />
                </Li>
                <Li just="center" width="16.6666666667%" align="center">
                  {store.name}
                </Li>
                <Li just="center" width="16.6666666667%" align="center">
                  <Button
                    title="??????"
                    margin="0 10px 0 0"
                    padding="6px 8px"
                    width="40px"
                    background="rgb(24, 144, 255)"
                    onClick={() => selectUser(id)}
                  />
                  <Button
                    title="??????"
                    margin="0"
                    padding="6px 8px"
                    width="40px"
                    background="rgb(255, 72, 66)"
                    onClick={() => askDeleteUser(id)}
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

  const navigate = useNavigate();

  // state
  const [state, setState] = useState({
    search: "",
  });

  // ???????????? ??????
  const [userList, setUserList] = useState(null);

  // for pagination
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const [id, setId] = useState("");
  const [total, setTotal] = useState("");

  // ????????????
  const [selectedUser, setSelectedUser] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const [deleteModal, setDeleteModal] = useState(false);

  const closeTosModal = () => {
    setDeleteModal(false);
  };

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

  // ?????? ????????? ????????????
  const _callUserList = useCallback(
    (access) => {
      setIsLoading(true);
      ListStore.callUserList(access)
        .then((res) => {
          ListStore.setUserList(res.data);
          setUserList(res.data);
          setTotal(res.data.length);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err.response);
          alert("???????????? ????????????????????????. ???????????? ????????????.");
          setIsLoading(false);
        })
        .finally(() => setIsLoading(false));
    },
    [ListStore]
  );

  // ?????? ????????????
  const approveUser = (userId, data) => {
    if (userId) {
      return ListStore.approveUser(userId, data);
    }
  };

  // ????????????
  const selectUser = (userId) => {
    navigate(`${userId}`);
  };

  // ????????????
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

  //???????????? ??????
  const askDeleteUser = (userId) => {
    setSelectedUser(userId);
    setDeleteModal(true);
  };

  // ????????????
  const deleteUser = async (userId) => {
    setDeleteModal(false);
    await ListStore.deleteUser(userId);
    _callUserList(AuthStore.user.accessT);
    alert("????????? ?????????????????????.");
  };

  useEffect(() => {
    const decode = new Decode();
    const access = localStorage.getItem("access");
    const data = decode.getUserId(access);
    if (data.user_role === "ADMIN") {
      // ???????????? ????????????
      _callUserList(access);
    } else {
      alert("??????????????? ????????????.");
      navigate("/main");
    }

    return () => {
      setUserList("");
    };
  }, [_callUserList]);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <Modal
        isOpen={deleteModal}
        contentLabel="phone check"
        onRequestClose={closeTosModal}
        style={modalStyle}
      >
        <FlexBox direction="column" align="center" just="center" height="100%">
          <StyledBody
            color="color rgb(33, 43, 54)"
            fontSize="18px"
            fontW="600"
            margin="0 0 40px 0"
          >
            ??????????????? ????????? ??????????????????????
          </StyledBody>
          <FlexBox>
            <button
              type="button"
              style={{
                width: "142px",
                padding: "14px 20px",
                border: "unset",
                borderRadius: "8px",
                background: "#fff",
                border: "1px solid #ff9030",
                color: "#ff9030",
                fontSize: "1rem",
                cursor: "pointer",
                margin: "0 20px 0 0",
              }}
              onClick={() => deleteUser(selectedUser)}
            >
              ??????
            </button>
            <button
              type="button"
              style={{
                width: "142px",
                padding: "14px 20px",
                border: "unset",
                borderRadius: "8px",
                boxShadow: "rgb(249 217 189) 0px 8px 16px 0px",
                background: "#ff9030",
                color: "#fff",
                fontSize: "1rem",
                cursor: "pointer",
                margin: "0 0 0 0",
              }}
              onClick={closeTosModal}
            >
              ??????
            </button>
          </FlexBox>
        </FlexBox>
      </Modal>

      <StyledTitle margin="0 0 30px 0">?????????????????? </StyledTitle>

      <FlexBox
        width="100%"
        background="#fff"
        boxSizing="border-box"
        direction="column"
        rad="16px"
        shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
      >
        <FlexBox
          just="space-between"
          height="62px"
          align="center"
          padding="20px 24px"
        >
          <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
            ????????????
          </StyledBody>
          <SearchBar search={state.search} handleChange={handleChange} />
        </FlexBox>
        <FlexBox direction="column">
          <MemberListTitle />
          {isLoading ? (
            new Array(5).fill(1).map((_, i) => {
              return <SkeletonList key={i} />;
            })
          ) : userList !== null ? (
            <>
              <MemberList
                results={userList}
                limit={limit}
                offset={offset}
                askDeleteUser={askDeleteUser}
                selectUser={selectUser}
                changeToggled={changeToggled}
              />
              <Pagination
                total={total}
                limit={limit}
                page={page}
                setPage={setPage}
              />
            </>
          ) : (
            <Li
              height="68px"
              width="100%"
              border="1px solid #e2e6e7"
              align="center"
              just="center"
            >
              <StyledBody color="rgb(33, 43, 54)" fontSize="14px">
                ????????? ????????????????????????.
              </StyledBody>
            </Li>
          )}
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
});

export default Member;

const SkeletonList = () => {
  return (
    <Li height="68px" width="100%" border="1px solid #e2e6e7" align="center">
      <Ul
        width="100%"
        padding="14px 24px"
        boxSizing="border-box"
        just="space-around"
      >
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
        <LoadingLi></LoadingLi>
      </Ul>
    </Li>
  );
};
