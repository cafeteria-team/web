import React, { useState } from "react";
import { Button, Input } from "../components";
import {
  StyledTitle,
  MainContainer,
  StyledBody,
  Form,
  FlexBox,
  StyledLink,
} from "../components/StyledElements";
import { useNavigate } from "react-router-dom";
import { inject, observer } from "mobx-react";

const Login = inject("authStore")(
  observer(({ authStore }) => {
    const navigate = useNavigate();

    const _login = async () => {
      const response = await authStore.login(state);
      response ? isSucceeded() : alert("아이디 또는 비밀번호를 확인해주세요.");
    };

    const isSucceeded = () => {
      authStore.isAuthenticated(true);
      return navigate("/main");
    };

    // state
    const [state, setState] = useState({
      username: "",
      password: "",
    });

    const handleChange = (e) => {
      const { id, value } = e.target;
      setState((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    };

    return (
      <MainContainer background="unset">
        <FlexBox
          bgImage="url('/img/mainbg.jpg')"
          width="100%"
          height="100%"
          flex="1 1 50%"
        />
        <FlexBox
          width="600px"
          height="600px"
          background="#fff"
          align="center"
          just="center"
          flex="1 1 50%"
          direction="column"
        >
          <StyledTitle align="center" margin="0 0 40px 0">
            Login
          </StyledTitle>
          <Form method="POST" direction="column">
            <Input
              type="email"
              id="username"
              placeholder="아이디"
              value={state.username}
              onChange={handleChange}
            />

            <Input
              type="password"
              id="password"
              value={state.password}
              onChange={handleChange}
              placeholder="비밀번호"
            />

            <Button
              type="button"
              onClick={_login}
              title="로그인"
              width="300px"
            />
          </Form>
          <FlexBox direction="column" align="center">
            <FlexBox margin="0 0 20px 0">
              <StyledBody>
                계정을 잊으셨나요?{" "}
                <StyledLink to="/register">ID찾기</StyledLink>
                또는 <StyledLink to="/register">비밀번호찾기</StyledLink>
              </StyledBody>
            </FlexBox>
            <FlexBox>
              <StyledBody>
                아직 회원이 아니신가요?{" "}
                <StyledLink to="/register">회원가입.</StyledLink>
              </StyledBody>
            </FlexBox>
          </FlexBox>
        </FlexBox>
      </MainContainer>
    );
  })
);

export default Login;
