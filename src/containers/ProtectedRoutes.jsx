import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { inject, observer } from "mobx-react";
import { Route } from "react-router-dom";

const ProtectedRoutes = inject("authStore")(
  observer(({ authStore, authenticated }) => {
    const auth = authStore.authenticated;
    console.log("protected 1번", authenticated);
    return authenticated ? <Outlet /> : <Navigate to="/" />;
  })
);
// authenticated ? <Outlet /> : <Navigate to="/" />;
export default ProtectedRoutes;
