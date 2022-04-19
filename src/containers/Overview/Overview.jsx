import React, { useCallback, useEffect } from "react";
import { FlexBox, StyledTitle } from "../../components/StyledElements";
import { UserList, StoreProductList } from "../../views";
import { observer } from "mobx-react";
import { useStores } from "../../stores/Context";

const Overview = observer(() => {
  const { AuthStore, ListStore } = useStores();

  // 유저 리스트 불러오기
  const _callUserList = useCallback(async () => {
    await ListStore.callUserList();
  }, [ListStore]);

  useEffect(() => {
    // 유저정보 불러오기
    _callUserList();
  }, [AuthStore.user.accessT, _callUserList]);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">Overview</StyledTitle>
      <FlexBox width="100%" just="space-between" height="480px">
        <UserList userList={ListStore.getUserList} />
        <StoreProductList />
      </FlexBox>
    </FlexBox>
  );
});

export default Overview;
