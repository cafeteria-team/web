import React, { useEffect, useState } from "react";
import { Button, Input, LoginFrom } from "../components";
import {
  StyledTitle,
  MainContainer,
  StyledBody,
  Form,
  FlexBox,
  StyledLink,
} from "../components/StyledElements";
import { useNavigate } from "react-router-dom";

const InputData = [
  {
    body: (selectedUser, onClicked, index) => (
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
    body: (selectedUser, onClicked, handleChange, state, index) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="80px">
          이메일
        </FlexBox>
        <Input
          type="email"
          id="email"
          margin="0"
          value={onClicked === index ? state.email : selectedUser?.email}
          onChange={(e) => handleChange(e, index)}
        />
      </>
    ),
  },
  {
    body: (selectedUser, onClicked, handleChange, state, index) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="80px">
          가게명
        </FlexBox>
        <Input
          type="text"
          id={state.store}
          margin="0"
          value={
            onClicked === index ? state.store.name : selectedUser?.store.name
          }
          onChange={handleChange}
        />
      </>
    ),
  },
  {
    body: (selectedUser, onClicked, handleChange, state, index) => (
      <>
        <FlexBox margin="0 10px 0 0" minW="80px">
          사업자번호
        </FlexBox>
        <Input
          type="text"
          id="password"
          margin="0"
          value={
            onClicked === index
              ? state.store.busi_num
              : selectedUser?.store.busi_num
          }
          onChange={handleChange}
        />
      </>
    ),
  },
];

const MemberEdit = ({ selectedUser }) => {
  const navigate = useNavigate();

  const [state, setState] = useState({
    email: "",
    store: {
      name: "",
      busi_num: "",
    },
  });

  console.log(state.store);

  const [onClicked, setOnClicked] = useState(false);

  useEffect(() => {}, [selectedUser]);

  // const _onClick = () => {
  //   setOnClicked(true);
  // };

  const handleChange = (e, index) => {
    console.log(e.target);
    setOnClicked(index);
    const { id, value } = e.target;
    console.log(id);
    setState((prev) => ({
      ...prev,
      [id]: value,
    }));
  };
  return (
    <>
      <Form method="POST" direction="column">
        <FlexBox wrap="wrap" width="100%">
          {/* <FlexBox align="center" width="40%" margin="20px 30px">
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
          </FlexBox>
          <FlexBox align="center" width="40%" margin="20px 30px">
            <FlexBox margin="0 10px 0 0" minW="80px">
              이메일
            </FlexBox>
            <Input
              type="email"
              id="email"
              margin="0"
              value={onClicked ? state.email : selectedUser?.email}
              onChange={handleChange}
            />
          </FlexBox>
          <FlexBox align="center" width="40%" margin="20px 30px">
            <FlexBox margin="0 10px 0 0" minW="80px">
              가게명
            </FlexBox>
            <Input
              type="text"
              id="storeName"
              margin="0"
              value={onClicked ? state.store.name : selectedUser?.store.name}
              onChange={handleChange}
            />
          </FlexBox>
          <FlexBox align="center" width="40%" margin="20px 30px">
            <FlexBox margin="0 10px 0 0" minW="80px">
              사업자번호
            </FlexBox>
            <Input
              type="text"
              id="password"
              margin="0"
              value={selectedUser?.store.busi_num}
              // onChange={handleChange}
            />
          </FlexBox> */}
          {InputData.map((item, index) => (
            <FlexBox align="center" width="40%" margin="20px 30px" key={index}>
              {item.body(selectedUser, onClicked, handleChange, state, index)}
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
          />
          <Button
            type="button"
            title="목록"
            width="150px"
            margin="30px 0 0 0"
            background="#33a66c"
          />
        </FlexBox>
      </Form>
      {/* {selectedUser ? (
        <Form method="POST" direction="column">
          <Input
            disabled
            type="text"
            id="username"
            value={selectedUser.username}
            // onChange={handleChange}
          />
          <Input
            type="email"
            id="password"
            value={selectedUser.email}
            // onChange={handleChange}
          />
          <Input
            type="text"
            id="password"
            value={selectedUser.store.name}
            // onChange={handleChange}
          />
          <Input
            type="text"
            id="password"
            value={selectedUser.store.busi_num}
            // onChange={handleChange}
          />

          <Button type="button" title="로그인" width="300px" />
        </Form>
      ) : (
        (() => {
          backToMember();
        })()
      )} */}
    </>
  );
};

export default MemberEdit;
