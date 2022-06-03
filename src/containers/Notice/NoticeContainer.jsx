import React, { memo, useState, useEffect } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  LoadingLi,
} from "../../components/StyledElements";
import { Button, SearchBar, Pagination } from "../../components";
import { Ul, Li } from "../../components/StyledElements";
import { useStores } from "../../stores/Context";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Modal from "react-modal";
import { observer } from "mobx-react";

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

const ListTitle = memo(() => {
  return (
    <Ul
      borderB="1px solid #e2e6e7"
      width="100%"
      padding="14px 24px"
      boxSizing="border-box"
      just="space-around"
      color="rgb(33, 43, 54)"
      fontW="600"
      fontSize="14px"
      height="68px"
      align="center"
    >
      <Li just="center" width="10%" align="center">
        번호
      </Li>
      <Li just="center" width="40%" align="center">
        제목
      </Li>
      <Li just="center" width="16.6666666667%" align="center">
        노출여부
      </Li>
      <Li just="center" width="16.6666666667%" align="center">
        등록일시
      </Li>
      <Li just="center" width="16.6666666667%" align="center">
        관리
      </Li>
    </Ul>
  );
});

const Items = ({ results, offset, limit, selectNotice, askDeleteNotice }) => {
  return (
    <Ul direction="column">
      {results ? (
        results
          .slice(offset, offset + limit)
          .map(({ created, id, subject, view }) => {
            return (
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
                  <Li just="center" width="10%" align="center">
                    {id}
                  </Li>
                  <Li just="center" width="40%" align="center">
                    {subject}
                  </Li>
                  <Li just="center" width="16.6666666667%" align="center">
                    {view.toString()}
                  </Li>
                  <Li just="center" width="16.6666666667%" align="center">
                    {moment(created).format("L")}
                  </Li>
                  <Li just="center" width="16.6666666667%" align="center">
                    <Button
                      title="수정"
                      margin="0 10px 0 0"
                      padding="6px 8px"
                      width="40px"
                      background="rgb(24, 144, 255)"
                      onClick={() => selectNotice(id)}
                    />
                    <Button
                      title="삭제"
                      margin="0"
                      padding="6px 8px"
                      width="40px"
                      background="rgb(255, 72, 66)"
                      onClick={() => askDeleteNotice(id)}
                    />
                  </Li>
                </Ul>
              </Li>
            );
          })
      ) : (
        <></>
      )}
    </Ul>
  );
};

const NoticeContainer = observer(() => {
  const { NoticeStore } = useStores();
  const navigate = useNavigate();
  // state
  const [state, setState] = useState({
    search: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [noticeList, setNoticeList] = useState("");

  const [selectedNotice, setSelectedNotice] = useState("");

  // for pagination
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  const [total, setTotal] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    // onSearchList(e.target.value);
  };

  // 공지사항 추가
  const addList = () => {
    navigate("add");
  };

  // const onSearchList = (title) => {
  //   let lists = userList;
  //   if (title !== "") {
  //     lists = lists?.filter((item) => {
  //       return item?.username?.toLowerCase().search(title.toLowerCase()) !== -1;
  //     });
  //     setUserList(lists);
  //   } else {
  //     _callUserList(AuthStore.accessToken);
  //   }
  // };

  const selectNotice = (id) => {
    // const clickedNotice = noticeList.filter((item) => item.id === id);
    // NoticeStore.setNoticeList(clickedNotice);
    navigate(`${id}`);
  };

  const deleteNotice = (id) => {
    NoticeStore.deleteNotice(id).then((res) => {
      setDeleteModal(false);
      getNotice();
      alert("공지사항을 삭제했습니다.");
    });
  };

  const getNotice = () => {
    setIsLoading(true);
    NoticeStore.callNotice()
      .then((res) => {
        setNoticeList(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        alert("공지사항을 불러올수없습니다.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getNotice();
  }, []);

  const [deleteModal, setDeleteModal] = useState(false);

  const closeTosModal = () => {
    setDeleteModal(false);
  };

  const askDeleteNotice = (userId) => {
    setSelectedNotice(userId);
    setDeleteModal(true);
  };

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
            공지사항을 정말로 지우시겠습니까?
          </StyledBody>
          <FlexBox>
            <button
              type="button"
              style={{
                width: "142px",
                padding: "14px 20px",
                // border: "unset",
                borderRadius: "8px",
                background: "#fff",
                border: "1px solid #ff9030",
                color: "#ff9030",
                fontSize: "1rem",
                cursor: "pointer",
                margin: "0 20px 0 0",
              }}
              onClick={() => deleteNotice(selectedNotice)}
            >
              삭제
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
              취소
            </button>
          </FlexBox>
        </FlexBox>
      </Modal>

      <StyledTitle margin="0 0 30px 0">공지사항 관리</StyledTitle>
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
            공지사항
          </StyledBody>
          <FlexBox align="center">
            <SearchBar
              search={state.search}
              handleChange={handleChange}
              margin="0"
            />
            <Button
              title="공지사항 추가"
              margin="0 0 0 20px"
              padding="13px 16px"
              width="100%"
              background="rgb(24, 144, 255)"
              onClick={addList}
            />
          </FlexBox>
        </FlexBox>
        <ListTitle />
        {isLoading ? (
          new Array(5).fill(1).map((_, i) => {
            return <SkeletonList key={i} />;
          })
        ) : noticeList.length !== 0 ? (
          <>
            <Items
              results={noticeList}
              limit={limit}
              offset={offset}
              selectNotice={selectNotice}
              askDeleteNotice={askDeleteNotice}
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
              등록된 리스트가없습니다.
            </StyledBody>
          </Li>
        )}
      </FlexBox>
    </FlexBox>
  );
});

export default NoticeContainer;

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
