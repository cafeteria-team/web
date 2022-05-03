import React, { useCallback, useEffect, useState } from "react";
import { FlexBox, StyledTitle } from "../../components/StyledElements";
import { UserList, StoreProductList } from "../../views";
import { observer } from "mobx-react";
import { useStores } from "../../stores/Context";
import Decode from "../../utils/decode";

const Overview = observer(() => {
  const { AuthStore, ListStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);

  const [role, setRole] = useState("");

  // 유저 리스트 불러오기
  const _callUserList = useCallback(async () => {
    setIsLoading(true);
    await ListStore.callUserList().then(() => {
      setIsLoading(false);
    });
  }, [ListStore]);

  useEffect(() => {
    const decode = new Decode();
    const access = localStorage.getItem("access");
    if (access) {
      const data = decode.getUserId(access);
      setRole(data.user_role);

      data.user_role === "ADMIN" && _callUserList();
    }
  }, [AuthStore.user.accessT, _callUserList]);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">관리자홈</StyledTitle>
      <FlexBox width="100%" just="space-between">
        {role === "ADMIN" ? (
          <>
            <UserList userList={ListStore.getUserList} isLoading={isLoading} />
            <StoreProductList />
          </>
        ) : (
          <FlexBox>설명</FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
});

export default Overview;
