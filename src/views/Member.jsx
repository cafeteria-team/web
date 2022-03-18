import React, { useState, useEffect, memo } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledLink,
  StyledBody,
  Ul,
  Li,
} from "../components/StyledElements";
import { Button } from "../components";
import { Input } from "../components";
import moment from "moment";

const SearchBar = ({ handleChange, search }) => {
  return (
    <FlexBox align="center">
      <StyledBody margin="0 10px 20px 0">검색</StyledBody>
      <Input
        onChange={handleChange}
        id="search"
        type="text"
        value={search}
        width="140px"
      />
    </FlexBox>
  );
};

const MemberListTitle = memo(() => {
  return (
    <Ul
      width="100%"
      background="#FF8400"
      padding="14px"
      boxSizing="border-box"
      just="space-around"
      color="#fff"
    >
      <Li just="center" width="16.6666666667%">
        번호
      </Li>
      <Li just="center" width="16.6666666667%">
        가입일시
      </Li>
      <Li just="center" width="16.6666666667%">
        아이디
      </Li>
      <Li just="center" width="16.6666666667%">
        구분
      </Li>
      <Li just="center" width="16.6666666667%">
        업체명
      </Li>
      <Li just="center" width="16.6666666667%">
        관리
      </Li>
    </Ul>
  );
});

const MemberList = ({ results, offset, limit, deleteUser }) => {
  return (
    <Ul width="100%" direction="column">
      {results ? (
        results
          .slice(offset, offset + limit)
          .map(({ date_joined, id, is_active, store, username }) => (
            <Li key={id} width="100%" border="1px solid #fdcc97">
              <Ul
                width="100%"
                padding="14px"
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
                  {is_active.toString()}
                </Li>
                <Li just="center" width="16.6666666667%">
                  {store.name}
                </Li>
                <Li just="center" width="16.6666666667%">
                  <Button
                    title="탈퇴"
                    margin="0"
                    padding="4px"
                    width="40px"
                    background="tomato"
                    onClick={() => deleteUser(username)}
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

const Pagination = ({ total, limit, page, setPage }) => {
  const numPages = Math.ceil(total / limit);
  console.log(total, limit, page, numPages);
  return total ? (
    <FlexBox just="center" margin="50px -10px 0 -10px">
      <Button
        onClick={() => {
          setPage(page - 1);
        }}
        disabled={page === 1}
        color="white"
        padding="6px"
        width="20px"
        title="&lt;"
        margin="0 2px"
      />
      {/* fill() 메서드는 배열의 시작 인덱스부터 끝 인덱스의 이전까지 정적인 값 하나로 채운다. */}
      {Array(numPages)
        .fill()
        .map((_, i) => (
          <Button
            key={i + 1}
            onClick={() => setPage(i + 1)}
            ariaCurrent={page === i + 1 ? "page" : null}
            title={i + 1}
            color="white"
            padding="6px"
            width="20px"
            margin="0 2px"
            hover={true}
          />
        ))}
      <Button
        onClick={() => setPage(page + 1)}
        disabled={page === numPages}
        color="white"
        padding="6px"
        width="20px"
        title=" &gt;"
        margin="0 2px"
      />
    </FlexBox>
  ) : (
    <></>
  );
};

const Member = ({ userList, onSearchList, deleteUser }) => {
  console.log("여기는 member", userList?.data);
  let total = userList?.length;

  // state
  const [state, setState] = useState({
    search: "",
  });

  // for pagination
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    onSearchList(e.target.value);
  };

  useEffect(() => {}, [userList]);

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
        <FlexBox just="space-between">
          <StyledBody margin="0 0 20px 0">회원관리</StyledBody>
          <SearchBar search={state.search} handleChange={handleChange} />
        </FlexBox>

        <MemberListTitle />
        <MemberList
          results={userList}
          limit={limit}
          offset={offset}
          deleteUser={deleteUser}
        />
        <Pagination total={total} limit={limit} page={page} setPage={setPage} />
      </FlexBox>
    </FlexBox>
  );
};

export default Member;
