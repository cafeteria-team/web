import React from "react";
import { useParams } from "react-router";
import {
  Overview,
  Manage,
  Member,
  Notice,
  Setting,
  Website,
  Request,
  Event,
  NotFound,
} from "../views";
import { useOutletContext } from "react-router-dom";

const MainViewContainer = () => {
  const params = useParams();
  const menuLists = params.name;

  const sss = useOutletContext();

  console.log(sss);
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
          default:
            return <NotFound />;
        }
      })()}
    </>
  );
};

export default MainViewContainer;
