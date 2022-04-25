import React, { useState, useRef } from "react";
import {
  FlexBox,
  StyledTitle,
  SideUl,
  SideLi,
  StyledBody,
} from "./StyledElements";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { grey } from "@mui/material/colors";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import StoreIcon from "@mui/icons-material/Store";
import WebIcon from "@mui/icons-material/Web";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import { IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";

import {
  TiArrowMinimise,
  TiArrowMaximise,
  TiHome,
  TiGroup,
  TiClipboard,
} from "react-icons/ti";

import {
  FaHome,
  FaUserFriends,
  FaClipboardList,
  FaStore,
  FaCommentDots,
  FaCog,
} from "react-icons/fa";

// 아코디언 컴포넌트에 사용 될 데이터
const menuData = [
  {
    // padding: 0px 20px;
    // background: #ffe4ce6e;
    // width: 215px;
    // border-radius: 8px;

    // JSX를 반환하는 함수를 설정하면, 실행했을 때 동적으로 코드를 구현할 수 있습니다.
    header: (menuState, index) => (
      <NavLink
        to="/main/overview"
        style={({ isActive }) =>
          isActive
            ? {
                borderLeft: "4px solid #fff",
                padding: "0 20px",
                background: "#ffe4ce6e",
                borderRadius: "8px",
                width: "215px",
              }
            : { padding: "0 20px", width: "215px" }
        }
      >
        <FlexBox just="space-between" align="center" minHeight="54px">
          <FlexBox align="center">
            <FaHome
              style={{
                color: "rgb(99, 115, 129)",
                width: "1.3em",
                height: "1.3em",
                marginRight: "10px",
              }}
            />
            <StyledBody
              margin="0 0 0 10px"
              color="rgb(99, 115, 129)"
              weight="600"
              display={menuState ? "none" : ""}
              style={({ isActive }) => isActive && { color: "#ff9030" }}
            >
              관리자홈
            </StyledBody>
          </FlexBox>
        </FlexBox>
      </NavLink>
    ),
  },
  {
    header: (menuState, index) => (
      <NavLink
        to="/main/member"
        style={({ isActive }) =>
          isActive
            ? { borderLeft: "4px solid #fff", padding: "0 20px" }
            : { padding: "0 20px" }
        }
      >
        <FlexBox just="space-between" align="center" minHeight="54px">
          <FlexBox align="center">
            <FaUserFriends
              style={{
                color: "rgb(99, 115, 129)",
                width: "1.3em",
                height: "1.3em",
                marginRight: "10px",
              }}
            />
            <StyledBody
              margin="0 0 0 10px"
              color="rgb(99, 115, 129)"
              weight="600"
              display={menuState ? "none" : ""}
            >
              회원정보관리
            </StyledBody>
          </FlexBox>
        </FlexBox>
      </NavLink>
    ),
  },
  {
    header: (menuState) => (
      <NavLink
        to="/main/manageAdmin"
        style={({ isActive }) =>
          isActive
            ? { borderLeft: "4px solid #fff", padding: "0 20px" }
            : { padding: "0 20px" }
        }
      >
        <FlexBox just="space-between" align="center" minHeight="54px">
          <FlexBox align="center">
            <FaClipboardList
              style={{
                color: "rgb(99, 115, 129)",
                width: "1.3em",
                height: "1.3em",
                marginRight: "10px",
              }}
            />
            <StyledBody
              margin="0 0 0 10px"
              color="rgb(99, 115, 129)"
              weight="600"
              display={menuState ? "none" : ""}
            >
              업체 카테고리 관리
            </StyledBody>
          </FlexBox>
        </FlexBox>
      </NavLink>
    ),
  },
  {
    header: (menuState) => (
      <NavLink
        to="/main/manage"
        style={({ isActive }) =>
          isActive
            ? { borderLeft: "4px solid #fff", padding: "0 20px" }
            : { padding: "0 20px" }
        }
      >
        <FlexBox just="space-between" align="center" minHeight="54px">
          <FlexBox align="center">
            <FaStore
              style={{
                color: "rgb(99, 115, 129)",
                width: "1.3em",
                height: "1.3em",
                marginRight: "10px",
              }}
            />
            <StyledBody
              margin="0 0 0 10px"
              color="rgb(99, 115, 129)"
              weight="600"
              display={menuState ? "none" : ""}
            >
              업체관리
            </StyledBody>
          </FlexBox>
        </FlexBox>
      </NavLink>
    ),
  },
  {
    header: (menuState) => (
      <NavLink
        to="/main/notice"
        style={({ isActive }) =>
          isActive
            ? { borderLeft: "4px solid #fff", padding: "0 20px" }
            : { padding: "0 20px" }
        }
      >
        <FlexBox just="space-between" align="center" minHeight="54px">
          <FlexBox align="center">
            <FaCommentDots
              style={{
                color: "rgb(99, 115, 129)",
                width: "1.3em",
                height: "1.3em",
                marginRight: "10px",
              }}
            />
            <StyledBody
              margin="0 0 0 10px"
              color="rgb(99, 115, 129)"
              weight="600"
              display={menuState ? "none" : ""}
            >
              공지사항관리
            </StyledBody>
          </FlexBox>
        </FlexBox>
      </NavLink>
    ),
  },
  {
    header: (menuState, index) => (
      <NavLink
        to="/main/setting"
        style={({ isActive }) =>
          isActive
            ? { borderLeft: "4px solid #fff", padding: "0 20px" }
            : { padding: "0 20px" }
        }
      >
        <FlexBox just="space-between" align="center" minHeight="54px">
          <FlexBox align="center">
            <FaCog
              style={{
                color: "rgb(99, 115, 129)",
                width: "1.3em",
                height: "1.3em",
                marginRight: "10px",
              }}
            />
            <StyledBody
              margin="0 0 0 10px"
              color="rgb(99, 115, 129)"
              weight="600"
              display={menuState ? "none" : ""}
            >
              설정
            </StyledBody>
          </FlexBox>
        </FlexBox>
      </NavLink>
    ),
  },
  // {
  //   header: (menuState, index) => (
  //     <FlexBox
  //       just="space-between"
  //       align="center"
  //       minHeight="54px"
  //       padding="0 20px"
  //     >
  //       <FlexBox align="center">
  //         <PersonIcon sx={{ color: grey[50] }} />
  //         <StyledBody
  //           margin="0 0 0 10px"
  //           color="#fff"
  //           weight="bold"
  //           display={menuState ? "none" : ""}
  //         >
  //           회원정보관리
  //         </StyledBody>
  //       </FlexBox>
  //       <FlexBox>
  //         <ExpandMoreIcon
  //           sx={{ color: grey[50] }}
  //           style={{ display: menuState ? "none" : "" }}
  //         />
  //       </FlexBox>
  //     </FlexBox>
  //   ),
  //   panel: (menuState, index, menuActive, _onClick) => (
  //     <FlexBox
  //       direction="column"
  //       height="74px"
  //       mHeight={menuActive === index ? "74px" : "0px"}
  //       just="space-between"
  //       overflow="hidden"
  //     >
  //       <NavLink
  //         to="/main/member"
  //         style={({ isActive }) =>
  //           isActive
  //             ? { background: "#f97316", padding: "0 26px" }
  //             : { padding: "0 26px" }
  //         }
  //         onClick={_onClick}
  //       >
  //         <StyledBody
  //           color="#fff"
  //           display="block"
  //           height="34px"
  //           padding="0 0 0 34px"
  //           lineH="34px"
  //           boxSizing="border-box"
  //         >
  //           일반회원
  //         </StyledBody>
  //       </NavLink>
  //       <NavLink
  //         to="/main/request"
  //         style={({ isActive }) =>
  //           isActive
  //             ? { background: "#f97316", padding: "0 26px" }
  //             : { padding: "0 26px" }
  //         }
  //         onClick={_onClick}
  //       >
  //         <StyledBody
  //           color="#fff"
  //           display="block"
  //           height="34px"
  //           padding="0 0 0 34px"
  //           lineH="34px"
  //           boxSizing="border-box"
  //         >
  //           가입요청
  //         </StyledBody>
  //       </NavLink>
  //     </FlexBox>
  //   ),
  // },
];

const SideMenu = (props) => {
  const [menuList] = useState(menuData);
  const [menuState, setMenuState] = useState(false);
  const [menuActive, setMenuActive] = useState(undefined);
  const menuRef = useRef();

  const menuHide = () => {
    setMenuState((prev) => !prev);
    setMenuActive(0);
  };

  const _onClick = (e, index) => {
    setMenuActive((prev) => (prev === index ? 0 : index));
  };

  const hello = (e) => {
    e.stopPropagation();
  };

  return (
    <FlexBox
      direction="column"
      width="100%"
      maxW={menuState ? "64px" : "280px"}
      position="relative"
      border="1px dashed rgba(145, 158, 171, 0.24)"
    >
      <StyledTitle color="#fff" position="sticky" top="0px">
        <FlexBox
          just={menuState ? "center" : "space-between"}
          align="center"
          padding={menuState ? "20px 10px" : "20px"}
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
              <TiArrowMaximise
                onClick={menuHide}
                style={{
                  color: "#ff9030",
                  cursor: "pointer",
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
              <TiArrowMinimise
                onClick={menuHide}
                style={{
                  color: "#ff9030",
                  cursor: "pointer",
                }}
              />
            </FlexBox>
          )}

          {/* <IconButton onClick={menuHide}>
            <MenuOpenIcon sx={{ color: grey[50] }} />
          </IconButton> */}
        </FlexBox>
      </StyledTitle>
      <SideUl>
        {menuList.map((item, index) => {
          return (
            <SideLi onClick={(e) => _onClick(e, index)} key={index}>
              {item.header(menuState)}
              {item.panel
                ? item.panel(menuState, index, menuActive, hello, menuRef)
                : ""}
            </SideLi>
          );
        })}
      </SideUl>
    </FlexBox>
  );
};

export default React.memo(SideMenu);
