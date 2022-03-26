import React, { useState } from "react";
import { FlexBox, StyledBody } from "./StyledElements";
import LogoutIcon from "@mui/icons-material/Logout";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useNavigate } from "react-router-dom";

function Header({ name, logout }) {
  const navigate = useNavigate();
  // console.log(name);
  const [box, setBox] = useState(false);
  const _onClick = () => {
    setBox((prev) => !prev);
  };

  const _logout = () => {
    logout();
    return navigate("/");
  };

  return (
    <FlexBox
      width="100%"
      just="flex-end"
      height="70px"
      align="center"
      position="relative"
      padding="0 70px"
      boxSizing="border-box"
      background="#fff"
    >
      <FlexBox align="center" cursor="pointer" onClick={_onClick}>
        <StyledBody margin="4px 0 0 0">{name}</StyledBody>
        <ArrowDropDownIcon />
      </FlexBox>
      <FlexBox
        position="absolute"
        top="80px"
        height="48px"
        width="100px"
        just="space-between"
        rad="8px 8px 0 0"
        background="#fff"
        align="center"
        shadow="2px 4px 12px rgb(0 0 0 / 8%)"
        padding="0 20px"
        cursor="pointer"
        hoverBg="#f97316;"
        hoverColor="#fff;"
        overflow="hidden"
        mHeight={box ? "48px" : "0"}
        onClick={_logout}
      >
        <LogoutIcon />
        <StyledBody>로그아웃</StyledBody>
      </FlexBox>
      <FlexBox
        position="absolute"
        top="128px"
        height="48px"
        width="100px"
        just="flex-end"
        rad="0 0 8px 8px"
        background="#fff"
        align="center"
        shadow="2px 4px 12px rgb(0 0 0 / 8%)"
        padding="0 20px"
        cursor="pointer"
        hoverBg="#f97316;"
        hoverColor="#fff;"
        overflow="hidden"
        mHeight={box ? "48px" : "0"}
        onClick={_logout}
      >
        <StyledBody>비밀번호 변경</StyledBody>
      </FlexBox>
    </FlexBox>
  );
}

export default React.memo(Header);
