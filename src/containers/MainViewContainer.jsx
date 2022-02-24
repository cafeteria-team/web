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
} from "../views";

const MainViewContainer = (props) => {
  const params = useParams();
  const menuLists = params.name;
  console.log(menuLists);
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
        }
      })()}
    </>
  );
};

export default MainViewContainer;
