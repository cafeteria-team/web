import React, { memo, useState } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
  LoadingLi,
} from "../../components/StyledElements";
import { Button, Input, SearchBar, Pagination } from "../../components";
import { Ul, Li } from "../../components/StyledElements";
import { useStores } from "../../stores/Context";
import { observer } from "mobx-react";
import { useNavigate } from "react-router-dom";
import Decode from "../../utils/decode";

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
      <Li just="center" width="16.6666%" align="center">
        노출여부
      </Li>
      <Li just="center" width="16.6666%" align="center">
        등록일시
      </Li>
      <Li just="center" width="16.6666%" align="center">
        관리
      </Li>
    </Ul>
  );
});

const NoticeContainer = () => {
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
    // onSearchList(e.target.value);
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
  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
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
          <SearchBar search={state.search} handleChange={handleChange} />
        </FlexBox>
        <ListTitle />
      </FlexBox>
    </FlexBox>
  );
};

export default NoticeContainer;
