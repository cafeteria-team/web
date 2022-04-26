import React, { useCallback, useEffect, useState } from "react";
import { FlexBox, StyledTitle } from "../../components/StyledElements";
import { UserList, StoreProductList } from "../../views";
import { observer } from "mobx-react";
import { useStores } from "../../stores/Context";

const Overview = observer(() => {
  const { AuthStore, ListStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);

  // 유저 리스트 불러오기
  const _callUserList = useCallback(async () => {
    setIsLoading(true);
    await ListStore.callUserList().then(() => {
      setIsLoading(false);
    });
  }, [ListStore]);

  useEffect(() => {
    // 유저정보 불러오기
    _callUserList();
  }, [AuthStore.user.accessT, _callUserList]);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">Overview</StyledTitle>
      <FlexBox width="100%" just="space-between">
        <UserList userList={ListStore.getUserList} isLoading={isLoading} />
        <StoreProductList />
      </FlexBox>
    </FlexBox>
  );
});

export default Overview;
