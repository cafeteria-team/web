import React, { useState, memo, useEffect } from "react";
import axios from "../utils/axios";
import Post from "../utils/Post";
import ImageUploader from "../utils/imageuploader";
import { useNavigate } from "react-router-dom";

import { Button, Input, ImageInput, PrivacyInput } from "../components";
import {
  StyledTitle,
  MainContainer,
  StyledBody,
  Form,
  FlexBox,
  StyledLink,
  StyledSpan,
} from "../components/StyledElements";

const imageUploader = new ImageUploader();

const Timer = memo(({ timesUp, phoneChecked }) => {
  const [minutes, setMinutes] = useState(3);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countdown = setInterval(() => {
      if (parseInt(seconds) > 0) {
        setSeconds(parseInt(seconds) - 1);
      }
      if (parseInt(seconds) === 0) {
        if (parseInt(minutes) === 0) {
          timesUp();
          clearInterval(countdown);
        } else {
          setMinutes(parseInt(minutes) - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    if (phoneChecked) {
      clearInterval(countdown);
    }
    return () => {
      // timesUp();
      clearInterval(countdown);
    };
  }, [minutes, seconds]);

  return (
    <FlexBox position="absolute" right="10px" top="13.5px" width="unset">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </FlexBox>
  );
});

const Register = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    phone: "",
    role: "STORE",
    name: "",
    addr: "",
    zip_code: "",
    detail_addr: "",
    busi_num: "",
    busi_num_img: "",
    auth_phone: "",
  });

  const [agreement, setAgreement] = useState(false);
  const [clickedAuth, setClickedAuth] = useState(false);
  const [isPopup, setIsPopup] = useState("");

  // 핸드폰 인증번호 완료
  const [phoneChecked, setPhoneChecked] = useState(false);
  const [clickedPhone, setClickedPhone] = useState(false);
  const [phoneAuthed, setPhoneAuthed] = useState(false);

  // timer done
  const timesUp = () => {
    alert("인증번호가 만료되었습니다.");
    setState((prev) => ({ ...prev, auth_phone: "" }));
    setClickedPhone(false);
    return setClickedAuth(false);
  };

  const popupOn = () => {
    setIsPopup((prev) => !prev);
  };

  const agreeTerms = () => {
    setAgreement((prev) => {
      return !prev;
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  // 이메일 정규식

  const checkEmail = (email) => {
    const emailRegex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;

    return emailRegex.test(email);
  };

  // 핸드폰 정규식
  const handleChangePhone = (e) => {
    const regex = /^[0-9\b -]{0,11}$/;
    const { id, value } = e.target;
    if (regex.test(value)) {
      setState((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleChangeBusiness = (e) => {
    const regex = /^[0-9\b -]{0,10}$/;
    const { id, value } = e.target;
    if (regex.test(value)) {
      setState((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  //인증번호
  const handleChangeAuthPhone = (e) => {
    const regex = /^[0-9\b -]{0,5}$/;
    const { id, value } = e.target;
    if (regex.test(value)) {
      setState((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  };

  const handleSubmitClick = (e) => {
    e.preventDefault();

    if (!agreement) {
      alert("개인정보 이용약관에 동의해주세요");
    } else if (state.username === "") {
      alert("아이디를 입력해주세요");
    } else if (state.password === "") {
      alert("비밀번호를 입력해주세요");
    } else if (state.confirm_password === "") {
      alert("비밀번호확인을 입력해주세요");
    } else if (state.email === "") {
      alert("이메일을 입력해주세요");
    } else if (state.phone === "") {
      alert("핸드폰번호를 입력해주세요");
    } else if (state.name === "") {
      alert("가게명을 입력해주세요");
    } else if (state.addr === "") {
      alert("주소를 입력해주세요");
    } else if (state.zip_code === "") {
      alert("주소를 입력해주세요");
    } else if (state.busi_num === "") {
      alert("사업자번호를 입력해주세요");
    } else if (state.busi_num_img === "") {
      alert("사업자등록증을 등록해주세요");
    } else if (state.password !== state.confirm_password) {
      alert("비밀번호가 일치하지않습니다.");
    } else if (!phoneAuthed) {
      alert("핸드폰번호를 인증해주세요.");
    } else if (checkEmail(state.email)) {
      alert("옳바른 이메일을 등록해주세요.");
    } else {
      register();
    }
  };

  // 회원강비 등록
  const register = async () => {
    const {
      username,
      password,
      confirm_password,
      email,
      phone,
      name,
      addr,
      zip_code,
      detail_addr,
      busi_num,
      busi_num_img,
    } = state;
    try {
      const response = await axios.post("/api/user/register", {
        username,
        password,
        confirm_password,
        email,
        phone,
        role: "STORE",
        name,
        addr,
        zip_code,
        detail_addr,
        busi_num,
        busi_num_img,
      });
      navigate("/complete");
      return response;
    } catch (error) {
      console.log(error.response, state);
      return false;
    }
  };

  // 핸드폰 번호체크
  const getPhoneAuth = async () => {
    const { phone } = state;

    if (phone && phone.length === 11) {
      setClickedPhone(true);
      setClickedAuth(true);
      try {
        const response = await axios.post("/api/phone/auth", {
          phone_num: phone,
        });
        console.log(response);
        return response;
      } catch (error) {
        if (error?.response?.status === 409) {
          alert("이미 등록된 핸드폰번호입니다.");
          setClickedPhone(false);
          setClickedAuth(false);
        }
        return error;
      }
    } else {
      alert("옳바른 핸드폰 번호를 입력해주세요");
      setClickedPhone(false);
      setClickedAuth(false);
    }
  };

  // 핸드폰 인증번호확인
  const checkPhoneAuth = async () => {
    const { phone, auth_phone } = state;

    try {
      const response = await axios.get(
        `/api/phone/auth?phone_num=${phone}&auth_num=${auth_phone}`
      );
      console.log(response);
      setPhoneChecked(true);
      setPhoneAuthed(true);
      return response;
    } catch (error) {
      alert("인증번호가 다릅니다. 확인 후 다시 시도해주세요.");
      setClickedPhone(false);
      setClickedAuth(false);
      return error;
    }
  };

  // 이미지업로드
  const onFileChange = async (e) => {
    const uploaded = await imageUploader.upload(e.target.files[0]);
    setState((prev) => ({
      ...prev,
      busi_num_img: uploaded.url,
    }));
  };

  return (
    <MainContainer bgImage="url('/img/mainbg.jpg')">
      {isPopup && (
        <div className="postContainer">
          <Post setAddress={setState}></Post>
        </div>
      )}
      <FlexBox
        width="90%"
        height="90%"
        background="#fff"
        rad="8px"
        shadow="2px 4px 12px rgb(0 0 0 / 8%)"
        align="center"
        just="center"
        direction="column"
      >
        <StyledTitle align="center" margin="0 0 40px 0">
          회원가입
        </StyledTitle>
        <Form method="POST">
          <FlexBox direction="column" margin="0 20px 0 0">
            <Input
              type="text"
              id="username"
              placeholder="아이디"
              value={state.username}
              onChange={handleChange}
            />
            <Input
              type="email"
              id="email"
              placeholder="이메일"
              value={state.email}
              onChange={handleChange}
            />
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
            <Input
              type="text"
              id="name"
              placeholder="업체명"
              onChange={handleChange}
              value={state.name}
            />

            <FlexBox position="relative">
              <Input
                type="text"
                id="phone"
                placeholder="핸드폰번호"
                value={state.phone}
                onChange={handleChangePhone}
                disabled={clickedPhone ? true : false}
              />
              <Button
                color={clickedAuth ? "tomato" : "#3b86ff"}
                position="absolute"
                right="10px"
                top="13.5px"
                background="unset"
                type="button"
                width="unset"
                title={clickedAuth ? "인증확인" : "인증하기"}
                padding="unset"
                font="14px"
                onClick={clickedAuth ? checkPhoneAuth : getPhoneAuth}
              />
            </FlexBox>

            {clickedAuth && (
              <FlexBox position="relative">
                <Input
                  type="text"
                  id="auth_phone"
                  placeholder="인증번호"
                  value={state.auth_phone}
                  onChange={handleChangeAuthPhone}
                  disabled={phoneChecked ? true : false}
                />
                {<Timer timesUp={timesUp} phoneChecked={phoneChecked} />}
              </FlexBox>
            )}

            <FlexBox position="relative">
              <Input
                type="text"
                placeholder="사업자번호"
                value={state.busi_num}
                id="busi_num"
                onChange={handleChangeBusiness}
              />
              <ImageInput
                onChange={onFileChange}
                id="contained-button-file"
                accept="image/*"
              />
            </FlexBox>
            <StyledSpan font="12px" color="#838383" align="flex-end">
              *사업자 번호와 사업자등록증을 등록해야합니다.
            </StyledSpan>
          </FlexBox>

          <FlexBox direction="column" height="100%">
            <FlexBox position="relative">
              <Input
                type="text"
                id="zip_code"
                placeholder="우편번호"
                value={state.zip_code}
                onChange={handleChange}
                disabled="disabled"
              />
              <Button
                color="#3b86ff"
                position="absolute"
                right="10px"
                top="13.5px"
                background="unset"
                type="button"
                width="unset"
                title="주소검색"
                padding="unset"
                font="14px"
                onClick={popupOn}
              />
            </FlexBox>
            <Input
              type="text"
              id="addr"
              placeholder="업체주소"
              value={state.addr}
              onChange={handleChange}
              disabled="disabled"
            />

            <Input
              type="text"
              id="detail_addr"
              placeholder="상세주소"
              value={state.detail_addr}
              onChange={handleChange}
            />

            <FlexBox>
              <FlexBox width="342px" margin="0 0 40px 0">
                <PrivacyInput
                  type="checkbox"
                  id="term"
                  checked={agreement}
                  onChange={agreeTerms}
                  htmlFor="term"
                />
              </FlexBox>
            </FlexBox>

            <Button
              type="button"
              title="회원가입"
              width="300px"
              onClick={handleSubmitClick}
            />

            <FlexBox>
              <StyledBody margin="0 10px 0 0">이미 가입하셨나요?</StyledBody>
              <StyledLink exact={"true"} to="/">
                로그인
              </StyledLink>
            </FlexBox>
          </FlexBox>
        </Form>
      </FlexBox>
    </MainContainer>
  );
};

export default Register;
