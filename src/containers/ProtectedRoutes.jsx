import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { inject, observer } from "mobx-react";

const ProtectedRoutes = inject("authStore")(
  observer(({ authStore, authenticated }) => {
    console.log("protectedRoutes", authenticated);
    const auth = authStore.authenticated;
    return auth || authenticated ? <Outlet /> : <Navigate to="/" />;
  })
);

export default ProtectedRoutes;
