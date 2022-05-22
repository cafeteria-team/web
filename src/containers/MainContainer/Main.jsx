import React, { useEffect } from "react";
import { SideMenu, Header } from "../../components";
import { FlexBox } from "../../components/StyledElements";
import { observer } from "mobx-react";
import { Outlet } from "react-router-dom";
import { useStores } from "../../stores/Context";

const Main = observer(() => {
  const { AuthStore } = useStores();

  // 렌더링 될시에 store 에 user 정보를 저장
  const callUser = () => {
    const access = localStorage.getItem("access");
    AuthStore.setUser(access);
  };

  useEffect(() => {
    callUser();
  }, []);

  return (
    <FlexBox width="100%" height="100%" minHeight="100vh" background="#F9FAFB">
      <SideMenu role={AuthStore.getUser.userRole}></SideMenu>
      <FlexBox direction="column" width="100%" height="100%">
        <Header name={AuthStore.getUser.userName} logout={AuthStore.logout} />
        <FlexBox height="100%">
          <Outlet />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
});

export default Main;
