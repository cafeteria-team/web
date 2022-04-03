import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FlexBox,
  StyledTitle,
  StyledLink,
  StyledBody,
  Ul,
  Li,
} from "../components/StyledElements";
import { Pagination } from "./index";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const UserList = ({ userList }) => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;
  console.log("Overview 호출");

  return (
    <FlexBox
      width="calc(70% - 30px)"
      background="#fff"
      padding="20px"
      boxSizing="border-box"
      direction="column"
    >
      <FlexBox just="space-between">
        <StyledBody margin="0 0 20px 0">회원관리</StyledBody>
        <StyledLink to="/main/member">더보기</StyledLink>
      </FlexBox>

      <Ul
        width="100%"
        background="#FF8400"
        padding="14px"
        boxSizing="border-box"
        just="space-around"
        color="#fff"
      >
        <Li just="center" width="25%">
          가입일시
        </Li>
        <Li just="center" width="25%">
          아이디
        </Li>
        <Li just="center" width="25%">
          구분
        </Li>
        <Li just="center" width="25%">
          업체명
        </Li>
      </Ul>
      <Ul width="100%" direction="column" height="360px" overflow="hidden">
        {userList ? (
          userList.map(({ date_joined, id, is_active, store, username }) => (
            <Li key={id} width="100%" border="1px solid #fdcc97">
              <Ul
                width="100%"
                padding="14px"
                boxSizing="border-box"
                just="space-around"
              >
                <Li just="center" width="25%">
                  {moment(date_joined).format("L")}
                </Li>
                <Li just="center" width="25%">
                  {username}
                </Li>
                <Li just="center" width="25%">
                  {is_active.toString()}
                </Li>
                <Li just="center" width="25%">
                  {store.name}
                </Li>
              </Ul>
            </Li>
          ))
        ) : (
          <></>
        )}
      </Ul>

      {/* {posts.slice(offset, offset + limit).map(({ id, title, body }) => (
          <div key={id}>
            <h3>
              {id}.{title}
            </h3>
            <p>{body}</p>
          </div>
        ))} */}

      {/* <footer>
        <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer> */}
    </FlexBox>
  );
};

const ProManagement = () => {
  return (
    <FlexBox
      width="30%"
      background="#fff"
      padding="20px"
      boxSizing="border-box"
      direction="column"
    >
      <StyledBody margin="0 0 20px 0">업체상품 등록관리</StyledBody>
      <Ul
        width="100%"
        background="#FF8400"
        padding="14px"
        boxSizing="border-box"
        just="space-around"
        color="#fff"
      >
        <Li>업체명</Li>
        <Li>변경사항</Li>
        <Li>등록일시</Li>
      </Ul>
    </FlexBox>
  );
};

const Overview = ({ userList }) => {
  let results = userList?.data?.results;

  console.log("results", userList);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">Overview</StyledTitle>
      <FlexBox width="100%" just="space-between" height="480px">
        <UserList userList={userList} />
        <ProManagement />
      </FlexBox>
    </FlexBox>
  );
};

export default Overview;
