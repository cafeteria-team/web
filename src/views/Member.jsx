import React, { useState } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledLink,
  StyledBody,
  Ul,
  Li,
} from "../components/StyledElements";
import { Input } from "../components";
import moment from "moment";

const Member = ({ userList, onSearchList }) => {
  console.log(userList);
  let results = userList?.data?.results;

  // state
  const [state, setState] = useState({
    search: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
    onSearchList(state.search);
  };

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
          <FlexBox>
            <StyledBody margin="0 0 20px 0">검색</StyledBody>
            <Input
              onChange={handleChange}
              id="search"
              type="text"
              value={state.search}
            />
          </FlexBox>
        </FlexBox>
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
        <Ul width="100%" direction="column">
          {results ? (
            results.map(({ date_joined, id, is_active, store, username }) => (
              <Li key={id} width="100%" border="1px solid #fdcc97">
                <Ul
                  width="100%"
                  padding="14px"
                  boxSizing="border-box"
                  just="space-around"
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
                    관리
                  </Li>
                </Ul>
              </Li>
            ))
          ) : (
            <></>
          )}
        </Ul>
      </FlexBox>
    </FlexBox>
  );
};

export default Member;
