import React, { useState, useEffect, memo } from "react";

//components
import { Button, Input } from "../../components";
import {
  StyledTitle,
  MainContainer,
  StyledBody,
  // Form,
  FlexBox,
  StyledLink,
  StyledFiled,
} from "../../components/StyledElements";

//router & serivce
import { useNavigate } from "react-router-dom";
import { observer } from "mobx-react";
import { useStores } from "../../stores/Context";

// formik
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import Img from "../../assets/login_img.png";

const Background = memo(() => {
  return (
    <FlexBox
      bgImage="url('/img/mainbg.jpg')"
      width="100%"
      height="100%"
      flex="1 1 50%"
    />
  );
});

const LoginForm = ({ handleChange, username, password, _onClick }) => {
  return (
    <Form method="POST" direction="column">
      <Input
        type="email"
        id="username"
        placeholder="아이디"
        value={username}
        onChange={handleChange}
      />

      <Input
        type="password"
        id="password"
        value={password}
        onChange={handleChange}
        placeholder="비밀번호"
      />

      <Button type="button" onClick={_onClick} title="로그인" width="300px" />
    </Form>
  );
};

const RegisterWrap = memo(() => {
  return (
    <FlexBox direction="column" align="center">
      <FlexBox margin="0 0 20px 0">
        <StyledBody>
          계정을 잊으셨나요? <StyledLink to="/register">ID찾기</StyledLink>
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
  );
});

const Login = () => {
  const { AuthStore } = useStores();

  const navigate = useNavigate();

  useEffect(() => {
    // auth && navigate("/main/overview");
  });

  const _login = async () => {
    const response = await AuthStore.login(state);

    if (response) {
      let { data } = response;
      AuthStore.onLoginSucess(data.access, data.refresh, state.username);
      return navigate("/main/overview");
    } else {
      return;
    }
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

  const InputStyle = {
    width: "300px",
    padding: "19.25px 20px",
    border: "1px solid rgba(145, 158, 171, 0.32)",
    borderRadius: "8px",
    transition: "border 0.3s ease-in-out",
    ":focus": {
      border: "px solid rgba(145, 158, 171, 0.32)",
    },
    ":hover": {
      background: "red",
    },
    "::placeholder": {
      color: "#212B36",
      fontSize: "300px",
    },
  };

  return (
    // <MainContainer background="unset">
    //   <Background />
    //   <FlexBox
    //     width="600px"
    //     height="600px"
    //     background="#fff"
    //     align="center"
    //     just="center"
    //     flex="1 1 50%"
    //     direction="column"
    //   >
    //     <StyledTitle align="center" margin="0 0 40px 0">
    //       Login
    //     </StyledTitle>
    //     <LoginForm
    //       handleChange={handleChange}
    //       username={state.username}
    //       password={state.password}
    //       _onClick={_login}
    //     />
    //     <RegisterWrap />
    //   </FlexBox>
    // </MainContainer>
    <MainContainer background="#F9FAFB">
      {/* <h1>Any place in your app!</h1> */}
      <FlexBox position="absolute" top="56px" right="40px">
        <StyledBody>
          아직 회원이 아니신가요?{" "}
          <StyledLink to="/register">회원가입.</StyledLink>
        </StyledBody>
      </FlexBox>
      <FlexBox
        maxW="464px"
        width="100%"
        background="#fff"
        height="calc(100% - 32px)"
        margin="16px"
        rad="8px"
        direction="column"
        just="center"
        shadow="0px 3px 1px -2px rgb(145 158 171 / 20%), 0px 2px 2px 0px rgb(145 158 171 / 14%), 0px 1px 5px 0px rgb(145 158 171 / 12%)"
      >
        <StyledTitle margin="70px 0 30px 50px" font="30px">
          Hi, Welcome Back
        </StyledTitle>
        <img
          src={Img}
          alt="login_img"
          style={{ width: "100%", height: "fit-content" }}
        />
      </FlexBox>
      <FlexBox direction="column" width="100%" align="center">
        <FlexBox
          direction="column"
          width="100%"
          align="center"
          padding="0 60px"
          boxSizing="border-box"
          maxW="600px"
        >
          <FlexBox direction="column" width="100%">
            <StyledTitle>Sign in to 좋구내</StyledTitle>
            <StyledBody color="#637381" margin="16px 0 0 0">
              Enter your details below.
            </StyledBody>
          </FlexBox>

          <Formik
            initialValues={{ username: "", password: "" }}
            validate={(values) => {
              const errors = {};
              if (!values.username) {
                errors.username = "아이디를 입력해주세요.";
              }
              if (!values.password) {
                errors.password = "비밀번호를 입력해주세요.";
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting, touched, errors }) => (
              <Form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "50px",
                }}
              >
                <StyledFiled
                  type="username"
                  name="username"
                  placeholder="아이디"
                  error={touched.username && errors.username}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  style={{
                    color: "#FF4842",
                    fontSize: "12px",
                    marginTop: "6px",
                    textAlign: "right",
                    width: "100%",
                  }}
                />
                <StyledFiled
                  type="password"
                  name="password"
                  placeholder="비밀번호"
                  style={{ marginTop: "24px" }}
                  error={touched.password && errors.password}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  style={{
                    color: "#FF4842",
                    fontSize: "12px",
                    marginTop: "6px",
                    textAlign: "right",
                    width: "100%",
                  }}
                />
                <FlexBox
                  width="100%"
                  maxW="480px"
                  margin="20px 0 20px 0"
                  just="flex-end"
                >
                  <StyledBody>
                    계정을 잊으셨나요?{" "}
                    <StyledLink to="/register">ID찾기</StyledLink>
                    또는 <StyledLink to="/register">비밀번호찾기</StyledLink>
                  </StyledBody>
                </FlexBox>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    width: "100%",
                    maxWidth: "480px",
                    padding: "19.25px 20px",
                    border: "unset",
                    borderRadius: "8px",
                    boxShadow: "rgb(249 217 189) 0px 8px 16px 0px",
                    background: "#ff9030",
                    color: "#fff",
                    fontSize: "1rem",
                  }}
                >
                  로그인
                </button>
              </Form>
            )}
          </Formik>
        </FlexBox>
      </FlexBox>
    </MainContainer>
  );
};
export default Login;
