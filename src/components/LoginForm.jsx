import React, { useState, useEffect } from "react";
import { Button, Input } from "../components";
import { Form } from "../components/StyledElements";

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

export default LoginForm;
