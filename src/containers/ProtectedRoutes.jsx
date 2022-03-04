import React, { useState, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { getCookie } from "../utils/cookie";

const ProtectedRoutes = inject("authStore")(
  observer(({ authStore }) => {
    // console.log("sajad 1");
    // const [state, setState] = useState("");
    const auth = authStore.authenticated;
    console.log(auth);
    // const initializeUserInfo = () => {
    //   console.log("sajad 2");
    //   const token = getCookie("refresh");
    //   // setState(token);
    //   // console.log("sajad 2 -> " + token);
    //   if (token) {
    //     return <Outlet />;
    //   } else {
    //     return <Navigate to="/" />;
    //   }
    // };
    // useEffect(() => {
    //   console.log("sajad 3");
    //   initializeUserInfo();
    // }, []);
    // console.log("ProtectedRoutes console", initializeUserInfo());
    // console.log("before return");
    // return (
    //   <>
    //     {(() => {
    //       initializeUserInfo();
    //     })()}
    //   </>
    // );
    return auth ? <Outlet /> : <Navigate to="/" />;
  })
);

export default ProtectedRoutes;
