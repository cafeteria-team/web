import React, { useCallback, useEffect, useState } from "react";
import { FlexBox, StyledTitle } from "../../components/StyledElements";
import { UserList } from "../../views";
import { observer } from "mobx-react";
import { useStores } from "../../stores/Context";

const Overview = observer(() => {
  const { AuthStore, ListStore } = useStores();

  const [isLoading, setIsLoading] = useState(false);

  // 유저 리스트 불러오기
  const _callUserList = useCallback(async () => {
    setIsLoading(true);
    await ListStore.callUserList().then((res) => {
      ListStore.setUserList(res.data);
      setIsLoading(false);
    });
  }, [ListStore]);

  useEffect(() => {
    _callUserList();
  }, []);

  return (
    <FlexBox padding="30px 70px" direction="column" width="100%">
      <StyledTitle margin="0 0 30px 0">관리자홈</StyledTitle>
      <FlexBox width="100%" just="space-between">
        {AuthStore.getUser.userRole === "ADMIN" ? (
          <>
            <UserList userList={ListStore.getUserList} isLoading={isLoading} />
          </>
        ) : (
          <FlexBox>설명</FlexBox>
        )}
      </FlexBox>
    </FlexBox>
  );
});

export default Overview;
