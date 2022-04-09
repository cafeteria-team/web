import React from "react";
import { useParams } from "react-router";

import {
  Manage,
  Notice,
  Setting,
  Website,
  Request,
  Event,
  NotFound,
  Password,
} from "../../views";
import { Overview, Member } from "../index";

const MainViewContainer = () => {
  const params = useParams();
  const menuLists = params.name;

  console.log("mainView 호출");

  return (
    <>
      {(() => {
        switch (menuLists) {
          case "overview":
            return <Overview />;
          case "manage":
            return <Manage />;
          case "member":
            return <Member />;
          case "request":
            return <Request />;
          case "event":
            return <Event />;
          case "notice":
            return <Notice />;
          case "setting":
            return <Setting />;
          case "website":
            return <Website />;
          case "password":
            return <Password />;
          default:
            return <NotFound />;
        }
      })()}
    </>
  );
};

export default MainViewContainer;
