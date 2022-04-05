import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { observer } from "mobx-react";

// import { useStores } from "../stores/Context";

const ProtectedRoutes = observer(({ auth }) => {
  // const { AuthStore } = useStores();

  // const auth = AuthStore.user.authorization;
  // console.log("ProtectedRoutes 호출");

  console.log(auth);

  useEffect(() => {}, [auth]);

  return auth ? <Outlet /> : <Navigate to="/" />;
});
export default ProtectedRoutes;
