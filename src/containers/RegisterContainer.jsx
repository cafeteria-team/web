import React, { useState, useEffect } from "react";
import styles from "../styles/register.module.css";
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
  });

  const [agreement, setAgreement] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  const popupOn = () => {
    setIsPopup((prev) => !prev);
  };

  const agreeTerms = () => {
    setAgreement((prev) => {
      return !prev;
    });
  };

  useEffect(() => {
    // 모바일 하이픈넣기
    if (state.phone?.length === 10) {
      setState({
        phone: state.phone.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3"),
      });
    }
    if (state.phone?.length === 13) {
      setState({
        phone: state.phone
          .replace(/-/g, "")
          .replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3"),
      });
    }
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleChangeUserName = (e) => {
    const regex = /^[0-9\b -]{0,13}$/;
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
    } else {
      if (state.password === state.confirm_password) {
        register();
      } else {
        console.log("비밀번호가 일치하지않습니다.");
      }
    }
  };

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
      console.log(response);
      navigate("/complete");
      return response;
    } catch (error) {
      console.log(error, state);
      return false;
    }
  };

  const onFileChange = async (e) => {
    console.log(e);
    const uploaded = await imageUploader.upload(e.target.files[0]);
    setState((prev) => ({
      ...prev,
      busi_num_img: uploaded.url,
    }));
  };

  return (
    <MainContainer>
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
              placeholder="이름"
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
                onChange={handleChangeUserName}
              />
              <Button
                color="#3b86ff"
                position="absolute"
                right="10px"
                top="13.5px"
                background="unset"
                type="button"
                width="unset"
                title="인증하기"
                padding="unset"
                font="14px"
              />
            </FlexBox>

            {/* <input
            type="text"
            id="userName"
            placeholder="인증번호"
            value={state.userName}
            className={styles.input}
            onChange={handleChangeUserName}
          /> */}

            <FlexBox position="relative">
              <Input
                type="text"
                placeholder="사업자번호"
                value={state.busi_num}
                id="busi_num"
                className={styles.input}
                onChange={handleChange}
              />
              <ImageInput
                onChange={onFileChange}
                id="contained-button-file"
                accept="image/*"
              />
            </FlexBox>
            <StyledSpan font="12px" color="#838383" align="flex-end">
              *사업자 번호 또는 이미지로 등록가능합니다.
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
              className={styles.btn}
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
