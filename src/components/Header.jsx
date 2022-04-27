import React, { useState } from "react";
import { FlexBox, StyledBody } from "./StyledElements";

import { useNavigate } from "react-router-dom";

import Img from "../assets/chef.png";

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
  const _onClickPassword = () => {
    navigate("/main/password");
  };

  return (
    <>
      <FlexBox
        width="100%"
        just="flex-end"
        height="70px"
        align="center"
        position="relative"
        padding="0 70px"
        boxSizing="border-box"
        background="#F9FAFB"
      >
        <FlexBox align="center" cursor="pointer" onClick={_onClick}>
          <img
            src={Img}
            alt="login_img"
            style={{ width: "40px", height: "fit-content", zIndex: 2 }}
          />
        </FlexBox>
        <FlexBox
          position="absolute"
          top="60px"
          width="200px"
          overflow="hidden"
          direction="column"
          shadow="2px 4px 12px rgb(0 0 0 / 8%)"
          opacity={box ? "1" : "0"}
          pointE={box ? "all" : "none"}
          transform={box ? "translateY(0px)" : "translateY(10px)"}
          zIndex="999"
        >
          <FlexBox
            height="48px"
            width="100%"
            just="space-between"
            rad="8px 8px 0 0"
            background="#fff"
            align="center"
            shadow="2px 4px 12px rgb(0 0 0 / 8%)"
            cursor="pointer"
            borderB="1px dashed rgba(145,158,171,0.24)"
            padding="0 20px"
            boxSizing="border-box"
          >
            <StyledBody color="rgb(33, 43, 54)" fontSize="14px">
              {name}
            </StyledBody>
          </FlexBox>
          <FlexBox
            height="48px"
            width="100%"
            background="#fff"
            align="center"
            shadow="2px 4px 12px rgb(0 0 0 / 8%)"
            cursor="pointer"
            onClick={_onClickPassword}
            just="center"
          >
            <FlexBox
              width="180px"
              height="36px"
              align="center"
              rad="8px"
              padding="0 10px"
              boxSizing="border-box"
              hoverBg="rgba(145, 158, 171, 0.12)"
            >
              <StyledBody fontSize="14px" color="rgb(33, 43, 54)">
                비밀번호 변경
              </StyledBody>
            </FlexBox>
          </FlexBox>
          <FlexBox
            height="48px"
            width="100%"
            background="#fff"
            align="center"
            shadow="2px 4px 12px rgb(0 0 0 / 8%)"
            cursor="pointer"
            just="center"
            onClick={_logout}
            borderT="1px dashed rgba(145,158,171,0.24)"
            rad="0 0 8px 8px"
          >
            <FlexBox
              width="180px"
              height="36px"
              align="center"
              rad="8px"
              padding="0 10px"
              boxSizing="border-box"
              hoverBg="rgba(145, 158, 171, 0.12)"
            >
              <StyledBody fontSize="14px" color="rgb(33, 43, 54)">
                로그아웃
              </StyledBody>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </FlexBox>
    </>
  );
}

export default React.memo(Header);
