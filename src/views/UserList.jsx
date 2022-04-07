import React, { memo } from "react";
import {
  FlexBox,
  StyledLink,
  StyledBody,
  Ul,
  Li,
} from "../components/StyledElements";
import moment from "moment";

const ListHeader = memo(() => {
  return (
    <>
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
    </>
  );
});

const UserList = ({ userList }) => {
  return (
    <FlexBox
      width="calc(70% - 30px)"
      background="#fff"
      padding="20px"
      boxSizing="border-box"
      direction="column"
    >
      <ListHeader />
      <Ul width="100%" direction="column" height="360px" overflow="hidden">
        {userList ? (
          userList
            .slice(0, 10)
            .map(({ date_joined, id, is_active, store, username }) => (
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
          <StyledBody>등록된 회원이없습니다.</StyledBody>
        )}
      </Ul>
    </FlexBox>
  );
};

export default UserList;
