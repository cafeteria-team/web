import { Navigate, useRoutes } from "react-router-dom";

import {
  RegisterContainer,
  LoginContainer,
  CompleteContainer,
  Main,
  Overview,
  Member,
  ManageAdmin,
  Menu,
  LogoContainer,
  ManageContainer,
} from "./containers";

import { NotFound, Password, MemberEdit } from "./views";

const Router = ({ isLoggedIn }) => {
  return useRoutes([
    {
      path: "/main",
      element:
        localStorage.getItem("refresh") || isLoggedIn ? (
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
        { path: "menu", element: <Menu /> },
        { path: "password", element: <Password /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "/",
      element:
        !localStorage.getItem("refresh") || !isLoggedIn ? (
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

// const routes = (isLoggedIn) => [
//   {
//     path: "/app",
//     element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
//     children: [
//       { path: "/dashboard", element: <Dashboard /> },
//       { path: "/account", element: <Account /> },
//       { path: "/", element: <Navigate to="/app/dashboard" /> },
//       {
//         path: "member",
//         element: <Outlet />,
//         children: [
//           { path: "/", element: <MemberGrid /> },
//           { path: "/add", element: <AddMember /> },
//         ],
//       },
//     ],
//   },
//   {
//     path: "/",
//     element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/dashboard" />,
//     children: [
//       { path: "login", element: <Login /> },
//       { path: "/", element: <Navigate to="/login" /> },
//     ],
//   },
// ];
