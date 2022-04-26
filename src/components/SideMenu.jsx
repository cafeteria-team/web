import React, { useState, useRef } from "react";
import {
  FlexBox,
  StyledTitle,
  SideUl,
  SideLi,
  StyledBody,
} from "./StyledElements";

import { NavLink } from "react-router-dom";

import {
  FaHome,
  FaUserFriends,
  FaClipboardList,
  FaStore,
  FaCommentDots,
  FaCog,
  FaMinus,
  FaExpandAlt,
} from "react-icons/fa";

import Img from "../assets/side_img.png";

// 아코디언 컴포넌트에 사용 될 데이터
const menuData = [
  {
    // JSX를 반환하는 함수를 설정하면, 실행했을 때 동적으로 코드를 구현할 수 있습니다.
    header: (menuState) => (
      <NavLink
        to="/main/overview"
        style={{
          padding: "0 10px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {({ isActive }) => {
          return (
            <FlexBox
              padding={menuState ? "0 10px" : "0 20px"}
              width="100%"
              boxSizing="border-box"
              background={isActive ? "#ffe4ce6e" : "unset"}
              rad="8px"
              just="space-between"
              align="center"
              minHeight="48px"
              hoverBg="rgba(145,158,171,0.12)"
            >
              <FlexBox align="center">
                <FaHome
                  style={{
                    color: isActive ? "#ff9030" : "rgb(99, 115, 129)",
                    width: "1.3em",
                    height: "1.3em",
                    marginRight: "10px",
                  }}
                />
                <StyledBody
                  margin="0 0 0 10px"
                  color={isActive ? "#ff9030" : "rgb(99, 115, 129)"}
                  weight="600"
                  display={menuState ? "none" : ""}
                  fontSize="15px"
                >
                  관리자홈
                </StyledBody>
              </FlexBox>
            </FlexBox>
          );
        }}
      </NavLink>
    ),
  },
  {
    header: (menuState) => (
      <NavLink
        to="/main/member"
        style={{
          padding: "0 10px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {({ isActive }) => (
          <FlexBox
            padding={menuState ? "0 10px" : "0 20px"}
            width="100%"
            boxSizing="border-box"
            background={isActive ? "#ffe4ce6e" : "unset"}
            rad="8px"
            just="space-between"
            align="center"
            minHeight="48px"
            hoverBg="rgba(145,158,171,0.12)"
          >
            <FlexBox align="center">
              <FaUserFriends
                style={{
                  color: isActive ? "#ff9030" : "rgb(99, 115, 129)",
                  width: "1.3em",
                  height: "1.3em",
                  marginRight: "10px",
                }}
              />
              <StyledBody
                margin="0 0 0 10px"
                color={isActive ? "#ff9030" : "rgb(99, 115, 129)"}
                weight="600"
                display={menuState ? "none" : ""}
                fontSize="15px"
              >
                회원정보관리
              </StyledBody>
            </FlexBox>
          </FlexBox>
        )}
      </NavLink>
    ),
  },
  {
    header: (menuState) => (
      <NavLink
        to="/main/manageAdmin"
        style={{
          padding: "0 10px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {({ isActive }) => (
          <FlexBox
            padding={menuState ? "0 10px" : "0 20px"}
            width="100%"
            boxSizing="border-box"
            background={isActive ? "#ffe4ce6e" : "unset"}
            rad="8px"
            just="space-between"
            align="center"
            minHeight="48px"
            hoverBg="rgba(145,158,171,0.12)"
          >
            <FlexBox align="center">
              <FaClipboardList
                style={{
                  color: isActive ? "#ff9030" : "rgb(99, 115, 129)",
                  width: "1.3em",
                  height: "1.3em",
                  marginRight: "10px",
                }}
              />
              <StyledBody
                margin="0 0 0 10px"
                color={isActive ? "#ff9030" : "rgb(99, 115, 129)"}
                weight="600"
                display={menuState ? "none" : ""}
                fontSize="15px"
              >
                업체 카테고리 관리
              </StyledBody>
            </FlexBox>
          </FlexBox>
        )}
      </NavLink>
    ),
  },
  {
    header: (menuState) => (
      <NavLink
        to="/main/manage"
        style={{
          padding: "0 10px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {({ isActive }) => (
          <FlexBox
            padding={menuState ? "0 10px" : "0 20px"}
            width="100%"
            boxSizing="border-box"
            background={isActive ? "#ffe4ce6e" : "unset"}
            rad="8px"
            just="space-between"
            align="center"
            minHeight="48px"
            hoverBg="rgba(145,158,171,0.12)"
          >
            <FlexBox align="center">
              <FaStore
                style={{
                  color: isActive ? "#ff9030" : "rgb(99, 115, 129)",
                  width: "1.3em",
                  height: "1.3em",
                  marginRight: "10px",
                }}
              />
              <StyledBody
                margin="0 0 0 10px"
                color={isActive ? "#ff9030" : "rgb(99, 115, 129)"}
                weight="600"
                display={menuState ? "none" : ""}
                fontSize="15px"
              >
                업체관리
              </StyledBody>
            </FlexBox>
          </FlexBox>
        )}
      </NavLink>
    ),
  },
  {
    header: (menuState) => (
      <NavLink
        to="/main/notice"
        style={{
          padding: "0 10px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {({ isActive }) => (
          <FlexBox
            padding={menuState ? "0 10px" : "0 20px"}
            width="100%"
            boxSizing="border-box"
            background={isActive ? "#ffe4ce6e" : "unset"}
            rad="8px"
            just="space-between"
            align="center"
            minHeight="48px"
            hoverBg="rgba(145,158,171,0.12)"
          >
            <FlexBox align="center">
              <FaCommentDots
                style={{
                  color: isActive ? "#ff9030" : "rgb(99, 115, 129)",
                  width: "1.3em",
                  height: "1.3em",
                  marginRight: "10px",
                }}
              />
              <StyledBody
                margin="0 0 0 10px"
                color={isActive ? "#ff9030" : "rgb(99, 115, 129)"}
                weight="600"
                display={menuState ? "none" : ""}
                fontSize="15px"
              >
                공지사항관리
              </StyledBody>
            </FlexBox>
          </FlexBox>
        )}
      </NavLink>
    ),
  },
  {
    header: (menuState) => (
      <NavLink
        to="/main/setting"
        style={{
          padding: "0 10px",
          boxSizing: "border-box",
          width: "100%",
        }}
      >
        {({ isActive }) => (
          <FlexBox
            padding={menuState ? "0 10px" : "0 20px"}
            width="100%"
            boxSizing="border-box"
            background={isActive ? "#ffe4ce6e" : "unset"}
            rad="8px"
            just="space-between"
            align="center"
            minHeight="48px"
            hoverBg="rgba(145,158,171,0.12)"
          >
            <FlexBox align="center">
              <FaCog
                style={{
                  color: isActive ? "#ff9030" : "rgb(99, 115, 129)",
                  width: "1.3em",
                  height: "1.3em",
                  marginRight: "10px",
                }}
              />
              <StyledBody
                margin="0 0 0 10px"
                color={isActive ? "#ff9030" : "rgb(99, 115, 129)"}
                weight="600"
                display={menuState ? "none" : ""}
                fontSize="15px"
              >
                설정
              </StyledBody>
            </FlexBox>
          </FlexBox>
        )}
      </NavLink>
    ),
  },
];

const SideMenu = (props) => {
  const [menuList] = useState(menuData);
  const [menuState, setMenuState] = useState(false);

  const menuHide = () => {
    setMenuState((prev) => !prev);
  };

  return (
    <FlexBox
      direction="column"
      width="100%"
      maxW={menuState ? "64px" : "280px"}
      position="relative"
      border="1px dashed rgba(145, 158, 171, 0.24)"
      just="space-between"
    >
      <FlexBox direction="column">
        <StyledTitle color="#fff" position="sticky" top="0px">
          <FlexBox
            just={menuState ? "center" : "space-between"}
            align="center"
            padding={menuState ? "20px 10px" : "20px"}
            margin="0 0 34px 0"
          >
            <StyledTitle display={menuState ? "none" : ""}>좋구내</StyledTitle>
            {menuState ? (
              <FlexBox
                background="rgba(145, 158, 171, 0.12)"
                width="36px"
                height="36px"
                just="center"
                align="center"
                rad="100%"
                hoverScale="scale(1.1)"
              >
                <FaExpandAlt
                  onClick={menuHide}
                  style={{
                    color: "#ff9030",
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </FlexBox>
            ) : (
              <FlexBox
                background="rgba(145, 158, 171, 0.12)"
                width="36px"
                height="36px"
                just="center"
                align="center"
                rad="100%"
                hoverScale="scale(1.1)"
              >
                <FaMinus
                  onClick={menuHide}
                  style={{
                    color: "#ff9030",
                    cursor: "pointer",
                    width: "20px",
                    height: "20px",
                  }}
                />
              </FlexBox>
            )}
          </FlexBox>
        </StyledTitle>
        <SideUl>
          {menuList.map((item, index) => {
            return <SideLi key={index}>{item.header(menuState)}</SideLi>;
          })}
        </SideUl>
      </FlexBox>
      <FlexBox
        position="relative"
        just="center"
        align="center"
        margin="0 0 20px 0"
      >
        <img
          src={Img}
          alt="login_img"
          style={{ width: "70%", height: "fit-content", zIndex: 2 }}
        />
        <FlexBox
          background="#ff9030"
          width={menuState ? "24px" : "110px"}
          height={menuState ? "24px" : "110px"}
          rad="100%"
          position="absolute"
          top={menuState ? "6px" : "30px"}
          left="82px"
          shadow="rgb(249 217 189) 5px 3px 16px 0px"
        />
      </FlexBox>
    </FlexBox>
  );
};

export default React.memo(SideMenu);
