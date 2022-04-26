import React, { memo } from "react";
import {
  FlexBox,
  SeeMoreBtn,
  StyledBody,
  Ul,
  Li,
} from "../components/StyledElements";
import moment from "moment";

import { FaAngleRight } from "react-icons/fa";

const ListHeader = memo(() => {
  return (
    <>
      <FlexBox
        just="space-between"
        height="62px"
        align="center"
        padding="20px 24px"
      >
        <StyledBody color="color rgb(33, 43, 54)" fontSize="18px" fontW="600">
          회원관리
        </StyledBody>
        <SeeMoreBtn to="/main/member">
          더보기
          <FaAngleRight style={{ marginLeft: "4px" }} />
        </SeeMoreBtn>
      </FlexBox>
      <Ul
        borderB="1px solid #e2e6e7"
        width="100%"
        padding="14px"
        boxSizing="border-box"
        just="space-around"
        color="rgb(33, 43, 54)"
        fontW="600"
        fontSize="14px"
        height="68px"
        align="center"
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
      boxSizing="border-box"
      direction="column"
      rad="16px"
      shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
    >
      <ListHeader />
      <Ul
        direction="column"
        borderB="1px solid #e2e6e7"
        width="100%"
        boxSizing="border-box"
        just="space-around"
        color="rgb(33, 43, 54)"
        fontSize="14px"
        align="center"
        overflow="hidden"
      >
        {userList ? (
          userList
            .slice(0, 5)
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
