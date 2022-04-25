import React, { useState, memo, useEffect, useRef } from "react";
import axios from "../utils/axios";
import Post from "../utils/Post";
import ImageUploader from "../utils/imageuploader";
import { useNavigate } from "react-router-dom";

// components
import { Button, Input, ImageInput, PrivacyInput } from "../components";
import {
  StyledTitle,
  MainContainer,
  StyledBody,
  FlexBox,
  StyledLink,
  StyledSpan,
  StyledFiled,
} from "../components/StyledElements";
import Modal from "react-modal";

// formik
import * as Yup from "yup";
import { Formik, Form, ErrorMessage, useField } from "formik";
import Img from "../assets/register_img.png";

// view
import Tos from "../views/tos";

// 모달
Modal.setAppElement("#root");

// 이미지 클라우드
const imageUploader = new ImageUploader();

// 인증 타이머
const Timer = memo(({ timesUp, phoneAuthed, resendCode }) => {
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
    if (phoneAuthed) {
      clearInterval(countdown);
    } else if (resendCode) {
      clearInterval(countdown);
      setMinutes(3);
      setSeconds(0);
    }
    return () => {
      // timesUp();
      clearInterval(countdown);
    };
  }, [minutes, seconds, resendCode]);

  return (
    <FlexBox position="absolute" right="70px" top="16px" width="unset">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </FlexBox>
  );
});

const Register = (props) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    addr: "",
    zip_code: "",
    busi_num_img: "",
    auth_phone: "",
  });

  const [errorAddr, setErrorAddr] = useState(false);

  const [agreement, setAgreement] = useState(false);
  const [isPopup, setIsPopup] = useState(false);

  const [privacyModal, setPrivacyModal] = useState(false);

  // 핸드폰 인증번호 완료
  const [phoneAuthed, setPhoneAuthed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resendCode, setResendCode] = useState(false);

  // 핸드폰번호 체크

  const mobileRegex = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  const busiNumRegex = /^[0-9\b -]{0,10}$/;

  // 핸드폰 번호체크
  const getPhoneAuth = async (number, error) => {
    if (!error) {
      try {
        const response = await axios.post("/api/phone/auth", {
          phone_num: number,
        });
        openModal();
        setResendCode(false);
        return response;
      } catch (error) {
        console.log(error.response);
        if (error?.response?.status === 409) {
          alert("이미 등록된 핸드폰번호입니다.");
        }
        return error;
      }
    } else {
      return;
    }
  };

  // 핸드폰 인증번호확인
  const checkPhoneAuth = async () => {
    const { phone, auth_phone } = state;

    try {
      const response = await axios.get(
        `/api/phone/auth?phone_num=${phone}&auth_num=${auth_phone}`
      );
      setResendCode(false);
      setPhoneAuthed(true);
      closeModal();
      return response;
    } catch (error) {
      alert("인증번호가 다릅니다. 확인 후 다시 시도해주세요.");
      return error;
    }
  };

  // 핸드폰 인증취소
  const cancelPhone = () => {
    setState((prev) => ({ ...prev, auth_phone: "" }));
    closeModal();
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

  //인증번호 재전송
  const mobileAuthResend = () => {
    setResendCode(true);
    getPhoneAuth();
  };

  // 모달 actions
  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const openTosModal = () => {
    setPrivacyModal(true);
  };
  const closeTosModal = () => {
    setPrivacyModal(false);
  };

  // 인증완료
  const mobileDone = () => {};

  // modal style
  const modalStyle = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "50%",
      transform: "translate(-50%,-50%)",
      backgroundColor: "#fff",
      zIndex: "999",
      width: "342px",
      height: "300px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    overlay: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: "999",
    },
  };
  const tosModalStyle = {
    content: {
      position: "absolute",
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "50%",
      transform: "translate(-50%,-50%)",
      backgroundColor: "#fff",
      zIndex: "999",
      width: "800px",
      height: "640px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
    },
    overlay: {
      position: "fixed",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "rgba(0,0,0,0.6)",
      zIndex: "999",
    },
  };

  // timer done
  const timesUp = () => {
    alert("인증번호가 만료되었습니다.");
    return closeModal();
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
    } else if (!checkEmail(state.email)) {
      alert("옳바른 이메일을 등록해주세요.");
    } else {
      register();
    }
  };

  // 회원가입 등록
  const register = async (data) => {
    if (!agreement) {
      alert("개인정보 이용약관에 동의해주세요");
    } else if (state.zip_code === "") {
      alert("주소를 입력해주세요");
      setErrorAddr(true);
    } else {
      const {
        username,
        password,
        confirm_password,
        email,
        phone,
        name,
        detail_addr,
        busi_num,
      } = data;
      const { zip_code, addr, busi_num_img } = state;
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
        console.log(
          error.response,
          username,
          password,
          confirm_password,
          email,
          phone,
          name,
          detail_addr,
          busi_num,
          zip_code,
          addr,
          busi_num_img
        );
        return false;
      }
    }
  };

  // 이미지업로드
  const onFileChange = async (e) => {
    const maxSize = 10 * 1024 * 1024;
    const imgSize = e.target.files[0].size;

    if (imgSize > maxSize) {
      alert("이미지 용량은 10MB 이내로 등록가능합니다.");
    } else {
      const uploaded = await imageUploader.upload(e.target.files[0]);
      setState((prev) => ({
        ...prev,
        busi_num_img: uploaded,
      }));
      alert("사업자등록증이 등록되었습니다.");
    }
  };

  return (
    <MainContainer background="#F9FAFB">
      <Modal
        isOpen={isPopup}
        contentLabel="phone check"
        onRequestClose={popupOn}
        className="postContainer"
      >
        <Post popupOn={popupOn} setAddress={setState}></Post>
      </Modal>
      <Modal
        isOpen={privacyModal}
        contentLabel="phone check"
        onRequestClose={closeTosModal}
        style={tosModalStyle}
      >
        <Tos />
      </Modal>
      <Modal
        isOpen={showModal}
        contentLabel="phone check"
        onRequestClose={closeModal}
        style={modalStyle}
      >
        <FlexBox direction="column">
          <FlexBox position="relative" width="342px" align="center">
            <Input
              type="text"
              id="auth_phone"
              placeholder="인증번호"
              value={state.auth_phone}
              onChange={handleChangeAuthPhone}
              margin="0 20px 10px 0"
              width="240px"
            />
            <Timer
              timesUp={timesUp}
              phoneAuthed={phoneAuthed}
              resendCode={resendCode}
            />
            <Button
              color="tomato"
              background="unset"
              type="button"
              width="unset"
              title="재전송"
              padding="unset"
              font="14px"
              textAlign="right"
              onClick={mobileAuthResend}
              margin="0 0 10px 0"
            />
          </FlexBox>
          <FlexBox direction="column">
            <StyledSpan font="12px" color="#838383" margin="0 0 10px 0">
              * 3분 이내로 인증번호(5자리를) 입력해 주세요.
            </StyledSpan>
            <StyledSpan font="12px" color="#838383">
              *인증번호가 전송되지 않을경우 "재전송" 버튼을 눌러주세요.
            </StyledSpan>
          </FlexBox>
        </FlexBox>
        <FlexBox direction="column">
          <Button
            type="button"
            title="확인"
            width="300px"
            onClick={checkPhoneAuth}
            margin="0 0 12px 0"
          />
          <Button
            type="button"
            title="취소"
            width="300px"
            onClick={cancelPhone}
            margin="0"
            background="unset"
            border="1px solid #FF8400"
            color="#FF8400"
          />
        </FlexBox>
      </Modal>
      <FlexBox position="absolute" top="56px" right="40px">
        <StyledBody>
          이미 가입하셨나요? <StyledLink to="/">로그인</StyledLink>
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
          Welcome to 좋구내
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
        >
          <FlexBox direction="column" width="100%">
            <StyledTitle>Register your account</StyledTitle>
            <StyledBody color="#637381" margin="16px 0 0 0">
              Enter your details below.
            </StyledBody>
          </FlexBox>

          <Formik
            initialValues={{
              username: "",
              password: "",
              confirm_password: "",
              email: "",
              phone: "",
              name: "",
              addr: "",
              zip_code: "",
              detail_addr: "",
              busi_num: "",
              busi_num_img: "",
            }}
            validationSchema={Yup.object({
              username: Yup.string().required("아이디를 입력해주세요."),
              password: Yup.string().required("비밀번호를 입력해주세요."),
              confirm_password:
                Yup.string().required("비밀번호를 입력해주세요."),
              email: Yup.string()
                .email("이메일형식이 잘못되었습니다.")
                .required("이메일을 입력해주세요."),
              phone: Yup.string()
                .matches(mobileRegex, "옳바른 핸드폰번호를 입력해주세요")
                .required("핸드폰번호를 입력해주세요."),
              name: Yup.string().required("업체명을 입력해주세요."),
              busi_num: Yup.string()
                .min(10, "옳바른 사업자번호를 입력해주세요")
                .matches(busiNumRegex, "옳바른 사업자번호를 입력해주세요")
                .required("사업자번호를 입력해주세요."),
            })}
            onSubmit={(values, { setSubmitting, setValues }) => {
              register(values);
              setSubmitting(false);

              // setTimeout(() => {
              //   alert(JSON.stringify(values, null, 2));
              //   setSubmitting(false);
              // }, 400);
            }}
          >
            {(formik) => (
              <form
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  marginTop: "50px",
                }}
                onSubmit={formik.handleSubmit}
              >
                <FlexBox width="100%">
                  <FlexBox direction="column" width="50%" margin="-24px 0 0">
                    <FirstLists
                      touched={formik.touched}
                      errors={formik.errors}
                      phoneAuthed={phoneAuthed}
                      mobileDone={mobileDone}
                      getPhoneAuth={getPhoneAuth}
                      field={formik}
                    />
                  </FlexBox>
                  <FlexBox direction="column" width="50%" margin="-24px 0 0">
                    <SecondLists
                      touched={formik.touched}
                      errors={formik.errors}
                      field={formik}
                      popupOn={popupOn}
                      state={state}
                      onFileChange={onFileChange}
                      setValues={formik.setValues}
                      errorAddr={errorAddr}
                    />
                  </FlexBox>
                </FlexBox>
                <FlexBox width="100%" just="flex-end">
                  <FlexBox
                    width="50%"
                    maxW="480px"
                    margin="20px 0 20px 0"
                    just="flex-end"
                  ></FlexBox>
                  <FlexBox direction="column" width="50%">
                    <FlexBox
                      width="100%"
                      maxW="480px"
                      margin="20px 0 20px 0"
                      just="flex-end"
                    >
                      <PrivacyInput
                        type="checkbox"
                        id="term"
                        checked={agreement}
                        onChange={agreeTerms}
                        htmlFor="term"
                        onClick={openTosModal}
                      />
                    </FlexBox>
                  </FlexBox>
                </FlexBox>
                <button
                  type="submit"
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
                    cursor: "pointer",
                  }}
                >
                  회원가입
                </button>
              </form>
            )}
          </Formik>
        </FlexBox>
      </FlexBox>
    </MainContainer>
  );
};

export default Register;

const FirstLists = ({
  touched,
  errors,
  phoneAuthed,
  mobileDone,
  getPhoneAuth,
  field,
}) => {
  const errorStyle = {
    color: "#FF4842",
    fontSize: "12px",
    marginTop: "6px",
    textAlign: "right",
    width: "484px",
  };

  return (
    <>
      <StyledFiled
        type="username"
        placeholder="아이디"
        error={touched.username && errors.username}
        margin="24px 0 0"
        {...field.getFieldProps("username")}
      />
      {touched.username && errors.username ? (
        <div style={errorStyle}>{errors.username}</div>
      ) : null}
      <StyledFiled
        type="password"
        placeholder="비밀번호"
        error={touched.password && errors.password}
        margin="24px 0 0"
        {...field.getFieldProps("password")}
      />
      {touched.password && errors.password ? (
        <div style={errorStyle}>{errors.password}</div>
      ) : null}
      <StyledFiled
        type="password"
        placeholder="비밀번호 확인"
        error={touched.confirm_password && errors.confirm_password}
        margin="24px 0 0"
        {...field.getFieldProps("confirm_password")}
      />
      {touched.confirm_password && errors.confirm_password ? (
        <div style={errorStyle}>{errors.confirm_password}</div>
      ) : null}
      <StyledFiled
        type="email"
        placeholder="이메일"
        error={touched.email && errors.email}
        margin="24px 0 0"
        {...field.getFieldProps("email")}
      />
      {touched.email && errors.email ? (
        <div style={errorStyle}>{errors.email}</div>
      ) : null}
      <FlexBox position="relative" direction="column">
        <StyledFiled
          type="phone"
          placeholder="핸드폰번호"
          error={touched.phone && errors.phone}
          margin="24px 0 0"
          {...field.getFieldProps("phone")}
        />
        {touched.phone && errors.phone ? (
          <div style={errorStyle}>{errors.phone}</div>
        ) : null}
        <Button
          color={phoneAuthed ? "tomato" : "#3b86ff"}
          position="absolute"
          right="80px"
          top="49px"
          background="unset"
          type="button"
          width="unset"
          title={phoneAuthed ? "인증완료" : "인증하기"}
          padding="unset"
          font="14px"
          onClick={
            phoneAuthed
              ? mobileDone
              : () => getPhoneAuth(field.values.phone, errors.phone)
          }
        />
      </FlexBox>
    </>
  );
};

const SecondLists = ({
  touched,
  errors,
  field,
  popupOn,
  state,
  onFileChange,
  setValues,
  errorAddr,
}) => {
  const errorStyle = {
    color: "#FF4842",
    fontSize: "12px",
    marginTop: "6px",
    textAlign: "right",
    width: "484px",
  };

  return (
    <>
      <StyledFiled
        type="text"
        placeholder="업체명"
        error={touched.name && errors.name}
        margin="24px 0 0"
        {...field.getFieldProps("name")}
      />
      {touched.name && errors.name ? (
        <div style={errorStyle}>{errors.name}</div>
      ) : null}
      <FlexBox position="relative" direction="column">
        <StyledFiled
          type="zip_code"
          placeholder="우편번호"
          error={errorAddr && !state.zip_code}
          margin="24px 0 0"
          {...field.getFieldProps("zip_code")}
          disabled
          value={state.zip_code}
        />

        {errorAddr && !state.zip_code ? (
          <div style={errorStyle}>{errors.zip_code}</div>
        ) : null}
        <Button
          color="#3b86ff"
          position="absolute"
          right="80px"
          top="49px"
          background="unset"
          type="button"
          width="unset"
          title="주소검색"
          padding="unset"
          font="14px"
          onClick={popupOn}
        />
      </FlexBox>

      <StyledFiled
        type="text"
        placeholder="업체주소"
        error={errorAddr && !state.addr}
        margin="24px 0 0"
        {...field.getFieldProps("addr")}
        disabled
        value={state.addr}
      />
      {errorAddr && !state.addr ? (
        <div style={errorStyle}>{errors.addr}</div>
      ) : null}
      <StyledFiled
        type="text"
        name="detail_addr"
        placeholder="상세주소"
        error={touched.detail_addr && errors.detail_addr}
        margin="24px 0 0"
        {...field.getFieldProps("detail_addr")}
      />
      {touched.detail_addr && errors.detail_addr ? (
        <div style={errorStyle}>{errors.detail_addr}</div>
      ) : null}
      <FlexBox position="relative" direction="column">
        <StyledFiled
          type="text"
          placeholder="사업자번호"
          error={touched.busi_num && errors.busi_num}
          margin="24px 0 0"
          {...field.getFieldProps("busi_num")}
        />

        <ImageInput
          onChange={onFileChange}
          id="contained-button-file"
          accept="image/*"
        />

        <FlexBox width="480px">
          <StyledSpan
            font="12px"
            color="#838383"
            align="flex-end"
            style={{ width: "50%", marginTop: "6px" }}
          >
            *이미지등록시, 사업자등록증을 등록해야합니다.
          </StyledSpan>
          {touched.busi_num && errors.busi_num ? (
            <div
              style={{
                color: "#FF4842",
                fontSize: "12px",
                marginTop: "6px",
                textAlign: "right",
                width: "50%",
              }}
            >
              {errors.busi_num}
            </div>
          ) : null}
        </FlexBox>
      </FlexBox>
    </>
  );
};
