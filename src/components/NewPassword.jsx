import React, { useState } from "react";
import { FlexBox, StyledTitle, StyledBody } from "./StyledElements";
import { Button, Input } from ".";

const NewPassword = ({ cancelPassword }) => {
  const [state, setState] = useState({
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <FlexBox
      background="#fff"
      direction="column"
      align="center"
      padding="20px 20px 100px 20px"
    >
      <FlexBox
        just="center"
        direction="column"
        align="center"
        margin="0 0 32px 0"
      >
        <StyledTitle margin="80px 0 20px 0">비밀번호 재설정</StyledTitle>
        <StyledBody>새로운 비밀번호를 입력해주세요.</StyledBody>
      </FlexBox>
      <FlexBox direction="column">
        <Input
          type="password"
          id="password"
          value={state.password}
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <Input
          type="password"
          id="confirm_password"
          value={state.confirm_password}
          placeholder="비밀번호 재입력"
          onChange={handleChange}
        />
        <FlexBox direction="column">
          <Button
            type="button"
            title="변경"
            width="300px"
            margin="0 0 12px 0"
          />
          <Button
            type="button"
            title="취소"
            width="300px"
            margin="0"
            background="unset"
            border="1px solid #FF8400"
            color="#FF8400"
            onClick={cancelPassword}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default NewPassword;
