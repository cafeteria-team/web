import React, { useState, useEffect, useCallback } from "react";
import {
  FlexBox,
  StyledTitle,
  StyledBody,
} from "../../components/StyledElements";
import { Input, Button, FacilityLists, MyEditor } from "../../components";
import { observer } from "mobx-react";
import jwt_decode from "jwt-decode";

const Manage = observer(({ ManageStore }) => {
  const [state, setState] = useState({
    email: "",
    name: "",
    busi_num: "",
    busi_num_img: "",
  });

  // const [facilities, setFacilities] = useState([ManageStore.facilitiesList]);

  const List = (
    <FlexBox align="center">
      <FlexBox margin="0 10px 0 0" minW="100px">
        목록
      </FlexBox>
      <Input
        type="email"
        id="email"
        margin="0"
        value={state.email}
        onChange={(e) => handleChange(e)}
      />
    </FlexBox>
  );

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const addLists = () => {};

  // const getFacilities = useCallback(
  //   async (userId) => {
  //     const response = await manageStore.getFacilitiesList(userId);
  //     manageStore.setFacilitiesList(response.data);
  //   },
  //   [manageStore]
  // );

  // useEffect(() => {
  //   let access = localStorage.getItem("access");
  //   let token = access;
  //   let decoded = jwt_decode(token);

  //   getFacilities(decoded.user_id);
  // }, [getFacilities]);

  return (
    <FlexBox width="100%" height="100%" direction="column" padding="30px 70px">
      <StyledTitle margin="0 0 30px 0">업체관리</StyledTitle>
      <FlexBox
        background="#fff"
        margin="0 0 32px 0"
        padding="20px 20px 60px 20px"
        direction="column"
        position="relative"
      >
        <StyledBody margin="0 0 32px 0" weight="bold">
          편의시설 및 서비스
        </StyledBody>
        <FlexBox align="center">
          <FlexBox align="center">
            <FlexBox margin="0 10px 0 0" minW="100px">
              목록
            </FlexBox>
            <Input
              type="email"
              id="email"
              margin="0"
              value={state.email}
              onChange={(e) => handleChange(e)}
            />
          </FlexBox>
        </FlexBox>
        <FacilityLists />
        <Button
          color="#06c"
          background="unset"
          type="button"
          width="100px"
          title="목록 추가하기"
          padding="unset"
          font="16px"
          position="absolute"
          left="120px"
          bottom="0"
          onClick={addLists}
        />
      </FlexBox>
      <MyEditor />
    </FlexBox>
  );
});
export default Manage;
