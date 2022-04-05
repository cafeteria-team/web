import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react";

import { useStores } from "../stores/Context";

const ProtectedRoutes = observer(() => {
  const { AuthStore } = useStores();

  return AuthStore.getUser.authorization ? <Outlet /> : <Navigate to="/" />;
});
export default ProtectedRoutes;
