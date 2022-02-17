import React from "react";
import {
  StyledTitle,
  MainContainer,
  FlexBox,
} from "../components/StyledElements";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

function Complete(props) {
  const navigate = useNavigate();

  const _onClick = () => {
    navigate("/");
  };

  return (
    <MainContainer bgImage="url('/img/mainbg.jpg')">
      <FlexBox
        width="600px"
        height="600px"
        background="#fff"
        rad="8px"
        shadow="2px 4px 12px rgb(0 0 0 / 8%)"
        align="center"
        just="center"
        direction="column"
      >
        <StyledTitle margin="0 0 10px 0">좋구내 회원으로</StyledTitle>
        <StyledTitle margin="0 0 30px 0">가입해 주셔서 감사합니다.</StyledTitle>
        <Button
          title="로그인 하기"
          type="button"
          width="300px"
          onClick={_onClick}
        />
      </FlexBox>
    </MainContainer>
  );
}

export default Complete;
