import { Navigate, useRoutes } from "react-router-dom";
import { useEffect, useState } from "react";
import Decode from "./utils/decode";
import {
  RegisterContainer,
  LoginContainer,
  CompleteContainer,
  Main,
  Overview,
  Member,
  ManageAdmin,
  LogoContainer,
  ManageContainer,
} from "./containers";

import { NotFound, Password, MemberEdit } from "./views";

const Router = () => {
  const [role, setRole] = useState("");

  // useEffect(() => {
  //   const decode = new Decode();
  //   const access = localStorage.getItem("access");
  //   if (access) {
  //     const data = decode.getUserId(access);
  //     setRole(data.user_role);
  //   } else if (check.access) {
  //     const data = decode.getUserId(check.access);
  //     setRole(data.user_role);
  //   }
  // }, [check]);

  const admin = [
    { path: "/main", element: <Navigate to="/main/overview" /> },
    { path: "overview", element: <Overview /> },
    { path: "member", element: <Member /> },
    { path: "member/:name", element: <MemberEdit /> },
    { path: "manage", element: <ManageContainer /> },
    { path: "manageAdmin", element: <ManageAdmin /> },
    { path: "password", element: <Password /> },
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
  ];

  // { path: "/main", element: <Navigate to="/main/overview" /> },
  // { path: "overview", element: <Overview /> },
  // {
  //   path: "member",
  //   element: role === "ADMIN" ? <Member /> : <Navigate to="/404" />,
  // },
  // {
  //   path: "member/:name",
  //   element: role === "ADMIN" ? <MemberEdit /> : <Navigate to="/404" />,
  // },
  // { path: "manage", element: <ManageContainer /> },
  // {
  //   path: "manageAdmin",
  //   element: role === "ADMIN" ? <ManageAdmin /> : <Navigate to="/404" />,
  // },
  // { path: "password", element: <Password /> },
  // { path: "404", element: <NotFound /> },
  // { path: "*", element: <Navigate to="/404" /> },

  const user = [
    { path: "/main", element: <Navigate to="/main/overview" /> },
    { path: "overview", element: <Overview /> },
    { path: "manage", element: <ManageContainer /> },
    { path: "password", element: <Password /> },
    { path: "404", element: <NotFound /> },
    { path: "*", element: <Navigate to="/404" /> },
  ];

  return useRoutes([
    {
      path: "/main",
      element: localStorage.getItem("refresh") ? (
        <Main />
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { path: "/main", element: <Navigate to="/main/overview" /> },
        { path: "overview", element: <Overview /> },
        { path: "member", element: <Member /> },
        { path: "member/:name", element: <MemberEdit /> },
        { path: "manage", element: <ManageContainer /> },
        { path: "manageAdmin", element: <ManageAdmin /> },
        { path: "password", element: <Password /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/",
      element: !localStorage.getItem("refresh") ? (
        <LogoContainer />
      ) : (
        <Navigate to="/main" />
      ),
      children: [
        { path: "/", element: <Navigate to="/login" /> },
        { path: "login", element: <LoginContainer /> },
        { path: "register", element: <RegisterContainer /> },
        { path: "complete", element: <CompleteContainer /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
};

export default Router;
