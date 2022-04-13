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

// 아코디언 컴포넌트에 사용 될 데이터
const menuData = [
  {
    // JSX를 반환하는 함수를 설정하면, 실행했을 때 동적으로 코드를 구현할 수 있습니다.
    header: (menuState, index) => (
      <NavLink
        to="/main/overview"
        style={({ isActive }) =>
          isActive
            ? { borderLeft: "4px solid #fff", padding: "0 20px" }
            : { padding: "0 20px" }
        }
      >
        <FlexBox just="space-between" align="center" minHeight="54px">
          <FlexBox align="center">
            <HomeIcon sx={{ color: grey[50] }} />
            <StyledBody
              margin="0 0 0 10px"
              color="#fff"
              weight="bold"
              display={menuState ? "none" : ""}
            >
              관리자홈
            </StyledBody>
          </FlexBox>
        </FlexBox>
      </NavLink>
    ),
  },
  {
    // JSX를 반환하는 함수를 설정하면, 실행했을 때 동적으로 코드를 구현할 수 있습니다.
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
            <PersonIcon sx={{ color: grey[50] }} />
            <StyledBody
              margin="0 0 0 10px"
              color="#fff"
              weight="bold"
              display={menuState ? "none" : ""}
            >
              회원정보관리
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
  {
    header: (menuState) => (
      <FlexBox
        just="space-between"
        align="center"
        minHeight="54px"
        padding="0 20px"
      >
        <FlexBox align="center">
          <StoreIcon sx={{ color: grey[50] }} />
          <StyledBody
            margin="0 0 0 10px"
            color="#fff"
            weight="bold"
            display={menuState ? "none" : ""}
          >
            업체관리
          </StyledBody>
        </FlexBox>
        <FlexBox>
          <ExpandMoreIcon
            sx={{ color: grey[50] }}
            style={{ display: menuState ? "none" : "" }}
          />
        </FlexBox>
      </FlexBox>
    ),
    panel: (menuState, index, menuActive, _onClick) => (
      <FlexBox
        direction="column"
        height="74px"
        mHeight={menuActive === index ? "74px" : "0px"}
        just="space-between"
        overflow="hidden"
      >
        <NavLink
          to="/main/manageAdmin"
          style={({ isActive }) =>
            isActive
              ? { background: "#f97316", padding: "0 26px" }
              : { padding: "0 26px" }
          }
          onClick={_onClick}
        >
          <StyledBody
            color="#fff"
            display="block"
            height="34px"
            padding="0 0 0 34px"
            lineH="34px"
            boxSizing="border-box"
          >
            업체 카테고리 관리
          </StyledBody>
        </NavLink>
        <NavLink
          to="/main/manage"
          style={({ isActive }) =>
            isActive
              ? { background: "#f97316", padding: "0 26px" }
              : { padding: "0 26px" }
          }
          onClick={_onClick}
        >
          <StyledBody
            color="#fff"
            display="block"
            height="34px"
            padding="0 0 0 34px"
            lineH="34px"
            boxSizing="border-box"
          >
            업체관리
          </StyledBody>
        </NavLink>
      </FlexBox>
    ),
  },
  {
    header: (menuState, index) => (
      <NavLink
        to="/main/website"
        style={({ isActive }) =>
          isActive
            ? { borderLeft: "4px solid #fff", padding: "0 20px" }
            : { padding: "0 20px" }
        }
      >
        <FlexBox just="space-between" align="center" minHeight="54px">
          <FlexBox align="center">
            <WebIcon sx={{ color: grey[50] }} />
            <StyledBody
              margin="0 0 0 10px"
              color="#fff"
              weight="bold"
              display={menuState ? "none" : ""}
            >
              사이트관리
            </StyledBody>
          </FlexBox>
        </FlexBox>
      </NavLink>
    ),
  },
  {
    header: (menuState) => (
      <FlexBox
        just="space-between"
        align="center"
        minHeight="54px"
        padding="0 20px"
      >
        <FlexBox align="center">
          <NotificationsIcon sx={{ color: grey[50] }} />
          <StyledBody
            margin="0 0 0 10px"
            color="#fff"
            weight="bold"
            display={menuState ? "none" : ""}
          >
            공지사항관리
          </StyledBody>
        </FlexBox>
        <FlexBox>
          <ExpandMoreIcon
            sx={{ color: grey[50] }}
            style={{ display: menuState ? "none" : "" }}
          />
        </FlexBox>
      </FlexBox>
    ),
    panel: (menuState, index, menuActive, _onClick) => (
      <FlexBox
        direction="column"
        height="74px"
        mHeight={menuActive === index ? "74px" : "0px"}
        just="space-between"
        overflow="hidden"
      >
        <NavLink
          to="/main/notice"
          style={({ isActive }) =>
            isActive
              ? { background: "#f97316", padding: "0 26px" }
              : { padding: "0 26px" }
          }
          onClick={_onClick}
        >
          <StyledBody
            color="#fff"
            display="block"
            height="34px"
            padding="0 0 0 34px"
            lineH="34px"
            boxSizing="border-box"
          >
            공지사항
          </StyledBody>
        </NavLink>
        <NavLink
          to="/main/event"
          style={({ isActive }) =>
            isActive
              ? { background: "#f97316", padding: "0 26px" }
              : { padding: "0 26px" }
          }
          onClick={_onClick}
        >
          <StyledBody
            color="#fff"
            display="block"
            height="34px"
            padding="0 0 0 34px"
            lineH="34px"
            boxSizing="border-box"
          >
            이벤트
          </StyledBody>
        </NavLink>
      </FlexBox>
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
            <SettingsIcon sx={{ color: grey[50] }} />
            <StyledBody
              margin="0 0 0 10px"
              color="#fff"
              weight="bold"
              display={menuState ? "none" : ""}
            >
              설정
            </StyledBody>
          </FlexBox>
        </FlexBox>
      </NavLink>
    ),
  },
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
      background="#FF8400"
      width="100%"
      maxW={menuState ? "64px" : "260px"}
      position="relative"
    >
      <StyledTitle color="#fff" position="sticky" top="0px">
        <FlexBox
          just={menuState ? "center" : "space-between"}
          align="center"
          padding="20px"
        >
          <StyledTitle display={menuState ? "none" : ""}>좋구내</StyledTitle>
          <IconButton onClick={menuHide}>
            <MenuOpenIcon sx={{ color: grey[50] }} />
          </IconButton>
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
