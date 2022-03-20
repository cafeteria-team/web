import React, { useEffect, useState } from "react";
import { Button, Input } from "../components";
import { Form, FlexBox } from "../components/StyledElements";
import { useNavigate } from "react-router-dom";

const InputData = [
  {
    body: (selectedUser) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="80px">
          아이디
        </FlexBox>
        <Input
          disabled
          type="text"
          id="username"
          margin="0"
          value={selectedUser?.username}
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange, state) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="80px">
          이메일
        </FlexBox>
        <Input
          type="email"
          id="email"
          margin="0"
          value={state.email}
          onChange={(e) => handleChange(e)}
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange, state) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="80px">
          가게명
        </FlexBox>
        <Input
          type="text"
          id="name"
          margin="0"
          value={state.name}
          onChange={(e) => handleChange(e)}
        />
      </>
    ),
  },
  {
    body: (selectedUser, handleChange, state) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="80px">
          사업자번호
        </FlexBox>
        <Input
          type="text"
          id="busi_num"
          margin="0"
          value={state.busi_num}
          onChange={(e) => handleChange(e)}
        />
      </>
    ),
  },
];

const MemberEdit = ({ selectedUser, id, editUser }) => {
  const navigate = useNavigate();

  console.log(selectedUser, id);

  const [state, setState] = useState({
    email: "",
    name: "",
    busi_num: "",
  });

  useEffect(() => {
    setState({
      email: selectedUser?.email,
      name: selectedUser?.store.name,
      busi_num: selectedUser?.store.busi_num,
    });
  }, [selectedUser]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const goBacktoList = () => {
    navigate("/main/member", { replace: true });
  };

  const submit = (e) => {
    editUser(id, state);
  };

  return (
    <>
      <Form method="POST" direction="column">
        <FlexBox wrap="wrap" width="100%">
          {InputData.map((item, index) => (
            <FlexBox align="center" width="40%" margin="20px 30px" key={index}>
              {item.body(selectedUser, handleChange, state)}
            </FlexBox>
          ))}
        </FlexBox>
        <FlexBox>
          <Button
            type="button"
            title="수정"
            width="150px"
            margin="30px 20px 0 0"
            background="#06c"
            onClick={submit}
          />
          <Button
            type="button"
            title="목록"
            width="150px"
            margin="30px 0 0 0"
            background="#33a66c"
            onClick={goBacktoList}
          />
        </FlexBox>
      </Form>
    </>
  );
};

export default MemberEdit;
