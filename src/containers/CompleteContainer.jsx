import React from "react";
import {
  StyledTitle,
  MainContainer,
  FlexBox,
} from "../components/StyledElements";
import { Button } from "../components";
import { useNavigate } from "react-router-dom";

import Img from "../assets/complete_img.png";

function Complete(props) {
  const navigate = useNavigate();

  const _onClick = () => {
    navigate("/");
  };

  return (
    <MainContainer background="rgb(249, 250, 251)">
      <FlexBox
        width="600px"
        height="600px"
        rad="8px"
        align="center"
        just="center"
        direction="column"
      >
        <StyledTitle margin="0 0 10px 0" font="30px">
          좋구내 회원으로
        </StyledTitle>
        <StyledTitle margin="0 0 30px 0" font="30px">
          가입해 주셔서 감사합니다.
        </StyledTitle>
        <FlexBox
          maxW="464px"
          width="100%"
          height="calc(100% - 32px)"
          margin="16px"
          rad="8px"
          direction="column"
          just="center"
        >
          <img
            src={Img}
            alt="login_img"
            style={{ width: "100%", height: "fit-content" }}
          />
        </FlexBox>
        <Button
          title="로그인 하기"
          type="button"
          width="128px"
          padding="19.25px 20px"
          shadow="rgb(249 217 189) 0px 8px 16px 0px"
          onClick={_onClick}
        />
      </FlexBox>
    </MainContainer>
  );
}

export default Complete;
