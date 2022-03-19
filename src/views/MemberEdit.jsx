import React, { useEffect } from "react";
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

const MemberEdit = ({ selectedUser }) => {
  const navigate = useNavigate();

  const backToMember = () => {
    console.log(navigate);
    // navigate("/main/member/", { replace: true });
  };

  useEffect(() => {}, [selectedUser]);

  console.log(selectedUser);
  return (
    <>
      {selectedUser ? (
        <Form method="POST" direction="column">
          <Input
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
      )}
    </>
  );
};

export default MemberEdit;
