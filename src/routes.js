import { Navigate, useRoutes, Outlet } from "react-router-dom";

import {
  RegisterContainer,
  LoginContainer,
  CompleteContainer,
  Main,
  Overview,
  Member,
  Manage,
  ManageAdmin,
  Menu,
  LogoContainer,
  MainViewContainer,
  SubViewContainer,
} from "./containers";

import { NotFound } from "./views";

import ProtectedRoutes from "./containers/ProtectedRoutes";

{
  /* <Routes>
  <Route
    path="/"
    element={<LoginContainer auth={AuthStore.user.authorization} />}
  ></Route>
  <Route path="/register" element={<RegisterContainer />}></Route>
  <Route path="/complete" element={<CompleteContainer />}></Route>
  <Route element={<ProtectedRoutes auth={localStorage.getItem("refresh")} />}>
    <Route path="/main" element={<Main />}>
      <Route path=":name" element={<MainViewContainer />}>
        <Route path=":detail" element={<SubViewContainer />} />
      </Route>
    </Route>
  </Route>
  <Route path="*" element={<NotFound />} />
</Routes>; */
}

export default function Router({ isLoggedIn }) {
  return useRoutes([
    {
      path: "/main",
      element: isLoggedIn ? <Main /> : <Navigate to="/login" />,
      children: [
        { path: "overview", element: <Overview /> },
        // { path: "member/:name", element: <Member /> },
        { path: "manage", element: <Manage /> },
        { path: "manageAdmin", element: <ManageAdmin /> },
        { path: "menu", element: <Menu /> },
      ],
    },
    {
      path: "/",
      element: !isLoggedIn ? <LogoContainer /> : <Navigate to="/main" />,
      children: [
        { path: "/", element: <Navigate to="/" /> },
        { path: "login", element: <LoginContainer /> },
        { path: "register", element: <RegisterContainer /> },
        { path: "complete", element: <CompleteContainer /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

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
