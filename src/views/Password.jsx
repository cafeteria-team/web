import React, { useState, memo, useEffect } from "react";
import {
  FlexBox,
  StyledBody,
  StyledSpan,
  StyledTitle,
} from "../components/StyledElements";
import Modal from "react-modal";
import { Button, Input } from "../components";
import axios from "../utils/axios";

const Password = (props) => {
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

    if (phone && phone.length === 11) {
      try {
        const response = await axios.post("/api/phone/auth", {
          phone_num: phone,
        });
        openModal();
        setResendCode(false);
        return response;
      } catch (error) {
        if (error?.response?.status === 409) {
          alert("이미 등록된 핸드폰번호입니다.");
        }
        return error;
      }
    } else {
      alert("옳바른 핸드폰 번호를 입력해주세요");
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
  return (
    <FlexBox width="100%" direction="column" padding="30px 70px">
      <FlexBox
        just="center"
        direction="column"
        align="center"
        margin="0 0 32px 0"
      >
        <StyledTitle margin="80px 0 20px 0">비밀번호 재설정</StyledTitle>
        <StyledBody>
          안전한 사용을 위하여, 본인인증을 완료후 비밀번호 변경이 가능합니다.
        </StyledBody>
      </FlexBox>
      <FlexBox
        background="#fff"
        direction="column"
        align="center"
        padding="20px"
      >
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
      </FlexBox>
    </FlexBox>
  );
};

export default Password;
