import React, { memo } from "react";
import {
  FlexBox,
  SeeMoreBtn,
  StyledBody,
  Ul,
  Li,
  LoadingLi,
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
        padding="14px 24px"
        boxSizing="border-box"
        just="space-around"
        color="rgb(33, 43, 54)"
        fontW="600"
        fontSize="14px"
        height="68px"
        align="center"
      >
        <Li just="center" width="25%" align="center">
          가입일시
        </Li>
        <Li just="center" width="25%" align="center">
          아이디
        </Li>
        <Li just="center" width="25%" align="center">
          업체명
        </Li>
        <Li just="center" width="25%" align="center">
          회원승인
        </Li>
      </Ul>
    </>
  );
});

const UserList = ({ userList, isLoading }) => {
  console.log(userList);
  return (
    <FlexBox
      width="100%"
      background="#fff"
      boxSizing="border-box"
      direction="column"
      rad="16px"
      shadow="rgb(145 158 171 / 20%) 0px 3px 1px -2px, rgb(145 158 171 / 14%) 0px 2px 2px 0px, rgb(145 158 171 / 12%) 0px 1px 5px 0px"
    >
      <ListHeader />
      <Ul
        direction="column"
        width="100%"
        boxSizing="border-box"
        just="space-around"
        color="rgb(33, 43, 54)"
        fontSize="14px"
        align="center"
        overflow="hidden"
      >
        {isLoading ? (
          new Array(5).fill(1).map((_, i) => {
            return <SkeletonList key={i} />;
          })
        ) : userList ? (
          userList
            .slice(0, 5)
            .map(({ date_joined, id, is_active, store, username }, index) => {
              return (
                <Li
                  key={id}
                  height="68px"
                  width="100%"
                  border={index === 4 ? "unset" : "1px solid #e2e6e7"}
                  align="center"
                >
                  <Ul
                    width="100%"
                    padding="14px 24px"
                    boxSizing="border-box"
                    just="space-around"
                  >
                    <Li just="center" width="25%" align="center">
                      {moment(date_joined).format("L")}
                    </Li>
                    <Li just="center" width="25%" align="center">
                      {username}
                    </Li>
                    <Li just="center" width="25%" align="center">
                      {store.name}
                    </Li>
                    <Li just="center" width="25%" align="center">
                      <FlexBox
                        background={
                          is_active === true
                            ? "rgba(84, 214, 44, 0.16)"
                            : "rgba(255, 72, 66, 0.16)"
                        }
                        padding="6px 8px"
                        rad="8px"
                        color={
                          is_active === true
                            ? "rgb(34, 154, 22)"
                            : "rgb(183, 33, 54)"
                        }
                        fontW="600"
                      >
                        {is_active.toString()}
                      </FlexBox>
                    </Li>
                  </Ul>
                </Li>
              );
            })
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
      </Ul>
    </FlexBox>
  );
};

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
      </Ul>
    </Li>
  );
};

export default UserList;
