import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react";

import { useStores } from "../stores/Context";

const ProtectedRoutes = observer(() => {
  const { AuthStore } = useStores();

  const auth = AuthStore.user;
  console.log(auth);
  return auth ? <Outlet /> : <Navigate to="/" />;
});
export default ProtectedRoutes;
