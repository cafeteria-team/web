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
  NoticeContainer,
  NoticeAdd,
} from "./containers";

import { NotFound, Password, MemberEdit } from "./views";

const Router = () => {
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
        { path: "notice", element: <NoticeContainer /> },
        { path: "notice/add", element: <NoticeAdd /> },
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
