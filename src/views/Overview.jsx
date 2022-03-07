import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  FlexBox,
  StyledTitle,
  SideUl,
  SideLi,
  StyledBody,
  Ul,
  Li,
} from "../components/StyledElements";
import axios from "../utils/axios";
import { Pagination } from "./index";

const UserList = ({ userList }) => {
  const [posts, setPosts] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const offset = (page - 1) * limit;

  console.log(userList);

  // const getData = async () => {
  //   try {
  //     const response = await axios.post(
  //       "https://jsonplaceholder.typicode.com/posts"
  //     );
  //     console.log(response);
  //     return setPosts(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // console.log(posts);

  // useEffect(() => {
  //   // getData();
  //   fetch("https://jsonplaceholder.typicode.com/posts")
  //     .then((res) => res.json())
  //     .then((data) => setPosts(data));
  // }, []);

  // const loadMemberList = async () => {
  //   try {
  //     const response = await axios.get("/api/user");
  //     console.log(response);
  //     return response;
  //   } catch (error) {
  //     return false;
  //   }
  // };
  // useEffect(() => {
  //   loadMemberList();
  // }, []);

  return (
    <FlexBox
      width="calc(70% - 30px)"
      background="#fff"
      padding="20px"
      boxSizing="border-box"
      direction="column"
    >
      <StyledBody margin="0 0 20px 0">회원관리</StyledBody>
      <div>
        <label>
          페이지 당 표시할 게시물 수:&nbsp;
          <select
            type="number"
            value={limit}
            onChange={({ target: { value } }) => setLimit(Number(value))}
          >
            <option value="10">10</option>
            <option value="12">12</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </label>
      </div>

      <div>
        {/* {userList.map(({ date_joined, id, is_active, store, username }) => (
          <div key={id}>
            <p>{date_joined}</p>
            <p>{username}</p>
            <p>{is_active}</p>
            <p>{store.name}</p>
          </div>
        ))} */}

        {/* {posts.slice(offset, offset + limit).map(({ id, title, body }) => (
          <div key={id}>
            <h3>
              {id}.{title}
            </h3>
            <p>{body}</p>
          </div>
        ))} */}
      </div>
      <footer>
        <Pagination
          total={posts.length}
          limit={limit}
          page={page}
          setPage={setPage}
        />
      </footer>

      {/* <Ul
        width="100%"
        background="#FF8400"
        padding="14px"
        boxSizing="border-box"
        just="space-around"
        color="#fff"
      >
        <Li>가입일시</Li>
        <Li>아이디</Li>
        <Li>구분</Li>
        <Li>성명</Li>
        <Li>업체명</Li>
      </Ul>
      <Ul>
        <Li>
          <Ul>
            <Li></Li>
            <Li></Li>
            <Li></Li>
            <Li></Li>
            <Li></Li>
          </Ul>
        </Li>
        <Li>
          <Ul>
            <Li></Li>
            <Li></Li>
            <Li></Li>
            <Li></Li>
            <Li></Li>
          </Ul>
        </Li>
        <Li>
          <Ul>
            <Li></Li>
            <Li></Li>
            <Li></Li>
            <Li></Li>
            <Li></Li>
          </Ul>
        </Li>
      </Ul> */}
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

const Overview = ({ hello }) => {
  const { name } = useParams();

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">Overview</StyledTitle>
      <FlexBox width="100%" just="space-between" height="480px">
        <UserList />
        <ProManagement />
      </FlexBox>
    </FlexBox>
  );
};

export default Overview;
