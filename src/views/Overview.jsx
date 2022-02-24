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

const UserList = () => {
  const loadMemberList = async () => {
    try {
      const response = await axios.get("/api/user");
      console.log(response);
      return response;
    } catch (error) {
      return false;
    }
  };
  useEffect(() => {
    loadMemberList();
  }, []);

  return (
    <FlexBox
      width="calc(70% - 30px)"
      background="#fff"
      padding="20px"
      boxSizing="border-box"
      direction="column"
    >
      <StyledBody margin="0 0 20px 0">회원관리</StyledBody>
      <Ul
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
      </Ul>
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

const Overview = (props) => {
  const { name } = useParams();
  console.log("이건머냐갵");
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
