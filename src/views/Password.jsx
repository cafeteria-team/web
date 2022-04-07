import React, { useState } from "react";
import { FlexBox, StyledBody, StyledTitle } from "../components/StyledElements";
import { Button, Input, PasswordModal, NewPassword } from "../components";
import axios from "../utils/axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Password = (props) => {
  const navigate = useNavigate();
  const [state, setState] = useState({
    phone: "",
  });

  // 핸드폰 인증번호 완료
  const [phoneAuthed, setPhoneAuthed] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [resendCode, setResendCode] = useState(false);

  // timer done
  const timesUp = () => {
    alert("인증번호가 만료되었습니다.");
    return closeModal();
  };

  // 핸드폰 번호체크
  const getPhoneAuth = async () => {
    const { phone } = state;
    openModal();
    if (phone && phone.length === 11) {
      try {
        const response = await axios.post("/api/phone/auth/password", {
          phone_num: phone,
        });
        openModal();
        setResendCode(false);
        return response;
      } catch (error) {
        console.log(error.response);
        return error;
      }
    } else {
      alert("옳바른 핸드폰 번호를 입력해주세요");
    }
  };

  // 핸드폰 인증번호확인
  const checkPhoneAuth = async (auth) => {
    const { phone } = state;

    try {
      const response = await axios.get(
        `/api/phone/auth?phone_num=${phone}&auth_num=${auth}&purpose=PASSWORD`
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
    closeModal();
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

  // 인증완료
  const mobileDone = () => {};

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

  //  비밀번호 재설정 취소
  const cancelPassword = () => {
    setPhoneAuthed(false);
  };

  //   비밀번호 재설정
  const changePassword = async (password) => {
    // const { phone } = state;

    let access = localStorage.getItem("access");

    let token = access;
    let decoded = jwt_decode(token);

    try {
      const response = await axios.patch(
        `/api/user/${decoded.user_id}/password`,
        {
          password,
        }
      );
      setResendCode(false);
      setPhoneAuthed(true);
      closeModal();
      alert("비밀번호 변경이 완료되었습니다.");
      navigate("/main/overview");
      return response;
    } catch (error) {
      console.log(error.response);
      return error;
    }
  };

  return (
    <FlexBox width="100%" direction="column" padding="30px 70px">
      {phoneAuthed ? (
        <NewPassword
          cancelPassword={cancelPassword}
          changePassword={changePassword}
        />
      ) : (
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
            <StyledBody>
              안전한 사용을 위하여, 본인인증을 완료후 비밀번호 변경이
              가능합니다.
            </StyledBody>
          </FlexBox>
          <FlexBox position="relative">
            <Input
              type="text"
              id="phone"
              placeholder="핸드폰번호"
              value={state.phone}
              onChange={handleChangePhone}
              disabled={phoneAuthed ? true : false}
            />
            <Button
              color={phoneAuthed ? "tomato" : "#3b86ff"}
              position="absolute"
              right="10px"
              top="13.5px"
              background="unset"
              type="button"
              width="unset"
              title={phoneAuthed ? "인증완료" : "인증하기"}
              padding="unset"
              font="14px"
              onClick={phoneAuthed ? mobileDone : getPhoneAuth}
            />
          </FlexBox>
          <PasswordModal
            showModal={showModal}
            checkPhoneAuth={checkPhoneAuth}
            phoneAuthed={phoneAuthed}
            resendCode={resendCode}
            mobileAuthResend={mobileAuthResend}
            cancelPhone={cancelPhone}
            timesUp={timesUp}
          />
        </FlexBox>
      )}
    </FlexBox>
  );
};

export default Password;
