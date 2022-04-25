import React, { useEffect, useState } from "react";
import { SideMenu, Header } from "../../components";
import { FlexBox } from "../../components/StyledElements";
import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import { useStores } from "../../stores/Context";
import { getCookie } from "../../utils/cookie";

const Main = observer(() => {
  const { AuthStore } = useStores();

  // 사용자 이름저장
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserName(getCookie("username"));
  }, []);

  return (
    <FlexBox width="100%" height="100%" minHeight="100vh" background="#F9FAFB">
      <SideMenu></SideMenu>
      <FlexBox direction="column" width="100%" height="100%">
        <Header name={userName} logout={AuthStore.logout} />
        <FlexBox height="100%">
          <Outlet />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
});

export default Main;
