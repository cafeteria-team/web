import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { inject, observer } from "mobx-react";

const ProtectedRoutes = inject("authStore")(
  observer(({ authStore }) => {
    const auth = authStore.authenticated;
    console.log(auth);
    return auth ? <Outlet /> : <Navigate to="/" />;
  })
);

export default ProtectedRoutes;
