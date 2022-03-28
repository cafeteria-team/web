import React, { useState, memo, useEffect } from "react";
import { FlexBox, StyledSpan } from "./StyledElements";
import { Button, Input } from ".";

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

const PasswordModal = ({
  showModal,
  checkPhoneAuth,
  phoneAuthed,
  resendCode,
  mobileAuthResend,
  cancelPhone,
  timesUp,
}) => {
  const [state, setState] = useState({
    auth_phone: "",
  });

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

  // 인증취소
  const _canclePhone = () => {
    setState((prev) => ({ ...prev, auth_phone: "" }));
    cancelPhone();
  };

  return (
    <>
      {" "}
      {showModal ? (
        <>
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
            <FlexBox direction="column" margin="0 0 32px 0">
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
              onClick={() => {
                checkPhoneAuth(state.auth_phone);
              }}
              margin="0 0 12px 0"
            />
            <Button
              type="button"
              title="취소"
              width="300px"
              onClick={_canclePhone}
              margin="0"
              background="unset"
              border="1px solid #FF8400"
              color="#FF8400"
            />
          </FlexBox>
        </>
      ) : null}
    </>
  );
};

export default PasswordModal;
